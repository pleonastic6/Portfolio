import type { Localized } from './site'

/**
 * Skills, gruppiert. Reihenfolge = Anzeigereihenfolge.
 * Bewusst ohne Level, Prozente oder Logos.
 */
export type SkillGroup = {
  id: string
  title: Localized
  /** kurze Einordnung rechts neben der Gruppe */
  note: Localized
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: { de: 'Frontend', en: 'Frontend' },
    note: { de: 'Interfaces, die halten', en: 'Interfaces that hold up' },
    items: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Three.js'],
  },
  {
    id: 'design',
    title: { de: 'Design', en: 'Design' },
    note: { de: 'Form folgt Absicht', en: 'Form follows intent' },
    items: ['UI Design', 'UX', 'Design Systems', 'Responsive Design', 'Prototyping'],
  },
  {
    id: 'data',
    title: { de: 'Daten', en: 'Data' },
    note: { de: 'Vom Rohwert zum Bild', en: 'From raw value to picture' },
    items: ['Python', 'Pandas', 'GeoJSON', 'D3', 'SQL'],
  },
  {
    id: 'tools',
    title: { de: 'Werkzeuge', en: 'Tools' },
    note: { de: 'Täglich im Einsatz', en: 'In daily use' },
    items: ['Vite', 'Git', 'GitHub', 'Figma', 'LaTeX'],
  },
]
