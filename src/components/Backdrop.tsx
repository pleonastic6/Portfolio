import styles from './Backdrop.module.css'

/**
 * Ornamentale Hintergrundflaeche.
 *
 * Eigenes Muster im Stil barocker Akanthusornamentik — grau auf Fast-Schwarz,
 * Gold nur als vereinzelter Punkt. Die Kachel ist gespiegelt aufgebaut und
 * damit nahtlos.
 *
 * Die Flaeche blendet beim Laden auf, driftet danach unmerklich langsam
 * diagonal und wird von einem sehr langsam atmenden Lichtschein ueberlagert.
 * Beides laeuft ueber transform/opacity und damit auf der Grafikkarte — kein
 * Video, kein Skript, keine zusaetzlichen Bytes.
 *
 * Deckkraft und Kachelgroesse haengen an --pattern-opacity und --pattern-size
 * in tokens.css; auf 0 gesetzt verschwindet die Flaeche rueckstandslos.
 */
export function Backdrop() {
  return (
    <div className={styles.backdrop} aria-hidden="true">
      <div className={styles.pattern} />
      <div className={styles.glow} />
    </div>
  )
}
