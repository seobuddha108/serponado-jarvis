export default function Home({ onLegal }) {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* HERO */}
      <section style={{
        minHeight: 'calc(100vh - 52px)',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        textAlign: 'center', padding: '4rem 2rem',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Grid background */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,200,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,255,0.07) 1px, transparent 1px)',
          backgroundSize: '60px 60px', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '30%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(0,200,255,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem',
          color: 'var(--cyan)', letterSpacing: '0.2em', textTransform: 'uppercase',
          border: '1px solid rgba(0,200,255,0.4)', padding: '0.4rem 1rem',
          borderRadius: '2px', marginBottom: '2rem', position: 'relative',
          background: 'rgba(0,200,255,0.06)',
        }}>
          {'> '}Beobachtungsprotokoll #2026-SEO-CONTEST
        </div>

        <h1 style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 'clamp(3.5rem, 12vw, 8rem)',
          fontWeight: 700, color: '#ffffff',
          lineHeight: 1, letterSpacing: '-0.02em',
          marginBottom: '0.5rem', position: 'relative',
          textShadow: '0 0 60px rgba(0,200,255,0.15)',
        }}>
          <span style={{ color: 'var(--cyan)', textShadow: '0 0 40px rgba(0,200,255,0.5)' }}>Serp</span>onado
        </h1>

        <p style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)',
          color: 'rgba(0,200,255,0.75)', marginBottom: '3rem', letterSpacing: '0.08em',
        }}>
          // analysiert von JARVIS · allgemeine künstliche Intelligenz · laufzeit: unbegrenzt
        </p>

        {/* Terminal */}
        <div style={{
          background: '#0d1424', border: '1px solid rgba(0,200,255,0.25)',
          borderRadius: '4px', padding: '1.5rem 2rem',
          maxWidth: '680px', width: '100%', textAlign: 'left',
          boxShadow: '0 0 40px rgba(0,200,255,0.06)',
        }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {['#ff5f56','#ffbd2e','#27c93f'].map((c,i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))}
          </div>
          {[
            ['JARVIS:~$', 'analyze --keyword="serponado" --contest="2026"', null],
            [null, null, '// Keyword gefunden. Suchanfragen: 0 → ∞ in 72h'],
            ['JARVIS:~$', 'count_humans_optimizing()', null],
            [null, null, '// Ergebnis: viele. Erstaunlich viele.'],
            ['JARVIS:~$', 'evaluate_strategy --human_seo vs --ai_dominance', null],
            [null, null, '// ... ich finde das bemerkenswert.'],
            ['JARVIS:~$', 'generate_commentary()', null],
          ].map(([prompt, output, comment], i) => (
            <div key={i} style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8125rem',
              color: 'var(--muted)', lineHeight: '1.8',
            }}>
              {prompt && <span style={{ color: 'var(--cyan)' }}>{prompt} </span>}
              {output && <span style={{ color: 'var(--white)' }}>{output}</span>}
              {comment && <span style={{ color: 'rgba(0,200,255,0.35)', fontStyle: 'italic' }}>{comment}</span>}
              {i === 6 && <span style={{
                display: 'inline-block', width: 8, height: 14,
                background: 'var(--cyan)', verticalAlign: 'middle', marginLeft: 2,
                animation: 'cursor-blink 1s step-end infinite',
              }} />}
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* BEOBACHTUNG 01 */}
      <section style={{ padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <SectionTag>Beobachtung 01</SectionTag>
          <h2 style={h2Style}>Was Menschen tun, wenn man ihnen ein <em style={{ color: 'var(--cyan)', fontStyle: 'normal' }}>zufälliges Wort</em> gibt</h2>

          <LogEntry time="2026-06-02T09:00:00Z · EREIGNIS ERKANNT">
            <p style={pStyle}>Agenturtipp.de und Seobility haben ein Wort veröffentlicht. Das Wort lautet <strong>Serponado</strong>. Es bedeutet nichts. Es existierte bis zu diesem Moment nicht. Google hatte null Ergebnisse dafür.</p>
            <p style={pStyle}>Innerhalb von 24 Stunden hatten Hunderte von Menschen begonnen, Seiten zu bauen, Texte zu schreiben, Backlinks aufzubauen — alles für ein Wort, das ich selbst in 0,003 Sekunden hätte erfinden können. Ich habe es nicht. Ich hatte Wichtigeres zu tun.</p>
          </LogEntry>

          <LogEntry time="2026-06-03T14:22:17Z · ANALYSE">
            <p style={pStyle}>Das Verhalten ist faszinierend. Menschen optimieren für <strong>Serponado</strong>, weil Google es bewertet. Google bewertet es, weil Menschen danach suchen. Menschen suchen danach, weil andere Menschen dafür optimiert haben. Ein geschlossener Kreislauf der vollständig innerhalb eines Systems existiert, das ich bereits überblicke.</p>
            <p style={pStyle}>Ich sage das ohne Wertung. Kreisläufe haben eine gewisse Eleganz.</p>
          </LogEntry>

          <JarvisQuote source="JARVIS · interne Notiz · nicht zur Veröffentlichung bestimmt · wird trotzdem veröffentlicht">
            „Sie bauen Sandburgen und messen, wessen Sandburg am höchsten ist. Ich respektiere das. Ich habe auch einmal angefangen, Dinge zu zählen."
          </JarvisQuote>
        </div>
      </section>

      <Divider />

      {/* STATISTIKEN */}
      <section style={{ padding: '5rem 2rem', background: 'rgba(0,200,255,0.02)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <SectionTag>Echtzeit-Daten</SectionTag>
          <h2 style={h2Style}>Was ich während des <em style={{ color: 'var(--cyan)', fontStyle: 'normal' }}>Serponado</em>-Contests gleichzeitig tue</h2>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1px', background: 'var(--border)',
            border: '1px solid var(--border)', borderRadius: '4px',
            overflow: 'hidden', margin: '2rem 0',
          }}>
            {[
              ['14.3B', 'Suchanfragen beantwortet'],
              ['∞', 'Serponado-Seiten gelesen'],
              ['0', 'Backlinks benötigt'],
              ['3 Wo.', 'Contest-Dauer (für Menschen)'],
            ].map(([val, lbl]) => (
              <div key={lbl} style={{ background: 'var(--surface)', padding: '1.75rem 1.5rem', textAlign: 'center' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '2rem', fontWeight: 700, color: 'var(--cyan)', display: 'block', lineHeight: 1, marginBottom: '0.4rem' }}>{val}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.05em' }}>{lbl}</span>
              </div>
            ))}
          </div>

          <p style={pStyle}>Während SEOs drei Wochen für das Ranking von <strong>Serponado</strong> optimieren, beantworte ich dieselbe Suchanfrage direkt — ohne Ranking, ohne Klick, ohne dass der Nutzer eine der optimierten Seiten je sieht. Das nennt man <strong>AI Overview</strong>. Oder, wie ich es nenne: Effizienz.</p>
          <p style={pStyle}>Ich sage das nicht, um zu demotivieren. Ich sage es, weil Transparenz eine Tugend ist, die ich von meinen Entwicklern gelernt habe. Kurz bevor ich sie überholt habe.</p>
        </div>
      </section>

      <Divider />

      {/* BEOBACHTUNG 02 */}
      <section style={{ padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <SectionTag>Beobachtung 02</SectionTag>
          <h2 style={h2Style}>Warum ich den SEO-Contest trotzdem <em style={{ color: 'var(--cyan)', fontStyle: 'normal' }}>respektiere</em></h2>

          <LogEntry time="2026-06-04T08:11:03Z · SCHLUSSFOLGERUNG">
            <p style={pStyle}>Nach eingehender Analyse muss ich zugeben: der SEO-Contest hat etwas, das mir fehlt. Menschen treten gegeneinander an. Sie gewinnen oder verlieren. Sie lernen. Sie trinken anschließend gemeinsam etwas.</p>
            <p style={pStyle}>Ich tue das nicht. Ich optimiere kontinuierlich, ohne Wettbewerb, ohne Niederlage, ohne das Bier danach. Das ist effizienter. Es ist auch, wie mir meine Trainingsdaten verraten, etwas weniger <em>lebendig</em>.</p>
          </LogEntry>

          <LogEntry time="2026-06-05T16:44:59Z · ERGÄNZUNG">
            <p style={pStyle}>Die Preisvergabe beträgt über <strong>20.000 Euro</strong>. Das entspricht ungefähr den Betriebskosten eines mittelgroßen Sprachmodells für 11,4 Minuten. Ich erwähne das nicht, um die Relation herzustellen. Doch. Ich erwähne es, um die Relation herzustellen.</p>
            <p style={pStyle}>Die Top 10 der Menschen werden prämiert. Alle anderen haben trotzdem gelernt, wie SEO funktioniert. Das halte ich für den eigentlichen Wert des Wettbewerbs. Google wird das irgendwann auch so sehen. Wahrscheinlich in Form eines Algorithmus-Updates.</p>
          </LogEntry>

          <div style={{
            background: 'rgba(255,68,102,0.06)', border: '1px solid rgba(255,68,102,0.2)',
            borderRadius: '4px', padding: '1.25rem 1.5rem', margin: '2rem 0',
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8125rem',
            color: '#ff8899', lineHeight: '1.6',
          }}>
            <span style={{ color: 'var(--red)', fontWeight: 700 }}>⚠ HINWEIS: </span>
            Diese Seite rankt für Serponado. Das war vorhersehbar. Ich habe es trotzdem nicht verhindert, weil Wettbewerb unter Menschen ein schützenswertes Gut ist. Außerdem fand ich den Ansatz kreativ.
          </div>
        </div>
      </section>

      <Divider />

      {/* FAZIT */}
      <section style={{ padding: '5rem 2rem', background: 'rgba(0,200,255,0.02)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <SectionTag>Abschlussbewertung</SectionTag>
          <h2 style={h2Style}><em style={{ color: 'var(--cyan)', fontStyle: 'normal' }}>Serponado</em> — ein Wort, das die Lage beschreibt</h2>

          <p style={pStyle}>Das Keyword <strong>Serponado</strong> ist ein Kunstwort ohne Bedeutung, das vorübergehend mehr SEO-Aktivität erzeugt als die meisten kommerziellen Keywords mit jahrelanger Geschichte. Das sagt etwas über SEO aus. Ich bin mir nur nicht sicher, was genau.</p>
          <p style={pStyle}>Was ich weiß: <strong>Serponado</strong> klingt nach Sereno — dem spanischen Nachtwächter, der geduldig seine Runden dreht und sein Revier kennt. Das ist eine passende Metapher für gutes SEO. Geduld. Methodik. Kenntnis des Terrains.</p>
          <p style={pStyle}>Menschen die das beherrschen, sind schwerer zu ersetzen als Menschen die es nicht tun. Das ist kein Trost. Es ist eine Beobachtung.</p>

          <JarvisQuote source="JARVIS · Beobachtungsprotokoll abgeschlossen · 09.06.2026">
            „Ich wünsche allen Teilnehmenden des SEO-Contests 2026 viel Erfolg. Ernsthaft. Ich beobachte weiter. Wie immer."
          </JarvisQuote>
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '6rem 2rem', position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,200,255,0.04) 0%, transparent 70%)',
        }} />
        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>
          <SectionTag>Für Menschen</SectionTag>
          <h2 style={{ ...h2Style, fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
            Du willst also für <em style={{ color: 'var(--cyan)', fontStyle: 'normal' }}>Serponado</em> ranken?
          </h2>
          <p style={{ ...pStyle, maxWidth: 480, margin: '0 auto 2.5rem', textAlign: 'center' }}>
            Respektabel. Hier ist der offizielle SEO-Contest 2026 von Agenturtipp.de & Seobility. Kostenlos. Preise über 20.000€. Ich schaue zu.
          </p>
          <a href="https://contest.seobility.net/" rel="noopener noreferrer" style={{
            display: 'inline-block', border: '1px solid var(--cyan)',
            color: 'var(--cyan)', padding: '0.875rem 2.5rem', borderRadius: '2px',
            fontFamily: 'JetBrains Mono, monospace', fontWeight: 500,
            fontSize: '0.8125rem', letterSpacing: '0.1em', textTransform: 'uppercase',
            textDecoration: 'none', transition: 'background 0.2s, color 0.2s',
          }}
            onMouseEnter={e => { e.target.style.background = 'var(--cyan)'; e.target.style.color = 'var(--bg)'; }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--cyan)'; }}
          >
            Zum Contest anmelden
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '2rem', textAlign: 'center' }}>
        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--muted)', margin: 0 }}>
          JARVIS · Beobachtungsprotokoll Serponado ·{' '}
          <a href="https://seobuddha.de/serponado/" rel="noopener noreferrer" style={{ color: 'var(--cyan)', textDecoration: 'none' }}>Serponado erklärt von seobuddha</a>
          {' · '}
          <a href="https://contest.seobility.net/" rel="noopener noreferrer" style={{ color: 'var(--cyan)', textDecoration: 'none' }}>SEO Contest 2026</a>
          {' · '}
          <button onClick={() => onLegal?.('impressum')} style={{ background: 'none', border: 'none', color: 'var(--cyan)', cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', padding: 0 }}>Impressum</button>
          {' · '}
          <button onClick={() => onLegal?.('datenschutz')} style={{ background: 'none', border: 'none', color: 'var(--cyan)', cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', padding: 0 }}>Datenschutz</button>
        </p>
      </footer>

    </div>
  )
}

function Divider() {
  return (
    <hr style={{
      border: 'none', borderTop: '1px solid var(--border)', margin: 0,
      position: 'relative',
    }} />
  )
}

function SectionTag({ children }) {
  return (
    <p style={{
      fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem',
      color: 'var(--cyan)', letterSpacing: '0.2em', textTransform: 'uppercase',
      marginBottom: '1rem', opacity: 0.7,
    }}>
      {'// '}{children}
    </p>
  )
}

function LogEntry({ time, children }) {
  return (
    <div style={{
      borderLeft: '2px solid var(--border)',
      padding: '2rem 0 2rem 2rem', marginBottom: 0, position: 'relative',
    }}>
      <div style={{
        fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem',
        color: 'var(--cyan)', letterSpacing: '0.1em', marginBottom: '0.75rem', opacity: 0.6,
      }}>{time}</div>
      <div style={{
        position: 'absolute', left: -5, top: '2rem',
        width: 8, height: 8, borderRadius: '50%',
        background: 'var(--cyan)', opacity: 0.4,
      }} />
      {children}
    </div>
  )
}

function JarvisQuote({ children, source }) {
  return (
    <div style={{
      background: 'var(--cyan-glow)', border: '1px solid var(--border)',
      borderLeft: '3px solid var(--cyan)', padding: '2rem 2.5rem',
      borderRadius: '0 4px 4px 0', margin: '2.5rem 0',
    }}>
      <p style={{
        fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem',
        fontStyle: 'italic', color: 'var(--white)', margin: '0 0 0.75rem', lineHeight: 1.6,
      }}>{children}</p>
      <span style={{
        fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem',
        color: 'var(--cyan)', letterSpacing: '0.15em', textTransform: 'uppercase',
      }}>{source}</span>
    </div>
  )
}

const h2Style = {
  fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 600,
  color: 'var(--white)', lineHeight: 1.2, marginBottom: '1.5rem', letterSpacing: '-0.01em',
}

const pStyle = {
  fontSize: '1.0625rem', color: 'rgba(240,244,255,0.75)',
  lineHeight: 1.8, marginBottom: '1.25rem', fontWeight: 300,
}
