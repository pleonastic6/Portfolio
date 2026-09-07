import { site } from '../data/site'
import { useI18n } from '../i18n'
import styles from './Footer.module.css'

export function Footer() {
  const { t, pick } = useI18n()

  return (
    <footer className={styles.footer}>
      <div className={`shell ${styles.inner}`}>
        <p className={`meta ${styles.cell}`}>
          © {site.year} {site.name.toUpperCase()} — {pick(site.location).toUpperCase()}
        </p>

        <nav className={`meta ${styles.cell} ${styles.center}`} aria-label={t.footer.imprint}>
          <a className={styles.legalLink} href="#/impressum">
            {t.footer.imprint.toUpperCase()}
          </a>
          <a className={styles.legalLink} href="#/datenschutz">
            {t.footer.privacy.toUpperCase()}
          </a>
        </nav>

        <div className={`meta ${styles.cell} ${styles.end}`}>
          <span>{t.footer.colophon}</span>
          <a className={styles.top} href="#top">
            {t.nav.home.toUpperCase()}
            <span aria-hidden="true" className={styles.topArrow}>
              ↑
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
