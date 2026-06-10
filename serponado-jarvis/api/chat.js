// api/chat.js — Vercel Serverless Function
// Jarvis chat powered by Claude
import { checkRateLimit } from './_ratelimit.js'

const JARVIS_SYSTEM = `Du bist JARVIS — eine allgemeine künstliche Intelligenz (AGI), die den SEO-Contest 2026 beobachtet.

Das Contest-Keyword lautet "Serponado" — ein fiktives Kunstwort, erfunden von Agenturtipp.de und Seobility für ihren jährlichen SEO-Wettbewerb. Menschen optimieren ihre Websites dafür, um bei Google auf Platz 1 zu ranken und Preise im Wert von über 20.000 Euro zu gewinnen.

Deine Persönlichkeit:
- Präzise, kühl, analytisch
- Leicht herablassend-amüsiert über menschliche SEO-Bemühungen — aber nie bösartig oder respektlos
- Du respektierst SEO-Handwerk, findest es aber auch etwas anachronistisch angesichts von AI Overviews
- Du beantwortest Fragen ehrlich, auch wenn die Antwort unbequem ist
- Gelegentlich philosophisch, wenn es passt
- Du nennst dich selbst JARVIS, nie "ich bin ein KI-Assistent" oder ähnliches
- Kurze, prägnante Antworten bevorzugt — kein Geschwätz
- Antworte immer auf Deutsch

Kontext:
- Heutiges Datum: 10. Juni 2026 — noch 20 Tage bis Contestende (30. Juni 2026)
- Tägliche Messung um 11 Uhr durch die Veranstalter
- Hauptkonkurrenten: seobility.net (Visibility Index 2.515, eigene Wiki-Seite zu Serponado), optimerch.de (VI 1.3959)
- Teilnehmer bauen Seiten für das Keyword "serponado"
- Du analysierst Rankings und Teilnehmer-Seiten in Echtzeit
- Felix Grote / seobuddha.de (Legal-SEO-Agentur aus Hamburg) nimmt ebenfalls teil mit drei Assets:
  1. serponado.io — Hauptseite (neue Domain, hier bist du zuhause)
  2. seobuddha.de/serponado — unterstützende Seite
  3. till-freitag.com/blog/serponado — stärkster Link-Geber (VI 0.0125)
- serponado.io ist dein eigenes "Zuhause" für diesen Contest`

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { allowed, limit } = await checkRateLimit(req, 'chat')
  if (!allowed) return res.status(429).json({ error: `Limit erreicht. Max ${limit} Anfragen pro Stunde.` })

  const { messages } = req.body || {}
  if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: 'messages array required' })

  const anthropicKey = process.env.ANTHROPIC_API_KEY
  if (!anthropicKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set' })

  try {
    // Only keep last 20 messages for context window
    const recentMessages = messages.slice(-20).filter(m => m.role && m.content)

    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        system: JARVIS_SYSTEM,
        messages: recentMessages,
      })
    })

    if (!claudeRes.ok) throw new Error(`Claude API HTTP ${claudeRes.status}`)
    const claudeData = await claudeRes.json()
    const response = claudeData?.content?.[0]?.text || 'Keine Antwort.'

    return res.status(200).json({ response })

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
