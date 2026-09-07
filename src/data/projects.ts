import type { Localized } from './site'
import nycBuildings from '../assets/projects/nyc-buildings.jpg'
import portfolioShot from '../assets/projects/portfolio-2026.jpg'

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
  /** Slug einer ausfuehrlichen Beschreibung in caseStudies.ts */
  caseStudy?: string
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
    technologies: ['Three.js', 'JavaScript', 'GeoJSON', 'NYC Open Data'],
    image: nycBuildings,
    imageAlt: {
      de: 'Manhattan als 3D-Szene: 45.125 Gebäude, nach Dachhöhe von Violett bis Magenta eingefärbt, darunter das Straßennetz als feines Liniengeflecht.',
      en: 'Manhattan as a 3D scene: 45,125 buildings coloured from violet to magenta by roof height, with the street network drawn as fine lines below.',
    },
    url: 'https://pleonastic6.github.io/Informationsvisualisierung_NYC_buildings/',
    github: 'https://github.com/pleonastic6/Informationsvisualisierung_NYC_buildings',
    caseStudy: 'nyc-buildings-3d',
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
    slug: 'portfolio-2026',
    title: 'Portfolio 2026',
    discipline: { de: 'Design-System · Frontend', en: 'Design System · Frontend' },
    role: { de: 'Design, Umsetzung, Inhalte', en: 'Design, build, content' },
    description: {
      de: 'Diese Seite. Dunkles, typografiegetriebenes Layout, zweisprachig, ohne UI-Bibliothek und ohne Backend. Farben, Typografie, Raster und Motion liegen als Design-Tokens an einer Stelle, jede Komponente bringt ihr eigenes CSS-Modul mit. Der Build ist statisch und läuft auf GitHub Pages wie auf klassischem Webspace.',
      en: 'This site. A dark, typography-led layout, bilingual, without a UI library and without a backend. Colour, type, grid and motion live as design tokens in one place, every component brings its own CSS module. The build is static and runs on GitHub Pages as well as classic web hosting.',
    },
    year: '2026',
    technologies: ['React', 'TypeScript', 'Vite', 'CSS Modules'],
    image: portfolioShot,
    imageAlt: {
      de: 'Die Startseite dieses Portfolios: dunkler Grund, große Serifenschlagzeile, technische Beschriftungen in Monospace.',
      en: 'The homepage of this portfolio: dark ground, large serif headline, technical labels set in monospace.',
    },
    github: 'https://github.com/pleonastic6/Portfolio',
  },
]
