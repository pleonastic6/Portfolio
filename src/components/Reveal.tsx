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
      style={{ ...style, '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
