import { LANGS, useI18n } from '../../i18n'

export function LanguageSwitch() {
  const { lang, setLang, t } = useI18n()

  return (
    <div className="switch" role="group" aria-label={t.nav.switchLanguage}>
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          className="switch__option"
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
