import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

// Schriften liegen im Projekt (npm), nicht auf einem fremden CDN:
// keine externen Requests, DSGVO-unkritisch, offline-fest.
import '@fontsource-variable/archivo/wght.css'
import '@fontsource/ibm-plex-mono/latin-400.css'
import '@fontsource/ibm-plex-mono/latin-500.css'

// Optionale Nothing-Schriften: einkommentieren, sobald die WOFF2-Dateien in
// src/assets/fonts/ liegen (Anleitung: src/assets/fonts/README.md).
// import './styles/fonts.css'

import './styles/tokens.css'
import './styles/base.css'

const container = document.getElementById('root')
if (!container) throw new Error('#root nicht gefunden — index.html prüfen.')

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
