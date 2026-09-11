import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

type RevealProps = {
  children: ReactNode
  /** Verzögerung in ms — für gestaffelte Gruppen */
  delay?: number
  className?: string
  as?: ElementType
  threshold?: number
  style?: CSSProperties
}

/**
 * Blendet seinen Inhalt beim ersten Sichtbarwerden ein.
 * Die eigentliche Bewegung steckt in base.css ([data-reveal]) — damit greift
 * prefers-reduced-motion zentral.
 *
 * Wo der Browser Scroll-Timelines kennt, uebernimmt dort eine an den
 * Scrollstand gekoppelte Fassung: der Inhalt zieht waehrend des Scrollens
 * herein, statt an einer Schwelle umzuspringen. Die Staffelung wird dafuer aus
 * der Verzoegerung in einen Versatz des Sichtbereichs uebersetzt.
 * Der Beobachter bleibt aktiv — er ist die Rueckfallebene fuer Safari und
 * Firefox, die Scroll-Timelines noch nicht koennen.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = 'div',
  threshold = 0.2,
  style,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>(threshold)

  return (
    <Tag
      ref={ref}
      className={className}
      data-reveal={inView ? 'visible' : ''}
      style={
        {
          ...style,
          '--reveal-delay': `${delay}ms`,
          // Aus Verzoegerung wird Scrollweg: 60 ms entsprechen 30 px. Genug
          // fuer eine erkennbare Reihenfolge, zu wenig zum Warten.
          '--reveal-offset': `${Math.min(delay / 2, 140)}px`,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  )
}
