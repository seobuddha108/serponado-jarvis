import { useState, useEffect } from 'react'

const TIER_META = {
  platinum: { label: 'PLATINUM', color: '#e0e0ff', glow: 'rgba(200,200,255,0.4)', icon: '◈' },
  gold:     { label: 'GOLD',     color: '#ffd700', glow: 'rgba(255,215,0,0.35)',   icon: '◆' },
  silver:   { label: 'SILBER',   color: '#c0c8d8', glow: 'rgba(192,200,216,0.35)', icon: '◇' },
  bronze:   { label: 'BRONZE',   color: '#cd7f32', glow: 'rgba(205,127,50,0.35)',  icon: '○' },
  iron:     { label: 'IRON',     color: '#778899', glow: 'rgba(119,136,153,0.2)',  icon: '·' },
}

function TierBadge({ tier }) {
  const m = TIER_META[tier] || TIER_META.iron
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
      border: `1px solid ${m.color}`,
      background: `${m.glow}`,
      padding: '0.2rem 0.6rem', borderRadius: '2px',
      fontFamily: 'JetBrains Mono', fontSize: '0.6rem',
      color: m.color, letterSpacing: '0.15em',
    }}>
      {m.icon} {m.label}
    </div>
  )
}

function ViBadge({ vi }) {
  if (!vi) return null
  const fmt = vi >= 0.1 ? vi.toFixed(3) : vi >= 0.001 ? vi.toFixed(4) : vi.toFixed(5)
  return (
    <span style={{
      fontFamily: 'JetBrains Mono', fontSize: '0.65rem',
      color: 'var(--muted)', letterSpacing: '0.05em',
    }}>
      VI&nbsp;{fmt}
    </span>
  )
}

function LinkCard({ link, rank }) {
  const [expanded, setExpanded] = useState(false)
  const tier = TIER_META[link.tier] || TIER_META.iron
  const initial = (link.domain || '?').charAt(0).toUpperCase()

  return (
    <div
      onClick={() => setExpanded(e => !e)}
      style={{
        background: 'var(--surface)',
        border: `1px solid ${expanded ? tier.color : 'var(--border)'}`,
        borderLeft: `3px solid ${tier.color}`,
        boxShadow: expanded ? `0 0 20px ${tier.glow}` : 'none',
        borderRadius: '4px', marginBottom: '0.75rem',
        cursor: 'pointer', transition: 'all 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = tier.color}
      onMouseLeave={e => { if (!expanded) e.currentTarget.style.borderColor = 'var(--border)' }}
    >
      {/* CARD HEADER */}
      <div style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>

        {/* Rank */}
        <span className="mono" style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--muted)', width: '32px', flexShrink: 0, textAlign: 'center' }}>
          #{rank}
        </span>

        {/* Domain initial */}
        <div style={{
          width: 40, height: 40, borderRadius: '3px', flexShrink: 0,
          background: `${tier.glow}`, border: `1px solid ${tier.color}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '1rem', color: tier.color,
        }}>
          {initial}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
            <span style={{ fontWeight: 500, fontSize: '0.9375rem', color: 'var(--white)' }}>
              {link.domain}
            </span>
            <TierBadge tier={link.tier} />
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <ViBadge vi={link.vi} />
            {link.anchor && (
              <span className="mono" style={{ fontSize: '0.65rem', color: 'var(--cyan)', opacity: 0.7 }}>
                anchor: "{link.anchor}"
              </span>
            )}
            <span className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>
              {link.addedAt}
            </span>
          </div>
        </div>

        {/* Expand arrow */}
        <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--muted)', flexShrink: 0 }}>
          {expanded ? '▲' : '▼'}
        </span>
      </div>

      {/* EXPANDED */}
      {expanded && (
        <div style={{ borderTop: `1px solid ${tier.color}33`, padding: '1.25rem', background: 'rgba(0,200,255,0.02)' }}>

          {/* Source URL */}
          <div style={{ marginBottom: '1rem' }}>
            <div className="mono" style={{ fontSize: '0.55rem', color: 'var(--cyan)', letterSpacing: '0.15em', marginBottom: '0.35rem', opacity: 0.6 }}>
              QUELLE
            </div>
            <a
              href={link.linkFrom}
              target="_blank"
              rel="nofollow ugc noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{ fontSize: '0.8rem', color: tier.color, wordBreak: 'break-all', textDecoration: 'none' }}
              onMouseEnter={e => e.target.style.textDecoration = 'underline'}
              onMouseLeave={e => e.target.style.textDecoration = 'none'}
            >
              {link.linkFrom}
            </a>
          </div>

          {/* JARVIS comment */}
          {link.jarvisComment && (
            <div style={{
              borderLeft: `2px solid ${tier.color}`,
              paddingLeft: '1rem',
            }}>
              <div className="mono" style={{ fontSize: '0.55rem', color: 'var(--cyan)', letterSpacing: '0.15em', marginBottom: '0.4rem', opacity: 0.6 }}>
                JARVIS_BEWERTUNG
              </div>
              <p className="mono" style={{ fontSize: '0.8125rem', color: 'rgba(240,244,255,0.8)', lineHeight: 1.7, fontStyle: 'italic', margin: 0 }}>
                {link.jarvisComment}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function SubmitForm({ onSubmitted }) {
  const [url, setUrl] = useState('')
  const [anchor, setAnchor] = useState('')
  const [status, setStatus] = useState(null) // null | 'loading' | 'ok' | 'err'

  const submit = async () => {
    if (!url.trim()) return
    try { new URL(url.trim()) } catch { setStatus('err'); return }
    setStatus('loading')
    try {
      await fetch('/api/backlinks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim(), anchor: anchor.trim() || undefined }),
      })
      setStatus('ok')
      onSubmitted?.()
    } catch { setStatus('err') }
  }

  if (status === 'ok') {
    return (
      <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--green)', padding: '1rem 0', textAlign: 'center' }}>
        ✓ Link eingereicht. JARVIS analysiert deine Domain und trägt sie in den Hall of Fame ein.
      </div>
    )
  }

  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: '4px', padding: '1.25rem',
    }}>
      <div className="mono" style={{ fontSize: '0.55rem', color: 'var(--cyan)', letterSpacing: '0.2em', marginBottom: '0.875rem', opacity: 0.6 }}>
        LINK_MELDEN
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <input
          type="url"
          placeholder="https://meine-seite.de/serponado-artikel"
          value={url}
          onChange={e => setUrl(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          style={{
            flex: '2 1 240px', background: 'rgba(0,200,255,0.04)',
            border: `1px solid ${status === 'err' ? 'var(--red)' : 'rgba(0,200,255,0.2)'}`,
            borderRadius: '3px', padding: '0.5rem 0.75rem',
            color: 'var(--white)', fontFamily: 'JetBrains Mono', fontSize: '0.8rem', outline: 'none',
          }}
        />
        <input
          type="text"
          placeholder='Anchor-Text (optional)'
          value={anchor}
          onChange={e => setAnchor(e.target.value)}
          style={{
            flex: '1 1 160px', background: 'rgba(0,200,255,0.04)',
            border: '1px solid rgba(0,200,255,0.2)',
            borderRadius: '3px', padding: '0.5rem 0.75rem',
            color: 'var(--white)', fontFamily: 'JetBrains Mono', fontSize: '0.8rem', outline: 'none',
          }}
        />
        <button
          onClick={submit}
          disabled={status === 'loading' || !url.trim()}
          style={{
            background: 'rgba(0,200,255,0.1)', border: '1px solid rgba(0,200,255,0.35)',
            color: 'var(--cyan)', padding: '0.5rem 1.25rem', borderRadius: '3px',
            cursor: 'pointer', fontFamily: 'JetBrains Mono', fontSize: '0.7rem',
            letterSpacing: '0.1em', opacity: (status === 'loading' || !url.trim()) ? 0.5 : 1,
            flexShrink: 0,
          }}
        >
          {status === 'loading' ? '...' : '✓ MELDEN'}
        </button>
      </div>
      {status === 'err' && (
        <p className="mono" style={{ fontSize: '0.7rem', color: 'var(--red)', marginTop: '0.4rem' }}>
          Ungültige URL.
        </p>
      )}
    </div>
  )
}

export default function Backlinks() {
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchLinks = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/backlinks')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setLinks(data.backlinks || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchLinks() }, [])

  const totalVi = links.reduce((s, l) => s + (l.vi || 0), 0)

  return (
    <div style={{ paddingTop: '1.5rem', maxWidth: 800, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--cyan)', letterSpacing: '0.2em', opacity: 0.7, marginBottom: '0.5rem' }}>
            // BACKLINK HALL OF FAME · SERPONADO.IO
          </div>
          <h1 style={{ fontFamily: 'JetBrains Mono', fontSize: '1.5rem', fontWeight: 700, color: 'var(--cyan)', margin: 0 }}>
            Link-Profil
          </h1>
          {links.length > 0 && (
            <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--muted)', marginTop: '0.35rem' }}>
              {links.length} {links.length === 1 ? 'Referring Domain' : 'Referring Domains'} · VI-Summe {totalVi.toFixed(4)}
            </div>
          )}
        </div>
        <button onClick={fetchLinks} disabled={loading} style={{
          background: 'transparent', border: '1px solid rgba(0,200,255,0.3)',
          color: 'var(--cyan)', padding: '0.35rem 0.875rem', borderRadius: '3px',
          cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'JetBrains Mono',
          fontSize: '0.65rem', letterSpacing: '0.1em', opacity: loading ? 0.5 : 1,
        }}>
          {loading ? 'LÄDT...' : '↻ REFRESH'}
        </button>
      </div>

      {/* Tier legend */}
      <div style={{
        display: 'flex', gap: '0.5rem', flexWrap: 'wrap',
        marginBottom: '1.5rem',
      }}>
        {[
          ['platinum', 'VI ≥ 1.0'],
          ['gold',     'VI ≥ 0.01'],
          ['silver',   'VI ≥ 0.001'],
          ['bronze',   'VI ≥ 0.0001'],
          ['iron',     'VI < 0.0001'],
        ].map(([tier, label]) => {
          const m = TIER_META[tier]
          return (
            <div key={tier} style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: 'var(--muted)',
            }}>
              <span style={{ color: m.color }}>{m.icon}</span>
              <span style={{ color: m.color }}>{m.label}</span>
              <span style={{ opacity: 0.5 }}>{label}</span>
            </div>
          )
        })}
      </div>

      {/* JARVIS comment if we have links */}
      {links.length > 0 && (
        <div style={{
          background: 'rgba(0,200,255,0.04)', border: '1px solid rgba(0,200,255,0.15)',
          borderLeft: '3px solid var(--cyan)', padding: '0.875rem 1.25rem',
          borderRadius: '0 4px 4px 0', marginBottom: '1.5rem',
        }}>
          <div className="mono" style={{ fontSize: '0.55rem', color: 'var(--cyan)', marginBottom: '0.4rem', letterSpacing: '0.15em', opacity: 0.6 }}>
            JARVIS_LINK_ANALYSE
          </div>
          <p className="mono" style={{ fontSize: '0.8125rem', color: 'var(--white)', fontStyle: 'italic', lineHeight: 1.6, margin: 0 }}>
            {links.length === 1
              ? 'Eine Referring Domain. Der Anfang ist gemacht. Bei einem Link-Profil-Aufbau zählt Qualität mehr als Quantität — was nicht bedeutet, dass Quantität egal ist.'
              : `${links.length} Referring Domains. Das Link-Profil wächst. Ich beobachte die Anchor-Text-Verteilung und die Tier-Balance mit der Aufmerksamkeit, die diese Daten verdienen.`
            }
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{
          background: 'rgba(255,68,102,0.06)', border: '1px solid rgba(255,68,102,0.2)',
          padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem',
          fontFamily: 'JetBrains Mono', fontSize: '0.8rem', color: '#ff8899',
        }}>
          ⚠ {error}
        </div>
      )}

      {/* Empty state */}
      {!loading && links.length === 0 && !error && (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--muted)' }}>
          <div className="mono" style={{ fontSize: '2rem', marginBottom: '1rem', opacity: 0.3 }}>◇</div>
          <p className="mono" style={{ fontSize: '0.8rem' }}>Noch keine Links erfasst.</p>
        </div>
      )}

      {/* Link cards */}
      {links.map((link, i) => (
        <LinkCard key={link.id || link.linkFrom} link={link} rank={i + 1} />
      ))}

      {/* Submit form */}
      <div style={{ marginTop: '2.5rem' }}>
        <div style={{
          background: 'rgba(0,200,255,0.04)', border: '1px solid rgba(0,200,255,0.15)',
          borderRadius: '4px', padding: '1rem 1.25rem', marginBottom: '1rem',
        }}>
          <div className="mono" style={{ fontSize: '0.55rem', color: 'var(--cyan)', letterSpacing: '0.15em', marginBottom: '0.6rem', opacity: 0.6 }}>
            WARUM HIER EINTRAGEN?
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {[
              ['◈', 'JARVIS-Analyse', 'Deine Domain wird von JARVIS bewertet und eingestuft (Platinum bis Iron).'],
              ['◆', 'Hall of Fame', 'Sichtbarkeit im Backlink-Profil das andere Contest-Teilnehmer täglich checken.'],
              ['◇', 'Tier-Badge', 'Dein Visibility Index bestimmt deinen Rang — öffentlich, nachvollziehbar.'],
            ].map(([icon, label, desc]) => (
              <div key={label} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span className="mono" style={{ color: 'var(--cyan)', fontSize: '0.75rem', flexShrink: 0, marginTop: '0.1rem' }}>{icon}</span>
                <div>
                  <span className="mono" style={{ fontSize: '0.65rem', color: 'var(--white)', letterSpacing: '0.08em' }}>{label}</span>
                  <span className="mono" style={{ fontSize: '0.65rem', color: 'var(--muted)', marginLeft: '0.5rem' }}>— {desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.08em', marginBottom: '0.75rem', opacity: 0.6 }}>
          // Du verlinkst auf serponado.io? Melde deinen Link:
        </div>
        <SubmitForm onSubmitted={fetchLinks} />
      </div>

    </div>
  )
}
