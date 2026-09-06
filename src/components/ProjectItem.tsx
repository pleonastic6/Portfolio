import type { Project } from '../data/projects'
import { useI18n } from '../i18n'
import { Reveal } from './Reveal'
import styles from './ProjectItem.module.css'

type ProjectItemProps = {
  project: Project
  index: number
  total: number
}

/**
 * Editoriale Projektzeile: Kopf, großes Bild, Meta darunter.
 * Jede zweite Zeile wird leicht eingerückt — Rhythmus statt Rasterkacheln.
 */
export function ProjectItem({ project, index, total }: ProjectItemProps) {
  const { t, pick } = useI18n()
  const href = project.url ?? project.github
  const number = String(index + 1).padStart(3, '0')
  const counter = `${number} / ${String(total).padStart(3, '0')}`

  const media = (
    <div className={styles.media}>
      {project.image ? (
        <img
          className={styles.image}
          src={project.image}
          alt={project.imageAlt ? pick(project.imageAlt) : project.title}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className={styles.placeholder} role="img" aria-label={project.title}>
          <span className={styles.crosshair} aria-hidden="true" />
          <span className={`meta ${styles.placeholderLabel}`}>{t.work.placeholderNote}</span>
        </div>
      )}
    </div>
  )

  return (
    <Reveal
      as="article"
      className={styles.item}
      style={{ ['--offset' as string]: index % 2 === 1 ? '1' : '0' }}
    >
      <div className={styles.head}>
        <p className={`meta ${styles.counter}`}>{counter}</p>
        <p className={`meta ${styles.year}`}>{project.year}</p>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>
          {href ? (
            <a className={styles.titleLink} href={href} target="_blank" rel="noreferrer">
              {project.title}
              <span className={styles.arrow} aria-hidden="true">
                ↗
              </span>
            </a>
          ) : (
            project.title
          )}
        </h3>
        <p className={`label ${styles.discipline}`}>{pick(project.discipline)}</p>

        {href ? (
          <a className={styles.mediaLink} href={href} target="_blank" rel="noreferrer" tabIndex={-1}>
            {media}
          </a>
        ) : (
          media
        )}

        <div className={styles.footer}>
          <p className={styles.description}>{pick(project.description)}</p>

          <dl className={styles.specs}>
            <div className={styles.spec}>
              <dt className="label">{t.work.role}</dt>
              <dd className={styles.specValue}>{pick(project.role)}</dd>
            </div>
            <div className={styles.spec}>
              <dt className="label">{t.work.stack}</dt>
              <dd className={styles.specValue}>{project.technologies.join(' · ')}</dd>
            </div>
            {href && (
              <div className={styles.spec}>
                <dt className="sr-only">{t.work.viewProject}</dt>
                <dd className={styles.links}>
                  {project.url && (
                    <a className={styles.link} href={project.url} target="_blank" rel="noreferrer">
                      {t.work.viewProject}
                      <span className={styles.arrow} aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  )}
                  {project.github && (
                    <a
                      className={styles.link}
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t.work.viewCode}
                      <span className={styles.arrow} aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  )}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </Reveal>
  )
}
