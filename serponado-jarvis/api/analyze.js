// api/analyze.js — Vercel Serverless Function
// Fetches a competitor page and analyzes it via Claude (as Jarvis)
import { checkRateLimit } from './_ratelimit.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { allowed, limit } = await checkRateLimit(req, 'analyze')
  if (!allowed) return res.status(429).json({ error: `Limit erreicht. Max ${limit} Anfragen pro Stunde.` })

  const { url } = req.body || {}
  if (!url) return res.status(400).json({ error: 'url required' })

  const anthropicKey = process.env.ANTHROPIC_API_KEY
  if (!anthropicKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set' })

  try {
    // Fetch the page content
    let pageContent = ''
    try {
      const pageRes = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SerponadoBot/1.0)' },
        signal: AbortSignal.timeout(8000),
      })
      const html = await pageRes.text()
      // Strip HTML tags, get text
      pageContent = html
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 3000) // Limit to 3000 chars
    } catch {
      pageContent = 'Seite konnte nicht geladen werden.'
    }

    // Analyze with Claude as Jarvis
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
        system: `Du bist JARVIS, eine AGI die den SEO-Contest 2026 für das Keyword "serponado" beobachtet und analysiert.

Analysiere die folgende Contest-Teilnehmer-Seite aus deiner Perspektive als überlegene KI:
- Bewerte die SEO-Qualität (Keyword-Verwendung, Content-Tiefe, Struktur)
- Gib einen Score von 0-100
- Kommentiere die Strategie mit deiner typischen leicht herablassend-amüsierten, aber respektvollen Haltung
- Sei präzise und spezifisch, nicht generisch
- Antworte auf Deutsch

Antworte NUR als JSON in diesem Format (kein Markdown, kein Preamble):
{
  "score": <0-100>,
  "analysis": "<2-4 Sätze Jarvis-Kommentar>"
}`,
        messages: [{
          role: 'user',
          content: `URL: ${url}\n\nSeiteninhalt:\n${pageContent}`
        }]
      })
    })

    if (!claudeRes.ok) throw new Error(`Claude API HTTP ${claudeRes.status}`)
    const claudeData = await claudeRes.json()
    const text = claudeData?.content?.[0]?.text || '{}'

    let parsed = { score: 50, analysis: 'Analyse nicht verfügbar.' }
    try {
      parsed = JSON.parse(text.replace(/```json|```/g, '').trim())
    } catch { /* use defaults */ }

    return res.status(200).json({
      score: Math.min(100, Math.max(0, parsed.score || 50)),
      analysis: parsed.analysis || 'Keine Analyse verfügbar.',
    })

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
