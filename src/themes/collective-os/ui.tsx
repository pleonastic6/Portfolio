import type { CSSProperties, ElementType, MouseEventHandler, ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'
import styles from './ui.module.css'

export { styles as ui }

/** Pfeil nach rechts unten — wie auf einem Planstempel. */
export function Arrow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <path d="M5 5 L15 15 M15 7 L15 15 L7 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    </svg>
  )
}

type BtnProps = {
  children: string
  href?: string
  onClick?: MouseEventHandler<HTMLElement>
  variant?: 'brand' | 'outline' | 'cell'
  icon?: boolean
  external?: boolean
  className?: string
  ariaLabel?: string
}

/**
 * Button mit eingerollter Zweitbeschriftung und einfahrender Fuellung.
 * Ohne href wird ein <button> daraus.
 */
export function Btn({
  children,
  href,
  onClick,
  variant = 'brand',
  icon = true,
  external = false,
  className = '',
  ariaLabel,
}: BtnProps) {
  const variantClass =
    variant === 'brand' ? styles.brandBtn : variant === 'outline' ? styles.outlineBtn : styles.cellBtn
  const cls = `${styles.btn} ${variantClass} ${className}`

  const inner = (
    <>
      <span className={styles.btnLabel}>
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {icon && (
        <span className={styles.btnIcon}>
          <span className={styles.btnIconInner}>
            <Arrow />
            <Arrow />
          </span>
        </span>
      )}
    </>
  )

  if (href) {
    return (
      <a
        className={cls}
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {inner}
      </a>
    )
  }

  return (
    <button type="button" className={cls} onClick={onClick} aria-label={ariaLabel}>
      {inner}
    </button>
  )
}

/** Passermarke an einer Ecke des umgebenden (relativ positionierten) Elements. */
export function Plus({
  at,
  thin = false,
  color,
}: {
  at: 'tl' | 'tr' | 'bl' | 'br'
  thin?: boolean
  color?: string
}) {
  return (
    <span
      className={`${styles.plus} ${styles[at]} ${thin ? styles.plusThin : ''}`}
      style={color ? ({ '--plus-color': color } as CSSProperties) : undefined}
      aria-hidden="true"
    />
  )
}

/** Alle vier Ecken auf einmal. */
export function Corners({ thin, color }: { thin?: boolean; color?: string }) {
  return (
    <>
      <Plus at="tl" thin={thin} color={color} />
      <Plus at="tr" thin={thin} color={color} />
      <Plus at="bl" thin={thin} color={color} />
      <Plus at="br" thin={thin} color={color} />
    </>
  )
}

type SplitProps = {
  /** Ein String oder mehrere Zeilen, die jeweils eine eigene Zeile bekommen */
  text: string | readonly string[]
  as?: ElementType
  className?: string
  id?: string
  delay?: number
  /** zusaetzliche Bedingung, z.B. Startsequenz vorbei */
  ready?: boolean
}

/**
 * Ueberschrift, deren Woerter einzeln aus einer Maske hochlaufen.
 * Der volle Text bleibt fuer Screenreader am Element (aria-label), die
 * Wortspans sind ausgeblendet.
 */
export function Split({
  text,
  as: Tag = 'h2',
  className = '',
  id,
  delay = 0,
  ready = true,
}: SplitProps) {
  const { ref, inView } = useInView<HTMLElement>(0.3)
  const lines = typeof text === 'string' ? [text] : text
  let counter = 0

  return (
    <Tag
      ref={ref}
      id={id}
      className={`${styles.split} ${className}`}
      data-in={inView && ready}
      aria-label={lines.join(' ')}
      style={{ '--d': `${delay}ms` } as CSSProperties}
    >
      {lines.map((line, lineIndex) => {
        const words = line.split(' ')
        return (
          <span key={`${line}-${lineIndex}`} className={lines.length > 1 ? styles.line : undefined} aria-hidden="true">
            {words.map((word, index) => {
              const i = counter++
              return (
                <span key={`${word}-${index}`}>
                  <span className={styles.word}>
                    <span className={styles.wordInner} style={{ '--i': i } as CSSProperties}>
                      {word}
                    </span>
                  </span>
                  {index < words.length - 1 ? ' ' : null}
                </span>
              )
            })}
          </span>
        )
      })}
    </Tag>
  )
}

/** Blendet seinen Inhalt beim ersten Sichtbarwerden ein. */
export function Fade({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
}: {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
}) {
  const { ref, inView } = useInView<HTMLElement>(0.15)
  return (
    <Tag
      ref={ref}
      className={`${styles.fade} ${className}`}
      data-in={inView}
      style={{ '--d': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}

/** Zweistellige Nummer in eckigen Klammern: [01] */
export function num(index: number) {
  return `[${String(index + 1).padStart(2, '0')}]`
}
