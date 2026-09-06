import { skillGroups } from '../data/skills'
import { useI18n } from '../i18n'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import styles from './Skills.module.css'

export function Skills() {
  const { t, pick } = useI18n()

  return (
    <section id="skills" className={styles.section} aria-labelledby="skills-title">
      <div className="shell">
        <SectionHeader
          id="skills-title"
          index={t.skills.index}
          title={t.skills.title}
          lead={t.skills.lead}
        />

        <div className={styles.rows}>
          {skillGroups.map((group, index) => (
            <Reveal key={group.id} className={styles.row} delay={index * 60}>
              <div className={styles.rowHead}>
                <p className={`meta ${styles.index}`}>{String(index + 1).padStart(2, '0')}</p>
                <div>
                  <h3 className={styles.category}>{pick(group.title)}</h3>
                  <p className={`meta ${styles.note}`}>{pick(group.note)}</p>
                </div>
              </div>

              <ul className={styles.items}>
                {group.items.map((item) => (
                  <li key={item} className={styles.item}>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
