import { useI18n } from '../../i18n'
import { Btn } from './ui'
import { LETTERS } from './letters'
import styles from './CosHero.module.css'

/** The original mark, enlarged into a construction rather than a second logo. */
function CollectiveMark() {
  return (
    <svg className={styles.mark} viewBox="-2 0 147 43" aria-hidden="true" focusable="false">
      <g className={styles.construction} transform="translate(2 -3)">
        {LETTERS.map((path, index) => <path key={index} d={path} fillRule="evenodd" />)}
      </g>
      <g className={styles.letters}>
        {LETTERS.map((path, index) => (
          <path key={index} d={path} fillRule="evenodd" className={index === 0 ? styles.accent : undefined} />
        ))}
      </g>
      <g className={styles.pixels}>
        <path d="M0 3h1v1H0zM2 3h1v1H2zM0 5h1v1H0zM140 37h1v1h-1zM142 37h1v1h-1zM142 39h1v1h-1z" />
      </g>
    </svg>
  )
}

export function CosHero() {
  const { t } = useI18n()

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.identity}>
        <p className={styles.label}>{t.hero.label}</p>
        <CollectiveMark />
      </div>
      <div className={styles.statement}>
        <h1 id="hero-title" className={styles.title}>
          {t.hero.headline.map((line) => <span key={line}>{line}</span>)}
        </h1>
        <div className={styles.copy}>
          <p className={styles.lead}>{t.hero.lead}</p>
          <Btn href="#work" variant="outline" className={styles.discover}>{t.hero.cta}</Btn>
        </div>
      </div>
    </section>
  )
}
