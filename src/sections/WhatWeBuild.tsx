import { useI18n } from '../i18n'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import styles from './WhatWeBuild.module.css'

export function WhatWeBuild() {
  const { t } = useI18n()

  return (
    <section id="build" className={styles.section} aria-labelledby="build-title">
      <div className="shell">
        <SectionHeader
          id="build-title"
          index={t.build.index}
          title={t.build.title}
          lead={t.build.lead}
        />

        <div className={styles.grid}>
          {t.build.items.map((item, index) => (
            <Reveal key={item.title} className={styles.card} delay={index * 70}>
              <p className={`meta ${styles.index}`}>{String(index + 1).padStart(2, '0')}</p>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.text}>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
