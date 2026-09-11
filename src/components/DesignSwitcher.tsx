import { useI18n } from '../i18n'
import { useTheme } from '../theme'
import styles from './DesignSwitcher.module.css'

type DesignSwitcherProps = {
  size?: 'sm' | 'lg'
}

export function DesignSwitcher({ size = 'sm' }: DesignSwitcherProps) {
  const { t } = useI18n()
  const { theme, themes, nextTheme } = useTheme()
  const hasMultipleThemes = themes.length > 1

  return (
    <button
      type="button"
      className={`${styles.button} ${size === 'lg' ? styles.lg : ''}`}
      aria-label={`${t.nav.designSwitch}: ${theme.name}`}
      title={hasMultipleThemes ? t.nav.designSwitch : `${t.nav.designCurrent}: ${theme.name}`}
      onClick={nextTheme}
    >
      <span className={styles.label}>{t.nav.design}</span>
      <span className={styles.name}>{theme.name}</span>
    </button>
  )
}
