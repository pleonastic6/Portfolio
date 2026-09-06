/**
 * Sprachneutrale Inhalte
 * ----------------------
 * Hier stehen nur Daten, die in jeder Sprache gleich sind: Links, Bilder,
 * Technologien, Jahreszahlen. Alle Fliesstexte liegen in src/i18n/*.json und
 * werden ueber die `id` zugeordnet.
 */

export const site = {
  name: 'Artur Renner',
  // Nach dem Domainkauf hier eintragen - wird fuer Canonical/OG genutzt.
  url: 'https://example.com',
  email: 'artur.renner6@gmail.com',
  location: 'Amberg, Deutschland',
} as const

export type SocialLink = {
  id: string
  label: string
  href: string
}

export const socials: SocialLink[] = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/pleonastic6' },
  { id: 'linkedin', label: 'LinkedIn', href: '#' },
  { id: 'mail', label: 'E-Mail', href: `mailto:${site.email}` },
]

export type NavItem = {
  id: 'home' | 'projects' | 'skills' | 'about' | 'contact'
  href: string
}

export const navItems: NavItem[] = [
  { id: 'projects', href: '#projects' },
  { id: 'skills', href: '#skills' },
  { id: 'about', href: '#about' },
  { id: 'contact', href: '#contact' },
]

export type Project = {
  /** muss mit dem Key unter projects.items in de.json/en.json uebereinstimmen */
  id: 'nyc-buildings' | 'nothing-deck' | 'placeholder'
  year: string
  tech: string[]
  /** Datei in public/ ablegen, z.B. /projects/nyc.jpg - leer lassen = Platzhalter */
  image?: string
  liveUrl?: string
  repoUrl?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'nyc-buildings',
    year: '2026',
    tech: ['Three.js', 'TypeScript', 'GeoJSON', 'Vite'],
    repoUrl: 'https://github.com/pleonastic6/Informationsvisualisierung_NYC_buildings',
    featured: true,
  },
  {
    id: 'nothing-deck',
    year: '2025',
    tech: ['LaTeX', 'Beamer', 'Design System', 'Typografie'],
  },
  {
    id: 'placeholder',
    year: '—',
    tech: ['Tech A', 'Tech B'],
  },
]

export type SkillGroup = {
  /** muss mit dem Key unter skills.groups in de.json/en.json uebereinstimmen */
  id: 'frontend' | 'data' | 'design'
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    items: ['TypeScript', 'React', 'Vite', 'HTML & CSS', 'Three.js'],
  },
  {
    id: 'data',
    items: ['Python', 'Pandas', 'GeoJSON / Geodaten', 'D3-Grundlagen', 'SQL'],
  },
  {
    id: 'design',
    items: ['Design-Systeme', 'Figma', 'LaTeX', 'Git', 'Adobe CC'],
  },
]
