import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { de } from './de'
import { en } from './en'
import type { Translation } from './types'
import type { Localized } from '../data/site'

export type Lang = 'de' | 'en'

const DICTIONARIES: Record<Lang, Translation> = { de, en }
export const LANGS: Lang[] = ['de', 'en']

const STORAGE_KEY = 'ar.lang'

/** Gespeicherte Wahl > Browsersprache > Englisch. */
function resolveInitialLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'de' || stored === 'en') return stored
  } catch {
    /* localStorage kann blockiert sein */
  }

  if (typeof navigator !== 'undefined') {
    const languages = navigator.languages?.length ? navigator.languages : [navigator.language]
    if (languages.some((code) => code?.toLowerCase().startsWith('de'))) return 'de'
  }

  return 'en'
}

type I18nValue = {
  lang: Lang
  /** vollstaendiges, typisiertes Woerterbuch der aktiven Sprache */
  t: Translation
  /** waehlt die passende Variante aus einem { de, en }-Feld der Daten */
  pick: (value: Localized) => string
  setLang: (lang: Lang) => void
}

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(resolveInitialLang)
  const t = DICTIONARIES[lang]

  useEffect(() => {
    document.documentElement.lang = t.meta.htmlLang
    document.title = t.meta.documentTitle
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignorieren */
    }
  }, [lang, t])

  const pick = useCallback((value: Localized) => value[lang], [lang])

  const value = useMemo<I18nValue>(() => ({ lang, t, pick, setLang }), [lang, t, pick])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useI18n(): I18nValue {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n() benötigt einen <I18nProvider> im Baum.')
  return context
}
