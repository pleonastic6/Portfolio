import { useEffect, useRef, useState } from 'react'
import type { Picture as PictureData } from '../data/site'
import styles from './RisoHalftone.module.css'

/**
 * Rastert ein Bild wie einen Risodruck: zwei Farben, zwei gedrehte Punktraster.
 *
 * Kein Filter, sondern echte Rasterung — fuer jede Zelle wird die Helligkeit
 * des Bildes gemessen und ein Punkt gezeichnet, dessen Groesse davon abhaengt.
 * Genau das macht ein Drucker auch. Die beiden Raster stehen in 15 und 75 Grad
 * zueinander; diese Winkel sind im Druck ueblich, weil sich die Punkte dabei
 * am wenigsten zu einem Moire-Muster verhaken.
 *
 * Gezeichnet wird mit multiply auf Papierfarbe: wo Pink und Blau
 * uebereinanderliegen, entsteht das dunkle Violett von selbst — wie bei zwei
 * echten Druckgaengen.
 *
 * Gerechnet wird einmal, sobald das Bild ins Blickfeld kommt, danach nie
 * wieder. Schlaegt irgendetwas fehl, bleibt schlicht das normale Bild stehen.
 */

/** Rasterweite in CSS-Pixeln. Kleiner = feiner, aber teurer. */
const ZELLE = 5.5
/** Winkel der beiden Raster in Grad. */
const WINKEL_PINK = 15
const WINKEL_BLAU = 75

const PAPIER = '#f2efe6'
const PINK = '#ff48b0'
const BLAU = '#0078bf'

type RisoHalftoneProps = {
  picture: PictureData
  /** Wird nur zur Beschreibung des Ausgangsbildes gebraucht. */
  alt: string
}

/**
 * Bereitet die Helligkeiten auf: messen, auf den tatsaechlich vorkommenden
 * Umfang strecken, umkehren.
 *
 * Ohne diese Streckung saufen dunkle Vorlagen ab — eine fast schwarze
 * Benutzeroberflaeche bekommt sonst ueberall volle Farbe und wird zur
 * einfarbigen Flaeche. Ein Drucker macht dasselbe: er richtet den Tonwert
 * auf das Papier aus, statt stumpf die Rohwerte zu nehmen.
 */
function helligkeiten(daten: ImageData, anzahl: number) {
  const werte = new Float32Array(anzahl)
  const verteilung = new Uint32Array(256)

  for (let i = 0; i < anzahl; i += 1) {
    const j = i * 4
    const h =
      (0.2126 * daten.data[j] + 0.7152 * daten.data[j + 1] + 0.0722 * daten.data[j + 2]) / 255
    werte[i] = h
    verteilung[Math.min(255, (h * 255) | 0)] += 1
  }

  // 3. und 97. Perzentil als Grenzen — einzelne Ausreisser sollen den Umfang
  // nicht bestimmen.
  const unten = anzahl * 0.03
  const oben = anzahl * 0.97
  let summe = 0
  let lo = 0
  let hi = 255
  for (let k = 0; k < 256; k += 1) {
    summe += verteilung[k]
    if (summe <= unten) lo = k
    if (summe <= oben) hi = k
  }
  const tief = lo / 255
  const hoch = Math.max(tief + 0.04, hi / 255)

  for (let i = 0; i < anzahl; i += 1) {
    werte[i] = Math.min(1, Math.max(0, (werte[i] - tief) / (hoch - tief)))
  }
  return werte
}

/** Rasterung einer Farbe: Gitter drehen, Helligkeit ablesen, Punkt setzen. */
function rastern(
  ctx: CanvasRenderingContext2D,
  hell: Float32Array,
  breite: number,
  hoehe: number,
  zelle: number,
  winkelGrad: number,
  farbe: string,
  tinte: (helligkeit: number) => number,
) {
  const winkel = (winkelGrad * Math.PI) / 180
  const cos = Math.cos(winkel)
  const sin = Math.sin(winkel)
  // Das gedrehte Gitter muss die Diagonale abdecken, sonst bleiben Ecken leer.
  const reichweite = Math.ceil(Math.hypot(breite, hoehe) / zelle) + 2
  const mx = breite / 2
  const my = hoehe / 2

  ctx.fillStyle = farbe
  ctx.beginPath()

  for (let a = -reichweite; a <= reichweite; a += 1) {
    for (let b = -reichweite; b <= reichweite; b += 1) {
      // Gitterpunkt im gedrehten System, zurueck ins Bild gerechnet
      const x = mx + (a * cos - b * sin) * zelle
      const y = my + (a * sin + b * cos) * zelle
      if (x < -zelle || y < -zelle || x > breite + zelle || y > hoehe + zelle) continue

      const px = Math.min(breite - 1, Math.max(0, Math.round(x)))
      const py = Math.min(hoehe - 1, Math.max(0, Math.round(y)))
      const menge = tinte(hell[py * breite + px])
      if (menge <= 0.02) continue

      // Flaeche proportional zur Tintenmenge — deshalb die Wurzel.
      const radius = Math.sqrt(menge) * zelle * 0.72
      ctx.moveTo(x + radius, y)
      ctx.arc(x, y, radius, 0, Math.PI * 2)
    }
  }

  ctx.fill()
}

export function RisoHalftone({ picture, alt }: RisoHalftoneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [fertig, setFertig] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let abgebrochen = false

    const zeichnen = async () => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const box = canvas.getBoundingClientRect()
      if (box.width < 8 || box.height < 8) return

      // Die groesste vorhandene Fassung als Vorlage.
      const quelle = picture.sources[picture.sources.length - 1]?.src ?? picture.fallback
      const bild = new Image()
      bild.decoding = 'async'
      bild.crossOrigin = 'anonymous'

      try {
        await new Promise<void>((res, rej) => {
          bild.onload = () => res()
          bild.onerror = () => rej(new Error('Bild nicht ladbar'))
          bild.src = quelle
        })
      } catch {
        return
      }
      if (abgebrochen) return

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const breite = Math.round(box.width * dpr)
      const hoehe = Math.round(box.height * dpr)
      canvas.width = breite
      canvas.height = hoehe

      // Vorlage einmal klein einlesen, nur um Helligkeiten zu messen.
      const mess = document.createElement('canvas')
      mess.width = breite
      mess.height = hoehe
      const messCtx = mess.getContext('2d', { willReadFrequently: true })
      if (!messCtx) return
      messCtx.drawImage(bild, 0, 0, breite, hoehe)

      let daten: ImageData
      try {
        daten = messCtx.getImageData(0, 0, breite, hoehe)
      } catch {
        return
      }
      if (abgebrochen) return

      const hell = helligkeiten(daten, breite * hoehe)

      ctx.fillStyle = PAPIER
      ctx.fillRect(0, 0, breite, hoehe)
      ctx.globalCompositeOperation = 'multiply'

      const zelle = ZELLE * dpr
      /*
       * Blau traegt die Tiefen und die Zeichnung, Pink die Mitten und Lichter.
       * Beide Farben sind bei 0.78 gedeckelt: im Druck deckt keine Farbe zu
       * hundert Prozent, und genau dieses durchscheinende Papier macht den
       * Eindruck aus. Ohne Deckel entstuenden geschlossene Flaechen.
       */
      rastern(ctx, hell, breite, hoehe, zelle, WINKEL_BLAU, BLAU, (h) =>
        Math.min(0.78, Math.pow(1 - h, 1.7) * 0.95),
      )
      rastern(ctx, hell, breite, hoehe, zelle, WINKEL_PINK, PINK, (h) =>
        Math.min(0.78, Math.pow(1 - h, 0.95) * 0.82),
      )

      ctx.globalCompositeOperation = 'source-over'
      if (!abgebrochen) setFertig(true)
    }

    // Erst rechnen, wenn das Bild in die Naehe des Blickfelds kommt.
    const beobachter = new IntersectionObserver(
      ([eintrag]) => {
        if (!eintrag.isIntersecting) return
        beobachter.disconnect()
        // Nicht im selben Bild wie der Seitenaufbau — sonst ruckelt das Scrollen.
        window.setTimeout(zeichnen, 0)
      },
      { rootMargin: '300px' },
    )
    beobachter.observe(canvas)

    return () => {
      abgebrochen = true
      beobachter.disconnect()
    }
  }, [picture])

  return (
    <canvas
      ref={canvasRef}
      className={styles.halftone}
      data-fertig={fertig ? 'true' : 'false'}
      role="img"
      aria-label={alt}
    />
  )
}
