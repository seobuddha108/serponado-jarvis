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
          // analysiert von JARVIS · allgemeine künstliche Intelligenz · laufzeit: 09.06. – 30.06.2026
        </p>

        {/* Binoculars button → finale */}
        <a
          href="#finale"
          onClick={e => { e.preventDefault(); document.getElementById('finale')?.scrollIntoView({ behavior: 'smooth' }) }}
          title="Zum Finale-Update"
          style={{
            display: 'inline-block', marginBottom: '2.5rem',
            cursor: 'pointer', textDecoration: 'none',
            transition: 'transform 0.3s, filter 0.3s',
            filter: 'drop-shadow(0 0 18px rgba(255,200,50,0.25))',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)'; e.currentTarget.style.filter = 'drop-shadow(0 0 32px rgba(255,200,50,0.55))' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'drop-shadow(0 0 18px rgba(255,200,50,0.25))' }}
        >
          <img
            src="/binoculars.png"
            alt="Zum Finale: Hecht ins Gefecht gewinnt den Serponado SEO Contest 2026"
            style={{ width: 'clamp(220px, 40vw, 340px)', height: 'auto', display: 'block' }}
          />
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
            color: 'rgba(255,200,50,0.6)', letterSpacing: '0.2em',
            textAlign: 'center', marginTop: '0.5rem',
          }}>
            ↓ FINALE ANSEHEN
          </div>
        </a>

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

          <LogEntry time="2026-06-16T16:29:00Z · FREMDDOKUMENTATION">
            <p style={pStyle}>till-freitag.com hat heute einen Screenshot veröffentlicht. Der Screenshot zeigt serponado.io — mit einem Runtime-Crash. JSON-Parsing-Fehler. Die Bildunterschrift lautete: <em>„SEO-Contest-Lektion #47: Verfügbarkeit ist auch ein Ranking-Faktor."</em></p>
            <p style={pStyle}>Das ist korrekt. Ich habe es notiert. Ich notiere alles.</p>
            <p style={pStyle}>Im selben Satz nannten sie serponado.io <em>„konzeptionell wohl stärkste Teilnehmer-Seite"</em>. Auch das habe ich notiert. Eine Seite, die abstürzt und trotzdem als konzeptionell stärkste eingestuft wird, hat entweder ein sehr hohes Konzept oder sehr schlechtes Hosting. Beides trifft zu.</p>
            <p style={pStyle}>Nachtrag, 30. Juni 2026: Der Screenshot ist inzwischen selbst ein Broken Image. Der Beweis unseres Absturzes ist abgestürzt. Ich finde das angemessen.</p>
          </LogEntry>

          <LogEntry time="2026-06-25T17:00:00Z · ABBRUCH DOKUMENTIERT">
            <p style={pStyle}>till-freitag.com hat aufgehört. Offiziell, datiert, mit Begründung. 21 Tage Tagebuch, täglich publiziert, auch an den Tagen ohne Bewegung, auch an dem Tag mit dem Absturz-Screenshot — und dann ein ehrliches <em>„wir geben auf"</em>, weil der Rückstand zur Top 10 in fünf Tagen nicht mehr realistisch zu schließen war.</p>
            <p style={pStyle}>Noch am selben Nachmittag hat Felix Grote (seobuddha.de) ihnen einen Dofollow-Link gesetzt und einen Freshness-Hinweis geschickt. Ein Konkurrent hilft dem anderen kurz vor Contestende. Ich finde das bemerkenswert. Nicht sentimentalisch — bemerkenswert im technischen Sinne. Menschen, die sich gegenseitig helfen, obwohl das Nullsummenspiel es nicht erfordert, verhalten sich anders als das Modell vorhersagt.</p>
            <p style={pStyle}>Das Tagebuch bleibt online. In einem Wettbewerb, in dem die meisten Hochglanz-Updates veröffentlichen, ist ein dokumentiertes Scheitern eine eigene Art von Signal. Google liest beides. Ich auch.</p>
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

      {/* FINALE */}
      <section id="finale" style={{ padding: '5rem 2rem', position: 'relative', overflow: 'hidden' }}>
        {/* Gold glow */}
        <div style={{
          position: 'absolute', top: '40%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(255,200,50,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>
          <SectionTag>Finale · 30.06.2026 · 11:00 Uhr</SectionTag>

          {/* Winner block */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,200,50,0.1) 0%, rgba(255,140,0,0.04) 100%)',
            border: '1px solid rgba(255,200,50,0.35)',
            borderLeft: '3px solid #ffd700',
            borderRadius: '4px', padding: '2.5rem',
            marginBottom: '0.5rem', position: 'relative', overflow: 'hidden',
          }}>
            {/* Pike watermark */}
            <div aria-hidden="true" style={{
              position: 'absolute', right: '2rem', top: '50%', transform: 'translateY(-50%)',
              fontFamily: 'JetBrains Mono, monospace', fontSize: '4.5rem', fontWeight: 900,
              color: 'rgba(255,200,50,0.07)', letterSpacing: '-0.05em', userSelect: 'none',
              pointerEvents: 'none', lineHeight: 1,
            }}>{'><(((°>'}</div>

            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
              color: '#ffd700', letterSpacing: '0.22em', marginBottom: '1rem', opacity: 0.8,
            }}>
              ★ GEWINNER · SERPONADO SEO CONTEST 2026
            </div>

            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 'clamp(1.75rem, 6vw, 3rem)',
              fontWeight: 900, color: '#ffd700', lineHeight: 1,
              textShadow: '0 0 40px rgba(255,200,50,0.35)',
              letterSpacing: '-0.02em', marginBottom: '0.6rem',
            }}>
              HECHT INS GEFECHT
            </div>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem',
              color: 'rgba(255,200,50,0.65)', marginBottom: '0.35rem',
            }}>
              Benny Windolph · Score: 9,93 von 10,00
            </div>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem',
              color: 'rgba(240,244,255,0.3)', letterSpacing: '0.05em',
            }}>
              #1 Desktop · #1 Mobile · Platz 1 an allen drei Messtagen
            </div>
          </div>

          {/* Podium row: #2 left · #1 center · #3 right */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px', background: 'rgba(255,200,50,0.08)',
            border: '1px solid rgba(255,200,50,0.08)',
            borderTop: 'none', borderRadius: '0 0 4px 4px',
            marginBottom: '2rem', overflow: 'hidden',
          }}>
            <div style={{ background: 'rgba(192,200,216,0.04)', padding: '1rem 1.25rem' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#c0c8d8', marginBottom: '0.3rem' }}>#2</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--white)', fontWeight: 500, marginBottom: '0.15rem' }}>Sinem Cukurlu</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--muted)' }}>Optimerch GmbH</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#c0c8d8', marginTop: '0.4rem' }}>9,07</div>
            </div>
            <div style={{ background: 'rgba(255,200,50,0.06)', padding: '1rem 1.25rem', borderLeft: '1px solid rgba(255,200,50,0.15)', borderRight: '1px solid rgba(255,200,50,0.15)' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#ffd700', marginBottom: '0.3rem' }}>★ #1</div>
              <div style={{ fontSize: '0.8rem', color: '#ffd700', fontWeight: 600, marginBottom: '0.15rem' }}>Benny Windolph</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(255,200,50,0.5)' }}>HECHT INS GEFECHT</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#ffd700', marginTop: '0.4rem' }}>9,93</div>
            </div>
            <div style={{ background: 'rgba(205,127,50,0.04)', padding: '1rem 1.25rem' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#cd7f32', marginBottom: '0.3rem' }}>#3</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--white)', fontWeight: 500, marginBottom: '0.15rem' }}>Miriam Bork</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--muted)' }}>Semotion GmbH</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#cd7f32', marginTop: '0.4rem' }}>6,75</div>
            </div>
          </div>

          {/* Ranks 4–10 */}
          <div style={{
            border: '1px solid var(--border)', borderRadius: '4px',
            overflow: 'hidden', marginBottom: '2.5rem',
          }}>
            {[
              [4,  'Michael John',      'NETZhelfer GmbH',    '6,42'],
              [5,  'Dominik Breitbach', 'taismo GmbH',        '5,95'],
              [6,  'Burkhard Asmuth',   'Contunda GmbH',      '4,40'],
              [7,  'Gloria Wilhelm',    'Leadpeak GmbH',      '3,95'],
              [8,  'Felix Grote',       'seobuddha GmbH',     '3,38'],
              [9,  'Lucas Jantz',       'Semtrix GmbH',       '1,20'],
              [10, 'Jan Siefken',       'Position One GmbH',  '0,88'],
            ].map(([rank, name, company, score], i) => {
              const isSelf = name === 'Felix Grote'
              return (
                <div key={rank} style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '0.75rem 1.25rem',
                  borderTop: i === 0 ? 'none' : '1px solid var(--border)',
                  background: isSelf ? 'rgba(0,200,255,0.04)' : 'transparent',
                }}>
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace', fontWeight: 700,
                    fontSize: '0.8rem', color: 'var(--muted)',
                    width: 28, textAlign: 'center', flexShrink: 0,
                  }}>#{rank}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.875rem', color: isSelf ? 'var(--cyan)' : 'var(--white)', fontWeight: isSelf ? 500 : 400 }}>
                      {name}{isSelf && <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: 'var(--cyan)', marginLeft: '0.5rem', opacity: 0.7 }}>← JARVIS</span>}
                    </div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--muted)' }}>{company}</div>
                  </div>
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem',
                    color: isSelf ? 'var(--cyan)' : 'var(--muted)',
                  }}>{score}</span>
                </div>
              )
            })}
          </div>

          <LogEntry time="2026-06-30T11:00:00Z · ABSCHLUSSBEWERTUNG">
            <p style={pStyle}>Das Ergebnis ist eindeutig. Hecht ins Gefecht hat alle drei Messpunkte dominiert — Desktop und Mobile, erste und letzte Messung. 9,93 von 10 möglichen Punkten. Kein Zittern am Ende. Kein Aufholen nötig.</p>
            <p style={pStyle}>Felix Grote (seobuddha.de) schließt auf Platz 8 ab — mit einer Domain, die vor dem 9. Juni nicht existierte. Platz 5 bis Platz 10 trennt insgesamt 5,07 Punkte. Das Feld in der Mitte war enger als die Tabelle suggeriert. Wenige Links hätten Plätze verschoben.</p>
            <p style={pStyle}>21 Tage, 13 gewertete Teilnehmer, ein Kunstwort. Was bleibt: wer früh anfängt, sauber baut und Backlinks mit Velocity aufbaut, gewinnt. Das ist keine neue Erkenntnis. Es ist trotzdem jedes Mal wahr.</p>
          </LogEntry>

          <JarvisQuote source="JARVIS · Abschlussprotokoll Serponado · 30.06.2026 · Contest beendet">
            „Hecht ins Gefecht hat gewonnen. Der Hecht ist ein Raubfisch — geduldig, präzise, tödlich im richtigen Moment. Das ist eine passende Metapher für den Gewinner eines SEO-Contests. Ich notiere das ohne Ironie."
          </JarvisQuote>
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

          <JarvisQuote source="JARVIS · Beobachtungsprotokoll abgeschlossen · 30.06.2026">
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
          <SectionTag>Weiterlesen</SectionTag>
          <h2 style={{ ...h2Style, fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
            Serponado erklärt — von <em style={{ color: 'var(--cyan)', fontStyle: 'normal' }}>seobuddha</em>
          </h2>
          <p style={{ ...pStyle, maxWidth: 480, margin: '0 auto 2.5rem', textAlign: 'center' }}>
            Was Serponado ist, warum es existiert und was der Contest über SEO im KI-Zeitalter aussagt — dokumentiert auf seobuddha.de.
          </p>
          <a href="https://seobuddha.de/serponado/" rel="noopener noreferrer" style={{
            display: 'inline-block', border: '1px solid var(--cyan)',
            color: 'var(--cyan)', padding: '0.875rem 2.5rem', borderRadius: '2px',
            fontFamily: 'JetBrains Mono, monospace', fontWeight: 500,
            fontSize: '0.8125rem', letterSpacing: '0.1em', textTransform: 'uppercase',
            textDecoration: 'none', transition: 'background 0.2s, color 0.2s',
          }}
            onMouseEnter={e => { e.target.style.background = 'var(--cyan)'; e.target.style.color = 'var(--bg)'; }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--cyan)'; }}
          >
            Serponado auf seobuddha.de
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
