import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { preloadCorporateFonts } from './assets/fonts/preload'
import App from './App.tsx'

preloadCorporateFonts()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
