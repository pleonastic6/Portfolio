# assets

Projektbilder und andere importierte Medien.

Zwei Wege, je nachdem was gebraucht wird:

- **Hier ablegen und importieren** — z. B. `import nyc from '../assets/nyc.jpg'`, dann
  `image: nyc` in `src/data/projects.ts`. Vite hasht die Datei, sie wird langfristig
  cachebar und beim Build optimiert. Empfohlen für alles, was zum Design gehört.
- **In `public/` ablegen** — z. B. `public/projects/nyc.jpg`, referenziert als
  `image: '/projects/nyc.jpg'`. Die Datei wird unverändert nach `dist/` kopiert.
  Sinnvoll für Dateien, die unter einem festen Pfad erreichbar bleiben müssen
  (Social-Preview, PDF, Lebenslauf).

Empfohlene Bildgrößen: 2000 px Breite, 16:9, als WebP oder JPEG (Qualität ~80).
Ohne Bild zeigt ein Projekt einen gestalteten Platzhalter — nichts bricht.
