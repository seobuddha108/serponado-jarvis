import { useState, useEffect } from 'react'

function ScoreBadge({ score }) {
  const color = score >= 80 ? '#00ff88' : score >= 60 ? 'var(--cyan)' : score >= 40 ? 'var(--gold)' : 'var(--red)'
  return (
    <div style={{
      width: '48px', height: '48px', borderRadius: '50%',
      border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '0.875rem', color,
      flexShrink: 0,
    }}>{score}</div>
  )
}

function CompetitorCard({ url, title, score, analysis, rank, loading }) {
  const [expanded, setExpanded] = useState(false)
  const domain = (() => { try { return new URL(url).hostname } catch { return url } })()

  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: '4px', marginBottom: '0.75rem', overflow: 'hidden',
      transition: 'border-color 0.2s',
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-bright)'}
    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      <div style={{
        padding: '1rem 1.25rem', display: 'flex',
        alignItems: 'center', gap: '1rem', cursor: 'pointer'
      }} onClick={() => setExpanded(!expanded)}>

        {/* RANK */}
        <span className="mono" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--muted)', width: '36px', textAlign: 'center', flexShrink: 0 }}>
          #{rank}
        </span>

        {/* SCORE */}
        {loading ? (
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid var(--border)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="mono" style={{ fontSize: '0.55rem', color: 'var(--muted)' }}>…</span>
          </div>
        ) : score !== null ? (
          <ScoreBadge score={score} />
        ) : null}

        {/* INFO */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 500, fontSize: '0.9375rem', color: 'var(--white)', marginBottom: '0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {title || domain}
          </div>
          <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--cyan)', opacity: 0.6 }}>
            <a href={url} target="_blank" rel="noopener" style={{ color: 'inherit', textDecoration: 'none' }}
            onClick={e => e.stopPropagation()}>
              {domain}
            </a>
          </div>
        </div>

        {/* EXPAND */}
        <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--muted)', flexShrink: 0 }}>
          {expanded ? '▲' : '▼'}
        </span>
      </div>

      {/* EXPANDED ANALYSIS */}
      {expanded && (
        <div style={{
          borderTop: '1px solid var(--border)',
          padding: '1.25rem',
          background: 'rgba(0,200,255,0.02)',
        }}>
          {loading ? (
            <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--muted)', fontStyle: 'italic' }}>
              JARVIS analysiert Seite...
            </div>
          ) : analysis ? (
            <div>
              <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--cyan)', letterSpacing: '0.15em', marginBottom: '0.75rem', opacity: 0.6 }}>
                JARVIS_BEWERTUNG
              </div>
              <p className="mono" style={{ fontSize: '0.8125rem', color: 'rgba(240,244,255,0.8)', lineHeight: 1.7, fontStyle: 'italic' }}>
                {analysis}
              </p>
            </div>
          ) : (
            <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
              Keine Analyse verfügbar.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function Competitors() {
  const [competitors, setCompetitors] = useState([])
  const [loading, setLoading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)

  const fetchCompetitors = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/competitors')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setCompetitors(data.competitors || [])
      setLastUpdate(new Date())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const analyzeCompetitor = async (url, index) => {
    setCompetitors(prev => prev.map((c, i) => i === index ? { ...c, analyzing: true } : c))
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setCompetitors(prev => prev.map((c, i) => i === index ? {
        ...c, analyzing: false, score: data.score, analysis: data.analysis
      } : c))
    } catch {
      setCompetitors(prev => prev.map((c, i) => i === index ? { ...c, analyzing: false } : c))
    }
  }

  useEffect(() => { fetchCompetitors() }, [])

  return (
    <div style={{ paddingTop: '1.5rem' }}>
      <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--cyan)', letterSpacing: '0.2em', opacity: 0.7, marginBottom: '1.5rem' }}>
        // SERPONADO · TEILNEHMER-MONITOR · JARVIS ANALYSE
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontFamily: 'JetBrains Mono', fontSize: '1.5rem', fontWeight: 700, color: 'var(--cyan)' }}>
            Teilnehmer-Analyse
          </h1>
          {lastUpdate && (
            <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--muted)', marginTop: '0.25rem' }}>
              {competitors.length} Teilnehmer gefunden · {lastUpdate.toLocaleTimeString('de-DE')}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={fetchCompetitors} disabled={loading} style={{
            background: 'transparent', border: '1px solid var(--border-bright)',
            color: 'var(--cyan)', padding: '0.5rem 1rem', borderRadius: '3px',
            cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'JetBrains Mono',
            fontSize: '0.7rem', letterSpacing: '0.1em', opacity: loading ? 0.5 : 1,
          }}>
            {loading ? 'SUCHE...' : '↻ CRAWLEN'}
          </button>
          <button
            onClick={() => competitors.forEach((c, i) => { if (!c.analysis && !c.analyzing) analyzeCompetitor(c.url, i) })}
            disabled={analyzing || competitors.length === 0}
            style={{
              background: 'rgba(0,200,255,0.08)', border: '1px solid var(--border-bright)',
              color: 'var(--cyan)', padding: '0.5rem 1rem', borderRadius: '3px',
              cursor: 'pointer', fontFamily: 'JetBrains Mono', fontSize: '0.7rem', letterSpacing: '0.1em',
            }}>
            ⚡ ALLE ANALYSIEREN
          </button>
        </div>
      </div>

      {error && (
        <div style={{
          background: 'rgba(255,68,102,0.06)', border: '1px solid rgba(255,68,102,0.2)',
          padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem',
          fontFamily: 'JetBrains Mono', fontSize: '0.8rem', color: '#ff8899',
        }}>
          ⚠ {error}
        </div>
      )}

      {loading && competitors.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div className="mono" style={{ color: 'var(--cyan)', marginBottom: '0.5rem' }}>
            JARVIS sucht Serponado-Seiten...
          </div>
          <div className="mono" style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>
            Google wird abgefragt
          </div>
        </div>
      ) : (
        <div>
          {competitors.map((c, i) => (
            <CompetitorCard
              key={c.url}
              rank={i + 1}
              url={c.url}
              title={c.title}
              score={c.score || null}
              analysis={c.analysis || null}
              loading={c.analyzing || false}
            />
          ))}
        </div>
      )}
    </div>
  )
}
