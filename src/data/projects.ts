import type { Localized, Picture } from './site'
import nycFallback from '../assets/projects/nyc-buildings-fallback.jpg'
import nyc800 from '../assets/projects/nyc-buildings-800.webp'
import nyc1600 from '../assets/projects/nyc-buildings-1600.webp'
import portfolioFallback from '../assets/projects/portfolio-2026-fallback.jpg'
import portfolio800 from '../assets/projects/portfolio-2026-800.webp'
import portfolio1600 from '../assets/projects/portfolio-2026-1600.webp'

const nycBuildings: Picture = {
  fallback: nycFallback,
  sources: [
    { src: nyc800, width: 800 },
    { src: nyc1600, width: 1600 },
  ],
  width: 1600,
  height: 900,
}

const portfolioShot: Picture = {
  fallback: portfolioFallback,
  sources: [
    { src: portfolio800, width: 800 },
    { src: portfolio1600, width: 1600 },
  ],
  width: 1600,
  height: 900,
}

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
  image?: Picture
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
      de: 'Informationsvisualisierung · WebGL',
      en: 'Information Visualisation · WebGL',
    },
    role: { de: 'Konzept, Datenpipeline, Umsetzung', en: 'Concept, data pipeline, build' },
    description: {
      de: 'Der Gebäudebestand von Manhattan als begehbare 3D-Szene im Browser: 45.125 Gebäude werden bereinigt, extrudiert und nach Dachhöhe, Baujahr und Lage erkundbar gemacht.',
      en: "Manhattan's building stock as a navigable 3D scene in the browser: 45,125 buildings are cleaned, extruded and made explorable by roof height, year built and location.",
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
    slug: 'share-a-scooter-amberg',
    title: 'Share-A-Scooter Amberg',
    discipline: { de: 'Mobile UX · Produktdesign', en: 'Mobile UX · Product Design' },
    role: { de: 'Recherche, User Stories, Prototyp', en: 'Research, user stories, prototype' },
    description: {
      de: 'Screendesign-Projekt für eine fiktive E-Scooter-Sharing-App in Amberg. Der Fokus liegt auf Personas, Kernflüssen, Prototyping und einem dokumentierten Produktprozess statt nur auf hübschen Screens.',
      en: 'Screen design project for a fictional e-scooter sharing app in Amberg. The focus is on personas, core flows, prototyping and a documented product process rather than just polished screens.',
    },
    year: '2026',
    technologies: ['HTML', 'CSS', 'UX Research', 'Prototyping'],
    url: 'https://pleonastic6.github.io/Screen_Design/',
    github: 'https://github.com/pleonastic6/Screen_Design',
  },
  {
    slug: 'bartab',
    title: 'BarTab',
    discipline: { de: 'Android App · Local-first Tool', en: 'Android App · Local-first Tool' },
    role: { de: 'Produktidee, App-Architektur, Grundgerüst', en: 'Product idea, app architecture, foundation' },
    description: {
      de: 'Lokale Android-Tablet-App für einfachen Getränkeverkauf im Abendbetrieb: große Touch-Flächen, Warenkorb, Historie, Storno und Produktpflege direkt in der App. Bewusst als Work in Progress markiert.',
      en: 'Local Android tablet app for simple drink sales during events: large touch targets, cart, history, cancellation and product management inside the app. Deliberately marked as work in progress.',
    },
    year: '2026',
    technologies: ['Kotlin', 'Jetpack Compose', 'Room', 'Material 3'],
    github: 'https://github.com/pleonastic6/BarTab',
  },
  {
    slug: 'way-to-billion',
    title: 'Way to Billion',
    discipline: { de: 'Developer Tooling · Team Workflow', en: 'Developer Tooling · Team Workflow' },
    role: { de: 'MVP-Konzept, Next.js-App, Repo-Workflow', en: 'MVP concept, Next.js app, repo workflow' },
    description: {
      de: 'Lokale Web-App für kleine Projektteams: Repositories hinzufügen, Markdown-Dokumentation erkennen, letzte Commits verfolgen und Projektzusammenfassungen für Doku oder Abgaben vorbereiten.',
      en: 'Local web app for small project teams: add repositories, detect Markdown documentation, track recent commits and prepare project summaries for documentation or submissions.',
    },
    year: '2026',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma'],
    github: 'https://github.com/pleonastic6/Way_to_billion',
  },
  {
    slug: 'amberg-buildings-visualization',
    title: 'Amberg Buildings Visualization',
    discipline: { de: 'Geodaten · City Visualization', en: 'Geodata · City Visualization' },
    role: { de: 'Datensatz-Adaption, Importskripte, Visualisierung', en: 'Dataset adaptation, import scripts, visualisation' },
    description: {
      de: 'Ableitung der NYC-Visualisierung auf Amberg: OSM-, LoD2-, DGM1-, Straßen- und POI-Daten werden in eine lokale Three.js-Stadtvisualisierung überführt.',
      en: 'Adaptation of the NYC visualisation to Amberg: OSM, LoD2, DGM1, street and POI data are turned into a local Three.js city visualisation.',
    },
    year: '2026',
    technologies: ['Three.js', 'OpenStreetMap', 'Python', 'GeoJSON'],
    github: 'https://github.com/pleonastic6/Informationsvisualisierung_Amberg',
  },
  {
    slug: 'portfolio-2026',
    title: 'Portfolio 2026',
    discipline: { de: 'Design-System · Frontend', en: 'Design System · Frontend' },
    role: { de: 'Design, Umsetzung, Inhalte', en: 'Design, build, content' },
    description: {
      de: 'Diese Seite: ein statisches, zweisprachiges Portfolio mit mehreren umschaltbaren Designs, Theme-Tokens, CSS-Modulen und bewusst ohne UI-Bibliothek oder Backend.',
      en: 'This site: a static bilingual portfolio with multiple switchable designs, theme tokens, CSS modules and deliberately no UI library or backend.',
    },
    year: '2026',
    technologies: ['React', 'TypeScript', 'Vite', 'CSS Modules'],
    image: portfolioShot,
    imageAlt: {
      de: 'Die Startseite dieses Portfolios: dunkler Grund, große Serifenschlagzeile, technische Beschriftungen in Monospace.',
      en: 'The homepage of this portfolio: dark ground, large serif headline, technical labels set in monospace.',
    },
    url: 'https://pleonastic6.github.io/Portfolio/',
    github: 'https://github.com/pleonastic6/Portfolio',
  },
]
