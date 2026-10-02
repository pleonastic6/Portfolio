import type { CSSProperties } from 'react'
import { navItems, site, socials } from '../../data/site'
import { projects } from '../../data/projects'
import { useI18n } from '../../i18n'
import { StatusDot } from '../../components/StatusDot'
import { Wordmark } from '../../components/Wordmark'
import { Corners, ui } from './ui'
import { LETTERS } from './letters'
import styles from './CosFooter.module.css'


/**
 * Fussbereich als Zellenraster: Leitsatz, drei Linkspalten, die Marke,
 * darunter Kontaktdaten, eine riesige Kontur-Wortmarke und die Rechtszeile.
 */
export function CosFooter() {
  const { t, pick } = useI18n()

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={`${styles.cell} ${styles.tagline}`}>
          <p className={`${ui.h4} ${styles.taglineText}`}>{t.hero.headline.join(' ')}</p>
        </div>

        <nav className={styles.cell} aria-label={t.cos.indexLabel}>
          <p className={`${ui.mono12} ${styles.colLabel}`}>{t.cos.indexLabel}</p>
          <ul className={styles.links}>
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={item.href} className={styles.link}>
                  {t.nav[item.id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.cell}>
          <p className={`${ui.mono12} ${styles.colLabel}`}>{t.work.counter}</p>
          <ul className={styles.links}>
            {projects.slice(0, 5).map((project) => (
              <li key={project.slug}>
                <a
                  href={project.url ?? project.github ?? '#work'}
                  className={styles.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {project.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.cell}>
          <p className={`${ui.mono12} ${styles.colLabel}`}>{t.cos.legalLabel}</p>
          <ul className={styles.links}>
            <li>
              <a href="#/impressum" className={styles.link}>
                {t.footer.imprint}
              </a>
            </li>
            <li>
              <a href="#/datenschutz" className={styles.link}>
                {t.footer.privacy}
              </a>
            </li>
            <li>
              <a href="#top" className={styles.link}>
                {t.nav.home}
              </a>
            </li>
          </ul>
        </div>

        <div className={`${styles.cell} ${styles.mark}`}>
          <Wordmark className={styles.markSvg} />
        </div>

        <div className={`${styles.cell} ${styles.status}`}>
          <p className={`${ui.mono12} ${styles.colLabel}`}>{t.about.facts.status}</p>
          <StatusDot />
        </div>

        <div className={styles.cell}>
          <p className={`${ui.mono12} ${styles.colLabel}`}>{t.about.facts.location}</p>
          <p className={`${ui.txt16} ${ui.ink}`}>{pick(site.location)}</p>
        </div>

        <div className={styles.cell}>
          <p className={`${ui.mono12} ${styles.colLabel}`}>{t.contact.emailLabel}</p>
          <a href={`mailto:${site.email}`} className={`${ui.txt16} ${ui.ink} ${styles.link} ${styles.mail}`}>
            {site.email}
          </a>
        </div>

        <div className={styles.cell}>
          <p className={`${ui.mono12} ${styles.colLabel}`}>{t.contact.socialLabel}</p>
          <ul className={styles.links}>
            {socials.map((social) => (
              <li key={social.id}>
                <a href={social.href} target="_blank" rel="noreferrer" className={styles.link}>
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.big}>
        <Corners thin color="var(--cos-surface)" />
        <svg className={styles.bigSvg} viewBox="-2 6 145 34" role="img" aria-label={site.name}>
          {LETTERS.map((d, index) => (
            <path key={index} d={d} fillRule="evenodd" className={index === 0 ? styles.bigA : styles.bigD} />
          ))}
        </svg>
        <svg className={styles.bigPixels} viewBox="-2 6 145 34" aria-hidden="true" focusable="false">
          <defs>
            <clipPath id="addd-pixel-word" clipPathUnits="userSpaceOnUse">
              {LETTERS.map((d, index) => (
                <path key={index} d={d} fillRule="evenodd" />
              ))}
            </clipPath>
          </defs>
          <g clipPath="url(#addd-pixel-word)">
            {Array.from({ length: 116 }, (_, index) => {
              const col = index % 29
              const row = Math.floor(index / 29)
              return (
                <rect
                  key={index}
                  x={-2 + col * 5.1}
                  y={6 + row * 8.5}
                  width="4.2"
                  height="7.2"
                  style={{ '--x': col, '--y': row } as CSSProperties}
                />
              )
            })}
          </g>
        </svg>
      </div>

      <div className={styles.policy}>
        <p className={`${ui.mono12} ${styles.copy}`}>
          © {site.year} {site.name}. {t.footer.rights}. {t.footer.built}
        </p>
        <div className={styles.policyLinks}>
          <a href="#/impressum" className={`${ui.mono12} ${styles.policyLink}`}>
            {t.footer.imprint}
          </a>
          <a href="#/datenschutz" className={`${ui.mono12} ${styles.policyLink}`}>
            {t.footer.privacy}
          </a>
          <span className={`${ui.mono12} ${styles.policyLink}`}>{t.footer.colophon}</span>
        </div>
      </div>
    </footer>
  )
}
