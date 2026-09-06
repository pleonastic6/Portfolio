import { site } from '../data/site'
import { useI18n } from '../i18n'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import styles from './About.module.css'

export function About() {
  const { t, pick } = useI18n()

  const facts = [
    { label: t.about.facts.location, value: pick(site.location) },
    { label: t.about.facts.focus, value: t.about.values.focus },
    { label: t.about.facts.studies, value: t.about.values.studies },
    { label: t.about.facts.status, value: t.about.values.status },
  ]

  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className="shell">
        <SectionHeader id="about-title" index={t.about.index} title={t.about.title} />

        <Reveal>
          <p className={styles.statement}>{t.about.statement}</p>
        </Reveal>

        <div className={styles.grid}>
          <Reveal className={styles.bio} delay={80}>
            {t.about.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </Reveal>

          <Reveal as="dl" className={styles.facts} delay={160}>
            {facts.map((fact) => (
              <div className={styles.fact} key={fact.label}>
                <dt className="label">{fact.label}</dt>
                <dd className={styles.factValue}>{fact.value}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
