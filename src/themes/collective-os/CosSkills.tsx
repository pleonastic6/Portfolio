import { useState } from 'react'
import { skillGroups } from '../../data/skills'
import { useI18n } from '../../i18n'
import { Fade, Split, ui } from './ui'
import styles from './CosSkills.module.css'

/**
 * Werkzeugkasten als Akkordeon: links der Kopf (bleibt stehen),
 * rechts nummerierte Zeilen mit gestrichelten Trennern.
 */
export function CosSkills() {
  const { t, pick } = useI18n()
  const [open, setOpen] = useState<string | null>(skillGroups[0]?.id ?? null)

  return (
    <section id="skills" className={styles.skills} aria-labelledby="skills-title">
      <div className={styles.side}>
        <div className={styles.sticky}>
          <p className={`${ui.mono} ${styles.label}`}>
            [{t.skills.index}] {t.nav.skills}
          </p>
          <Split id="skills-title" text={t.skills.title} className={ui.h2} />
          <Fade as="p" className={`${ui.txt16} ${styles.lead}`} delay={100}>
            {t.skills.lead}
          </Fade>
        </div>
      </div>

      <ul className={styles.list}>
        {skillGroups.map((group, index) => {
          const isOpen = open === group.id
          const panelId = `skills-panel-${group.id}`
          const buttonId = `skills-btn-${group.id}`
          return (
            <li key={group.id} className={styles.item} data-open={isOpen}>
              <h3 className={styles.itemHeading}>
                <button
                  id={buttonId}
                  type="button"
                  className={styles.trigger}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : group.id)}
                >
                  <span className={`${ui.mono} ${styles.num}`}>{String(index + 1).padStart(2, '0')}</span>
                  <span className={`${ui.h6} ${styles.title}`}>{pick(group.title)}</span>
                  <span className={`${ui.txt16} ${styles.note}`}>{pick(group.note)}</span>
                  <span className={styles.ic} aria-hidden="true">
                    <span className={styles.icH} />
                    <span className={styles.icV} />
                  </span>
                </button>
              </h3>
              <div id={panelId} role="region" aria-labelledby={buttonId} className={styles.panel}>
                <div className={styles.panelInner}>
                  <ul className={styles.chips}>
                    {group.items.map((item) => (
                      <li key={item} className={styles.chip}>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className={`${ui.mono12} ${styles.count}`}>
                    {String(group.items.length).padStart(2, '0')} / {pick(group.title)}
                  </p>
                </div>
              </div>
              <span className={`${styles.line} ${ui.dashX}`} aria-hidden="true" />
              <span className={styles.lineHover} aria-hidden="true" />
            </li>
          )
        })}
      </ul>
    </section>
  )
}
