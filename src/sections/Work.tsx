import { projects } from '../data/projects'
import { useI18n } from '../i18n'
import { ProjectItem } from '../components/ProjectItem'
import { SectionHeader } from '../components/SectionHeader'
import styles from './Work.module.css'

export function Work() {
  const { t } = useI18n()

  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <div className="shell">
        <SectionHeader
          id="work-title"
          index={t.work.index}
          title={t.work.title}
          meta={`${String(projects.length).padStart(3, '0')} / ${t.work.counter}`}
        />

        <div className={styles.list}>
          {projects.map((project, index) => (
            <ProjectItem
              key={project.slug}
              project={project}
              index={index}
              total={projects.length}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
