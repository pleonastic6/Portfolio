import type { Picture as PictureData } from '../data/site'

type PictureProps = {
  picture: PictureData
  alt: string
  className?: string
  /** Wie breit das Bild im Layout tatsaechlich steht — steuert die Auswahl aus srcset. */
  sizes?: string
  loading?: 'lazy' | 'eager'
}

/**
 * Bild in mehreren Breiten: WebP per srcset, JPEG als Rueckfalloption.
 * width und height stehen am <img>, damit der Platz vor dem Laden feststeht.
 */
export function Picture({
  picture,
  alt,
  className,
  sizes = '(max-width: 62rem) 100vw, 60vw',
  loading = 'lazy',
}: PictureProps) {
  const srcSet = picture.sources.map((source) => `${source.src} ${source.width}w`).join(', ')

  return (
    <picture>
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img
        className={className}
        src={picture.fallback}
        alt={alt}
        width={picture.width}
        height={picture.height}
        loading={loading}
        decoding="async"
      />
    </picture>
  )
}
