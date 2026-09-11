import { useEffect, useRef } from 'react'
import styles from './MatrixRain.module.css'

/**
 * Herabfallende Zeichen als Hintergrund des Terminal-Themes.
 *
 * Drei Entscheidungen halten die Kosten klein, denn eine bildschirmfuellende
 * Animation ist auf dieser Seite schon einmal der Grund fuers Ruckeln gewesen:
 *
 * 1. Elf Bilder pro Sekunde statt sechzig. Der Effekt lebt vom Stakkato;
 *    fluessiger sieht sogar falsch aus — und es ist ein Bruchteil der Arbeit.
 * 2. Gezeichnet wird auf sechzig Prozent der Bildschirmgroesse; den Rest
 *    erledigt der Browser beim Hochziehen.
 * 3. Nichts laeuft, solange der Tab im Hintergrund ist.
 *
 * Die Spur entsteht nicht dadurch, dass alte Zeichen gemerkt werden, sondern
 * indem pro Bild ein fast durchsichtiges Schwarz ueber die ganze Flaeche
 * gelegt wird: was laenger liegt, verblasst von selbst.
 */

/** Zeichenvorrat: Katakana, Ziffern, ein paar lateinische Grossbuchstaben. */
const ZEICHEN =
  'ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ADDD'
/** Spaltenabstand in Flaechenpixeln — zugleich die Schriftgroesse. */
const SPALTE = 15
/** Millisekunden zwischen zwei Bildern. */
const TAKT = 90
/**
 * Die Flaeche wird kleiner gezeichnet und vom Browser hochgezogen. Bei 0.6
 * sind es nur noch gut ein Drittel der Bildpunkte — bei einem Hintergrund, der
 * mit dreissig Prozent Deckkraft hinter allem liegt und von der Zeilenstruktur
 * ueberlagert wird, sieht man den Unterschied nicht, im Messwert dafuer sehr.
 * Nebenbei werden die Zeichen dadurch groesser und besser lesbar.
 */
const SKALIERUNG = 0.6
/**
 * Unterhalb dieser Breite entfaellt der Regen ganz. Auf einem Telefon faellt
 * er hinter jede Textzeile statt in freie Flaechen, war deshalb schon auf
 * sechzehn Prozent Deckkraft heruntergesetzt — und kostete trotzdem voll.
 * Genau die Geraete mit der wenigsten Rechenleistung haetten am meisten
 * bezahlt und am wenigsten gesehen.
 */
const AB_BREITE = '(min-width: 48.0625rem)'

type Spalte = {
  /** Zeile, in der der Kopf gerade steht */
  y: number
  /** Zeilen pro Bild */
  tempo: number
}

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    if (!window.matchMedia(AB_BREITE).matches) return

    const ruhig = window.matchMedia('(prefers-reduced-motion: reduce)')

    let breite = 0
    let hoehe = 0
    let spalten: Spalte[] = []

    const aufbauen = () => {
      breite = Math.floor(window.innerWidth * SKALIERUNG)
      hoehe = Math.floor(window.innerHeight * SKALIERUNG)
      canvas.width = breite
      canvas.height = hoehe
      ctx.font = `${SPALTE}px 'Space Mono', ui-monospace, monospace`
      ctx.textBaseline = 'top'

      const anzahl = Math.ceil(breite / SPALTE)
      spalten = Array.from({ length: anzahl }, () => ({
        // Verteilt starten, sonst faellt beim Laden eine geschlossene Wand.
        y: Math.random() * (hoehe / SPALTE) * -1,
        tempo: 0.45 + Math.random() * 0.85,
      }))
    }

    const zufallszeichen = () => ZEICHEN[(Math.random() * ZEICHEN.length) | 0]

    /** Einmal alles hinzeichnen — fuer den Fall ohne Bewegungswunsch. */
    const standbild = () => {
      ctx.clearRect(0, 0, breite, hoehe)
      ctx.fillStyle = '#7fe3a6'
      for (let i = 0; i < spalten.length; i += 1) {
        const zeilen = Math.floor(hoehe / SPALTE)
        for (let z = 0; z < zeilen; z += 1) {
          if (Math.random() > 0.08) continue
          ctx.globalAlpha = 0.25 + Math.random() * 0.35
          ctx.fillText(zufallszeichen(), i * SPALTE, z * SPALTE)
        }
      }
      ctx.globalAlpha = 1
    }

    aufbauen()

    if (ruhig.matches) {
      standbild()
      const beiGroesse = () => {
        aufbauen()
        standbild()
      }
      window.addEventListener('resize', beiGroesse)
      return () => window.removeEventListener('resize', beiGroesse)
    }

    let bild = 0
    let letztes = 0
    let laeuft = true

    const schritt = (jetzt: number) => {
      bild = requestAnimationFrame(schritt)
      if (jetzt - letztes < TAKT) return
      letztes = jetzt

      // Die ganze Flaeche leicht abdunkeln: das laesst aeltere Zeichen
      // verblassen und erzeugt die Schleppe.
      ctx.fillStyle = 'rgba(5, 8, 7, 0.18)'
      ctx.fillRect(0, 0, breite, hoehe)

      const zeilen = hoehe / SPALTE
      for (let i = 0; i < spalten.length; i += 1) {
        const s = spalten[i]
        s.y += s.tempo

        if (s.y < 0) continue

        const y = Math.floor(s.y) * SPALTE
        // Der Kopf leuchtet hell, direkt darunter liegt ein mittlerer Ton —
        // zusammen ergibt das den Eindruck eines fallenden Strahls.
        ctx.fillStyle = '#d9ffe7'
        ctx.fillText(zufallszeichen(), i * SPALTE, y)
        if (s.y > 1) {
          ctx.fillStyle = '#5fbd87'
          ctx.fillText(zufallszeichen(), i * SPALTE, y - SPALTE)
        }

        // Am unteren Rand mit zufaelliger Verzoegerung neu oben ansetzen,
        // damit die Spalten nicht im Gleichschritt laufen.
        if (s.y * SPALTE > hoehe && Math.random() > 0.975) {
          s.y = -Math.random() * zeilen * 0.5
          s.tempo = 0.45 + Math.random() * 0.85
        }
      }
    }

    const anhalten = () => {
      if (!laeuft) return
      laeuft = false
      cancelAnimationFrame(bild)
      bild = 0
    }

    const weiter = () => {
      if (laeuft) return
      laeuft = true
      letztes = 0
      bild = requestAnimationFrame(schritt)
    }

    const beiSichtbarkeit = () => (document.hidden ? anhalten() : weiter())
    const beiGroesse = () => aufbauen()

    bild = requestAnimationFrame(schritt)
    document.addEventListener('visibilitychange', beiSichtbarkeit)
    window.addEventListener('resize', beiGroesse)

    return () => {
      anhalten()
      document.removeEventListener('visibilitychange', beiSichtbarkeit)
      window.removeEventListener('resize', beiGroesse)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className={styles.rain} aria-hidden="true" />
      <div className={styles.veil} aria-hidden="true" />
    </>
  )
}
