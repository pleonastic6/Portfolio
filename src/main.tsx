import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Schriften liegen im Projekt (npm), nicht auf einem fremden CDN:
// keine externen Requests, DSGVO-unkritisch, offline-fest.
import '@fontsource-variable/newsreader/wght.css'
import '@fontsource/space-mono/latin-400.css'
import '@fontsource/space-mono/latin-700.css'
import '@fontsource/silkscreen/latin-400.css'

// Editoriale Newsreader-Serif + technische Mono/Dot-Akzente,
// aber ohne Google-Fonts-CDN oder proprietären Font-Rip.

import './styles/tokens.css'
import './styles/base.css'

// App bewusst ZULETZT importieren: ES-Module werden in Quellreihenfolge
// ausgewertet, dadurch landen die CSS-Module der Komponenten im Stylesheet
// hinter den globalen Styles und koennen .label / .meta ueberschreiben.
import App from './App'

const container = document.getElementById('root')
if (!container) throw new Error('#root nicht gefunden — index.html prüfen.')

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
