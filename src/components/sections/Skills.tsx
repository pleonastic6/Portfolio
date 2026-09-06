import { skillGroups } from '../../content/site'
import { useI18n } from '../../i18n'
import { Section } from '../ui/Section'

export function Skills() {
  const { t } = useI18n()

  return (
    <Section id="skills" title={t.skills.title} lead={t.skills.lead}>
      <div className="grid grid--3">
        {skillGroups.map((group) => (
          <div className="card" key={group.id}>
            <h3 className="card__title" style={{ fontSize: 'var(--text-lg)' }}>
              {t.skills.groups[group.id]}
            </h3>
            <div className="card__footer" style={{ marginTop: 0 }}>
              {group.items.map((item) => (
                <span className="tag" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
