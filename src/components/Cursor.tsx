import { useEffect, useRef } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import styles from './Cursor.module.css'

/**
 * Feiner Cursor-Layer für Desktop: Standardthemen bekommen einen ruhigen Ring,
 * Collective OS einen kleinen orangefarbenen Punkt.
 * Nur auf Geräten mit präzisem Zeiger, nie bei prefers-reduced-motion.
 */
export function Cursor() {
  const layerRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const xRef = useRef<HTMLDivElement>(null)
  const yRef = useRef<HTMLDivElement>(null)
  const txRef = useRef<HTMLDivElement>(null)
  const tyRef = useRef<HTMLDivElement>(null)
  const finePointer = useMediaQuery('(pointer: fine)')
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const enabled = !reducedMotion && finePointer

  useEffect(() => {
    if (!enabled || !ringRef.current || !layerRef.current) return

    const layer = layerRef.current
    const ring = ringRef.current
    const xLine = xRef.current
    const yLine = yRef.current
    const xLabel = txRef.current
    const yLabel = tyRef.current

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

    const updateHud = () => {
      xLine?.style.setProperty('--cursor-y', `${pointerY}px`)
      yLine?.style.setProperty('--cursor-x', `${pointerX}px`)
      xLabel?.style.setProperty('--cursor-x', `${pointerX}px`)
      yLabel?.style.setProperty('--cursor-y', `${pointerY}px`)
      if (xLabel) xLabel.textContent = `X ${String(Math.round(pointerX)).padStart(4, '0')}`
      if (yLabel) yLabel.textContent = `Y ${String(Math.round(pointerY + window.scrollY)).padStart(5, '0')}`
    }

    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY
      updateHud()

      if (!visible) {
        visible = true
        layer.dataset.visible = 'true'
      }

      const ziel = event.target as Element | null
      if (ziel !== letztesZiel) {
        letztesZiel = ziel
        const drueber = !!ziel?.closest('a, button, [data-cursor="hover"]')
        if (drueber !== ueberLink) {
          ueberLink = drueber
          layer.dataset.hover = drueber ? 'true' : 'false'
        }
      }

      starten()
    }

    const onLeave = () => {
      visible = false
      letztesZiel = null
      layer.dataset.visible = 'false'
    }

    function tick() {
      ringX += (pointerX - ringX) * 0.18
      ringY += (pointerY - ringY) * 0.18
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`

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

  return (
    <div ref={layerRef} className={styles.cursor} data-visible="false" data-hover="false" aria-hidden="true">
      <div ref={xRef} className={styles.xLine} />
      <div ref={yRef} className={styles.yLine} />
      <div ref={txRef} className={styles.xLabel} />
      <div ref={tyRef} className={styles.yLabel} />
      <div ref={ringRef} className={styles.ring} />
    </div>
  )
}
