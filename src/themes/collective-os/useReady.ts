import { useEffect, useState } from 'react'

/**
 * true, sobald die Startsequenz weg ist und main.tsx die Seite freigegeben hat
 * (Klasse is-ready an <html>, Event addd:ready). Haelt Einstiegsanimationen
 * zurueck, damit sie nicht hinter der Startflaeche ablaufen.
 */
export function useReady() {
  const [ready, setReady] = useState(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('is-ready'),
  )

  useEffect(() => {
    if (ready) return
    const onReady = () => setReady(true)
    window.addEventListener('addd:ready', onReady)
    // falls das Event vor dem Mount kam
    if (document.documentElement.classList.contains('is-ready')) setReady(true)
    return () => window.removeEventListener('addd:ready', onReady)
  }, [ready])

  return ready
}
