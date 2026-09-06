import { LANGS, useI18n } from '../i18n'
import styles from './LanguageSwitcher.module.css'

type LanguageSwitcherProps = {
  size?: 'sm' | 'lg'
}

/** Zwei Kürzel, ein Trennstrich. Kein Dropdown. */
export function LanguageSwitcher({ size = 'sm' }: LanguageSwitcherProps) {
  const { lang, setLang, t } = useI18n()

  return (
    <div
      className={`${styles.switcher} ${size === 'lg' ? styles.lg : ''}`}
      role="group"
      aria-label={t.nav.language}
    >
      {LANGS.map((code, i) => (
        <span key={code} className={styles.item}>
          {i > 0 && (
            <span className={styles.divider} aria-hidden="true">
              /
            </span>
          )}
          <button
            type="button"
            lang={code}
            className={styles.option}
            aria-pressed={lang === code}
            onClick={() => setLang(code)}
          >
            {code.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  )
}
