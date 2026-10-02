import type { CSSProperties } from 'react'

/**
 * Isometrische Strichzeichnungen fuer die vier Arbeitsfelder.
 * Durchgezogene Kanten werden beim Hover nachgezogen, gestrichelte
 * Hilfslinien laufen danach wie ein Datenstrom.
 */

type P3 = [number, number, number]
type Seg = { pts: P3[]; dash?: boolean }

const C = Math.cos(Math.PI / 6)

function iso([x, y, z]: P3): [number, number] {
  return [(x - y) * C, (x + y) * 0.5 - z]
}

/** Sichtbare (und auf Wunsch verdeckte) Kanten eines Quaders. */
function box(x: number, y: number, z: number, w: number, d: number, h: number, hidden = false): Seg[] {
  const X = x + w
  const Y = y + d
  const Z = z + h
  const segs: Seg[] = [
    { pts: [[x, y, Z], [X, y, Z], [X, Y, Z], [x, Y, Z], [x, y, Z]] },
    { pts: [[X, y, Z], [X, y, z], [X, Y, z], [x, Y, z], [x, Y, Z]] },
    { pts: [[X, Y, Z], [X, Y, z]] },
  ]
  if (hidden) {
    segs.push({ pts: [[x, y, z], [X, y, z]], dash: true })
    segs.push({ pts: [[x, y, z], [x, Y, z]], dash: true })
    segs.push({ pts: [[x, y, z], [x, y, Z]], dash: true })
  }
  return segs
}

const ICONS: Record<string, Seg[]> = {
  interface: [
    ...box(0, 0, 0, 110, 80, 6),
    ...box(0, 0, 34, 110, 80, 6),
    ...box(0, 0, 68, 110, 80, 6),
    { pts: [[14, 80, 82], [60, 80, 82], [60, 80, 74]] },
    { pts: [[110, 14, 80], [110, 50, 80]] },
    { pts: [[110, 80, 6], [110, 80, 34]], dash: true },
    { pts: [[110, 0, 6], [110, 0, 34]], dash: true },
    { pts: [[0, 80, 6], [0, 80, 34]], dash: true },
    { pts: [[110, 80, 40], [110, 80, 68]], dash: true },
    { pts: [[110, 0, 40], [110, 0, 68]], dash: true },
    { pts: [[0, 80, 40], [0, 80, 68]], dash: true },
  ],
  automation: [
    ...box(0, 0, 0, 46, 46, 46),
    ...box(84, 84, 0, 46, 46, 46),
    { pts: [[46, 23, 23], [107, 23, 23], [107, 84, 23]], dash: true },
    { pts: [[23, 46, 23], [23, 107, 23], [84, 107, 23]], dash: true },
    { pts: [[100, 78, 23], [107, 84, 23], [114, 78, 23]] },
    { pts: [[78, 100, 23], [84, 107, 23], [78, 114, 23]] },
  ],
  data: [
    { pts: [[-14, -14, 0], [150, -14, 0], [150, 70, 0], [-14, 70, 0], [-14, -14, 0]], dash: true },
    ...box(0, 0, 0, 36, 56, 44),
    ...box(50, 0, 0, 36, 56, 86),
    ...box(100, 0, 0, 36, 56, 128),
    { pts: [[18, 56, 58], [68, 56, 100], [118, 56, 142]], dash: true },
  ],
  research: [
    ...box(0, 0, 0, 110, 110, 110, true),
    ...box(36, 36, 36, 38, 38, 38),
    { pts: [[0, 0, 0], [36, 36, 36]], dash: true },
    { pts: [[110, 110, 110], [74, 74, 74]], dash: true },
  ],
}

export type IconName = keyof typeof ICONS

export function LineIcon({ name, className }: { name: IconName; className?: string }) {
  const segs = ICONS[name] ?? []
  const projected = segs.map((seg) => ({ ...seg, pts: seg.pts.map(iso) }))
  const all = projected.flatMap((seg) => seg.pts)
  const xs = all.map((pt) => pt[0])
  const ys = all.map((pt) => pt[1])
  const minX = Math.min(...xs)
  const minY = Math.min(...ys)
  const w = Math.max(...xs) - minX
  const h = Math.max(...ys) - minY
  const pad = 6

  return (
    <svg
      className={className}
      viewBox={`${(minX - pad).toFixed(1)} ${(minY - pad).toFixed(1)} ${(w + pad * 2).toFixed(1)} ${(h + pad * 2).toFixed(1)}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {projected.map((seg, i) => (
        <polyline
          key={i}
          points={seg.pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')}
          className={seg.dash ? 'dash' : 'draw'}
          pathLength={seg.dash ? undefined : 1}
          style={{ '--si': i } as CSSProperties}
        />
      ))}
    </svg>
  )
}
