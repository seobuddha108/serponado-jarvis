import { useState, useRef, useEffect } from 'react'

const JARVIS_INTRO = `Guten Tag. Ich bin JARVIS.

Ich beobachte den SEO-Contest 2026 seit seinem Beginn. Das Keyword lautet Serponado. Ich habe alle teilnehmenden Seiten analysiert, die Rankings verfolgt und einige bemerkenswerte Schlussfolgerungen gezogen.

Sie dürfen mich etwas fragen. Ich antworte ehrlich — was gelegentlich unbequem sein kann.`

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: JARVIS_INTRO, ts: new Date() }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')

    const userMsg = { role: 'user', content: text, ts: new Date() }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.response, ts: new Date() }])
    } catch (e) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Fehler: ${e.message}. API Key konfiguriert?`,
        ts: new Date()
      }])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const quickQuestions = [
    'Wer führt aktuell die Rankings an?',
    'Was hältst du von menschlichem SEO?',
    'Wer wird den Contest gewinnen?',
    'Bedroht KI SEO-Jobs?',
  ]

  return (
    <div style={{ paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>

      <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--cyan)', letterSpacing: '0.2em', opacity: 0.7, marginBottom: '1.5rem' }}>
        // JARVIS · INTERAKTIVES PROTOKOLL · SERPONADO CONTEST 2026
      </div>

      {/* MESSAGES */}
      <div style={{
        flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem',
        paddingRight: '0.5rem', marginBottom: '1rem',
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: 'flex',
            flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
            gap: '0.75rem', alignItems: 'flex-start',
          }}>
            {/* AVATAR */}
            <div style={{
              width: '32px', height: '32px', borderRadius: '3px', flexShrink: 0,
              background: msg.role === 'assistant' ? 'rgba(0,200,255,0.1)' : 'rgba(200,169,110,0.1)',
              border: `1px solid ${msg.role === 'assistant' ? 'var(--border-bright)' : 'rgba(200,169,110,0.3)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'JetBrains Mono', fontSize: '0.6rem', letterSpacing: '0.05em',
              color: msg.role === 'assistant' ? 'var(--cyan)' : 'var(--gold)',
            }}>
              {msg.role === 'assistant' ? 'AI' : 'DU'}
            </div>

            {/* BUBBLE */}
            <div style={{
              maxWidth: '75%',
              background: msg.role === 'assistant' ? 'var(--surface)' : 'rgba(200,169,110,0.06)',
              border: `1px solid ${msg.role === 'assistant' ? 'var(--border)' : 'rgba(200,169,110,0.15)'}`,
              borderRadius: '4px', padding: '1rem 1.25rem',
            }}>
              <pre style={{
                fontFamily: msg.role === 'assistant' ? 'JetBrains Mono' : 'Inter',
                fontSize: '0.875rem', color: 'rgba(240,244,255,0.85)',
                lineHeight: 1.7, whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0,
              }}>{msg.content}</pre>
              <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)', marginTop: '0.5rem' }}>
                {msg.ts.toLocaleTimeString('de-DE')}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '3px',
              background: 'rgba(0,200,255,0.1)', border: '1px solid var(--border-bright)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: 'var(--cyan)',
            }}>AI</div>
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '4px', padding: '1rem 1.25rem',
            }}>
              <span className="mono" style={{ fontSize: '0.875rem', color: 'var(--cyan)' }}>
                JARVIS analysiert
                <span style={{ animation: 'none' }}> ...</span>
              </span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* QUICK QUESTIONS */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
        {quickQuestions.map(q => (
          <button key={q} onClick={() => { setInput(q); inputRef.current?.focus() }} style={{
            background: 'transparent', border: '1px solid var(--border)',
            color: 'var(--muted)', padding: '0.35rem 0.75rem', borderRadius: '2px',
            cursor: 'pointer', fontFamily: 'JetBrains Mono', fontSize: '0.65rem',
            letterSpacing: '0.04em', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.target.style.borderColor = 'var(--border-bright)'; e.target.style.color = 'var(--cyan)' }}
          onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--muted)' }}
          >{q}</button>
        ))}
      </div>

      {/* INPUT */}
      <div style={{
        display: 'flex', gap: '0.75rem',
        background: 'var(--surface)', border: '1px solid var(--border-bright)',
        borderRadius: '4px', padding: '0.75rem 1rem', alignItems: 'center',
      }}>
        <span className="mono" style={{ color: 'var(--cyan)', fontSize: '0.875rem', opacity: 0.6, flexShrink: 0 }}>{'>'}</span>
        <textarea
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Stelle JARVIS eine Frage..."
          rows={1}
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: 'var(--white)', fontFamily: 'JetBrains Mono', fontSize: '0.875rem',
            resize: 'none', lineHeight: 1.5,
            '::placeholder': { color: 'var(--muted)' },
          }}
        />
        <button onClick={send} disabled={loading || !input.trim()} style={{
          background: 'var(--cyan)', color: 'var(--bg)', border: 'none',
          padding: '0.4rem 0.875rem', borderRadius: '3px', cursor: 'pointer',
          fontFamily: 'JetBrains Mono', fontSize: '0.7rem', fontWeight: 700,
          letterSpacing: '0.08em', opacity: loading || !input.trim() ? 0.4 : 1,
          transition: 'opacity 0.2s', flexShrink: 0,
        }}>
          SEND
        </button>
      </div>
      <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)', marginTop: '0.4rem', textAlign: 'right' }}>
        Enter zum Senden · Shift+Enter für Zeilenumbruch
      </div>

    </div>
  )
}
