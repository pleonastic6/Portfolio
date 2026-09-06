import type { Localized } from './site'

/**
 * Projektinhalte.
 * Neue Projekte hier ergaenzen - die Komponenten passen sich an (Nummerierung,
 * Reihenfolge, Zaehler laufen automatisch).
 *
 * Bilder: Datei nach public/projects/ legen und als '/projects/name.jpg'
 * referenzieren, oder aus src/assets/ importieren (dann von Vite gehasht).
 * Ohne `image` wird ein gestalteter Platzhalter gezeigt.
 */
export type Project = {
  slug: string
  title: string
  /** Disziplin, z.B. "Web Design · Development" */
  discipline: Localized
  role: Localized
  description: Localized
  year: string
  technologies: string[]
  image?: string
  imageAlt?: Localized
  url?: string
  github?: string
}

export const projects: Project[] = [
  {
    slug: 'nyc-buildings-3d',
    title: 'NYC Buildings 3D',
    discipline: {
      de: 'Informationsvisualisierung · Entwicklung',
      en: 'Information Visualisation · Development',
    },
    role: { de: 'Konzept, Datenpipeline, Umsetzung', en: 'Concept, data pipeline, build' },
    description: {
      de: 'Der Gebäudebestand von New York als begehbare 3D-Szene im Browser. Rohe Geodaten werden bereinigt, extrudiert und so gerendert, dass hunderttausende Volumen flüssig navigierbar bleiben.',
      en: "New York's building stock as a navigable 3D scene in the browser. Raw geodata is cleaned, extruded and rendered so that hundreds of thousands of volumes stay fluid to move through.",
    },
    year: '2026',
    technologies: ['Three.js', 'TypeScript', 'GeoJSON', 'Vite'],
    github: 'https://github.com/pleonastic6/Informationsvisualisierung_NYC_buildings',
  },
  {
    slug: 'presentation-system',
    title: 'Presentation System',
    discipline: { de: 'Design-System · Typografie', en: 'Design System · Typography' },
    role: { de: 'Design-System, Templating', en: 'Design system, templating' },
    description: {
      de: 'Ein durchgängiges Foliendesign auf LaTeX-Basis: dunkler Grund, Punktraster, monospaced Auszeichnung, ein streng definierter Akzentsatz. Layoutregeln einmal festgelegt — danach zählt nur noch der Inhalt.',
      en: 'A consistent slide design built on LaTeX: dark ground, dot grid, monospaced detailing, a tightly defined accent set. Layout rules defined once — after that only the content matters.',
    },
    year: '2025',
    technologies: ['LaTeX', 'Beamer', 'Type Design', 'Design Tokens'],
  },
  {
    slug: 'project-three',
    title: 'Project Three',
    discipline: { de: 'Disziplin · Disziplin', en: 'Discipline · Discipline' },
    role: { de: 'Deine Rolle', en: 'Your role' },
    description: {
      de: 'Platzhalter. Zwei bis drei Sätze reichen: welches Problem, welcher Ansatz, welches Ergebnis. Konkret schlägt vollständig.',
      en: 'Placeholder. Two or three sentences are enough: the problem, the approach, the result. Specific beats complete.',
    },
    year: '2025',
    technologies: ['Tech', 'Tech', 'Tech'],
  },
]
