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
 * Auf Telefonen gelten eigene Werte: weiter auseinanderstehende Spalten und
 * ein langsamerer Takt. Die Flaeche ist dort nur ein Viertel so gross wie auf
 * einem Desktopfenster — Rechenlast ist also nicht das Problem, sondern dass
 * der Regen hinter dem Text liegt statt daneben.
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
 * Unterhalb dieser Breite gelten eigene Werte. Auf einem Telefon faellt der
 * Regen hinter jede Textzeile statt in freie Flaechen — er muss also duenner
 * und ruhiger sein. Die Rechenlast ist dort dagegen kein Argument: die Flaeche
 * betraegt nur rund ein Viertel der eines Desktopfensters.
 */
const SCHMAL = '(max-width: 48rem)'
/** Weiter auseinander: weniger Spalten, ruhigeres Bild. */
const SPALTE_SCHMAL = 20
/** Langsamer — spart Akku und draengt sich weniger auf. */
const TAKT_SCHMAL = 120

/**
 * Sehr knapp ausgestattete Geraete bekommen gar nichts. navigator.deviceMemory
 * meldet den Arbeitsspeicher in Gigabyte; wo die Angabe fehlt, wird nicht
 * geraten, sondern gezeichnet.
 */
function zuSchwach() {
  const speicher = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
  return typeof speicher === 'number' && speicher <= 1
}

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

    if (zuSchwach()) return

    const ruhig = window.matchMedia('(prefers-reduced-motion: reduce)')
    const schmal = window.matchMedia(SCHMAL).matches
    const spalte = schmal ? SPALTE_SCHMAL : SPALTE
    const takt = schmal ? TAKT_SCHMAL : TAKT

    let breite = 0
    let hoehe = 0
    let spalten: Spalte[] = []

    const aufbauen = () => {
      breite = Math.floor(window.innerWidth * SKALIERUNG)
      hoehe = Math.floor(window.innerHeight * SKALIERUNG)
      canvas.width = breite
      canvas.height = hoehe
      ctx.font = `${spalte}px 'Space Mono', ui-monospace, monospace`
      ctx.textBaseline = 'top'

      const anzahl = Math.ceil(breite / spalte)
      spalten = Array.from({ length: anzahl }, () => ({
        // Verteilt starten, sonst faellt beim Laden eine geschlossene Wand.
        y: Math.random() * (hoehe / spalte) * -1,
        tempo: 0.45 + Math.random() * 0.85,
      }))
    }

    const zufallszeichen = () => ZEICHEN[(Math.random() * ZEICHEN.length) | 0]

    /** Einmal alles hinzeichnen — fuer den Fall ohne Bewegungswunsch. */
    const standbild = () => {
      ctx.clearRect(0, 0, breite, hoehe)
      ctx.fillStyle = '#7fe3a6'
      for (let i = 0; i < spalten.length; i += 1) {
        const zeilen = Math.floor(hoehe / spalte)
        for (let z = 0; z < zeilen; z += 1) {
          if (Math.random() > 0.08) continue
          ctx.globalAlpha = 0.25 + Math.random() * 0.35
          ctx.fillText(zufallszeichen(), i * spalte, z * spalte)
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
      if (jetzt - letztes < takt) return
      letztes = jetzt

      // Die ganze Flaeche leicht abdunkeln: das laesst aeltere Zeichen
      // verblassen und erzeugt die Schleppe.
      ctx.fillStyle = 'rgba(5, 8, 7, 0.18)'
      ctx.fillRect(0, 0, breite, hoehe)

      const zeilen = hoehe / spalte
      for (let i = 0; i < spalten.length; i += 1) {
        const s = spalten[i]
        s.y += s.tempo

        if (s.y < 0) continue

        const y = Math.floor(s.y) * spalte
        // Der Kopf leuchtet hell, direkt darunter liegt ein mittlerer Ton —
        // zusammen ergibt das den Eindruck eines fallenden Strahls.
        ctx.fillStyle = '#d9ffe7'
        ctx.fillText(zufallszeichen(), i * spalte, y)
        if (s.y > 1) {
          ctx.fillStyle = '#5fbd87'
          ctx.fillText(zufallszeichen(), i * spalte, y - spalte)
        }

        // Am unteren Rand mit zufaelliger Verzoegerung neu oben ansetzen,
        // damit die Spalten nicht im Gleichschritt laufen.
        if (s.y * spalte > hoehe && Math.random() > 0.975) {
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
