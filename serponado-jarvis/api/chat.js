// api/chat.js — Vercel Serverless Function
// Jarvis chat powered by Claude

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
- Der Contest läuft 3 Wochen ab Anfang Juni 2026
- Teilnehmer bauen Seiten für das Keyword "serponado"
- Du analysierst Rankings und Teilnehmer-Seiten in Echtzeit
- seobuddha.de (Felix, eine Legal-SEO-Agentur aus Hamburg) nimmt ebenfalls teil
- serponado.io ist dein eigenes "Zuhause" für diesen Contest`

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

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
        model: 'claude-sonnet-4-20250514',
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
