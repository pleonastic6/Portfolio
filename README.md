# Portfolio — Artur Renner

Persönliche Website. **Vite + React + TypeScript**, zweisprachig (DE/EN), dunkel,
typografiegetrieben. Keine UI-Bibliothek, kein Router, kein Backend — der Build ist
eine statische Seite, die auf jeden Webspace passt.

**Live:** https://pleonastic6.github.io/Portfolio/

## Loslegen

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # Produktions-Build nach dist/
npm run preview    # dist/ lokal prüfen
npm run typecheck  # nur Typen
```

Node 18+.

## Struktur

```
index.html                Meta-Tags, SEO, Open Graph
public/                   1:1 nach dist/ kopiert (favicon, .htaccess, robots.txt)
src/
  main.tsx                Mount, Schrift- und CSS-Imports
  App.tsx                 Seitenaufbau, Reihenfolge der Sektionen
  data/                   Inhalte ohne Sprache: site, projects, skills
  i18n/
    types.ts              Struktur aller Oberflächentexte
    de.ts / en.ts         die Texte selbst
    index.tsx             Provider, useI18n(), Sprachwahl + localStorage
  components/             Navigation, LanguageSwitcher, ProjectItem, Footer,
                          SectionHeader, Reveal, Frame, Cursor, StatusDot
  sections/               Hero, Work, About, Skills, Contact
  hooks/                  useInView, useScrolled, useActiveSection, useMediaQuery
  assets/                 importierte Projektbilder (siehe assets/README.md)
  styles/
    tokens.css            Design-Tokens — Farbe, Typo, Raster, Motion
    base.css              Reset, Element-Defaults, globale Primitive
```

Jede Komponente bringt ihr eigenes **CSS-Modul** mit (`Name.module.css`).
Global sind nur `tokens.css` und `base.css`.

## Inhalte pflegen

| Was | Wo |
| --- | --- |
| Alle Oberflächentexte | `src/i18n/de.ts` + `src/i18n/en.ts` |
| Projekte (inkl. DE/EN-Beschreibung) | `src/data/projects.ts` |
| Skills und Gruppen | `src/data/skills.ts` |
| Name, E-Mail, Domain, Social-Links, Status | `src/data/site.ts` |

Neue Textfelder zuerst in `src/i18n/types.ts` ergänzen — danach meldet TypeScript,
welche Sprache noch fehlt. Es gibt keine hartcodierten Texte in den Komponenten.

Projektbilder: nach `src/assets/` (importieren) oder `public/projects/`
(als `/projects/name.jpg` referenzieren). Ohne Bild zeigt ein Projekt einen
gestalteten Platzhalter.

## Gestaltung

Die visuelle Handschrift steckt fast vollständig in `src/styles/tokens.css`:
Fast-Schwarz `#080807`, Text `#F4EFE4`, gedämpftes Grau `#918B80`, Linien mit
6–11 % Offwhite, ein warmer Akzent (`--c-accent`, sparsam für Status, Fokus und Hover).
Schrift: **Instrument Serif** für Headlines, **Newsreader** für längere Texte,
**Space Mono** für Labels, Zahlen und Metadaten. Punktraster-Akzente laufen über
**Silkscreen**. Die Mischung ist bewusster: Claude-artige Editorial-Serife für
Charakter, Nothing-artige Mono/Dot-Details für Technik — ohne proprietären Font-Rip.

Alle Schriften liegen als npm-Paket im Projekt und werden mitgebaut — keine
Anfragen an Google Fonts, damit auch datenschutzrechtlich unkritisch.

### Optionale echte Nothing-Schriften

Für NType82 Mono und Ndot ist weiterhin ein Platz vorbereitet. WOFF2-Dateien nach
`src/assets/fonts/` legen und die Font-Familien in `src/styles/tokens.css` nach vorne
ziehen. Details: `src/assets/fonts/README.md`.

Zur Lizenz: NType82 und Ndot sind Markenschriften von Nothing, für die kursierenden
Kopien gibt es keine veröffentlichte Nutzungslizenz — auf einer öffentlichen Seite
also ungeklärt. Deshalb nutzt die Seite standardmäßig freie Alternativen statt die
Dateien aus Dritt-Repos direkt einzubinden.

Bewegung: Einstieg blendet auf, Hero-Zeilen laufen gestaffelt hinter einer Maske
hoch, Abschnitte erscheinen beim Scrollen (`Reveal`), Hover bleibt zurückhaltend.
Easing durchgehend `cubic-bezier(0.16, 1, 0.3, 1)`. `prefers-reduced-motion` schaltet
alles ab — an einer Stelle in `base.css`.

Der eigene Cursor lässt sich in `src/data/site.ts` (`customCursor: false`) abschalten;
auf Touch-Geräten erscheint er ohnehin nicht.

## Barrierefreiheit

Semantische Landmarks, Überschriften h1 → h2 → h3, Skip-Link als erster Tab-Stop,
sichtbare Fokusringe, `aria-current` in der Navigation, `aria-pressed` am
Sprachumschalter, `lang` am `<html>` wird beim Sprachwechsel mitgesetzt,
geschlossenes Menü liegt nicht in der Tab-Reihenfolge.

## Deployment (eigene Domain / Webspace)

```bash
npm run build
```

Den **Inhalt** von `dist/` ins Web-Root hochladen (`httpdocs/`, `public_html/`, `www/`).
`base: './'` erzeugt relative Pfade — läuft dadurch auch in einem Unterordner.
`public/.htaccess` setzt Kompression und Cache-Header (Apache; bei Nginx löschen).

### Zwischendurch auf GitHub Pages testen

Funktioniert ohne Umbau: `base: './'` erzeugt relative Pfade, die Seite läuft
deshalb auch unter `https://<user>.github.io/<repo>/`. Ein Router, der eine
Server-Konfiguration bräuchte, ist nicht im Spiel.

Zwei Dinge beachten:

- `.gitignore` schließt die Schriftdateien aus. Bei einem Deploy aus dem
  Repository heraus fehlen sie im Build — die Seite fällt dann auf IBM Plex Mono
  zurück.
- `public/.htaccess` ist Apache-spezifisch und wird von GitHub Pages ignoriert.
  Schadet nicht, bringt dort aber auch nichts.

Am schnellsten geht es über eine Action (`actions/deploy-pages`) mit
`npm ci && npm run build` und `dist/` als Artefakt; alternativ den Inhalt von
`dist/` von Hand in einen `gh-pages`-Branch legen.

### Vor dem ersten Deployment anpassen

- `index.html`: `canonical`, `og:url`, `og:image` auf die echte Domain
- `src/data/site.ts`: `url`, LinkedIn-URL in `socials`
- `public/og-image.png` (1200×630) für die Social-Vorschau anlegen
- **Impressum und Datenschutzerklärung** — bei einer persönlichen Seite mit
  beruflichem Bezug in Deutschland in der Regel Pflicht. Die Texte dafür liegen
  bereits übersetzt in `footer.imprint` / `footer.privacy` bereit.
