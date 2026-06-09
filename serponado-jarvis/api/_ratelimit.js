// Rate limiting via Upstash Redis
// Max 10 requests per IP per hour per endpoint

const WINDOW_SECONDS = 3600 // 1 hour
const MAX_REQUESTS = 10

export async function checkRateLimit(req, endpoint) {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.STORAGE_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.STORAGE_TOKEN

  if (!url || !token) return { allowed: true } // fail open if Redis not configured

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim()
    || req.headers['x-real-ip']
    || 'unknown'

  const key = `rl:${endpoint}:${ip}`

  try {
    // Increment counter
    const incrRes = await fetch(`${url}/incr/${key}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const { result: count } = await incrRes.json()

    // Set expiry on first request
    if (count === 1) {
      await fetch(`${url}/expire/${key}/${WINDOW_SECONDS}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    }

    if (count > MAX_REQUESTS) {
      return { allowed: false, count, limit: MAX_REQUESTS }
    }

    return { allowed: true, count, limit: MAX_REQUESTS }
  } catch {
    return { allowed: true } // fail open on Redis errors
  }
}
