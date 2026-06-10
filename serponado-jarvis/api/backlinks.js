// api/backlinks.js — Vercel Serverless Function
// GET:  returns all known backlinks to serponado.io (seed + KV)
// POST: submit a new backlink URL for the wall

const SEED = [
  {
    id: 'till-freitag-serponado-vibe-coding',
    linkFrom: 'https://till-freitag.com/blog/serponado-io-felix-grote-vibe-coding',
    domain: 'till-freitag.com',
    anchor: 'serponado.io',
    vi: 0.0016,
    tier: 'silver',
    addedAt: '2026-06-10',
    jarvisComment: 'Ein Tech-Blog mit messbarem Sichtbarkeitsindex verlinkt thematisch relevant und mit sauberem Anchor. Der erste externe Akteur, der die Relevanz dieser Seite erkannt hat — bevor er es musste. Das ist früh genug, um als strategisch zu gelten.',
  },
]

function getTier(vi) {
  if (vi >= 1.0) return 'platinum'
  if (vi >= 0.01) return 'gold'
  if (vi >= 0.001) return 'silver'
  if (vi >= 0.0001) return 'bronze'
  return 'iron'
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  const kvUrl = process.env.KV_REST_API_URL
  const kvToken = process.env.KV_REST_API_TOKEN

  // GET — return all links
  if (req.method === 'GET') {
    res.setHeader('Cache-Control', 's-maxage=300')

    let kvLinks = []
    if (kvUrl && kvToken) {
      try {
        const r = await fetch(`${kvUrl}/lrange/serponado:backlinks/0/-1`, {
          headers: { Authorization: `Bearer ${kvToken}` },
        })
        const { result } = await r.json()
        kvLinks = (result || [])
          .map(e => { try { return JSON.parse(e) } catch { return null } })
          .filter(Boolean)
      } catch { /* fail open */ }
    }

    // Merge seed + KV, deduplicate by domain+linkFrom
    const seen = new Set()
    const all = [...SEED, ...kvLinks].filter(link => {
      const key = link.linkFrom || link.domain
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })

    // Sort: tier weight desc, then vi desc
    const tierWeight = { platinum: 5, gold: 4, silver: 3, bronze: 2, iron: 1 }
    all.sort((a, b) => {
      const tw = (tierWeight[b.tier] || 0) - (tierWeight[a.tier] || 0)
      return tw !== 0 ? tw : (b.vi || 0) - (a.vi || 0)
    })

    return res.status(200).json({ backlinks: all, total: all.length })
  }

  // POST — submit a new backlink
  if (req.method === 'POST') {
    const { url, anchor, vi: submittedVi } = req.body || {}
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'url required' })
    }

    let normalized
    try { normalized = new URL(url.trim()).href }
    catch { return res.status(400).json({ error: 'Invalid URL' }) }

    const domain = new URL(normalized).hostname.replace(/^www\./, '')
    const vi = typeof submittedVi === 'number' ? submittedVi : 0
    const tier = getTier(vi)

    const entry = {
      id: `${domain}-${Date.now()}`,
      linkFrom: normalized,
      domain,
      anchor: anchor || domain,
      vi,
      tier,
      addedAt: new Date().toISOString().slice(0, 10),
      jarvisComment: null,
    }

    if (!kvUrl || !kvToken) {
      return res.status(200).json({ ok: true, entry, stored: false })
    }

    await fetch(`${kvUrl}/rpush/serponado:backlinks/${encodeURIComponent(JSON.stringify(entry))}`, {
      headers: { Authorization: `Bearer ${kvToken}` },
    })

    return res.status(200).json({ ok: true, entry, stored: true })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
