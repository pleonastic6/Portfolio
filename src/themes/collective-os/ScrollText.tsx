import { useEffect, useRef, type CSSProperties } from 'react'
import styles from './ScrollText.module.css'

/**
 * Text, der sich beim Scrollen Buchstabe fuer Buchstabe einfaerbt —
 * von Linienhellgrau zu Graphit. Pro Bild wird nur eine einzige
 * CSS-Variable am Container gesetzt; die Farbe jedes Zeichens rechnet
 * der Browser per color-mix() selbst aus.
 */
export function ScrollText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const total = text.replace(/\s/g, '').length

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--p', String(total + 1))
      return
    }

    let frame = 0
    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const start = vh * 0.88
      const end = vh * 0.32
      const progress = (start - rect.top) / (start - end + rect.height * 0.6)
      const clamped = Math.min(1, Math.max(0, progress))
      el.style.setProperty('--p', (clamped * (total + 2)).toFixed(2))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [total])

  let index = 0
  const words = text.split(' ')

  return (
    <p ref={ref} className={`${styles.text} ${className}`} aria-label={text}>
      {words.map((word, w) => (
        <span key={`${word}-${w}`} aria-hidden="true">
          <span className={styles.word}>
            {Array.from(word).map((char, c) => {
              const i = index++
              return (
                <span key={c} className={styles.char} style={{ '--i': i } as CSSProperties}>
                  {char}
                </span>
              )
            })}
          </span>
          {w < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </p>
  )
}
