import { useEffect, useState } from 'react'
import { navItems } from '../../content/site'
import { useI18n } from '../../i18n'
import { useScrolled } from '../../hooks/useScrolled'
import { useActiveSection } from '../../hooks/useActiveSection'
import { Container } from '../ui/Container'
import { LanguageSwitch } from '../ui/LanguageSwitch'
import { ThemeToggle } from '../ui/ThemeToggle'

const SECTION_IDS = navItems.map((item) => item.id)

export function Header() {
  const { t } = useI18n()
  const scrolled = useScrolled()
  const active = useActiveSection(SECTION_IDS)
  const [menuOpen, setMenuOpen] = useState(false)

  // Menue schliessen, sobald auf Desktopbreite gewechselt wird
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 56rem)')
    const onChange = () => mq.matches && setMenuOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <header className="header" data-scrolled={scrolled}>
      <Container>
        <div className="header__inner">
          <a className="header__brand" href="#top">
            Artur Renner
          </a>

          <nav className="nav" aria-label={t.nav.home}>
            {navItems.map((item) => (
              <a
                key={item.id}
                className="nav__link"
                href={item.href}
                aria-current={active === item.id ? 'true' : undefined}
              >
                {t.nav[item.id]}
              </a>
            ))}
          </nav>

          <div className="header__actions">
            <LanguageSwitch />
            <ThemeToggle />
            <button
              type="button"
              className="header__burger icon-button"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={t.nav.toggleMenu}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                {menuOpen ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav id="mobile-nav" className="nav--mobile" aria-label={t.nav.toggleMenu}>
            {navItems.map((item) => (
              <a
                key={item.id}
                className="nav__link"
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {t.nav[item.id]}
              </a>
            ))}
          </nav>
        )}
      </Container>
    </header>
  )
}
