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
/** Die Punktmarke laeuft jetzt auch auf Mobile; CSS positioniert sie je Viewport. */
const AB_BREITE = '(min-width: 0px)'
/** Wirkradius des Zeigers, im Koordinatenraum der Marke (Breite 141). */
const RADIUS = 24
/** Wie weit ein Punkt direkt unter dem Zeiger hoechstens ausweicht. */
const KRAFT = 13
/** Je kleiner, desto traeger weichen die Punkte aus und kehren zurueck. */
const TRAEGHEIT = 0.14

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
  /** Aktuelles Ausweichen vor dem Zeiger; laeuft weich auf null zurueck. */
  ox: number
  oy: number
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
          ox: 0,
          oy: 0,
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
     * Alles Schwere erst, wenn die Seite wirklich steht: die Schriften sind da
     * und der Browser hat ein Bild gezeichnet. Frueher
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

      /** Zeigerposition im Koordinatenraum der Marke; ausserhalb = weit weg. */
      let zeigerX = -9999
      let zeigerY = -9999
      /** Bleibt wahr, solange noch ein Punkt aus seiner Ruhelage verschoben ist. */
      let inBewegung = false

      /*
       * Farben aus dem Theme statt fest verdrahtet: im Terminal-Theme ist das
       * Gold ein Bernstein und das Weiss ein Phosphorgruen. Einmal pro Aufbau
       * gelesen — getComputedStyle in der Zeichenschleife waere eine
       * Layout-Abfrage pro Bild.
       */
      const stil = getComputedStyle(document.documentElement)
      const farbeAkzent = stil.getPropertyValue('--c-accent').trim() || '#c9aa6a'
      const farbeText = stil.getPropertyValue('--c-text').trim() || '#f4efe4'

      const zeichnen = (verstrichen: number) => {
        ctx.clearRect(0, 0, breite, hoehe)
        const gr = Math.max(1.2, skala * 0.5)
        inBewegung = false

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

          /*
           * Ausweichen vor dem Zeiger. Berechnet wird ein Zielversatz, der mit
           * dem Abstand abnimmt; der tatsaechliche Versatz laeuft ihm nur
           * traege hinterher. Dadurch weichen die Punkte weich aus und finden
           * ebenso weich zurueck, statt zu springen.
           */
          let zielX = 0
          let zielY = 0
          if (t === 1) {
            const dx = p.zx - zeigerX
            const dy = p.zy - zeigerY
            const quadrat = dx * dx + dy * dy
            if (quadrat < RADIUS * RADIUS) {
              const abstand = Math.sqrt(quadrat) || 0.0001
              const staerke = (1 - abstand / RADIUS) ** 2 * KRAFT
              zielX = (dx / abstand) * staerke
              zielY = (dy / abstand) * staerke
            }
          }
          p.ox += (zielX - p.ox) * TRAEGHEIT
          p.oy += (zielY - p.oy) * TRAEGHEIT
          if (p.ox > 0.02 || p.ox < -0.02 || p.oy > 0.02 || p.oy < -0.02) {
            inBewegung = true
            x += p.ox
            y += p.oy
          } else {
            p.ox = 0
            p.oy = 0
          }

          ctx.globalAlpha = e * (p.gold ? 1 : 0.86)
          ctx.fillStyle = p.gold ? farbeAkzent : farbeText
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

      /*
       * Zeigerposition, zunaechst in Fensterkoordinaten. Das Canvas selbst
       * nimmt keine Ereignisse an — es liegt hinter dem Text und ist fuer
       * Klicks durchlaessig —, deshalb hoert das Fenster zu. Umgerechnet wird
       * erst im Bild, hoechstens einmal pro Bild: eine Umrechnung im
       * Ereignis waere eine Layout-Abfrage bei jeder Mausbewegung.
       */
      let klientX = -99999
      let klientY = -99999

      const beiZeiger = (e: PointerEvent) => {
        klientX = e.clientX
        klientY = e.clientY
      }
      const zeigerWeg = () => {
        klientX = -99999
        klientY = -99999
      }

      const schritt = (jetzt: number) => {
        if (start === 0) start = jetzt
        const verstrichen = jetzt - start

        if (klientX > -99998) {
          const box = canvas.getBoundingClientRect()
          zeigerX = (klientX - box.left) / skala
          zeigerY = (klientY - box.top - versatzY) / skala
        } else {
          zeigerX = -9999
          zeigerY = -9999
        }

        // Volle Bildrate waehrend des Anflugs und solange Punkte dem Zeiger
        // ausweichen; im Ruhezustand reichen dreissig Bilder pro Sekunde. Das
        // Schwingen betraegt dort ein bis zwei Pixel, die halbe Bildrate faellt
        // nicht auf — der Rechenaufwand halbiert sich aber.
        const fluessig = verstrichen <= ANKUNFT + STREUUNG || inBewegung
        if (fluessig || jetzt - letztes >= 32) {
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

      // Nur bei echter Maus: auf Touch gibt es keinen Zeiger zum Ausweichen.
      const mitZeiger = window.matchMedia('(hover: hover) and (pointer: fine)').matches
      if (mitZeiger) {
        window.addEventListener('pointermove', beiZeiger, { passive: true })
        document.addEventListener('pointerleave', zeigerWeg)
      }

      abraeumen = () => {
        anhalten()
        beobachter.disconnect()
        document.removeEventListener('visibilitychange', beiSichtbarkeit)
        window.removeEventListener('resize', beiGroesse)
        window.removeEventListener('pointermove', beiZeiger)
        document.removeEventListener('pointerleave', zeigerWeg)
      }
    }

    /*
     * Startsignal. Ohne es liefe der Anflug ab, waehrend der Browser noch mit
     * dem Aufbau der Seite beschaeftigt ist — zu sehen bekaeme man nur sein
     * Ende. Die 1200 ms sind die Notbremse, falls document.fonts nie meldet.
     */
    let abgebrochen = false
    const notbremse = new Promise<void>((res) => window.setTimeout(res, 1200))
    const schriften = document.fonts ? document.fonts.ready.then(() => undefined) : Promise.resolve()

    void Promise.race([schriften, notbremse]).then(() => {
      if (abgebrochen) return
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!abgebrochen) aufbauen()
        })
      })
    })

    return () => {
      abgebrochen = true
      abraeumen?.()
    }
  }, [])

  return <canvas ref={canvasRef} className={`${styles.canvas} ${className ?? ''}`} aria-hidden="true" />
}
