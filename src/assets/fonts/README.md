# src/assets/fonts

Ablageort für die optionalen Nothing-Schriften. Leer = die Seite läuft mit
IBM Plex Mono, nichts bricht.

## Erwartete Dateinamen

```
src/assets/fonts/NType82Mono-Regular.woff2   -> Labels, Metadaten, Navigation
src/assets/fonts/Ndot-55.woff2               -> Punktraster-Akzente
```

Optional, in `src/styles/fonts.css` auskommentiert:

```
src/assets/fonts/NType82-Regular.woff2
src/assets/fonts/LetteraMonoLLCondLight-Regular.woff2
```

Wer nur eine der beiden aktiven Dateien hat, kommentiert den anderen
`@font-face`-Block aus — sonst bricht der Build mit „file not found".

## OTF nach WOFF2 umwandeln

Die Quellen liegen als `.otf` vor. WOFF2 ist etwa halb so groß:

```bash
npm i -g ttf2woff2
ttf2woff2 < NType82Mono-Regular.otf > NType82Mono-Regular.woff2
ttf2woff2 < Ndot-55.otf > Ndot-55.woff2
```

Alternativ mit Python:

```bash
pip install fonttools brotli
fonttools ttLib.woff2 compress Ndot-55.otf
```

Notfalls tut es die `.otf` direkt — dann in `src/styles/fonts.css` Endung und
`format('opentype')` anpassen.

## Aktivieren

In `src/main.tsx` die auskommentierte Zeile einkommentieren:

```ts
import './styles/fonts.css'
```

Vite hasht die Dateien beim Build und schreibt relative Pfade — funktioniert
dadurch auch in einem Unterordner (z. B. GitHub Pages).

## Wo die Schriften landen

- **NType82 Mono** → alle technischen Labels, Metadaten, Navigation, Zahlen
  (`--font-tech`)
- **Ndot 55** → nur die Punktraster-Akzente: Hero-Kicker, Sektionsnummern,
  Projektzähler (`--font-dot`). Bewusst sparsam — als Fließtext ist eine
  Punktmatrix schlecht lesbar.

## Lizenz

NType82 und Ndot sind Markenschriften von Nothing Technology, LetteraMono ist
eine kommerzielle Schrift von Lineto. Für die kursierenden Kopien ist keine
Weitergabe- oder Nutzungslizenz veröffentlicht. Lokal ausprobieren ist eine
Sache — sie in ein öffentliches Repository zu committen oder auf einer
öffentlichen Seite auszuliefern, ist eine andere. Deshalb stehen sie in
`.gitignore`.

Freie Alternativen mit ähnlichem Charakter für den Punktraster-Akzent:
**Silkscreen**, **Micro 5**, **Pixelify Sans** (alle SIL Open Font License).
