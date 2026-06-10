import { ViteReactSSG } from 'vite-react-ssg'
import App from './App.jsx'
import './index.css'

const routes = [
  { path: '/', element: <App /> },
  { path: '/rankings', element: <App /> },
  { path: '/teilnehmer', element: <App /> },
  { path: '/links', element: <App /> },
  { path: '/jarvis', element: <App /> },
  { path: '/datenschutz', element: <App /> },
  { path: '/impressum', element: <App /> },
]

export const createRoot = ViteReactSSG({ routes })
