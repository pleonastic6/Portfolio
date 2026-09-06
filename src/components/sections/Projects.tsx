import { projects } from '../../content/site'
import { useI18n } from '../../i18n'
import { Section } from '../ui/Section'

export function Projects() {
  const { t } = useI18n()

  return (
    <Section id="projects" title={t.projects.title} lead={t.projects.lead}>
      <div className="grid grid--3" role="list">
        {projects.map((project) => {
          const copy = t.projects.items[project.id]

          return (
            <article className="card" key={project.id} role="listitem">
              <div className="card__media">
                {project.image && <img src={project.image} alt="" loading="lazy" />}
              </div>

              <div className="card__meta">
                <span>{copy.role}</span>
                <span>{project.year}</span>
              </div>

              <h3 className="card__title">{copy.title}</h3>
              <p className="card__text">{copy.summary}</p>
              <p className="card__text">{copy.outcome}</p>

              <div className="card__footer">
                {project.tech.map((tech) => (
                  <span className="tag" key={tech}>
                    {tech}
                  </span>
                ))}
              </div>

              {(project.liveUrl || project.repoUrl) && (
                <div className="link-row">
                  {project.liveUrl && (
                    <a className="link-inline" href={project.liveUrl} target="_blank" rel="noreferrer">
                      {t.projects.viewProject}
                    </a>
                  )}
                  {project.repoUrl && (
                    <a className="link-inline" href={project.repoUrl} target="_blank" rel="noreferrer">
                      {t.projects.viewCode}
                    </a>
                  )}
                </div>
              )}
            </article>
          )
        })}
      </div>
    </Section>
  )
}
