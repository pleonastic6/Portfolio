import { useEffect } from 'react'
import { findCaseStudy } from '../data/caseStudies'
import { projects } from '../data/projects'
import { site } from '../data/site'
import { useI18n } from '../i18n'
import { LanguageSwitcher } from '../components/LanguageSwitcher'
import { Picture } from '../components/Picture'
import { Reveal } from '../components/Reveal'
import styles from './CaseStudy.module.css'

/**
 * Detailseite zu einem Projekt (#/projekt/<slug>).
 * Inhalt kommt aus caseStudies.ts, Kopfdaten aus projects.ts — beide ueber den
 * Slug verbunden. Unbekannte Slugs fuehren zurueck zur Startseite.
 */
export function CaseStudy({ slug }: { slug: string }) {
  const { t, pick } = useI18n()
  const study = findCaseStudy(slug)
  const project = projects.find((entry) => entry.slug === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!project) return
    const frame = requestAnimationFrame(() => {
      document.title = `${project.title} — ${site.name}`
    })
    return () => {
      cancelAnimationFrame(frame)
      document.title = t.meta.documentTitle
    }
  }, [project, t])

  if (!study || !project) {
    return (
      <main id="main" className={`shell ${styles.missing}`}>
        <p className="label">404</p>
        <a className={`label ${styles.back}`} href="#top">
          <span aria-hidden="true">←</span> {t.legal.back}
        </a>
      </main>
    )
  }

  return (
    <div className={styles.page}>
      <header className={`shell ${styles.head}`}>
        <a className={`label ${styles.back}`} href="#work">
          <span aria-hidden="true">←</span> {t.legal.back}
        </a>
        <LanguageSwitcher />
      </header>

      <main id="main">
        <div className={`shell ${styles.intro}`}>
          <p className={`meta ${styles.meta}`}>
            {pick(project.discipline)} — {project.year}
          </p>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.lead}>{pick(study.lead)}</p>

          <dl className={styles.facts}>
            {study.facts.map((fact) => (
              <div className={styles.fact} key={fact.label.de}>
                <dt className="label">{pick(fact.label)}</dt>
                <dd>{pick(fact.value)}</dd>
              </div>
            ))}
            <div className={styles.fact}>
              <dt className="label">{t.work.stack}</dt>
              <dd>{project.technologies.join(' · ')}</dd>
            </div>
          </dl>

          <div className={styles.links}>
            {project.url && (
              <a className={styles.link} href={project.url} target="_blank" rel="noreferrer">
                {t.work.viewProject}
                <span aria-hidden="true"> ↗</span>
              </a>
            )}
            {project.github && (
              <a className={styles.link} href={project.github} target="_blank" rel="noreferrer">
                {t.work.viewCode}
                <span aria-hidden="true"> ↗</span>
              </a>
            )}
          </div>
        </div>

        {project.image && (
          <Reveal className={`shell ${styles.coverWrap}`}>
            <Picture
              className={styles.cover}
              picture={project.image}
              alt={project.imageAlt ? pick(project.imageAlt) : project.title}
              sizes="(max-width: 62rem) 100vw, 88vw"
              loading="eager"
            />
          </Reveal>
        )}

        <div className={`shell ${styles.blocks}`}>
          {study.blocks.map((block) => (
            <Reveal as="section" className={styles.block} key={block.heading.de}>
              <h2 className={styles.heading}>{pick(block.heading)}</h2>
              <div className={styles.prose}>
                {block.body.map((paragraph) => (
                  <p key={pick(paragraph).slice(0, 32)}>{pick(paragraph)}</p>
                ))}
              </div>

              {block.image && (
                <figure className={styles.figure}>
                  <Picture
                    className={styles.image}
                    picture={block.image}
                    alt={block.imageAlt ? pick(block.imageAlt) : ''}
                    sizes="(max-width: 62rem) 100vw, 55vw"
                  />
                  {block.caption && (
                    <figcaption className={`meta ${styles.caption}`}>{pick(block.caption)}</figcaption>
                  )}
                </figure>
              )}
            </Reveal>
          ))}
        </div>

        <div className={`shell ${styles.foot}`}>
          <a className={`label ${styles.back}`} href="#work">
            <span aria-hidden="true">←</span> {t.legal.back}
          </a>
        </div>
      </main>
    </div>
  )
}
