import { useI18n } from '../../i18n'
import { Section } from '../ui/Section'

export function About() {
  const { t } = useI18n()

  return (
    <Section id="about" title={t.about.title} eyebrow={t.about.lead}>
      <div className="grid grid--2">
        <div className="prose">
          {t.about.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div>
          <h3 className="eyebrow" style={{ marginBottom: 'var(--space-4)' }}>
            {t.about.factsTitle}
          </h3>
          <dl className="facts">
            {t.about.facts.map((fact) => (
              <div className="fact" key={fact.label}>
                <dt className="fact__label">{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  )
}
