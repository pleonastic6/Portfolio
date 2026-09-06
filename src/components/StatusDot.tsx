import { site } from '../data/site'
import { useI18n } from '../i18n'
import styles from './StatusDot.module.css'

/** Kleiner Verfügbarkeitshinweis: Punkt plus Mono-Label. */
export function StatusDot({ className = '' }: { className?: string }) {
  const { t } = useI18n()

  return (
    <p className={`label ${styles.status} ${className}`} data-available={site.available}>
      <span className={styles.dot} aria-hidden="true" />
      {site.available ? t.nav.available : t.nav.unavailable}
    </p>
  )
}
