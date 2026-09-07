import type { Localized } from './site'
import nycEra from '../assets/projects/nyc-era.jpg'
import nycStreet from '../assets/projects/nyc-street.jpg'

/**
 * Ausfuehrliche Projektbeschreibungen.
 * Der `slug` verbindet die Case Study mit dem Projekt in projects.ts und mit
 * der Route #/projekt/<slug>.
 */
export type CaseBlock = {
  heading: Localized
  body: Localized[]
  image?: string
  imageAlt?: Localized
  caption?: Localized
}

export type CaseFact = {
  label: Localized
  value: Localized
}

export type CaseStudy = {
  slug: string
  lead: Localized
  facts: CaseFact[]
  blocks: CaseBlock[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'nyc-buildings-3d',
    lead: {
      de: 'Gebäudehöhe ist in einer Tabelle eine Zahl. Im Raum ist sie eine Form, die man sofort vergleichen kann. Diese Arbeit überträgt 45.125 Gebäudegrundrisse aus offenen Daten in eine begehbare 3D-Szene — und prüft, ob die räumliche Darstellung Fragen beantwortet, an denen eine Tabelle scheitert.',
      en: 'In a table, building height is a number. In space it becomes a shape you can compare at a glance. This project turns 45,125 building footprints from open data into a navigable 3D scene — and asks whether the spatial view answers questions a table cannot.',
    },
    facts: [
      { label: { de: 'Kontext', en: 'Context' }, value: { de: 'Kurs Informationsvisualisierung, OTH Amberg-Weiden', en: 'Information Visualisation course, OTH Amberg-Weiden' } },
      { label: { de: 'Rolle', en: 'Role' }, value: { de: 'Konzept, Datenpipeline, Umsetzung, Nutzungsstudie', en: 'Concept, data pipeline, build, user study' } },
      { label: { de: 'Datensatz', en: 'Dataset' }, value: { de: '45.125 Gebäude, 13.013 Straßensegmente', en: '45,125 buildings, 13,013 street segments' } },
      { label: { de: 'Technik', en: 'Tech' }, value: { de: 'Three.js r128, JavaScript-Module, Python zur Aufbereitung', en: 'Three.js r128, JavaScript modules, Python for preparation' } },
    ],
    blocks: [
      {
        heading: { de: 'Die Fragen', en: 'The questions' },
        body: [
          {
            de: 'Wo stehen die höchsten Gebäude Manhattans, welche Muster zeigt die Höhenverteilung, wie unterscheiden sich alte und neue Bestände, und welche Rolle spielt das Gelände? Die Karte beantwortet das „Wo?", ein Ranking das „Wie hoch im Vergleich?". Beide Ansichten zeigen dieselben Daten und ergänzen sich — deshalb sind sie in derselben Anwendung umschaltbar statt getrennt.',
            en: 'Where are Manhattan\'s tallest buildings, what patterns does the height distribution show, how do old and new stock differ, and what part does the terrain play? The map answers "where?", a ranking answers "how tall in comparison?". Both views show the same data and complement each other, which is why they are switchable inside one application rather than separate.',
          },
        ],
      },
      {
        heading: { de: 'Von 150 MB Rohdaten zu 13 MB im Browser', en: 'From 150 MB of raw data to 13 MB in the browser' },
        body: [
          {
            de: 'Grundlage ist der Datensatz BUILDING aus dem NYC Open Data Portal, ergänzt um PLUTO-Daten zur Landnutzung. Die Multipolygon-Geometrien liegen als WKT vor und enthalten Außenkonturen ebenso wie Innenhöfe. Ein Python-Schritt liest sie, schneidet den Bestand auf Manhattan zu, rechnet Dach- und Geländehöhen von Fuß in Meter um (Faktor 0,3048) und exportiert eine für den Browser optimierte JSON-Struktur.',
            en: 'The basis is the BUILDING dataset from the NYC Open Data portal, complemented by PLUTO land-use data. The multipolygon geometries come as WKT and contain outer contours as well as courtyards. A Python step reads them, clips the stock to Manhattan, converts roof and ground elevations from feet to metres (factor 0.3048) and exports a JSON structure optimised for the browser.',
          },
          {
            de: 'Aus rund 150 MB Rohdaten werden so 13 MB Geometrie plus 680 KB Suchindex. Das ist die eigentliche Arbeit: Ohne diesen Schritt lädt die Szene nicht in vertretbarer Zeit, und ohne erhaltene Innenhöfe stimmen die Grundrisse nicht.',
            en: 'Around 150 MB of raw data becomes 13 MB of geometry plus a 680 KB search index. That is the real work: without this step the scene will not load in acceptable time, and without preserved courtyards the footprints are wrong.',
          },
        ],
      },
      {
        heading: { de: 'Was auf was abgebildet wird', en: 'What maps onto what' },
        body: [
          {
            de: 'Die Dachhöhe wird linear extrudiert und zusätzlich auf eine Farbskala von dunklem Violett bis hellem Pink gelegt — Form und Farbe verstärken sich. Die Geländehöhe hebt das Gebäude als Sockel an, aber mit einem bewusst kleineren Faktor: Das Relief soll spürbar sein, ohne die Stadtstruktur zu überlagern.',
            en: 'Roof height is extruded linearly and additionally mapped onto a colour scale from deep violet to bright pink — form and colour reinforce each other. Ground elevation raises each building on a plinth, but with a deliberately smaller factor: the relief should be perceptible without overpowering the urban structure.',
          },
          {
            de: 'Der Modus „Baujahr" tauscht die kontinuierliche Skala gegen diskrete Klassen: vor 1900, 1900–1939, 1940–1969, 1970–1999, ab 2000, unbekannt in Neutralgrau. Erst dadurch wird sichtbar, dass sich Bauphasen in Manhattan räumlich clustern.',
            en: 'The "construction year" mode swaps the continuous scale for discrete classes: before 1900, 1900–1939, 1940–1969, 1970–1999, 2000 onwards, unknown in neutral grey. Only then does it become visible that building phases cluster spatially in Manhattan.',
          },
        ],
        image: nycEra,
        imageAlt: {
          de: 'Dieselbe Szene im Modus Baujahr: Gebäude in Orange, Gelb, Türkis und Blau je nach Bauphase.',
          en: 'The same scene in construction-year mode: buildings in orange, yellow, turquoise and blue by building phase.',
        },
        caption: {
          de: 'Modus „Baujahr" — dieselbe Geometrie, andere Frage.',
          en: 'Construction-year mode — same geometry, different question.',
        },
      },
      {
        heading: { de: 'Navigation und Suche', en: 'Navigation and search' },
        body: [
          {
            de: 'Ziehen dreht die Kamera, Mausrad zoomt, WASD bewegt horizontal, Q und E heben und senken. Hover hebt ein Gebäude hervor und zeigt seine Kennzahlen. Die Suche akzeptiert die Building Identification Number oder einen Namen, priorisiert exakte und Präfix-Treffer und sortiert den Rest nach Höhe; ein Treffer fokussiert das Gebäude in der Karte. Ein Regler blendet alles unterhalb einer Mindesthöhe aus.',
            en: 'Dragging rotates the camera, the wheel zooms, WASD moves horizontally, Q and E raise and lower it. Hovering highlights a building and shows its figures. Search accepts the Building Identification Number or a name, prioritises exact and prefix matches and sorts the rest by height; selecting a hit focuses that building on the map. A slider hides everything below a minimum height.',
          },
        ],
        image: nycStreet,
        imageAlt: {
          de: 'Nahaufnahme zwischen den Gebäudekörpern, Dachflächen und Schluchten im Detail.',
          en: 'Close view between the building volumes, roofs and canyons in detail.',
        },
        caption: {
          de: 'Nah an der Szene bleibt die Struktur lesbar — Grundrisse und Höhenstufen bleiben unterscheidbar.',
          en: 'Up close the structure stays readable — footprints and height steps remain distinguishable.',
        },
      },
      {
        heading: { de: 'Beobachtung statt Behauptung', en: 'Observation instead of assertion' },
        body: [
          {
            de: 'Die Anwendung protokolliert Bedienhandlungen: Aufgabenstart und -ende, Ansichts- und Moduswechsel, Suchauswahl, Filteränderungen, Fokus- und Hover-Ereignisse. Die Sitzung lässt sich als JSON exportieren und mit einer Bildschirmaufnahme abgleichen.',
            en: 'The application logs interactions: task start and end, view and mode switches, search selections, filter changes, focus and hover events. A session can be exported as JSON and matched against a screen recording.',
          },
          {
            de: 'In einer Test-Session wurde zusätzlich ein frontales EEG über rund 450 Sekunden aufgezeichnet. Der Anteil an Alpha-Wellen lag über dem der Beta-Wellen, was deskriptiv eher für ruhig-exploratives Arbeiten spricht. Belastbar ist das nicht: eine einzelne Person, ein frontaler Kanal, 61 % der Messpunkte als „sonstige" klassifiziert, keine dokumentierte Artefaktkorrektur. Ich führe die Daten deshalb als ergänzende Beobachtung, nicht als Wirksamkeitsnachweis — die interessantere Erkenntnis war, wie stark die Interaktionslogs allein schon zeigen, wo Nutzer hängen bleiben.',
            en: 'One test session additionally recorded a frontal EEG over roughly 450 seconds. The share of alpha waves exceeded that of beta waves, which descriptively suggests calm, exploratory work. It is not conclusive: a single person, one frontal channel, 61 % of samples classified as "other", no documented artefact correction. So I treat the data as a supplementary observation rather than proof of effectiveness — the more useful insight was how much the interaction logs alone reveal about where people get stuck.',
          },
        ],
      },
      {
        heading: { de: 'Was ich mitnehme', en: 'What I take away' },
        body: [
          {
            de: 'Der überwiegende Teil der Arbeit lag nicht im Rendering, sondern davor: Geometrien bereinigen, Einheiten vereinheitlichen, Datenmenge auf ein Maß bringen, das ein Browser flüssig hält. Und in der Entscheidung, welche Variable auf welche visuelle Größe darf — zwei Höhen im selben Bild vertragen nur dann denselben Maßstab nicht, wenn man vorher weiß, welche Frage im Vordergrund steht.',
            en: 'Most of the work was not in the rendering but ahead of it: cleaning geometries, unifying units, cutting the data down to something a browser keeps fluid. And in deciding which variable is allowed onto which visual dimension — two kinds of height in one image can only share a scale once you know which question comes first.',
          },
        ],
      },
    ],
  },
]

export function findCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug)
}
