import { useI18n } from '../i18n'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import styles from './Team.module.css'

export function Team() {
  const { t } = useI18n()

  return (
    <section id="team" className={styles.section} aria-labelledby="team-title">
      <div className="shell">
        <SectionHeader
          id="team-title"
          index={t.team.index}
          title={t.team.title}
          lead={t.team.lead}
        />

        <div className={styles.members}>
          {t.team.members.map((member, index) => (
            <Reveal key={`${member.name}-${index}`} className={styles.member} delay={index * 60}>
              <p className={`meta ${styles.number}`}>{String(index + 1).padStart(2, '0')}</p>
              <div>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={`meta ${styles.role}`}>{member.role}</p>
              </div>
              <p className={styles.text}>{member.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
