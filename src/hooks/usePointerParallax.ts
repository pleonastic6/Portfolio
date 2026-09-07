import { useEffect, useRef } from 'react'

/**
 * Laesst ein Element auf den Mauszeiger reagieren.
 *
 * Gesetzt werden vier CSS-Variablen auf dem Element selbst:
 *   --mx, --my  Position des Zeigers im Element, 0…1 — fuer Lichtpunkte
 *   --px, --py  dieselbe Position als -1…1 — fuer Verschiebungen
 *
 * Bewusst ohne React-State: jede Mausbewegung wuerde sonst einen Rerender
 * ausloesen. Stattdessen werden die Variablen direkt geschrieben, gebuendelt
 * auf das naechste Bild des Browsers.
 *
 * Aktiv nur bei echter Maus (kein Touch) und nur, wenn der Nutzer nicht
 * ausdruecklich weniger Bewegung eingestellt hat.
 */
export function usePointerParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || calm.matches) return

    let frame = 0
    let x = 0.5
    let y = 0.5

    const apply = () => {
      frame = 0
      node.style.setProperty('--mx', x.toFixed(4))
      node.style.setProperty('--my', y.toFixed(4))
      node.style.setProperty('--px', (x * 2 - 1).toFixed(4))
      node.style.setProperty('--py', (y * 2 - 1).toFixed(4))
    }

    const onMove = (event: PointerEvent) => {
      const box = node.getBoundingClientRect()
      if (box.width === 0 || box.height === 0) return
      x = (event.clientX - box.left) / box.width
      y = (event.clientY - box.top) / box.height
      if (frame === 0) frame = requestAnimationFrame(apply)
    }

    // Beim Verlassen zurueck in die Mitte, damit nichts schief stehen bleibt.
    const onLeave = () => {
      x = 0.5
      y = 0.5
      if (frame === 0) frame = requestAnimationFrame(apply)
    }

    node.addEventListener('pointermove', onMove)
    node.addEventListener('pointerleave', onLeave)

    return () => {
      if (frame !== 0) cancelAnimationFrame(frame)
      node.removeEventListener('pointermove', onMove)
      node.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return ref
}
