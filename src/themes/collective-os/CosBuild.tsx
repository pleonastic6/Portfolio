import { useI18n } from '../../i18n'
import { LineIcon, type IconName } from './LineIcon'
import { Fade, Split, num, ui } from './ui'
import styles from './CosBuild.module.css'

const ICONS: IconName[] = ['interface', 'automation', 'data', 'research']

/**
 * Vier Spalten nebeneinander, getrennt durch Haarlinien. Jede Spalte:
 * Kopfzeile mit Stichwort und Nummer, Strichzeichnung, Titel und Text.
 * Beim Hover zieht sich die Zeichnung nach und ein Raster erscheint.
 */
export function CosBuild() {
  const { t } = useI18n()

  return (
    <section id="build" className={styles.build} aria-labelledby="build-title">
      <div className={styles.head}>
        <div className={styles.titleWrap}>
          <p className={`${ui.mono} ${styles.label}`}>
            [{t.build.index}] {t.nav.build}
          </p>
          <Split id="build-title" text={t.build.title} className={ui.h2} />
        </div>
        <Fade as="p" className={`${ui.txt16} ${styles.sub}`} delay={120}>
          {t.build.lead}
        </Fade>
      </div>

      <ul className={styles.list}>
        {t.build.items.map((item, index) => (
          <li key={item.title} className={styles.item}>
            <div className={styles.itemHead}>
              <span className={`${ui.mono} ${ui.ink} ${styles.itemKey}`}>
                {t.cos.buildKeywords[index]}
              </span>
              <span className={`${ui.mono} ${ui.muted}`}>{num(index)}</span>
            </div>
            <div className={styles.main}>
              <div className={styles.img}>
                <LineIcon name={ICONS[index] ?? 'research'} className={styles.icon} />
              </div>
              <div className={styles.content}>
                <span className={styles.dot} aria-hidden="true" />
                <h3 className={`${ui.h5} ${styles.title}`}>{item.title}</h3>
                <p className={`${ui.txt16} ${styles.text}`}>{item.text}</p>
              </div>
              <span className={`${styles.plus} ${styles.pTL}`} aria-hidden="true" />
              <span className={`${styles.plus} ${styles.pTR}`} aria-hidden="true" />
              <span className={`${styles.plus} ${styles.pBL}`} aria-hidden="true" />
              <span className={`${styles.plus} ${styles.pBR}`} aria-hidden="true" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
