import { useI18n } from '../../i18n'
import { Fade, Split, num, ui } from './ui'
import { CosVisualAsset } from './CosVisualAsset'
import { LETTERS, LETTER_BOX } from './letters'
import styles from './CosTeam.module.css'

/**
 * Vier dunkle Tafeln, versetzt links und rechts einer Mittellinie —
 * wie Arbeitsschritte, die nacheinander ins Bild kommen.
 */
export function CosTeam() {
  const { t } = useI18n()

  return (
    <section id="team" className={styles.team} aria-labelledby="team-title">
      <div className={styles.head}>
        <div className={styles.headLeft}>
          <p className={`${ui.mono} ${styles.label}`}>
            [{t.team.index}] {t.team.title}
          </p>
          <Split id="team-title" text={t.cos.teamHeadline} className={ui.h2} />
        </div>
        <div className={styles.headRight}>
          <Fade as="p" className={ui.txt16}>
            {t.team.lead}
          </Fade>
          <p className={`${ui.mono} ${ui.muted}`}>{t.cos.scrollHint}</p>
        </div>
      </div>

      <div className={styles.signalPlate}>
        <CosVisualAsset kind="cables" index="NET / 04" caption="four-node signal map" className={styles.signalAsset} />
        <CosVisualAsset kind="lamellae" index="MAT / 05" caption="black system material" className={styles.materialAsset} />
      </div>

      <div className={styles.main}>
        <span className={styles.divider} aria-hidden="true" />
        <span className={styles.topLine} aria-hidden="true" />
        <ul className={styles.list}>
          {t.team.members.map((member, index) => (
            <li key={`${member.name}-${index}`} className={styles.item}>
              <Fade className={styles.card} delay={80}>
                <div className={styles.cardTop}>
                  <span className={styles.cardNum}>{num(index)}</span>
                  <span className={styles.cardSq} aria-hidden="true" />
                </div>
                <svg className={styles.letter} viewBox={LETTER_BOX[index] ?? LETTER_BOX[1]} aria-hidden="true" focusable="false">
                  <path d={LETTERS[index] ?? LETTERS[1]} fillRule="evenodd" />
                </svg>
                <div className={styles.cardBody}>
                  <h3 className={`${ui.h6} ${styles.name}`}>{member.name}</h3>
                  <p className={`${ui.mono12} ${styles.role}`}>{member.role}</p>
                  <p className={`${ui.txt16} ${styles.text}`}>{member.text}</p>
                </div>
              </Fade>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
