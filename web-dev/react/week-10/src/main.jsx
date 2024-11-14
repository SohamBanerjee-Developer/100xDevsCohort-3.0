import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import RefClock from './RefClock.jsx'
import ContextAPI from './ContextAPI.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <RefClock/>
    <ContextAPI/>
  </StrictMode>,
)
