# ADDD — Session-Dokumentation und Übergabe

Stand: 15. Oktober 2026. Diese Datei dokumentiert Entscheidungen, verworfene Richtungen, Referenzen, Artefakte und offene Aufgaben. Sie ist keine Freigabe für weitere Deployments.

## 1. Ausgangspunkt und repariertes Deployment

Arturo meldete den neuen ADDD-Branch als kaputt. Repository: `/root/projects/Portfolio`, GitHub `pleonastic6/Portfolio`, Branch `redesign/addd-heron-restart`. Typecheck und Build funktionierten; Ursache der öffentlichen Probleme war GitHub Pages im Legacy-Modus aus Branch-Root statt Veröffentlichung des Vite-Builds aus `dist/`.

Mit Zustimmung wurde Pages auf GitHub Actions umgestellt. `.github/workflows/deploy.yml` reagiert seither auf `main` UND `redesign/addd-heron-restart`. Der damalige Deploy-Fix wurde unter `b19e5d4` veröffentlicht und geprüft.

Wichtig: Ein Push auf den Redesign-Branch ist KEINE private Vorschau, sondern löst die öffentliche Veröffentlichung aus.

## 2. Erster Art-Direction-Pass — umgesetzt, anschließend kritisiert

Technisch funktionierende Seite war gestalterisch zu brav. Diagnose: Moduldiagramm ohne starken Hauptdarsteller, überall gleichartige Linien/Labels/Raster, Projekte wirkten wie Datenbankeinträge.

Umgesetzt:
- Großes ADDD-Letterform-Keyvisual mit versetzter Konstruktionskontur statt vier Modulboxen.
- Größere, kompakte Hero-Headline.
- Editoriale Projektstrecke mit sehr großen Bildern, wechselnden Desktopbreiten und darunterliegenden Metadaten.
- Papier/Schwarz/Orange-Rot zunächst erhalten.
- Mobile Überbreite durch dekorative Eckmarken mittels `overflow-x: clip` am Seitencontainer beseitigt.

Dateien: `src/styles/tokens.css`, `src/themes/collective-os/CosHero.tsx`, `CosHero.module.css`, `CosWork.tsx`, `CosWork.module.css`, `CosPage.module.css`.

Commit `29b59bc` (design: amplify ADDD identity and editorial project layout), veröffentlicht. Typecheck, Build, diff-check sowie Browserprüfungen bei 1440/390/320 Pixeln erfolgreich; sechs Projekte, keine JavaScript-Fehler, kein horizontaler Überlauf. Workflow `38714959622` erfolgreich.

Arturos anschließende Kritik ist maßgeblich:
- Hero zu einfach: ein großes Logo reicht nicht.
- Erwartet etwas Besonderes wie Heron oder Artcraft, nicht bloß größere Typografie.
- Projektbilder waren vorher besser; jetzt zu groß.

Die vorherige kompakte Projektbildgröße soll wiederkommen. Das wurde besprochen, aber bisher NICHT umgesetzt. Der veröffentlichte große Hero und die großen Projektbilder sind weiterhin die Hauptseite.

## 3. Modellwechsel

Während der Arbeit Wechsel von `gpt-5.6-sol` zu `gpt-6-astra` über OpenAI Codex. Nutzer führte `/model gpt-6-astra` aus. Frühere pauschale Aussagen über dessen Designüberlegenheit waren keine belastbare Benchmark-Auswertung und sind keine technische Entscheidungsgrundlage.

## 4. Moodboard und Arbeitsweise

Nach dem unbefriedigenden Pass: erst Referenzen sammeln, keine weiteren blinden Umbauten oder Deployments. Eine konsistente eigene Richtung statt eines Mixes aller Referenzeffekte. Hero erst separat testen; öffentliche Startseite erst nach visueller Freigabe ersetzen.

### Vom Nutzer genannte Referenzen und konkret geschätzte Aspekte

- https://heronaiapp.com/ — Animationen und Zeichenbrett-Stil.
- https://de.nothing.tech/ — mit dem Bildschirm laufende Punkte, die das darunterliegende Bild invertieren; gesamte Designsprache.
- https://zink-miljoe.dk/ — Animationen und Präsentationsstil.
- https://getartcraft.com/ — besondere, räumliche Hero-Inszenierung; nicht nur Logo/Headline.
- https://wiredave.com/ — Aufbau und Animationen besonders stark.
- https://huyml.co/project/est-populo — Transitions beim Anklicken.
- https://neutomni.com/ — Fonts und Aufbau.
- https://lpas.com/ — seitwärts scrollende Elemente.
- https://twks.ch/en — großes aussagekräftiges Hero-Bild bzw. kleine Slideshow, cooles animiertes ASCII-Bild unten.
- https://unseen.co/ — begeistert; Frage nach Realisierbarkeit eines solchen Erlebnisses.
- https://www.igloo.inc/ — begeistert; Prinzip eines dominanten räumlichen Hauptmotivs interessant.
- https://lusion.co/ — Bilder fliegen besonders gut hinein.
- https://tympanus.net/Tutorials/PointerSquareLensDistortion/ — sehr cool, aber NUR in einem speziellen Bereich.
- https://tympanus.net/Tutorials/InfiniteScrollGSAPGallery/ — gefällt.
- https://projects.arkon.digital/threejs/wavy-cubes/ — gefällt als Effekt.
- https://tympanus.net/Tutorials/StickyGridScroll/ — gefällt als Scrollverhalten.

Nicht alle Referenzen wurden vollständig visuell/technisch geprüft. Die Liste enthält überwiegend Arturos eigene Beobachtungen, keine abgeschlossene Implementierungsanalyse. Artcraft wurde tatsächlich im Browser/Playwright geöffnet. Keine Behauptung aufstellen, alle Demos seien bereits auf Mobile, Performance und Lizenz geprüft.

### Inspirationssammlungen aus dem alten Gespräch

https://www.awwwards.com/websites/
https://gsap.com/showcase/
https://thefwa.com/
https://www.hoverstat.es/

Awwwards war der wahrscheinliche Ort, an dem Arturo Heron fand. Der Verlauf belegt aber NICHT, welche Sammlung er tatsächlich angeklickt hat.

## 5. Farbkonzept — neue akzeptierte Richtung

Arturo möchte viel Weiß, Schwarz und genau eine Akzentfarbe, ausdrücklich NICHT das bisherige Orange-Rot.

Akzeptierte Basis:
- leicht gebrochenes neutrales Weiß `#F7F7F4`
- Schwarz `#171717`
- Kobaltblau `#304FFE`
- vorgeschlagenes Liniengrau `#DCDCD6`

Kobalt für aktive Elemente, Interaktionen und gezielte Highlights, keine allgegenwärtigen blauen Kästen. Vom gelblich-beigen Papierlook weg. Diese Richtung ist im Prototyp vertreten, nicht auf der Hauptseite flächendeckend umgesetzt. Lime und Violett waren Optionen, wurden nicht gewählt.

## 6. Gemeinsame Leitidee

Ein fotografisches/gerendertes Hero-Motiv wechselt zwischen:
1. Materialbild
2. technischer Linien-/Konturdarstellung
3. ASCII

Immer dasselbe Motiv. Arturo fand diese Idee ausdrücklich gut. Ziel: Herons Zeichenbrett, Nothings Raster und ASCII als zusammenhängende Bildsprache statt unabhängiger Gimmicks.

Vorgeschlagene spätere Dramaturgie, noch nicht komplett umgesetzt/freigegeben:
- Hero mit dominantem Motiv und knapper Typografie.
- Projektbereich kompakt und lesbar, gezielte Bild-Einflüge.
- Eventuell ein kurzer Sticky-Grid-Abschnitt.
- Lokaler Linsen-/Verzerrungseffekt nur in einem abgegrenzten Experimentierbereich.
- ASCII-Variante des Hero-Motivs als Wiederaufnahme am Ende.
- Infinite Gallery eher für ein Lab mit genügend Material, nicht automatisch für wenige Projekte.
- Wavy Cubes nur falls motivisch passend, nicht zusätzlich als Dauerhintergrund.

Technische Einordnung: Zunächst bildbasierte Inszenierung; Midjourney liefert kein interaktives 3D-Modell. Die Kontur ist keine echte CAD-Geometrie. Ein echtes 3D-Modell erst erwägen, wenn räumliche Drehung wirklich erforderlich ist. Unseen-Ausarbeitungsgrad wurde NICHT versprochen.

## 7. Gewähltes Bildmotiv und Midjourney

Vorschlag, vom Nutzer zum Generieren angenommen: skulpturaler technischer Knoten aus vier breiten ineinandergreifenden Metallbändern; drei in mattem Silber/Aluminium, eines kobaltblau; offene Zwischenräume; leicht schwebend über neutralweißem Grund; weicher Schatten. Keine Würfel, kein 3D-ADDD-Logo, kein beliebiger Chrom-Donut/AI-Blob.

Übermittelter Prompt:

```text
Sculptural assembly of four broad rigid metal ribbons interlocking into one airy architectural knot, three ribbons in satin silver aluminium and one in vivid cobalt blue lacquer. Clearly separated bands with generous negative space between them, precise manufactured edges, subtle brushed surface, physically plausible construction. Floating slightly above a neutral off-white studio floor with a soft contact shadow. Three-quarter view, strong recognizable silhouette, entire sculpture visible, centered composition with generous whitespace around it. High-end experimental industrial design photography, soft directional studio lighting, tactile material detail, restrained reflections, crisp focus. An engineered art object, not a logo. --ar 16:9 --s 150 --no text typography watermark cables chrome balloons
```

Vierer-Auswahl: `/root/.hermes/cache/images/img_a7b072a23c3f.webp`.
Gewählt: oben rechts / Bild 2, wegen lesbarer verschlungener Form und offenen Zwischenräumen. Beige Hintergrund, teils Navy-Blau und unklare Anzahl tatsächlicher Bänder wurden ausdrücklich bemängelt. Nicht behaupten, das Bild zeige exakt vier klar getrennte Teile.

Angeforderter Upscale möglichst Subtle. Finale Nutzerdatei: `/root/.hermes/cache/images/img_802af627f8c1.png`. Original bleibt unverändert.

## 8. Hero-Prototyp — tatsächlicher Implementierungsstand

Separates Verzeichnis: `/root/projects/addd-hero-study`.

Dateien:
- `index.html` — eigenständige deutsche Hero-Studie.
- `style.css` — weiß/schwarz/kobalt, responsive Layout.
- `app.js` — scrollgesteuerte Überblendung, manuelle drei Stage-Buttons, Reduced-Motion-Verhalten.
- `generate_assets.py` — Materialbild neutralisieren/freistellen, Konturen und ASCII aus echten Bildpixeln erzeugen.
- `assets/material.png`, `assets/contour.png`, `assets/ascii.svg`, `assets/ascii.txt`.
- `source-manifest.json` — Herkunft/Crop-Daten; Methodentext nach manueller Maskenkorrektur möglicherweise veraltet.
- `verify.cjs`, `test-results.json` — Browserprüfungen.
- `screenshots/desktop-{material,contour,ascii}.png`, entsprechende Mobile-Bilder und Reduced-Motion-Screenshot.
- `package-preview.py` — bündelt HTML, CSS, JS und Assets.
- `ADDD-Hero-Prototyp.html` — eigenständig offline öffnende Datei mit eingebetteten Assets, bereits an Arturo geschickt.

Ein Subagent lieferte trotz Timeout die eigentlichen Dateien. Parent prüfte sie unabhängig. Automatische gradientbasierte Freistellung hatte Silberteile entfernt; durch eine manuell am Ausgangsbild gezogene Silhouetten-/Öffnungsmaske ersetzt. Das ist Prototyp-Aufbereitung, keine perfekte Produktionsfreistellung. Unbegründetes Registered-Trademark-Symbol aus Header entfernt.

Verifiziert durch tatsächlichen Lauf `python3 generate_assets.py && node verify.cjs`:
- Desktop 1440×1000 und Mobile 390×844.
- Material, Kontur, ASCII jeweils korrekt aktivierbar.
- Alle Bilddateien geladen.
- Keine JavaScript-/Console-Fehler in erfassten Tests.
- Kein horizontaler Überlauf.
- Zwischenzustände zeigen echte Überblendungswerte.
- Reduced Motion: manuelle ASCII-Auswahl funktioniert ohne langen Scrollbereich.

Visuell geprüfte Screenshots: Material Desktop und Kontur Mobile sowie vor Korrektur weitere Zustände.

Ehrlich kommunizierte Grenzen:
- Erste Hero-Studie, kein fertiger Auftritt.
- Kontur eher Bildskizze als präzise technische Zeichnung.
- Übergänge bislang Überblendungen, noch keine hochwertige Unseen-artige Choreografie.
- Bildmotiv neben Text kann noch zu produktbildartig wirken; Nutzerurteil steht aus.
- Keine fertige 3D-Szene, keine vollständige Referenz-Effektintegration.

Lokaler Server war unter `http://127.0.0.1:8766/` erreichbar. Laufzustand vor Weiterarbeit erneut prüfen.
Browserwerkzeuge: Chromium `/root/.cache/ms-playwright/chromium-1223/chrome-linux64/chrome`, Playwright `/root/.npm/_npx/420ff84f11983ee5/node_modules/playwright`. Vorhandene Installation nutzen statt unnötiger Browserdownloads.

## 9. Neueste Freigabe: Prototyp auf Pages

Arturo: „push das mal, will das auf pages sehen“.

Umgesetzt, ohne die Startseite zu ersetzen:
- Einzeldatei nach `/root/projects/Portfolio/public/hero-study/index.html` kopiert.
- Produktionsbuild und `git diff --check` erfolgreich.
- Commit `54ef5b6`: `feat: publish isolated hero study preview`.
- Push auf `redesign/addd-heron-restart` erfolgreich.
- Ziel: https://pleonastic6.github.io/Portfolio/hero-study/

Abschließend verifiziert: Workflow `38730977457` ist `completed` / `success`. Die Preview-URL ist erreichbar; der heruntergeladene HTML-Inhalt ist bytegleich mit `public/hero-study/index.html`. Die separate Studie ist damit live. Die Hauptseite wurde nicht ersetzt.

Git-Remote SSH-Host `github-personal` war in dieser Umgebung nicht auflösbar. Push funktionierte ohne Änderung des Remotes via:
`git -c credential.helper='!gh auth git-credential' push https://github.com/pleonastic6/Portfolio.git HEAD:refs/heads/redesign/addd-heron-restart`
Keine Zugangsdaten in diese Datei aufnehmen.

## 10. Nächste Schritte, nicht automatisch freigegeben

1. Pages-Workflow und Preview-URL abschließend prüfen, Arturo funktionierenden Link geben.
2. Feedback zur bewegten Hero-Studie einholen: Motiv tragfähig? Zu sehr Produktbild neben Text? Welche der drei Ansichten überzeugt?
3. Erst danach Motivaufbereitung, Typografie, Komposition und Übergänge vertiefen.
4. Genannte Referenzen gezielt technisch/visuell analysieren; mobile Bedienung, Reduced Motion, Performance und Lizenzen prüfen.
5. Kompakte Projektbildgröße bei späterer Hauptseitenintegration wiederherstellen.
6. Hauptseite NICHT ungefragt durch Studie ersetzen. Aktuelle Freigabe betrifft die separate Pages-Vorschau.

## 11. Kurzer Themenwechsel: InfSec

Arturo zeigte `/root/.hermes/cache/images/img_eb0d3abb8ac6.png` und fragte zur Labor-VM. Besprochen:
- `labvmctl status` auf eigenem Rechner; Wort in Klammern hinter `VM:` aus tatsächlicher Ausgabe ablesen.
- `labvmctl start --gui`.
- Vorgesehene Laboranmeldung Benutzer `lab`, Passwort `lab` laut Aufgabe; Terminal in VM, Benutzername vor `@` prüfen.
- Genaues Kommando für Modul/Drill `intro` war auf Ausschnitt nicht erkennbar; nicht erfunden, nach vorgelagertem Anleitungsteil gefragt.
- Nutzer sagte anschließend „alles gut weiter gehts mit addd“. Keine VM-Konfiguration durch den Assistenten vorgenommen.

## 12. Wichtigste Regeln für die Fortsetzung

- Kobalt statt Orange-Rot, neutrale helle Flächen.
- Besonderes Bild-/Bewegungserlebnis statt riesiger Wortmarke.
- Projektbilder kompakt, unverfälscht und lesbar.
- Effekte gezielt platzieren, keinen Effektkatalog bauen.
- Dasselbe Motiv über Material/Kontur/ASCII hinweg.
- Fortschritt durch reale Vorschau beurteilen, nicht durch große Designversprechen.
- Bestehende Assets/alte Themes erhalten; keine fremden Logos/unklar lizenzierten Assets kopieren.
- Keine weiteren Midjourney-Bilder nötig, bevor der aktuelle Motivtest bewertet ist.
