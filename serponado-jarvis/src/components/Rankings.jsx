import { useState, useEffect, useRef } from 'react'

export default function Rankings() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)
  const [jarvisComment, setJarvisComment] = useState(null)
  const [visibleCount, setVisibleCount] = useState(0)
  const [searchTyped, setSearchTyped] = useState('')
  const [scanning, setScanning] = useState(false)

  const fetchRankings = async () => {
    setLoading(true)
    setError(null)
    setVisibleCount(0)
    setSearchTyped('')
    setScanning(true)

    try {
      const res = await fetch('/api/rankings')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      const r = data.results || []
      setResults(r)
      setLastUpdate(new Date())
      setJarvisComment(data.jarvisComment || null)

      // Animate search bar typing
      const keyword = 'serponado'
      for (let i = 1; i <= keyword.length; i++) {
        await sleep(60)
        setSearchTyped(keyword.slice(0, i))
      }
      setScanning(false)

      // Reveal results one by one
      for (let i = 1; i <= r.length; i++) {
        await sleep(80)
        setVisibleCount(i)
      }
    } catch (e) {
      setError(e.message)
      setScanning(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchRankings() }, [])
  useEffect(() => {
    const interval = setInterval(fetchRankings, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ paddingTop: '1.5rem', maxWidth: 800, margin: '0 auto' }}>

      {/* JARVIS header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <span className="mono" style={{ fontSize: '0.65rem', color: 'var(--cyan)', letterSpacing: '0.2em', opacity: 0.7 }}>
          // SERPONADO · LIVE SERP · GOOGLE.DE
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {lastUpdate && (
            <span className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>
              {lastUpdate.toLocaleTimeString('de-DE')}
            </span>
          )}
          <button onClick={fetchRankings} disabled={loading} style={{
            background: 'transparent', border: '1px solid rgba(0,200,255,0.3)',
            color: 'var(--cyan)', padding: '0.35rem 0.875rem', borderRadius: '3px',
            cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'JetBrains Mono',
            fontSize: '0.65rem', letterSpacing: '0.1em', opacity: loading ? 0.5 : 1,
          }}>
            {loading ? 'SCANNT...' : '↻ REFRESH'}
          </button>
        </div>
      </div>

      {/* JARVIS comment */}
      {jarvisComment && (
        <div style={{
          background: 'rgba(0,200,255,0.04)', border: '1px solid rgba(0,200,255,0.15)',
          borderLeft: '3px solid var(--cyan)', padding: '0.875rem 1.25rem',
          borderRadius: '0 4px 4px 0', marginBottom: '1.5rem',
        }}>
          <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--cyan)', marginBottom: '0.4rem', opacity: 0.6 }}>
            JARVIS_KOMMENTAR
          </div>
          <p className="mono" style={{ fontSize: '0.8125rem', color: 'var(--white)', fontStyle: 'italic', lineHeight: 1.6, margin: 0 }}>
            {jarvisComment}
          </p>
        </div>
      )}

      {/* Google SERP frame */}
      <div style={{
        background: '#fff',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 32px rgba(0,0,0,0.5)',
        fontFamily: 'arial, sans-serif',
      }}>
        {/* Google top bar */}
        <div style={{
          background: '#fff',
          padding: '12px 20px 8px',
          borderBottom: '1px solid #ebebeb',
        }}>
          {/* Logo + search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
            <SearchEngineLabel />
            {/* Search bar */}
            <div style={{
              flex: 1, maxWidth: 580,
              display: 'flex', alignItems: 'center',
              border: '1px solid #dfe1e5', borderRadius: '24px',
              padding: '8px 16px', gap: '10px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}>
              <span style={{ fontSize: '14px', color: '#202124', flex: 1, minHeight: '20px' }}>
                {searchTyped || (results.length > 0 ? 'serponado' : '')}
                {(loading || scanning) && <span style={{ borderRight: '2px solid #333', animation: 'none', marginLeft: 1 }}>&nbsp;</span>}
              </span>
              <svg style={{ width: 20, height: 20, fill: '#4285f4' }} viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </div>
          </div>

          {/* Nav tabs */}
          <div style={{ display: 'flex', gap: '24px', paddingLeft: '116px' }}>
            {['Alle', 'News', 'Bilder', 'Videos', 'Shopping'].map((t, i) => (
              <span key={t} style={{
                fontSize: '13px', padding: '8px 0',
                color: i === 0 ? '#1a73e8' : '#70757a',
                borderBottom: i === 0 ? '3px solid #1a73e8' : '3px solid transparent',
                cursor: 'pointer', fontWeight: i === 0 ? 500 : 400,
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Results area */}
        <div style={{ padding: '16px 20px 20px', background: '#fff', minHeight: 300 }}>

          {/* Stats bar */}
          {results.length > 0 && (
            <div style={{ fontSize: '13px', color: '#70757a', marginBottom: '16px' }}>
              <span>Ungefähr {results.length * 847}.000 Ergebnisse (0,{Math.floor(Math.random() * 50) + 20} Sekunden)</span>
            </div>
          )}

          {/* Disclaimer */}
          {results.length > 0 && (
            <div style={{
              background: '#fff8e1', border: '1px solid #ffe082',
              borderRadius: '4px', padding: '8px 12px', marginBottom: '16px',
              fontSize: '12px', color: '#5f4400', lineHeight: 1.5,
            }}>
              ℹ️ <strong>Hinweis:</strong> Diese Suchergebnisse werden nicht direkt über deinen Browser abgefragt, sondern über <strong>DataForSEO</strong> — einen externen Dienst mit eigenen Crawling-Servern. Die Ergebnisse sind nicht personalisiert und können je nach Serverstandort von deiner persönlichen Google-Ansicht abweichen.
            </div>
          )}

          {/* Loading state */}
          {loading && results.length === 0 && (
            <div style={{ padding: '40px 0' }}>
              {[1,2,3].map(i => (
                <SkeletonResult key={i} />
              ))}
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{ padding: '20px', color: '#d93025', fontSize: '14px' }}>
              ⚠ {error}
            </div>
          )}

          {/* Actual results */}
          {results.slice(0, visibleCount).map((r, i) => (
            <SerpResult key={r.url + i} result={r} index={i} />
          ))}
        </div>
      </div>

      {/* JARVIS scan overlay hint */}
      {scanning && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <span className="mono" style={{ fontSize: '0.65rem', color: 'var(--cyan)', opacity: 0.6 }}>
            JARVIS scannt Google.de live...
          </span>
        </div>
      )}
    </div>
  )
}

function SerpResult({ result, index }) {
  const domain = (() => { try { return new URL(result.url).hostname } catch { return result.url } })()
  const isTop3 = index < 3

  return (
    <div style={{
      marginBottom: '28px',
      animation: 'fadeInUp 0.3s ease forwards',
      opacity: 1,
    }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
        <div style={{
          width: 18, height: 18, borderRadius: '50%',
          background: '#f1f3f4', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '10px', color: '#70757a', fontWeight: 600,
        }}>
          {domain.charAt(0).toUpperCase()}
        </div>
        <span style={{ fontSize: '12px', color: '#202124' }}>{domain}</span>
        <span style={{ fontSize: '12px', color: '#70757a' }}>› {result.url.split('/').slice(3).join(' › ').slice(0, 40) || ''}</span>
        {isTop3 && (
          <span style={{
            marginLeft: 'auto', fontSize: '10px', fontFamily: 'JetBrains Mono',
            color: '#1a73e8', border: '1px solid #1a73e8',
            padding: '1px 6px', borderRadius: '3px',
          }}>#{index + 1}</span>
        )}
      </div>

      {/* Title */}
      <a href={result.url} target="_blank" rel="noopener noreferrer" style={{
        display: 'block', fontSize: '20px', color: '#1a0dab',
        textDecoration: 'none', lineHeight: '1.3', marginBottom: '4px',
        fontWeight: 400,
      }}
        onMouseEnter={e => e.target.style.textDecoration = 'underline'}
        onMouseLeave={e => e.target.style.textDecoration = 'none'}
      >
        {result.title || domain}
      </a>

      {/* Snippet */}
      {result.snippet && (
        <div style={{ fontSize: '14px', color: '#4d5156', lineHeight: '1.58' }}>
          {result.snippet.length > 200 ? result.snippet.slice(0, 200) + '…' : result.snippet}
        </div>
      )}
    </div>
  )
}

function SkeletonResult() {
  return (
    <div style={{ marginBottom: '28px' }}>
      <div style={{ width: 120, height: 12, background: '#f1f3f4', borderRadius: 4, marginBottom: 8 }} />
      <div style={{ width: '60%', height: 20, background: '#e8f0fe', borderRadius: 4, marginBottom: 8 }} />
      <div style={{ width: '90%', height: 12, background: '#f1f3f4', borderRadius: 4, marginBottom: 4 }} />
      <div style={{ width: '75%', height: 12, background: '#f1f3f4', borderRadius: 4 }} />
    </div>
  )
}

function SearchEngineLabel() {
  return (
    <div style={{
      flexShrink: 0, display: 'flex', flexDirection: 'column',
      alignItems: 'flex-start', justifyContent: 'center', width: 92,
    }}>
      <span style={{ fontSize: '18px', fontWeight: 700, color: '#5f6368', letterSpacing: '-0.5px', lineHeight: 1 }}>
        Suche
      </span>
      <span style={{ fontSize: '9px', color: '#aaa', marginTop: 2 }}>via DataForSEO</span>
    </div>
  )
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
