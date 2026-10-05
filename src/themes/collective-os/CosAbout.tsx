import { site } from '../../data/site'
import { skillGroups } from '../../data/skills'
import { useI18n } from '../../i18n'
import { ScrollText } from './ScrollText'
import { CosVisualAsset } from './CosVisualAsset'
import { Btn, Fade, ui } from './ui'
import styles from './CosAbout.module.css'

/**
 * Grosses Statement in Versalien, das sich beim Scrollen einfaerbt.
 * Darunter Text und Eckdaten als Tabelle, ganz unten ein Laufband mit dem
 * Werkzeugkasten — dort, wo andere ihre Kundenlogos zeigen.
 */
export function CosAbout() {
  const { t, pick } = useI18n()
  const stack = skillGroups.flatMap((group) => group.items)

  const facts = [
    { label: t.about.facts.location, value: pick(site.location) },
    { label: t.about.facts.focus, value: t.about.values.focus },
    { label: t.about.facts.studies, value: t.about.values.studies },
    { label: t.about.facts.status, value: t.about.values.status },
  ]

  return (
    <section id="about" className={styles.about} aria-labelledby="about-title">
      <div className={styles.head}>
        <h2 id="about-title" className={ui.mono}>
          [{t.about.index}] {t.about.title}
        </h2>
        <p className={`${ui.mono12} ${ui.muted}`}>
          {t.cos.sheet} {t.about.index} / 06
        </p>
      </div>

      <div className={styles.main}>
        <ScrollText text={t.about.statement} className={`${ui.h3} ${styles.statement}`} />
        <Fade className={styles.btnWrap} delay={100}>
          <Btn variant="outline" href="#team">
            {t.cos.learnMore}
          </Btn>
        </Fade>
      </div>

      <div className={styles.visuals}>
        <CosVisualAsset kind="paper" index="MAT / 02" caption="process sheet" className={styles.visualLarge} />
        <CosVisualAsset kind="pixels" index="MAT / 03" caption="display texture" className={styles.visualSmall} />
      </div>

      <div className={styles.detail}>
        <div className={styles.bio}>
          {t.about.bio.map((paragraph) => (
            <Fade key={paragraph.slice(0, 24)} as="p" className={`${ui.txt16} ${styles.bioText}`}>
              {paragraph}
            </Fade>
          ))}
        </div>
        <dl className={styles.facts}>
          {facts.map((fact) => (
            <div key={fact.label} className={styles.fact}>
              <dt className={ui.mono12}>{fact.label}</dt>
              <dd className={`${ui.txt16} ${ui.ink}`}>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={styles.strip}>
        <p className={`${ui.mono} ${styles.stripLabel}`}>{t.cos.stackLabel}</p>
        <div className={styles.marquee} aria-label={stack.join(', ')} role="img">
          {[0, 1].map((copy) => (
            <ul key={copy} className={styles.track} aria-hidden="true">
              {stack.map((item) => (
                <li key={`${copy}-${item}`} className={styles.chip}>
                  <span className={styles.chipDot} />
                  {item}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <p className={`${ui.mono12} ${styles.note}`}>{t.skills.lead}</p>
    </section>
  )
}
