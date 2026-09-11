import styles from './Backdrop.module.css'

/**
 * Ornamentale Hintergrundflaeche.
 *
 * Eigenes Muster im Stil barocker Akanthusornamentik — grau auf Fast-Schwarz,
 * Gold nur als vereinzelter Punkt. Die Kachel ist gespiegelt aufgebaut und
 * damit nahtlos.
 *
 * Deckkraft und Kachelgroesse haengen an --pattern-opacity und --pattern-size
 * in tokens.css; auf 0 gesetzt verschwindet die Flaeche rueckstandslos.
 */
export function Backdrop() {
  return <div className={styles.backdrop} aria-hidden="true" />
}
