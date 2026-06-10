import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Home from './components/Home.jsx'
import Rankings from './components/Rankings.jsx'
import Competitors from './components/Competitors.jsx'
import Chat from './components/Chat.jsx'
import Legal from './components/Legal.jsx'
import UserRankingPrompt from './components/UserRankingPrompt.jsx'
import Backlinks from './components/Backlinks.jsx'

const tabs = [
  { id: '/', label: 'START', icon: '⬡' },
  { id: '/rankings', label: 'RANKINGS', icon: '📊' },
  { id: '/teilnehmer', label: 'TEILNEHMER', icon: '🔍' },
  { id: '/links', label: 'LINKS', icon: '◇' },
  { id: '/jarvis', label: 'JARVIS', icon: '🤖' },
]

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const [time, setTime] = useState(new Date())
  const tabRowRef = useRef(null)
  const tabRefs = useRef({})

  const activeTab = location.pathname

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const el = tabRefs.current[activeTab]
    const row = tabRowRef.current
    if (el && row) {
      const elLeft = el.offsetLeft
      const elWidth = el.offsetWidth
      const rowWidth = row.offsetWidth
      row.scrollTo({ left: elLeft - rowWidth / 2 + elWidth / 2, behavior: 'smooth' })
    }
  }, [activeTab])

  const isHome = activeTab === '/'

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <UserRankingPrompt />

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(5,8,16,0.97)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,200,255,0.2)',
      }}>
        {/* Top bar: logo + clock */}
        <div style={{
          padding: '0 1.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: '44px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="mono" style={{ color: 'var(--cyan)', fontSize: '0.875rem', letterSpacing: '0.1em' }}>
              JARVIS<span style={{ opacity: 0.4 }}>_v∞</span>
            </span>
            <span style={{
              background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.2)',
              color: 'var(--green)', fontSize: '0.6rem', padding: '0.2rem 0.5rem',
              borderRadius: '2px', fontFamily: 'JetBrains Mono', letterSpacing: '0.1em'
            }}>ONLINE</span>
          </div>
          <span className="mono" style={{ fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.05em' }}>
            {time.toLocaleTimeString('de-DE')}
          </span>
        </div>

        {/* Scrollable tab row with fade hint */}
        <div style={{ position: 'relative' }}>
          <div
            ref={tabRowRef}
            style={{
              display: 'flex', gap: '0.25rem',
              overflowX: 'auto', padding: '0 1rem 0.5rem',
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {tabs.map(tab => (
              <button
                key={tab.id}
                ref={el => { tabRefs.current[tab.id] = el }}
                onClick={() => navigate(tab.id)}
                style={{
                  background: activeTab === tab.id ? 'rgba(0,200,255,0.12)' : 'transparent',
                  border: activeTab === tab.id ? '1px solid rgba(0,200,255,0.5)' : '1px solid transparent',
                  color: activeTab === tab.id ? '#00c8ff' : 'rgba(240,244,255,0.75)',
                  padding: '0.35rem 0.875rem',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '0.7rem',
                  letterSpacing: '0.12em',
                  transition: 'all 0.2s',
                  textShadow: activeTab === tab.id ? '0 0 12px rgba(0,200,255,0.6)' : 'none',
                  whiteSpace: 'nowrap', flexShrink: 0,
                }}>
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
          <div style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: '48px',
            background: 'linear-gradient(to right, transparent, rgba(5,8,16,0.97))',
            pointerEvents: 'none',
          }} />
        </div>
      </nav>

      {/* CONTENT */}
      <main style={isHome
        ? { marginTop: '80px', flex: 1, width: '100%' }
        : { marginTop: '80px', flex: 1, padding: '2rem 1.5rem', maxWidth: '1100px', margin: '80px auto 0', width: '100%' }
      }>
        {activeTab === '/' && <Home onLegal={navigate} />}
        {activeTab === '/rankings' && <Rankings />}
        {activeTab === '/teilnehmer' && <Competitors />}
        {activeTab === '/links' && <Backlinks />}
        {activeTab === '/jarvis' && <Chat />}
        {activeTab === '/datenschutz' && <Legal page="datenschutz" />}
        {activeTab === '/impressum' && <Legal page="impressum" />}
      </main>

    </div>
  )
}
