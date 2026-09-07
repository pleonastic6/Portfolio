import { useEffect, useRef } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import styles from './Cursor.module.css'

/**
 * Feiner Ring, der dem Zeiger mit leichter Verzögerung folgt.
 * Nur auf Geräten mit präzisem Zeiger, nie bei prefers-reduced-motion.
 * Der System-Cursor bleibt sichtbar — der Ring ergänzt ihn nur.
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const finePointer = useMediaQuery('(pointer: fine)')
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const enabled = finePointer && !reducedMotion

  useEffect(() => {
    if (!enabled || !ringRef.current) return
    // Eigene Konstante: innerhalb der Schleifenfunktion weiss TypeScript sonst
    // nicht mehr, dass die Pruefung oben schon stattgefunden hat.
    const ring = ringRef.current

    let pointerX = window.innerWidth / 2
    let pointerY = window.innerHeight / 2
    let ringX = pointerX
    let ringY = pointerY
    let frame = 0
    let visible = false
    let letztesZiel: Element | null = null
    let ueberLink = false

    const starten = () => {
      if (frame === 0) frame = requestAnimationFrame(tick)
    }

    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY

      if (!visible) {
        visible = true
        ring.dataset.visible = 'true'
      }

      /*
       * Die Suche nach dem umgebenden Link lief frueher bei jeder Mausbewegung
       * — also bis zu hundertmal pro Sekunde ein Gang durch den DOM, gefolgt
       * von einem Attributschreiben, das eine Stilneuberechnung ausloeste.
       * Beides passiert jetzt nur noch, wenn der Zeiger ueber einem anderen
       * Element steht und sich das Ergebnis wirklich aendert.
       */
      const ziel = event.target as Element | null
      if (ziel !== letztesZiel) {
        letztesZiel = ziel
        const drueber = !!ziel?.closest('a, button, [data-cursor="hover"]')
        if (drueber !== ueberLink) {
          ueberLink = drueber
          ring.dataset.hover = drueber ? 'true' : 'false'
        }
      }

      starten()
    }

    const onLeave = () => {
      visible = false
      letztesZiel = null
      ring.dataset.visible = 'false'
    }

    function tick() {
      // Lerp: je kleiner der Faktor, desto weicher das Nachziehen
      ringX += (pointerX - ringX) * 0.18
      ringY += (pointerY - ringY) * 0.18
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`

      /*
       * Am Ziel angekommen haelt die Schleife an. Vorher lief sie dauerhaft
       * weiter und schrieb bei jedem Bild dieselbe Transformation — die Seite
       * kam damit nie zur Ruhe, auch wenn niemand die Maus bewegte.
       */
      if (Math.abs(pointerX - ringX) < 0.2 && Math.abs(pointerY - ringY) < 0.2) {
        ringX = pointerX
        ringY = pointerY
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
        frame = 0
        return
      }
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    return () => {
      if (frame !== 0) cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled])

  if (!enabled) return null

  return <div ref={ringRef} className={styles.ring} data-visible="false" aria-hidden="true" />
}
