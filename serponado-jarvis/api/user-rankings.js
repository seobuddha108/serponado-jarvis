export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 's-maxage=60')

  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const kvUrl = process.env.KV_REST_API_URL
  const kvToken = process.env.KV_REST_API_TOKEN

  if (!kvUrl || !kvToken) return res.status(200).json({ submissions: [], counts: [] })

  const r = await fetch(`${kvUrl}/lrange/serponado:user_rankings/0/-1`, {
    headers: { Authorization: `Bearer ${kvToken}` },
  })
  const { result } = await r.json()
  const entries = (result || []).map(e => { try { return JSON.parse(e) } catch { return null } }).filter(Boolean)

  // Aggregate by URL
  const counts = {}
  for (const { url } of entries) {
    counts[url] = (counts[url] || 0) + 1
  }

  const ranked = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([url, count]) => ({ url, count }))

  return res.status(200).json({ total: entries.length, counts: ranked })
}
