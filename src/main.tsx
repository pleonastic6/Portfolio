import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Schriften liegen im Projekt (npm), nicht auf einem fremden CDN:
// keine externen Requests, DSGVO-unkritisch, offline-fest.
import '@fontsource-variable/newsreader/wght.css'
import '@fontsource/space-mono/latin-400.css'
import '@fontsource/space-mono/latin-700.css'
import '@fontsource/silkscreen/latin-400.css'
import '@fontsource/cinzel/latin-700.css'

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

/*
 * Startsignal fuer den Aufbau des Hero.
 *
 * Ohne dieses Signal beginnt die Animation in dem Moment, in dem React die
 * Elemente einsetzt. Der Browser ist dann aber noch mit dem Auswerten des
 * Skripts und dem Bereitstellen der Schriften beschaeftigt und zeichnet das
 * erste Bild deutlich spaeter. Zu sehen bekommt man deshalb nicht den Aufbau,
 * sondern seine zweite Haelfte: der Text steht ploetzlich halb da.
 *
 * Die Sperre in base.css haelt die Animationen bis hierher an. Freigegeben
 * wird, sobald die Schriften stehen und der Browser tatsaechlich ein Bild
 * gezeichnet hat — dafuer die zwei ineinander verschachtelten
 * Bildanforderungen. Die 1200 ms sind die Notbremse, falls document.fonts
 * nie fertig meldet.
 */
const notbremse = new Promise<void>((resolve) => {
  window.setTimeout(resolve, 1200)
})
const schriften = document.fonts ? document.fonts.ready.then(() => undefined) : Promise.resolve()

/*
 * Der Startsequenz in index.html melden, dass React steht — erst danach zaehlt
 * sie zu Ende und raeumt sich weg. Die Bildanforderung sorgt dafuer, dass die
 * Meldung nach dem ersten gezeichneten Bild rausgeht, nicht davor.
 */
requestAnimationFrame(() => {
  window.dispatchEvent(new Event('addd:mounted'))
})

/*
 * Und umgekehrt: der Hero wartet, bis die Sequenz weg ist. Ohne das liefe sein
 * Aufbau hinter der noch sichtbaren Flaeche ab.
 * Die zweite Notbremse ist grosszuegiger als die erste — falls das Skript in
 * index.html gar nicht laeuft, startet der Hero trotzdem.
 */
const sequenz = window.__addd?.fertig ?? Promise.resolve()
const notbremseLang = new Promise<void>((resolve) => {
  window.setTimeout(resolve, 6500)
})

void Promise.race([
  Promise.all([Promise.race([schriften, notbremse]), sequenz]).then(() => undefined),
  notbremseLang,
]).then(() => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.documentElement.classList.add('is-ready')
      // Fuer alles, was nicht ueber CSS gesteuert wird — etwa die Punktmarke.
      window.dispatchEvent(new Event('addd:ready'))
    })
  })
})
