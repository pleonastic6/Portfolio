import { useEffect, useRef, type ElementType } from 'react'

/**
 * Text, dessen Buchstaben beim Zeigen kurz durch Zufallszeichen rattern und
 * danach von links nach rechts einrasten.
 *
 * Der Effekt laeuft ausschliesslich waehrend des Hovers und dauert weniger als
 * eine Sekunde — es entsteht kein Dauerzustand, keine bleibende Ebene auf der
 * Grafikkarte. Geschrieben wird direkt in den Textknoten, nicht ueber React-
 * State: das erspart bis zu sechzig Neuaufbauten der Komponente pro Sekunde.
 *
 * Voraussetzung fuer ein ruhiges Bild ist eine dicktengleiche Schrift, sonst
 * wackelt die Breite waehrend des Ratterns. Die Navigation nutzt Space Mono.
 */

const ZEICHEN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#*+<>[]'
/** Wie lange ein einzelner Buchstabe rattert, bevor er einrastet. */
const DAUER_JE_ZEICHEN = 260
/** Abstand, in dem die Buchstaben nacheinander einrasten. */
const VERSATZ = 38

type ScrambleTextProps = {
  children: string
  className?: string
  as?: ElementType
  href?: string
  'aria-current'?: 'true' | undefined
}

export function ScrambleText({
  children,
  className,
  as: Tag = 'span',
  ...rest
}: ScrambleTextProps) {
  const ref = useRef<HTMLElement>(null)
  // Der Zieltext in einer Ref, damit die Schleife immer den aktuellen kennt
  // (er wechselt beim Sprachwechsel).
  const zielRef = useRef(children)
  zielRef.current = children

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let bild = 0
    let start = 0

    const schritt = (jetzt: number) => {
      if (start === 0) start = jetzt
      const verstrichen = jetzt - start
      const ziel = zielRef.current

      let fertig = true
      let ausgabe = ''
      for (let i = 0; i < ziel.length; i += 1) {
        const zeichen = ziel[i]
        // Leerzeichen und Satzzeichen bleiben stehen, sonst zerfaellt das Wort.
        if (zeichen === ' ' || zeichen === '-') {
          ausgabe += zeichen
          continue
        }
        const eigenerStart = i * VERSATZ
        if (verstrichen >= eigenerStart + DAUER_JE_ZEICHEN) {
          ausgabe += zeichen
        } else if (verstrichen >= eigenerStart) {
          ausgabe += ZEICHEN[(Math.random() * ZEICHEN.length) | 0]
          fertig = false
        } else {
          ausgabe += zeichen
          fertig = false
        }
      }

      el.textContent = ausgabe
      if (fertig) {
        bild = 0
        return
      }
      bild = requestAnimationFrame(schritt)
    }

    const starten = () => {
      if (bild !== 0) return
      start = 0
      bild = requestAnimationFrame(schritt)
    }

    const abbrechen = () => {
      if (bild === 0) return
      cancelAnimationFrame(bild)
      bild = 0
      el.textContent = zielRef.current
    }

    el.addEventListener('pointerenter', starten)
    el.addEventListener('focus', starten)
    el.addEventListener('pointerleave', abbrechen)
    el.addEventListener('blur', abbrechen)

    return () => {
      abbrechen()
      el.removeEventListener('pointerenter', starten)
      el.removeEventListener('focus', starten)
      el.removeEventListener('pointerleave', abbrechen)
      el.removeEventListener('blur', abbrechen)
    }
  }, [])

  // Beim Sprachwechsel muss der Text auch dann stimmen, wenn gerade nicht
  // gerattert wird — deshalb steht er ganz normal als Kind im Markup.
  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}
