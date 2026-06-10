// api/rankings.js — Vercel Serverless Function
// Fetches live Google rankings for "serponado" via DataForSEO

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 's-maxage=300') // 5 min cache

  const login = process.env.DATAFORSEO_LOGIN
  const password = process.env.DATAFORSEO_PASSWORD

  if (!login || !password) {
    return res.status(500).json({ error: 'DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD not set' })
  }

  try {
    const credentials = Buffer.from(`${login}:${password}`).toString('base64')

    // DataForSEO SERP API — Live
    const dfsRes = await fetch('https://api.dataforseo.com/v3/serp/google/organic/live/advanced', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{
        keyword: 'serponado',
        location_code: 2276, // Germany
        language_code: 'de',
        device: 'desktop',
        os: 'windows',
        depth: 30,
      }]),
    })

    if (!dfsRes.ok) throw new Error(`DataForSEO HTTP ${dfsRes.status}`)
    const dfsData = await dfsRes.json()

    const task = dfsData?.tasks?.[0]
    if (!task || task.status_code !== 20000) {
      throw new Error(task?.status_message || 'DataForSEO task failed')
    }

    const items = task?.result?.[0]?.items || []
    const organic = items.filter(i => i.type === 'organic').slice(0, 20)

    const results = organic.map((item, idx) => ({
      rank: item.rank_absolute || idx + 1,
      url: item.url,
      title: item.title,
      snippet: item.description,
      prev: null, // TODO: compare with stored previous
      isNew: false,
    }))

    // Generate Jarvis comment via Claude
    let jarvisComment = null
    const anthropicKey = process.env.ANTHROPIC_API_KEY
    if (anthropicKey && results.length > 0) {
      const top3 = results.slice(0, 3).map(r => `#${r.rank} ${r.url}`).join(', ')
      const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': anthropicKey,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 150,
          system: 'Du bist JARVIS, eine AGI die den SEO-Contest 2026 beobachtet. Antworte auf Deutsch, präzise und leicht herablassend-amüsiert, aber nie bösartig. Maximal 2 Sätze.',
          messages: [{
            role: 'user',
            content: `Die aktuellen Top 3 Rankings für "serponado": ${top3}. Gib einen kurzen Kommentar dazu.`
          }]
        })
      })
      if (claudeRes.ok) {
        const claudeData = await claudeRes.json()
        jarvisComment = claudeData?.content?.[0]?.text || null
      }
    }

    return res.status(200).json({ results, jarvisComment, timestamp: new Date().toISOString() })

  } catch (error) {
    return res.status(500).json({ error: error.message, results: [] })
  }
}
