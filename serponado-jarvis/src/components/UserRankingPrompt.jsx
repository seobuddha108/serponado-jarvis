import { useState, useEffect } from 'react'

export default function UserRankingPrompt() {
  const [visible, setVisible] = useState(false)
  const [url, setUrl] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!localStorage.getItem('serponado_ranking_submitted')) {
      setTimeout(() => setVisible(true), 1500)
    }
  }, [])

  const submit = async () => {
    setError('')
    try {
      new URL(url.trim())
    } catch {
      setError('Bitte eine gültige URL eingeben.')
      return
    }

    try {
      await fetch('/api/submit-ranking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      })
    } catch {}

    localStorage.setItem('serponado_ranking_submitted', '1')
    setSubmitted(true)
    setTimeout(() => setVisible(false), 1800)
  }

  const dismiss = () => {
    localStorage.setItem('serponado_ranking_submitted', '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(5,8,16,0.85)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem',
    }}>
      <div style={{
        background: 'var(--surface)', border: '1px solid rgba(0,200,255,0.3)',
        borderRadius: '6px', padding: '2rem', maxWidth: '480px', width: '100%',
        boxShadow: '0 8px 48px rgba(0,0,0,0.6)',
      }}>
        <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--cyan)', letterSpacing: '0.2em', marginBottom: '1rem', opacity: 0.6 }}>
          JARVIS_DATEN_INPUT
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✓</div>
            <p className="mono" style={{ color: 'var(--green)', fontSize: '0.9rem' }}>Danke! Dein Ergebnis wurde gespeichert.</p>
          </div>
        ) : (
          <>
            <h2 style={{ fontFamily: 'JetBrains Mono', fontSize: '1.1rem', color: 'var(--white)', marginBottom: '0.75rem', fontWeight: 600 }}>
              Was steht bei dir auf Platz 1?
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'rgba(240,244,255,0.6)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
              Suche kurz nach <strong style={{ color: 'var(--cyan)' }}>serponado</strong> bei Google und kopiere die URL des ersten organischen Ergebnisses hierher. Das hilft uns, die Teilnehmer-Analyse zu verbessern.
            </p>

            <input
              type="url"
              placeholder="https://..."
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submit()}
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'rgba(0,200,255,0.05)', border: '1px solid rgba(0,200,255,0.25)',
                borderRadius: '4px', padding: '0.625rem 0.875rem',
                color: 'var(--white)', fontFamily: 'JetBrains Mono', fontSize: '0.8rem',
                outline: 'none', marginBottom: error ? '0.5rem' : '1.25rem',
              }}
            />
            {error && (
              <p style={{ fontSize: '0.75rem', color: 'var(--red)', marginBottom: '1rem' }}>{error}</p>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button onClick={dismiss} style={{
                background: 'transparent', border: '1px solid var(--border)',
                color: 'var(--muted)', padding: '0.5rem 1rem', borderRadius: '3px',
                cursor: 'pointer', fontFamily: 'JetBrains Mono', fontSize: '0.7rem',
              }}>
                Überspringen
              </button>
              <button onClick={submit} style={{
                background: 'rgba(0,200,255,0.12)', border: '1px solid rgba(0,200,255,0.4)',
                color: 'var(--cyan)', padding: '0.5rem 1.25rem', borderRadius: '3px',
                cursor: 'pointer', fontFamily: 'JetBrains Mono', fontSize: '0.7rem', letterSpacing: '0.1em',
              }}>
                ✓ SENDEN
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
