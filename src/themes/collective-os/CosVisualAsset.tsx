import type { CSSProperties } from 'react'
import machine from '../../assets/design05/modular-blocks.webp'
import paperGrid from '../../assets/design05/paper-grid.webp'
import displayPixels from '../../assets/design05/display-pixels.webp'
import blackLamellae from '../../assets/design05/organic-lamellae.webp'
import cableDiagram from '../../assets/design05/signal-cubes.webp'
import { Corners, ui } from './ui'
import styles from './CosVisualAsset.module.css'

export type CosVisualAssetKind = 'machine' | 'paper' | 'pixels' | 'lamellae' | 'cables'

const ASSETS: Record<CosVisualAssetKind, { src: string; code: string; alt: string }> = {
  machine: {
    src: machine,
    code: 'COLLECTIVE MACHINE',
    alt: 'Abstract modular black blocks connected by thin metal lines on an off-white studio surface',
  },
  paper: {
    src: paperGrid,
    code: 'PAPER GRID',
    alt: 'Off-white architectural paper grid with small lime marker pins and long shadows',
  },
  pixels: {
    src: displayPixels,
    code: 'DISPLAY PIXELS',
    alt: 'Macro photograph of glowing display pixels behind dark glass',
  },
  lamellae: {
    src: blackLamellae,
    code: 'ORGANIC MATERIAL',
    alt: 'Abstract organic lamellae in graphite and off-white tones',
  },
  cables: {
    src: cableDiagram,
    code: 'SIGNAL MAP',
    alt: 'Black cables and lime connector blocks arranged like a precise signal diagram',
  },
}

type CosVisualAssetProps = {
  kind: CosVisualAssetKind
  index: string
  caption?: string
  className?: string
  bleed?: boolean
  tone?: 'card' | 'strip' | 'quiet'
}

const pixels = Array.from({ length: 18 })

/**
 * Midjourney aesthetic images are treated as interface objects, not content screenshots:
 * framed, labelled, gridded and hover-masked so the theme owns the style.
 */
export function CosVisualAsset({
  kind,
  index,
  caption,
  className = '',
  bleed = false,
  tone = 'card',
}: CosVisualAssetProps) {
  const asset = ASSETS[kind]

  return (
    <figure className={`${styles.asset} ${className}`} data-bleed={bleed} data-kind={kind} data-tone={tone}>
      <div className={styles.frame} data-cursor="hover">
        <img className={styles.image} src={asset.src} alt={asset.alt} loading="eager" decoding="async" />
        <span className={styles.grid} aria-hidden="true" />
        <span className={styles.scan} aria-hidden="true" />
        <span className={styles.marker} aria-hidden="true" />
        <Corners thin />
        <div className={styles.pixelRail} aria-hidden="true">
          {pixels.map((_, i) => (
            <span key={i} style={{ '--p': i } as CSSProperties} />
          ))}
        </div>
        <figcaption className={styles.label}>
          <span className={ui.mono12}>{index}</span>
          <span className={styles.code}>{asset.code}</span>
          {caption ? <span className={styles.caption}>{caption}</span> : null}
        </figcaption>
      </div>
    </figure>
  )
}
