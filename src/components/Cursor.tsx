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
    const ring = ringRef.current
    if (!enabled || !ring) return

    let pointerX = window.innerWidth / 2
    let pointerY = window.innerHeight / 2
    let ringX = pointerX
    let ringY = pointerY
    let frame = 0
    let visible = false

    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY

      if (!visible) {
        visible = true
        ring.dataset.visible = 'true'
      }

      const target = event.target as HTMLElement | null
      const interactive = target?.closest('a, button, [data-cursor="hover"]')
      ring.dataset.hover = interactive ? 'true' : 'false'
    }

    const onLeave = () => {
      visible = false
      ring.dataset.visible = 'false'
    }

    const tick = () => {
      // Lerp: je kleiner der Faktor, desto weicher das Nachziehen
      ringX += (pointerX - ringX) * 0.18
      ringY += (pointerY - ringY) * 0.18
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled])

  if (!enabled) return null

  return <div ref={ringRef} className={styles.ring} data-visible="false" aria-hidden="true" />
}
