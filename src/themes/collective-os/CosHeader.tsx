import { useEffect, useState, type CSSProperties } from 'react'
import { navItems, site } from '../../data/site'
import { useI18n } from '../../i18n'
import { useActiveSection } from '../../hooks/useActiveSection'
import { LanguageSwitcher } from '../../components/LanguageSwitcher'
import { StatusDot } from '../../components/StatusDot'
import { Wordmark } from '../../components/Wordmark'
import { Btn } from './ui'
import styles from './CosHeader.module.css'

const MENU_IDS = navItems.filter((item) => item.id !== 'contact')
const SECTION_IDS = navItems.map((item) => item.id)

/**
 * Kopfzeile aus Zellen: Marke links, Menuepunkte als gleich breite Felder
 * mit Haarlinien, Kontakt als orange Zelle ganz rechts. Beim Runterscrollen
 * faehrt sie weg, beim Hochscrollen kommt sie zurueck.
 */
export function CosHeader() {
  const { t } = useI18n()
  const active = useActiveSection(SECTION_IDS)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const y = window.scrollY
        setScrolled(y > 40)
        if (Math.abs(y - last) > 6) {
          setHidden(y > last && y > 240)
          last = y
        }
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={styles.header}
      data-hidden={hidden && !open}
      data-scrolled={scrolled}
      data-open={open}
    >
      <div className={styles.inner}>
        <a className={styles.logo} href="#top" aria-label={site.name}>
          <Wordmark className={styles.mark} />
          <span className={styles.logoText} aria-hidden="true">
            {t.hero.label} / {site.year}
          </span>
        </a>

        <div className={styles.status}>
          <StatusDot />
        </div>

        <div className={`${styles.cell} ${styles.lang}`}>
          <LanguageSwitcher />
        </div>

        <nav className={styles.menu} aria-label={t.nav.work}>
          {MENU_IDS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={styles.item}
              aria-current={active === item.id ? 'true' : undefined}
            >
              <span className={styles.itemText}>
                <span>{t.nav[item.id]}</span>
                <span aria-hidden="true">{t.nav[item.id]}</span>
              </span>
              <span className={styles.pixelRail} aria-hidden="true">
                {Array.from({ length: 28 }, (_, index) => (
                  <span key={index} style={{ '--p': index, '--c': index % 7, '--r': Math.floor(index / 7) } as CSSProperties} />
                ))}
              </span>
              <span className={`${styles.itemIc} ${styles.icTop}`} aria-hidden="true" />
              <span className={`${styles.itemIc} ${styles.icBot}`} aria-hidden="true" />
            </a>
          ))}
        </nav>

        <Btn variant="cell" href="#contact" className={styles.cta}>
          {t.nav.contact}
        </Btn>

        <button
          type="button"
          className={styles.menuBtn}
          aria-expanded={open}
          aria-controls="cos-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span>{open ? t.nav.close : t.nav.menu}</span>
          <span className={styles.burger} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <div id="cos-menu" className={styles.drop} data-open={open}>
        <ul className={styles.dropList}>
          {navItems.map((item, index) => (
            <li key={item.id}>
              <a
                href={item.href}
                className={styles.dropItem}
                onClick={() => setOpen(false)}
                aria-current={active === item.id ? 'true' : undefined}
              >
                <span className={styles.dropNum}>{String(index + 1).padStart(2, '0')}</span>
                {t.nav[item.id]}
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.dropFoot}>
          <StatusDot />
          <LanguageSwitcher size="lg" />
        </div>
      </div>
    </header>
  )
}
