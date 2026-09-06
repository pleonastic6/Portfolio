import { Reveal } from './Reveal'
import styles from './SectionHeader.module.css'

type SectionHeaderProps = {
  index: string
  title: string
  /** kleine technische Angabe am rechten Rand, z.B. "003 / PROJECTS" */
  meta?: string
  lead?: string
  id?: string
}

/** Einheitlicher Kopf jeder Sektion: Hairline, Index, Titel, optionale Meta. */
export function SectionHeader({ index, title, meta, lead, id }: SectionHeaderProps) {
  return (
    <Reveal className={styles.header}>
      <div className={styles.rule} aria-hidden="true" />
      <div className={styles.row}>
        {/* bleibt eine echte h2 — sieht nur aus wie eine technische Beschriftung */}
        <h2 id={id} className={`label ${styles.marker}`}>
          <span className={styles.index}>{index}</span>
          <span className={styles.slash} aria-hidden="true">
            /
          </span>
          <span className={styles.title}>{title}</span>
        </h2>
        {meta && <p className={`label ${styles.meta}`}>{meta}</p>}
      </div>
      {lead && <p className={styles.lead}>{lead}</p>}
    </Reveal>
  )
}
