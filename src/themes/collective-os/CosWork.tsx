import { projects } from '../../data/projects'
import { useI18n } from '../../i18n'
import { Picture } from '../../components/Picture'
import { Arrow, num } from './ui'
import styles from './CosWork.module.css'

/** Image-led project essays; metadata remains available without competing with the work. */
export function CosWork() {
  const { t, pick } = useI18n()

  return (
    <section id="work" className={styles.work} aria-labelledby="work-title">
      <div className={styles.head}>
        <h2 id="work-title" className={styles.heading}>{t.work.title}</h2>
        <p className={styles.counter}>{String(projects.length).padStart(2, '0')} {t.work.counter}</p>
      </div>
      <div className={styles.list}>
        {projects.map((project, index) => {
          const href = project.url ?? project.github
          const image = project.image ? (
            <Picture
              className={styles.image}
              picture={project.image}
              alt={project.imageAlt ? pick(project.imageAlt) : project.title}
              sizes={index % 3 === 0 ? '94vw' : '(max-width: 991px) 94vw, 76vw'}
            />
          ) : (
            <div className={styles.placeholder} role="img" aria-label={project.title}>
              {t.work.placeholderNote}
            </div>
          )
          return (
            <article key={project.slug} className={styles.project} aria-labelledby={`p-${project.slug}`}>
              {href ? (
                <a className={styles.media} href={href} target="_blank" rel="noreferrer">{image}</a>
              ) : <div className={styles.media}>{image}</div>}
              <div className={styles.story}>
                <div className={styles.identity}>
                  <p className={styles.kicker}><span>{num(index)}</span> {pick(project.discipline)}</p>
                  <h3 id={`p-${project.slug}`} className={styles.title}>
                    {href ? <a href={href} target="_blank" rel="noreferrer">{project.title}</a> : project.title}
                  </h3>
                </div>
                <div className={styles.copy}>
                  <p className={styles.desc}>{pick(project.description)}</p>
                  <dl className={styles.specs}>
                    <div><dt>{t.work.year}</dt><dd>{project.year}</dd></div>
                    <div><dt>{t.work.role}</dt><dd>{pick(project.role)}</dd></div>
                    <div><dt>{t.work.stack}</dt><dd>{project.technologies.join(' · ')}</dd></div>
                  </dl>
                  <div className={styles.actions}>
                    {project.url && <a href={project.url} target="_blank" rel="noreferrer">{t.work.viewProject}<Arrow /></a>}
                    {project.github && <a href={project.github} target="_blank" rel="noreferrer">{t.work.viewCode}<Arrow /></a>}
                    {project.caseStudy && <a href={`#/projekt/${project.caseStudy}`}>{t.work.readCase}<Arrow /></a>}
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
