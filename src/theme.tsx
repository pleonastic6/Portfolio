import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type ThemeId = 'noir-et-or' | 'aurum-labyrinth'

export type SiteTheme = {
  id: ThemeId
  name: string
  description: string
}

export const THEMES: SiteTheme[] = [
  {
    id: 'noir-et-or',
    name: 'Noir et Or',
    description: 'Dunkle editorial Basis mit warmem Goldakzent.',
  },
  {
    id: 'aurum-labyrinth',
    name: 'Aurum Labyrinth',
    description: 'Helles Pergament, tiefe Tinte, Gold als Akzent — Mäander als Druckornament.',
  },
]

const STORAGE_KEY = 'addd-theme'
const DEFAULT_THEME = THEMES[0]

type ThemeContextValue = {
  theme: SiteTheme
  themes: SiteTheme[]
  setTheme: (id: ThemeId) => void
  nextTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function isThemeId(value: string | null): value is ThemeId {
  return THEMES.some((theme) => theme.id === value)
}

function getStoredTheme(): ThemeId {
  if (typeof window === 'undefined') return DEFAULT_THEME.id
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return isThemeId(stored) ? stored : DEFAULT_THEME.id
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>(() => getStoredTheme())
  const theme = THEMES.find((candidate) => candidate.id === themeId) ?? DEFAULT_THEME

  useEffect(() => {
    document.documentElement.dataset.theme = theme.id
    window.localStorage.setItem(STORAGE_KEY, theme.id)
  }, [theme.id])

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      themes: THEMES,
      setTheme: setThemeId,
      nextTheme: () => {
        setThemeId((current) => {
          const index = THEMES.findIndex((candidate) => candidate.id === current)
          const next = THEMES[(index + 1) % THEMES.length] ?? DEFAULT_THEME
          return next.id
        })
      },
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
