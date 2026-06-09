import { useState, useEffect } from 'react'

function SectionHeader({ children }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <span className="mono" style={{ fontSize: '0.65rem', color: 'var(--cyan)', letterSpacing: '0.2em', opacity: 0.7 }}>
        // {children}
      </span>
    </div>
  )
}

function RankRow({ rank, prev, url, title, snippet, isNew }) {
  const moved = prev !== null ? prev - rank : null
  const domain = (() => { try { return new URL(url).hostname } catch { return url } })()

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '48px 1fr 80px',
      gap: '1rem',
      padding: '1rem 1.25rem',
      borderBottom: '1px solid var(--border)',
      alignItems: 'start',
      transition: 'background 0.2s',
      background: isNew ? 'rgba(0,200,255,0.03)' : 'transparent',
    }}
    onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,200,255,0.04)'}
    onMouseLeave={e => e.currentTarget.style.background = isNew ? 'rgba(0,200,255,0.03)' : 'transparent'}
    >
      {/* RANK */}
      <div style={{ textAlign: 'center' }}>
        <span className="mono" style={{
          fontSize: '1.5rem', fontWeight: 700, lineHeight: 1,
          color: rank <= 3 ? 'var(--cyan)' : 'var(--muted)',
        }}>#{rank}</span>
        {moved !== null && (
          <div className="mono" style={{
            fontSize: '0.6rem', marginTop: '0.2rem',
            color: moved > 0 ? 'var(--green)' : moved < 0 ? 'var(--red)' : 'var(--muted)'
          }}>
            {moved > 0 ? `▲${moved}` : moved < 0 ? `▼${Math.abs(moved)}` : '–'}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div>
        <div style={{ marginBottom: '0.25rem' }}>
          <a href={url} target="_blank" rel="noopener" style={{
            color: 'var(--white)', textDecoration: 'none', fontWeight: 500, fontSize: '0.9375rem',
          }}
          onMouseEnter={e => e.target.style.color = 'var(--cyan)'}
          onMouseLeave={e => e.target.style.color = 'var(--white)'}
          >{title || domain}</a>
        </div>
        <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--cyan)', opacity: 0.6, marginBottom: '0.25rem' }}>
          {domain}
        </div>
        {snippet && (
          <div style={{ fontSize: '0.8125rem', color: 'var(--muted)', lineHeight: 1.5 }}>
            {snippet.length > 120 ? snippet.slice(0, 120) + '…' : snippet}
          </div>
        )}
      </div>

      {/* BADGE */}
      <div style={{ textAlign: 'right' }}>
        {isNew && (
          <span style={{
            background: 'rgba(0,200,255,0.1)', border: '1px solid rgba(0,200,255,0.2)',
            color: 'var(--cyan)', fontSize: '0.55rem', padding: '0.15rem 0.4rem',
            borderRadius: '2px', fontFamily: 'JetBrains Mono', letterSpacing: '0.08em'
          }}>NEU</span>
        )}
      </div>
    </div>
  )
}

export default function Rankings() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)
  const [jarvisComment, setJarvisComment] = useState(null)

  const fetchRankings = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/rankings')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setResults(data.results || [])
      setLastUpdate(new Date())
      setJarvisComment(data.jarvisComment || null)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchRankings() }, [])

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(fetchRankings, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ paddingTop: '1.5rem' }}>
      <SectionHeader>SERPONADO · LIVE RANKINGS · GOOGLE.DE</SectionHeader>

      {/* HEADER ROW */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontFamily: 'JetBrains Mono', fontSize: '1.5rem', fontWeight: 700, color: 'var(--cyan)', letterSpacing: '-0.02em' }}>
            Serponado Rankings
          </h1>
          {lastUpdate && (
            <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--muted)', marginTop: '0.25rem' }}>
              Letzte Aktualisierung: {lastUpdate.toLocaleTimeString('de-DE')}
            </div>
          )}
        </div>
        <button onClick={fetchRankings} disabled={loading} style={{
          background: 'transparent', border: '1px solid var(--border-bright)',
          color: 'var(--cyan)', padding: '0.5rem 1rem', borderRadius: '3px',
          cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'JetBrains Mono',
          fontSize: '0.7rem', letterSpacing: '0.1em', opacity: loading ? 0.5 : 1,
          transition: 'all 0.2s',
        }}>
          {loading ? 'LÄDT...' : '↻ REFRESH'}
        </button>
      </div>

      {/* JARVIS COMMENT */}
      {jarvisComment && (
        <div style={{
          background: 'var(--cyan-glow)', border: '1px solid var(--border)',
          borderLeft: '3px solid var(--cyan)', padding: '1rem 1.25rem',
          borderRadius: '0 4px 4px 0', marginBottom: '1.5rem',
        }}>
          <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--cyan)', marginBottom: '0.5rem', opacity: 0.6 }}>
            JARVIS_KOMMENTAR
          </div>
          <p className="mono" style={{ fontSize: '0.875rem', color: 'var(--white)', fontStyle: 'italic', lineHeight: 1.6 }}>
            {jarvisComment}
          </p>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div style={{
          background: 'rgba(255,68,102,0.06)', border: '1px solid rgba(255,68,102,0.2)',
          padding: '1rem 1.25rem', borderRadius: '4px', marginBottom: '1.5rem',
          fontFamily: 'JetBrains Mono', fontSize: '0.8rem', color: '#ff8899',
        }}>
          ⚠ FEHLER: {error} — API Key konfiguriert?
        </div>
      )}

      {/* RESULTS */}
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: '4px', overflow: 'hidden',
      }}>
        {loading && results.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <div className="mono" style={{ color: 'var(--cyan)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              JARVIS analysiert SERPs...
            </div>
            <div className="mono" style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>
              DataForSEO API wird abgefragt
            </div>
          </div>
        ) : results.length === 0 && !loading ? (
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <div className="mono" style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>
              Keine Ergebnisse gefunden. API Key prüfen.
            </div>
          </div>
        ) : (
          results.map((r, i) => (
            <RankRow
              key={r.url + i}
              rank={r.rank}
              prev={r.prev || null}
              url={r.url}
              title={r.title}
              snippet={r.snippet}
              isNew={r.isNew || false}
            />
          ))
        )}
      </div>
    </div>
  )
}
