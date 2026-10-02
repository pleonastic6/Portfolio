import { memo, useId, type CSSProperties } from 'react'
import styles from './MassingModel.module.css'

/**
 * Axonometrisches Massenmodell: vier Volumen im Quadrat — eins pro Person,
 * angelehnt an das Quadranten-Logo. Wird komplett aus Zahlen erzeugt
 * (Isometrie 30°), damit es scharf skaliert und kein Bild geladen werden muss.
 *
 * Gezeichnet wie mit Bleistift: Kanten laufen leicht ueber die Ecken hinaus,
 * Schattenseiten sind schraffiert, Fassaden tragen ein Geschossraster.
 */

type Box = { x: number; y: number; w: number; d: number; h: number }

export const VOLUMES: Box[] = [
  { x: 0, y: 0, w: 112, d: 112, h: 232 },
  { x: 124, y: 0, w: 128, d: 112, h: 152 },
  { x: 0, y: 124, w: 112, d: 128, h: 108 },
  { x: 124, y: 124, w: 128, d: 128, h: 58 },
]

const C = Math.cos(Math.PI / 6)
const S = 0.5
const OX = 470
const OY = 262

type Pt = [number, number]

function p(x: number, y: number, z: number): Pt {
  return [OX + (x - y) * C, OY + (x + y) * S - z]
}

function poly(points: Pt[]) {
  return points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
}

/** Kante mit leichtem Ueberstand an beiden Enden. */
function edge(a: Pt, b: Pt, over = 7) {
  const dx = b[0] - a[0]
  const dy = b[1] - a[1]
  const len = Math.hypot(dx, dy) || 1
  const ux = (dx / len) * over
  const uy = (dy / len) * over
  return { x1: a[0] - ux, y1: a[1] - uy, x2: b[0] + ux, y2: b[1] + uy }
}

/** Mittelpunkt der Dachflaeche in Prozent der Zeichenflaeche — fuer HTML-Overlays. */
export function roofAnchor(index: number) {
  const b = VOLUMES[index]
  const [x, y] = p(b.x + b.w / 2, b.y + b.d / 2, b.h)
  return { left: (x / VIEW_W) * 100, top: (y / VIEW_H) * 100 }
}

export const VIEW_W = 940
export const VIEW_H = 560

function Volume({
  box,
  index,
  active,
  hatch,
  plain = false,
}: {
  box: Box
  index: number
  active: boolean
  hatch: string
  plain?: boolean
}) {
  const { x, y, w, d, h } = box
  const x1 = x + w
  const y1 = y + d

  const top: Pt[] = [p(x, y, h), p(x1, y, h), p(x1, y1, h), p(x, y1, h)]
  const right: Pt[] = [p(x1, y, 0), p(x1, y1, 0), p(x1, y1, h), p(x1, y, h)]
  const left: Pt[] = [p(x, y1, 0), p(x1, y1, 0), p(x1, y1, h), p(x, y1, h)]

  const floors: number[] = []
  const colsRight: number[] = []
  const colsLeft: number[] = []
  if (!plain) {
    for (let z = 18; z < h - 6; z += 18) floors.push(z)
    for (let v = y + 14; v < y1 - 6; v += 14) colsRight.push(v)
    for (let v = x + 14; v < x1 - 6; v += 14) colsLeft.push(v)
  }

  const edges: [Pt, Pt][] = [
    [p(x1, y, 0), p(x1, y, h)],
    [p(x1, y1, 0), p(x1, y1, h)],
    [p(x, y1, 0), p(x, y1, h)],
    [p(x1, y, 0), p(x1, y1, 0)],
    [p(x, y1, 0), p(x1, y1, 0)],
    [top[0], top[1]],
    [top[1], top[2]],
    [top[2], top[3]],
    [top[3], top[0]],
  ]

  return (
    <g
      className={plain ? 'vol plinth' : 'vol'}
      data-index={index}
      data-active={active}
      style={{ '--vi': index + 1 } as CSSProperties}
    >
      <polygon points={poly(left)} className="face faceLeft" />
      <polygon points={poly(left)} fill={`url(#${hatch})`} className="hatch" />
      <polygon points={poly(right)} className="face faceRight" />
      <polygon points={poly(top)} className="face faceTop" />

      <g className="facade">
        {floors.map((z) => {
          const a = p(x1, y, z)
          const b = p(x1, y1, z)
          const c = p(x, y1, z)
          return (
            <g key={z}>
              <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />
              <line x1={c[0]} y1={c[1]} x2={b[0]} y2={b[1]} />
            </g>
          )
        })}
        {colsRight.map((v) => {
          const a = p(x1, v, 0)
          const b = p(x1, v, h)
          return <line key={`r${v}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />
        })}
        {colsLeft.map((v) => {
          const a = p(v, y1, 0)
          const b = p(v, y1, h)
          return <line key={`l${v}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />
        })}
      </g>

      <g className="edges">
        {edges.map(([a, b], i) => {
          const e = edge(a, b)
          return <line key={i} {...e} pathLength={1} style={{ '--ei': i } as CSSProperties} />
        })}
      </g>
      <g className="edgesSoft">
        {edges.map(([a, b], i) => {
          const e = edge(a, b, 14)
          return <line key={i} {...e} />
        })}
      </g>
    </g>
  )
}

function Dimension({ a, b, label, offset }: { a: Pt; b: Pt; label: string; offset: Pt }) {
  const a2: Pt = [a[0] + offset[0], a[1] + offset[1]]
  const b2: Pt = [b[0] + offset[0], b[1] + offset[1]]
  const mx = (a2[0] + b2[0]) / 2
  const my = (a2[1] + b2[1]) / 2
  return (
    <g className="dim">
      <line x1={a[0]} y1={a[1]} x2={a2[0]} y2={a2[1]} className="dimExt" />
      <line x1={b[0]} y1={b[1]} x2={b2[0]} y2={b2[1]} className="dimExt" />
      <line x1={a2[0]} y1={a2[1]} x2={b2[0]} y2={b2[1]} />
      <line x1={a2[0] - 4} y1={a2[1] + 4} x2={a2[0] + 4} y2={a2[1] - 4} className="tick" />
      <line x1={b2[0] - 4} y1={b2[1] + 4} x2={b2[0] + 4} y2={b2[1] - 4} className="tick" />
      <text x={mx} y={my - 6} textAnchor="middle">
        {label}
      </text>
    </g>
  )
}

/** Hoehenkote: gestrichelte Linie mit Dreieck und Wert, wie in einer Ansicht. */
function Level({ from, to, label }: { from: Pt; to: number; label: string }) {
  const [x, y] = from
  return (
    <g className="level">
      <line x1={x + 6} y1={y} x2={to} y2={y} className="levelLine" />
      <path d={`M${to - 8} ${y - 9} L${to} ${y} L${to + 8} ${y - 9} Z`} />
      <text x={to + 14} y={y + 3}>
        {label}
      </text>
    </g>
  )
}

type Props = {
  active?: number | null
  className?: string
  /** false haelt die Linien unsichtbar, true zeichnet sie ein */
  drawn?: boolean
  /** Rasterlinien und Masse — im CTA weggelassen */
  annotations?: boolean
}

function MassingModelBase({ active = null, className = '', annotations = true, drawn = true }: Props) {
  // Painter's Algorithmus: hinten (kleines x+y) zuerst
  const order = VOLUMES.map((box, index) => ({ box, index })).sort(
    (m, n) => m.box.x + m.box.y - (n.box.x + n.box.y),
  )

  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const hatchId = `cos-hatch-${uid}`
  const fadeId = `cos-fade-${uid}`
  const maskId = `cos-mask-${uid}`

  const plinth: Box = { x: -22, y: -22, w: 296, d: 296, h: 6 }
  const grid: { a: Pt; b: Pt }[] = []
  for (let v = -100; v <= 360; v += 32) {
    grid.push({ a: p(v, -100, 0), b: p(v, 360, 0) })
    grid.push({ a: p(-100, v, 0), b: p(360, v, 0) })
  }

  return (
    <svg
      className={`${styles.svg} ${className}`}
      data-drawn={drawn}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id={hatchId} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-38)">
          <line x1="0" y1="0" x2="0" y2="5" className="hatchLine" />
        </pattern>
        <radialGradient id={fadeId} cx="50%" cy="55%" r="55%">
          <stop offset="55%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id={maskId}>
          <rect width={VIEW_W} height={VIEW_H} fill={`url(#${fadeId})`} />
        </mask>
      </defs>

      {annotations && (
        <g className="ground" mask={`url(#${maskId})`}>
          {grid.map((g, i) => (
            <line key={i} x1={g.a[0]} y1={g.a[1]} x2={g.b[0]} y2={g.b[1]} />
          ))}
        </g>
      )}

      <Volume box={plinth} index={-1} active={false} hatch={hatchId} plain />

      {order.map(({ box, index }) => (
        <Volume key={index} box={box} index={index} active={active === index} hatch={hatchId} />
      ))}

      {annotations && (
        <>
          <Dimension a={p(274, 274, 0)} b={p(274, -22, 0)} label="29 600" offset={[38, 22]} />
          <Dimension a={p(-22, 274, 0)} b={p(274, 274, 0)} label="29 600" offset={[-38, 22]} />
          <Level from={p(112, 0, 232)} to={OX + 300} label="+23.20" />
          <Level from={p(252, 0, 152)} to={OX + 300} label="+15.20" />
          <g className="north" transform={`translate(${VIEW_W - 70} ${VIEW_H - 70})`}>
            <circle r="18" />
            <path d="M0 -26 L6 -4 L0 -8 L-6 -4 Z" className="northArrow" />
            <text y="34" textAnchor="middle">
              N
            </text>
          </g>
        </>
      )}
    </svg>
  )
}

export const MassingModel = memo(MassingModelBase)
