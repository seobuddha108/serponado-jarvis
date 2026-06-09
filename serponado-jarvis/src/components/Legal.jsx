export default function Legal({ page }) {
  if (page === 'impressum') return <Impressum />
  return <Datenschutz />
}

function Impressum() {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '4rem 2rem' }}>
      <SectionTag>Rechtliches</SectionTag>
      <h1 style={h1Style}>Impressum</h1>

      <Block title="Angaben gemäß § 5 TMG">
        <p style={pStyle}>seobuddha GmbH<br />
        Bahnhofstraße 112<br />
        25451 Quickborn</p>
        <p style={pStyle}>E-Mail: <a href="mailto:info@seobuddha.de" style={linkStyle}>info@seobuddha.de</a><br />
        Tel.: 01705884327</p>
        <p style={pStyle}>Vertreten durch den Geschäftsführer: Felix Grote</p>
      </Block>

      <Block title="Datenschutzbeauftragter">
        <p style={pStyle}>Herr RA Johannes Rauchfuss<br />
        <a href="https://onlinerechthaben.de/" rel="noopener noreferrer" style={linkStyle}>onlinerechthaben.de</a></p>
      </Block>

      <Block title="Haftungshinweis">
        <p style={pStyle}>Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden. Diese Website enthält KI-generierte Inhalte (JARVIS-Kommentare), die keine professionelle SEO-Beratung darstellen.</p>
      </Block>
    </div>
  )
}

function Datenschutz() {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '4rem 2rem' }}>
      <SectionTag>Rechtliches</SectionTag>
      <h1 style={h1Style}>Datenschutzerklärung</h1>

      <Block title="Allgemeine Informationen">
        <p style={pStyle}>Im Folgenden wird über den Umgang mit personenbezogenen Daten informiert. Personenbezogene Daten sind gem. Art. 4 Nr. 1 der Verordnung (EU) 2016/679 (nachfolgend: »DSGVO«) alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen. Personenbezogene Daten werden unter Beachtung der einschlägigen Vorschriften der nationalen Datenschutzgesetze sowie der DSGVO gespeichert und verarbeitet.</p>
        <p style={pStyle}>Soweit bei einer einzelnen Datenverarbeitung keine konkrete Speicherdauer genannt wurde, erfolgt die Bearbeitung bis der Zweck entfällt.</p>
      </Block>

      <Block title="Verantwortliche">
        <p style={pStyle}>seobuddha GmbH<br />
        Bahnhofstraße 112<br />
        25451 Quickborn<br /><br />
        E-Mail: <a href="mailto:info@seobuddha.de" style={linkStyle}>info@seobuddha.de</a><br />
        Tel.: 01705884327</p>
        <p style={pStyle}>Die Verantwortliche wird vertreten durch den Geschäftsführer Felix Grote.</p>
        <p style={pStyle}>Es ist ein Datenschutzbeauftragter bestellt. Dessen Kontaktdaten lauten:<br />
        Herr RA Johannes Rauchfuss<br />
        <a href="https://onlinerechthaben.de/" rel="noopener noreferrer" style={linkStyle}>onlinerechthaben.de</a></p>
      </Block>

      <Block title="Besuch der Website">
        <p style={pStyle}>Bei jedem Aufruf dieser Website erfasst das System automatisiert Daten und Informationen des jeweils abrufenden Gerätes: Informationen über den Browsertyp und die verwendete Version, das Betriebssystem, die IP-Adresse sowie Datum und Uhrzeit des Zugriffs.</p>
        <p style={pStyle}>Diese Daten werden in den Logfiles des Systems gespeichert. Eine Speicherung zusammen mit anderen personenbezogenen Daten eines konkreten Nutzers findet nicht statt.</p>
        <p style={pStyle}>Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse). Die Daten werden 60 Tage gespeichert.</p>
        <p style={pStyle}>Die erhobenen Daten werden an:<br /><br />
        <strong>Vercel Inc.</strong><br />
        340 Pine Street, Suite 701<br />
        San Francisco, CA 94104, USA<br /><br />
        als Auftragsverarbeiter weitergegeben (Hosting). Die Übermittlung personenbezogener Daten erfolgt in die USA auf Grundlage von Standardvertragsklauseln gemäß Art. 46 Abs. 2 lit. c DSGVO. Die Datenschutzerklärung von Vercel finden Sie unter <a href="https://vercel.com/legal/privacy-policy" rel="noopener noreferrer" style={linkStyle}>vercel.com/legal/privacy-policy</a>.</p>
      </Block>

      <Block title="Nutzung des KI-Chats (JARVIS)">
        <p style={pStyle}>Diese Website bietet einen interaktiven Chat mit JARVIS an, der auf der KI-Technologie von Anthropic basiert. Bei der Nutzung des Chats werden die eingegebenen Nachrichten zur Verarbeitung an die Anthropic API übertragen.</p>
        <p style={pStyle}>Verarbeitete Daten: Chat-Eingaben des Nutzers, technische Metadaten (IP-Adresse über Rate-Limiting-System).</p>
        <p style={pStyle}>Chat-Verläufe werden nicht dauerhaft gespeichert. Jede Konversation beginnt ohne Kenntnis vorheriger Gespräche. Die Eingaben werden gemäß den Datenschutzrichtlinien von Anthropic verarbeitet und nicht für das Training von KI-Modellen verwendet.</p>
        <p style={pStyle}>Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Bereitstellung des Chat-Dienstes).</p>
        <p style={pStyle}>Die Daten werden übermittelt an:<br /><br />
        <strong>Anthropic, PBC</strong><br />
        548 Market St, PMB 90375<br />
        San Francisco, CA 94104, USA<br /><br />
        Die Übermittlung erfolgt auf Grundlage von Standardvertragsklauseln gemäß Art. 46 Abs. 2 lit. c DSGVO. Die Datenschutzerklärung von Anthropic finden Sie unter <a href="https://www.anthropic.com/privacy" rel="noopener noreferrer" style={linkStyle}>anthropic.com/privacy</a>.</p>
      </Block>

      <Block title="Rate Limiting (Missbrauchsschutz)">
        <p style={pStyle}>Zum Schutz vor missbräuchlicher Nutzung der KI-Funktionen werden IP-Adressen der Nutzer temporär in einem Redis-Datenspeicher gespeichert, um die Anzahl der Anfragen zu begrenzen.</p>
        <p style={pStyle}>Die IP-Adresse wird für maximal 1 Stunde gespeichert und danach automatisch gelöscht. Eine Zusammenführung mit anderen personenbezogenen Daten findet nicht statt.</p>
        <p style={pStyle}>Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am Schutz vor missbräuchlicher Nutzung).</p>
        <p style={pStyle}>Die Daten werden verarbeitet von:<br /><br />
        <strong>Upstash, Inc.</strong><br />
        340 Pine Street, Suite 701<br />
        San Francisco, CA 94104, USA<br /><br />
        Die Übermittlung erfolgt auf Grundlage von Standardvertragsklauseln. Die Datenschutzerklärung von Upstash finden Sie unter <a href="https://upstash.com/trust/privacy.pdf" rel="noopener noreferrer" style={linkStyle}>upstash.com/trust/privacy.pdf</a>.</p>
      </Block>

      <Block title="Cookies">
        <p style={pStyle}>Diese Website verwendet keine Tracking-Cookies und keine Analyse-Tools. Es werden ausschließlich technisch notwendige Session-Daten im Browser gespeichert (z.B. Chat-Verlauf für die Dauer der Sitzung). Diese Daten verlassen nicht den Browser des Nutzers.</p>
      </Block>

      <Block title="Ihre Rechte">
        <p style={pStyle}>Sie haben gegenüber dem Verantwortlichen folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:</p>
        <ul style={{ paddingLeft: '1.5rem', color: 'rgba(240,244,255,0.75)', lineHeight: 1.8, fontSize: '1.0625rem', fontWeight: 300 }}>
          <li><strong style={{ color: 'var(--white)' }}>Auskunft</strong> (Art. 15 DSGVO)</li>
          <li><strong style={{ color: 'var(--white)' }}>Berichtigung</strong> (Art. 16 DSGVO)</li>
          <li><strong style={{ color: 'var(--white)' }}>Löschung</strong> (Art. 17 DSGVO)</li>
          <li><strong style={{ color: 'var(--white)' }}>Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)</li>
          <li><strong style={{ color: 'var(--white)' }}>Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
          <li><strong style={{ color: 'var(--white)' }}>Widerspruch</strong> (Art. 21 DSGVO)</li>
          <li><strong style={{ color: 'var(--white)' }}>Beschwerde bei einer Aufsichtsbehörde</strong> (Art. 77 DSGVO)</li>
        </ul>
        <p style={{ ...pStyle, marginTop: '1rem' }}>Zur Ausübung Ihrer Rechte wenden Sie sich an: <a href="mailto:info@seobuddha.de" style={linkStyle}>info@seobuddha.de</a></p>
      </Block>
    </div>
  )
}

function Block({ title, children }) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <h2 style={{
        fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem',
        color: 'var(--cyan)', letterSpacing: '0.15em', textTransform: 'uppercase',
        marginBottom: '1rem', opacity: 0.8,
      }}>// {title}</h2>
      <div style={{ borderLeft: '2px solid var(--border)', paddingLeft: '1.5rem' }}>
        {children}
      </div>
    </div>
  )
}

function SectionTag({ children }) {
  return (
    <p style={{
      fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem',
      color: 'var(--cyan)', letterSpacing: '0.2em', textTransform: 'uppercase',
      marginBottom: '1rem', opacity: 0.7,
    }}>// {children}</p>
  )
}

const h1Style = {
  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 600,
  color: 'var(--white)', lineHeight: 1.2, marginBottom: '3rem', letterSpacing: '-0.01em',
}

const pStyle = {
  fontSize: '1.0625rem', color: 'rgba(240,244,255,0.75)',
  lineHeight: 1.8, marginBottom: '1rem', fontWeight: 300,
}

const linkStyle = { color: 'var(--cyan)', textDecoration: 'none' }
