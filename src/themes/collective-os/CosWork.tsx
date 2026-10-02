import { projects } from '../../data/projects'
import { useI18n } from '../../i18n'
import { Picture } from '../../components/Picture'
import { Btn, Corners, Fade, Split, num, ui } from './ui'
import styles from './CosWork.module.css'

/**
 * Projekte als Planzeilen: links Nummer und Titel, in der Mitte die
 * Abbildung auf Rasterpapier mit Passermarken, rechts Text, Daten und
 * Aktionen. Bilder liegen zunaechst graustufig im Papier und bekommen
 * erst beim Hover ihre Farbe zurueck.
 */
export function CosWork() {
  const { t, pick } = useI18n()
  const total = String(projects.length).padStart(2, '0')

  return (
    <section id="work" className={styles.work} aria-labelledby="work-title">
      <div className={styles.head}>
        <div className={styles.headLeft}>
          <p className={`${ui.mono} ${styles.label}`}>
            [{t.work.index}] {t.nav.work}
          </p>
          <Split id="work-title" text={t.work.title} className={ui.h2} />
        </div>
        <div className={styles.headRight}>
          <p className={`${ui.mono} ${ui.ink}`}>
            [{total}] {t.work.counter}
          </p>
          <p className={`${ui.mono12} ${ui.muted}`}>{t.cos.scrollHint}</p>
        </div>
      </div>

      <div className={styles.list}>
        {projects.map((project, index) => {
          const href = project.url ?? project.github
          return (
            <article key={project.slug} className={styles.row} aria-labelledby={`p-${project.slug}`}>
              <div className={styles.left}>
                <div>
                  <p className={`${ui.mono} ${styles.num}`}>{num(index)}</p>
                  <h3 id={`p-${project.slug}`} className={`${ui.h4} ${styles.title}`}>
                    {href ? (
                      <a href={href} target="_blank" rel="noreferrer" className={styles.titleLink}>
                        {project.title}
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>
                  <p className={`${ui.mono12} ${styles.discipline}`}>{pick(project.discipline)}</p>
                </div>
                <dl className={styles.year}>
                  <dt className={ui.mono12}>{t.work.year}</dt>
                  <dd className={`${ui.mono} ${ui.ink}`}>{project.year}</dd>
                </dl>
              </div>

              <div className={styles.center}>
                <Fade className={styles.frame}>
                  <Corners />
                  {project.image ? (
                    <Picture
                      className={styles.image}
                      picture={project.image}
                      alt={project.imageAlt ? pick(project.imageAlt) : project.title}
                      sizes="(max-width: 767px) 100vw, 50vw"
                    />
                  ) : (
                    <div className={styles.placeholder} role="img" aria-label={project.title}>
                      <span className={ui.mono12}>{t.work.placeholderNote}</span>
                    </div>
                  )}
                </Fade>
                <p className={`${ui.mono10} ${styles.caption}`} aria-hidden="true">
                  <span>FIG. {String(index + 1).padStart(2, '0')}</span>
                  <span>{project.slug}</span>
                  <span>1600 × 900</span>
                </p>
              </div>

              <div className={styles.right}>
                <p className={`${ui.txt16} ${styles.desc}`}>{pick(project.description)}</p>
                <dl className={styles.specs}>
                  <div className={styles.spec}>
                    <dt className={ui.mono12}>{t.work.role}</dt>
                    <dd className={`${ui.txt14} ${ui.ink}`}>{pick(project.role)}</dd>
                  </div>
                  <div className={styles.spec}>
                    <dt className={ui.mono12}>{t.work.stack}</dt>
                    <dd className={styles.tags}>
                      {project.technologies.map((tech) => (
                        <span key={tech} className={styles.tag}>
                          {tech}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
                <div className={styles.actions}>
                  {project.url && (
                    <Btn href={project.url} external className={styles.action}>
                      {t.work.viewProject}
                    </Btn>
                  )}
                  {project.github && (
                    <Btn
                      href={project.github}
                      external
                      variant={project.url ? 'outline' : 'brand'}
                      className={styles.action}
                    >
                      {t.work.viewCode}
                    </Btn>
                  )}
                  {project.caseStudy && (
                    <Btn
                      href={`#/projekt/${project.caseStudy}`}
                      variant="outline"
                      className={styles.action}
                    >
                      {t.work.readCase}
                    </Btn>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
