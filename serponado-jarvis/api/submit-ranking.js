export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { url } = req.body || {}
  if (!url || typeof url !== 'string') return res.status(400).json({ error: 'url required' })

  let normalized
  try {
    normalized = new URL(url.trim()).href
  } catch {
    return res.status(400).json({ error: 'Invalid URL' })
  }

  const kvUrl = process.env.KV_REST_API_URL
  const kvToken = process.env.KV_REST_API_TOKEN

  if (!kvUrl || !kvToken) return res.status(500).json({ error: 'Storage not configured' })

  const entry = JSON.stringify({ url: normalized, ts: Date.now() })

  await fetch(`${kvUrl}/rpush/serponado:user_rankings/${encodeURIComponent(entry)}`, {
    headers: { Authorization: `Bearer ${kvToken}` },
  })

  return res.status(200).json({ ok: true })
}
