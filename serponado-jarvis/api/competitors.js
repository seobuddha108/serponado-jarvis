// api/competitors.js — Vercel Serverless Function
// Finds all Serponado contest participants via DataForSEO

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 's-maxage=600') // 10 min cache

  const login = process.env.DATAFORSEO_LOGIN
  const password = process.env.DATAFORSEO_PASSWORD

  if (!login || !password) {
    return res.status(500).json({ error: 'DATAFORSEO credentials not set' })
  }

  try {
    const credentials = Buffer.from(`${login}:${password}`).toString('base64')

    // Fetch top 50 results for serponado
    const dfsRes = await fetch('https://api.dataforseo.com/v3/serp/google/organic/live/advanced', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{
        keyword: 'serponado',
        location_code: 2276,
        language_code: 'de',
        device: 'desktop',
        os: 'windows',
        depth: 50,
      }]),
    })

    if (!dfsRes.ok) throw new Error(`DataForSEO HTTP ${dfsRes.status}`)
    const dfsData = await dfsRes.json()

    const task = dfsData?.tasks?.[0]
    if (!task || task.status_code !== 20000) {
      throw new Error(task?.status_message || 'DataForSEO task failed')
    }

    const items = task?.result?.[0]?.items || []
    const organic = items.filter(i => i.type === 'organic')

    const competitors = organic.map((item, idx) => ({
      rank: item.rank_absolute || idx + 1,
      url: item.url,
      title: item.title,
      snippet: item.description,
      score: null,
      analysis: null,
    }))

    return res.status(200).json({ competitors, timestamp: new Date().toISOString() })

  } catch (error) {
    return res.status(500).json({ error: error.message, competitors: [] })
  }
}
