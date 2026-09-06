import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

// Schriften liegen im Projekt (npm), nicht auf einem fremden CDN:
// keine externen Requests, DSGVO-unkritisch, offline-fest.
import '@fontsource-variable/space-grotesk/wght.css'
import '@fontsource-variable/archivo/wght.css'
import '@fontsource/space-mono/latin-400.css'
import '@fontsource/space-mono/latin-700.css'
import '@fontsource/silkscreen/latin-400.css'

// Optionale echte Nothing-Schriften bleiben bewusst aus: keine klare öffentliche
// Nutzungslizenz. Die freien Alternativen oben treffen den Vibe ohne Rechte-Murks.

import './styles/tokens.css'
import './styles/base.css'

const container = document.getElementById('root')
if (!container) throw new Error('#root nicht gefunden — index.html prüfen.')

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
