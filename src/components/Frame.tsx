import styles from './Frame.module.css'

/**
 * Zwei feine Senkrechte auf Höhe der Satzspiegelkanten.
 * Rein visuell — gibt der Seite ein Raster, ohne Inhalt hinzuzufügen.
 */
export function Frame() {
  return (
    <div className={styles.frame} aria-hidden="true">
      <span className={styles.line} />
      <span className={styles.line} />
    </div>
  )
}
