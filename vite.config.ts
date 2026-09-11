import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Das Stylesheet des Einstiegs blockiert sonst das erste Bild der Seite:
 * Der Browser muss es vollstaendig geladen haben, bevor er irgendetwas
 * zeichnet — auf langsamem Mobilfunk der groesste Einzelposten. Bei rund
 * 7 kB gzip ist es guenstiger, es direkt in die HTML zu legen.
 *
 * Betroffen ist nur das Einstiegs-Stylesheet; die Styles der nachgeladenen
 * Unterseiten bleiben eigene Dateien.
 */
function inlineEntryCss(): Plugin {
  return {
    name: 'inline-entry-css',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const bundle = ctx.bundle
        if (!bundle) return html

        return html.replace(
          /<link rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*>/g,
          (tag, href: string) => {
            const fileName = href.replace(/^\.?\//, '')
            const asset = bundle[fileName]
            if (!asset || asset.type !== 'asset') return tag

            // Im Stylesheet stehen die Pfade relativ zu assets/. In der HTML
            // stimmt diese Ebene nicht mehr — sonst laufen Schriften und
            // Muster ins Leere.
            const dir = fileName.includes('/') ? fileName.slice(0, fileName.lastIndexOf('/')) : ''
            const css = String(asset.source).replace(
              /url\((\s*['"]?)\.\//g,
              (_m, quote: string) => `url(${quote}./${dir ? `${dir}/` : ''}`,
            )

            delete bundle[fileName]
            return `<style>${css}</style>`
          },
        )
      },
    },
  }
}

/**
 * Die beiden sofort sichtbaren Schriften frueher anfordern. Ohne Preload
 * entdeckt der Browser sie erst, nachdem er das CSS gelesen hat.
 */
function preloadFonts(match: RegExp[]): Plugin {
  return {
    name: 'preload-fonts',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const bundle = ctx.bundle
        if (!bundle) return html

        const files = Object.keys(bundle).filter(
          (name) => name.endsWith('.woff2') && match.some((re) => re.test(name)),
        )
        if (files.length === 0) return html

        const links = files
          .map(
            (file) =>
              `<link rel="preload" as="font" type="font/woff2" crossorigin href="./${file}">`,
          )
          .join('\n    ')

        return html.replace('</head>', `  ${links}\n  </head>`)
      },
    },
  }
}

// base: './' -> relative Pfade im Build.
// Dadurch laeuft der Ordner dist/ sowohl auf einer eigenen Domain (Root)
// als auch in einem Unterordner (z.B. example.de/portfolio/) ohne Aenderung.
export default defineConfig({
  base: './',
  plugins: [
    react(),
    inlineEntryCss(),
    preloadFonts([/newsreader-latin-wght/, /space-mono-latin-400/]),
  ],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
