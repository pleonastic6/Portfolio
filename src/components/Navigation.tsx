import { useEffect, useState } from 'react'
import { navItems, site } from '../data/site'
import { useI18n } from '../i18n'
import { useScrolled } from '../hooks/useScrolled'
import { useActiveSection } from '../hooks/useActiveSection'
import { DesignSwitcher } from './DesignSwitcher'
import { LanguageSwitcher } from './LanguageSwitcher'
import { StatusDot } from './StatusDot'
import { Wordmark } from './Wordmark'
import styles from './Navigation.module.css'

const SECTION_IDS = navItems.map((item) => item.id)

export function Navigation() {
  const { t } = useI18n()
  const scrolled = useScrolled(24)
  const active = useActiveSection(SECTION_IDS)
  const [menuOpen, setMenuOpen] = useState(false)

  // Scroll sperren, solange das Menü offen ist; Escape schließt
  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  return (
    <>
      <header className={styles.nav} data-scrolled={scrolled} data-open={menuOpen}>
        <div className={`shell ${styles.inner}`}>
          <a className={styles.brand} href="#top" aria-label={site.name}>
            <Wordmark className={styles.logo} />
            <span className={styles.brandName}>{site.name}</span>
            <span className={styles.brandMark} aria-hidden="true">
              {site.initials}
            </span>
          </a>

          <nav className={styles.links} aria-label={t.nav.work}>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={styles.link}
                aria-current={active === item.id ? 'true' : undefined}
              >
                {t.nav[item.id]}
              </a>
            ))}
          </nav>

          <div className={styles.actions}>
            <StatusDot className={styles.status} />
            <DesignSwitcher />
            <LanguageSwitcher />
            <button
              type="button"
              className={`label ${styles.menuButton}`}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? t.nav.close : t.nav.menu}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={styles.overlay}
        data-open={menuOpen}
        aria-label={t.nav.menu}
      >
        <nav className={`shell ${styles.overlayInner}`}>
          <ul className={styles.overlayList}>
            {navItems.map((item, index) => (
              <li key={item.id} className={styles.overlayItem}>
                <a href={item.href} onClick={() => setMenuOpen(false)}>
                  <span className={`meta ${styles.overlayIndex}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {t.nav[item.id]}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.overlayFoot}>
            <StatusDot />
            <DesignSwitcher size="lg" />
            <LanguageSwitcher size="lg" />
          </div>
        </nav>
      </div>
    </>
  )
}
