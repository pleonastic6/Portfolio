import { useEffect, useRef } from 'react'
import styles from './ParticleMark.module.css'

/**
 * Die Wortmarke, aus Punkten zusammengesetzt.
 *
 * Beim Start schweben die Punkte von aussen herein und finden ihren Platz;
 * danach atmen sie leicht weiter, damit die Flaeche nicht einfriert.
 *
 * Die Punkte stammen direkt aus den Pfaden der Wortmarke: ueber ein Raster
 * wird geprueft, welche Felder innerhalb der Buchstabenform liegen
 * (Path2D + isPointInPath). Damit braucht es keine zusaetzliche Bilddatei,
 * nichts muss geladen werden, und eine Aenderung an der Marke schlaegt
 * automatisch durch.
 */

/** Pfade der Wortmarke, Koordinatenraum 141 x 38 — identisch zu Wordmark.tsx. */
const PFAD_A =
  'M15.0 8 L30.0 38.0 L22.75 38.0 L19.875 32.0 L10.125 32.0 L7.25 38.0 L0 38.0 Z M12.625 26.875 L17.375 26.875 L15.0 21.25 Z'
const PFADE_D = [
  'M37 8 L49.5 8 A15.0 15.0 0 0 1 49.5 38.0 L37 38.0 Z M43.75 14.75 L43.75 31.25 L49.0 31.25 A8.25 8.25 0 0 0 49.0 14.75 Z',
  'M74 8 L86.5 8 A15.0 15.0 0 0 1 86.5 38.0 L74 38.0 Z M80.75 14.75 L80.75 31.25 L86.0 31.25 A8.25 8.25 0 0 0 86.0 14.75 Z',
  'M111 8 L123.5 8 A15.0 15.0 0 0 1 123.5 38.0 L111 38.0 Z M117.75 14.75 L117.75 31.25 L123.0 31.25 A8.25 8.25 0 0 0 123.0 14.75 Z',
]

const BREITE = 141
const HOEHE = 38

/**
 * Rasterweite im Koordinatenraum der Marke. Pro Rasterfeld innerhalb der
 * Buchstabenform entstehen mehrere zufaellig verteilte Punkte. Das grobe Raster
 * spart Pruefungen — teuer ist isPointInPath, nicht der Punkt selbst —, die
 * Streuung im Feld sorgt trotzdem fuer eine dichte, unregelmaessige Wolke.
 */
const RASTER = 1.9
const PRO_FELD = 3
const ANKUNFT = 1500
const STREUUNG = 900
/** Unterhalb dieser Breite blendet das Stylesheet die Flaeche aus. */
const AB_BREITE = '(min-width: 64.0625rem)'

type Punkt = {
  /** Zielposition, im Koordinatenraum der Marke */
  zx: number
  zy: number
  /** Startposition, weit ausserhalb */
  sx: number
  sy: number
  /** Beginn der Reise in ms */
  ab: number
  /** Eigener Takt fuers Atmen danach */
  takt: number
  weite: number
  gold: boolean
}

function punkteSammeln(): Punkt[] {
  const a = new Path2D(PFAD_A)
  const ds = PFADE_D.map((d) => new Path2D(d))

  // Ein Messkontext, nur fuer isPointInPath — nichts davon wird gezeichnet.
  const mess = document.createElement('canvas').getContext('2d')
  if (!mess) return []

  const punkte: Punkt[] = []
  for (let y = RASTER / 2; y < HOEHE; y += RASTER) {
    for (let x = RASTER / 2; x < BREITE; x += RASTER) {
      const imA = mess.isPointInPath(a, x, y, 'evenodd')
      const imD = !imA && ds.some((d) => mess.isPointInPath(d, x, y, 'evenodd'))
      if (!imA && !imD) continue

      for (let n = 0; n < PRO_FELD; n += 1) {
        // Innerhalb des Feldes frei verteilt, sonst sieht man das Raster.
        const zx = x + (Math.random() - 0.5) * RASTER
        const zy = y + (Math.random() - 0.5) * RASTER

        // Start auf einer Ellipse weit ausserhalb der Marke.
        const winkel = Math.random() * Math.PI * 2
        const weg = 1.5 + Math.random() * 1.6
        punkte.push({
          zx,
          zy,
          sx: BREITE / 2 + Math.cos(winkel) * BREITE * 0.6 * weg,
          sy: HOEHE / 2 + Math.sin(winkel) * HOEHE * 2.4 * weg,
          // Von links nach rechts eintrudeln, mit Zufallsanteil.
          ab: (x / BREITE) * STREUUNG * 0.55 + Math.random() * STREUUNG * 0.45,
          takt: Math.random() * Math.PI * 2,
          weite: 0.25 + Math.random() * 0.5,
          gold: imA,
        })
      }
    }
  }
  return punkte
}

/** Weich auslaufend — dieselbe Kurve wie --ease in tokens.css. */
function beruhigen(t: number) {
  return 1 - Math.pow(1 - t, 5)
}

export function ParticleMark({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Schmale Fenster zeigen die Flaeche gar nicht an (siehe Stylesheet).
    // Dann wird hier auch nichts gerechnet — sonst kostet das Aufstellen der
    // Punkte Rechenzeit auf genau den Geraeten, die davon nichts sehen.
    if (!window.matchMedia(AB_BREITE).matches) return

    let abraeumen: (() => void) | undefined

    /*
     * Alles Schwere erst auf das Startsignal aus main.tsx: die Anwendung steht
     * dann, die Schriften sind da und ein erstes Bild ist gezeichnet. Frueher
     * wuerde das Aufstellen der Punkte den Seitenaufbau bremsen — und der
     * Anflug liefe ab, waehrend niemand hinsieht.
     */
    const aufbauen = () => {
      const ctx = canvas.getContext('2d', { alpha: true })
      if (!ctx) return

      const punkte = punkteSammeln()
      if (punkte.length === 0) return

      let breite = 0
      let hoehe = 0
      let skala = 1
      let versatzY = 0

      const messen = () => {
        const box = canvas.getBoundingClientRect()
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        breite = box.width
        hoehe = box.height
        canvas.width = Math.round(breite * dpr)
        canvas.height = Math.round(hoehe * dpr)
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        skala = breite / BREITE
        versatzY = (hoehe - HOEHE * skala) / 2
      }

      const zeichnen = (verstrichen: number) => {
        ctx.clearRect(0, 0, breite, hoehe)
        const gr = Math.max(1.2, skala * 0.5)

        for (const p of punkte) {
          const t = Math.min(1, Math.max(0, (verstrichen - p.ab) / ANKUNFT))
          if (t <= 0) continue
          const e = beruhigen(t)

          let x = p.sx + (p.zx - p.sx) * e
          let y = p.sy + (p.zy - p.sy) * e

          // Nach der Ankunft ein leises Schwingen um den eigenen Platz.
          if (t === 1) {
            const s = verstrichen / 1000
            x += Math.sin(s * 0.55 + p.takt) * p.weite
            y += Math.cos(s * 0.42 + p.takt * 1.7) * p.weite * 0.7
          }

          ctx.globalAlpha = e * (p.gold ? 1 : 0.86)
          ctx.fillStyle = p.gold ? '#c9aa6a' : '#f4efe4'
          ctx.fillRect(x * skala, versatzY + y * skala, gr, gr)
        }
        ctx.globalAlpha = 1
      }

      messen()

      // Ohne Bewegungswunsch: einmal fertig hinzeichnen, kein Bildlauf.
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        zeichnen(ANKUNFT + STREUUNG)
        const beiGroesse = () => {
          messen()
          zeichnen(ANKUNFT + STREUUNG)
        }
        window.addEventListener('resize', beiGroesse)
        abraeumen = () => window.removeEventListener('resize', beiGroesse)
        return
      }

      let bild = 0
      let start = 0
      let pausiert = 0
      let laeuft = false
      let letztes = 0

      const schritt = (jetzt: number) => {
        if (start === 0) start = jetzt
        const verstrichen = jetzt - start

        // Waehrend des Anflugs jedes Bild, danach nur noch dreissig pro
        // Sekunde: das Schwingen betraegt ein bis zwei Pixel, dort faellt die
        // halbe Bildrate nicht auf — der Rechenaufwand halbiert sich aber.
        if (verstrichen <= ANKUNFT + STREUUNG || jetzt - letztes >= 32) {
          letztes = jetzt
          zeichnen(verstrichen)
        }
        bild = requestAnimationFrame(schritt)
      }

      const anhalten = () => {
        if (!laeuft) return
        laeuft = false
        cancelAnimationFrame(bild)
        bild = 0
        pausiert = performance.now()
      }

      const weiter = () => {
        if (laeuft) return
        laeuft = true
        // Die verlorene Zeit nachschieben, damit der Anflug nicht springt.
        if (start !== 0 && pausiert !== 0) start += performance.now() - pausiert
        bild = requestAnimationFrame(schritt)
      }

      // Nur laufen, solange die Flaeche zu sehen ist — und nur im aktiven Tab.
      const beobachter = new IntersectionObserver(
        ([eintrag]) => (eintrag.isIntersecting ? weiter() : anhalten()),
        { threshold: 0 },
      )
      const beiSichtbarkeit = () => (document.hidden ? anhalten() : weiter())
      const beiGroesse = () => messen()

      beobachter.observe(canvas)
      document.addEventListener('visibilitychange', beiSichtbarkeit)
      window.addEventListener('resize', beiGroesse)

      abraeumen = () => {
        anhalten()
        beobachter.disconnect()
        document.removeEventListener('visibilitychange', beiSichtbarkeit)
        window.removeEventListener('resize', beiGroesse)
      }
    }

    let sofort = false
    if (document.documentElement.classList.contains('is-ready')) {
      sofort = true
      aufbauen()
    } else {
      window.addEventListener('addd:ready', aufbauen, { once: true })
    }

    return () => {
      abraeumen?.()
      if (!sofort) window.removeEventListener('addd:ready', aufbauen)
    }
  }, [])

  return <canvas ref={canvasRef} className={`${styles.canvas} ${className ?? ''}`} aria-hidden="true" />
}
