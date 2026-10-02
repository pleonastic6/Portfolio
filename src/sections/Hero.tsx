import type { CSSProperties } from 'react'
import { site } from '../data/site'
import { useI18n } from '../i18n'
import { useTheme } from '../theme'
import { ParticleMark } from '../components/ParticleMark'
import styles from './Hero.module.css'

/**
 * Volle Bildschirmhöhe, Typografie als Hauptmotiv.
 * Die Zeilen laufen gestaffelt hinter einer Maske hoch (siehe Hero.module.css).
 */
export function Hero() {
  const { t, pick } = useI18n()
  const { theme } = useTheme()

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      {/* Punktwolke in beiden dunklen Themes; auf Pergament traegt sie nicht.
          Der key erzwingt beim Themewechsel einen Neuaufbau — die Farben
          werden einmal beim Start aus den CSS-Variablen gelesen. */}
      {(theme.id === 'noir-et-or' || theme.id === 'terminal-phosphor') && (
        <ParticleMark key={theme.id} />
      )}
      <div className={`shell ${styles.inner}`}>
        <div className={styles.top}>
          <p className={`label ${styles.kicker}`} style={{ '--d': '80ms' } as CSSProperties}>
            {t.hero.label} / {site.year}
          </p>
          <p className={`meta ${styles.coords}`} style={{ '--d': '160ms' } as CSSProperties}>
            {site.coordinates}
          </p>
        </div>

        <h1 id="hero-title" className={styles.headline}>
          {t.hero.headline.map((line, index) => (
            <span key={line} className={styles.line}>
              <span
                className={styles.lineInner}
                style={{ '--d': `${240 + index * 110}ms` } as CSSProperties}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        {theme.id === 'collective-os' && (
          <aside className={styles.osPanel} aria-label="ADDD Collective OS CAD viewport">
            <div className={styles.osBar}>
              <span className={styles.osDots} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className={styles.osTabActive}>ADDD_OS · LEVEL 01</span>
              <span className={styles.osTab}>PROCESS MAP</span>
              <span className={styles.osTab}>TEAM NODES</span>
              <span className={styles.osSpacer} />
              <span className="meta">Scale 1:100</span>
              <button type="button" className={styles.osTool} aria-label="Zoom out">−</button>
              <span className={styles.osZoom}>120%</span>
              <button type="button" className={styles.osTool} aria-label="Zoom in">+</button>
            </div>
            <div className={styles.osCanvas} data-cursor="hover">
              <i className={styles.osScan} aria-hidden="true" />
              <svg className={styles.osPlan} viewBox="0 0 920 620" role="img" aria-label="CAD-artige ADDD Systemkarte">
                <defs>
                  <pattern id="addd-hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <path d="M0 0h9" />
                  </pattern>
                </defs>
                <g className={styles.osPlanGrid}>
                  <path d="M110 70v480M300 70v480M520 70v480M810 70v480M70 120h790M70 305h790M70 510h790" />
                  <circle cx="110" cy="42" r="18" /><text x="110" y="47">A</text>
                  <circle cx="300" cy="42" r="18" /><text x="300" y="47">D</text>
                  <circle cx="520" cy="42" r="18" /><text x="520" y="47">D</text>
                  <circle cx="810" cy="42" r="18" /><text x="810" y="47">D</text>
                </g>
                <g className={styles.osWalls}>
                  <path d="M90 95H835V535H90z" />
                  <path d="M90 290h745M275 95v195M505 95v195M690 95v440M275 290v245M505 290v245" />
                  <path d="M90 95H835V535H90z" className={styles.osHatch} />
                </g>
                <g className={styles.osDoors}>
                  <path d="M260 290a54 54 0 0 1 54 54M490 290a54 54 0 0 1 54 54M690 230a54 54 0 0 0-54 54M505 455a54 54 0 0 1 54 54" />
                </g>
                <g className={styles.osRooms}>
                  <text x="178" y="198">ARTUR / UI</text><text x="178" y="224">PRODUCT + FRONTEND</text>
                  <text x="390" y="198">DAVID / DATA</text><text x="390" y="224">BACKEND + MODELS</text>
                  <text x="738" y="198">DAVID / OPS</text><text x="738" y="224">TOOLS + SYSTEMS</text>
                  <text x="180" y="415">DOMINIK / QA</text><text x="180" y="441">STRUCTURE + DELIVERY</text>
                  <text x="594" y="415">CORE CORRIDOR</text><text x="594" y="441">IDEA → BUILD → SHIP</text>
                </g>
                <g className={styles.osRedlines}>
                  <path d="M342 296c25-28 75-28 100 0 28 31 18 80-28 96-41 14-85-16-82-58" />
                  <path d="M632 286c24-20 66-18 86 8 22 29 8 70-28 82-39 13-76-13-76-51" />
                  <path d="M178 350c21-18 56-17 75 6 20 24 7 62-25 72-33 10-64-10-66-43" />
                </g>
              </svg>
              <button type="button" className={`${styles.osMarker} ${styles.osMarkerOne}`}>01</button>
              <button type="button" className={`${styles.osMarker} ${styles.osMarkerTwo}`}>02</button>
              <button type="button" className={`${styles.osMarker} ${styles.osMarkerThree}`}>03</button>
              <button type="button" className={`${styles.osMarker} ${styles.osMarkerFour}`}>04</button>
              <div className={styles.osHud}>
                <span>ADDD AGENT</span><span>WATCHING</span>
                <strong>001</strong><em>READ COLLECTIVE BRIEF</em><b>OK</b>
                <strong>002</strong><em>INDEX PROJECT SLOTS</em><b>OK</b>
                <strong>003</strong><em>MAP FOUR BUILDERS</em><b>OK</b>
                <strong>004</strong><em>FLAG GENERIC AGENCY SLOP</em><b>4</b>
                <strong>005</strong><em>BUILD DARK SYSTEM VIEW</em><b>LIVE</b>
              </div>
              <div className={styles.osCoords}>X:0412PX&nbsp;&nbsp;Y:0206PX</div>
              <div className={styles.osHint}>Click / drag / inspect</div>
            </div>
          </aside>
        )}

        <div className={styles.bottom}>
          <div className={styles.rule} style={{ '--d': '620ms' } as CSSProperties} />

          <div className={styles.bottomRow}>
            <p className={styles.lead} style={{ '--d': '700ms' } as CSSProperties}>
              {t.hero.lead}
            </p>

            <div className={styles.aside} style={{ '--d': '780ms' } as CSSProperties}>
              <p className={`meta ${styles.role}`}>
                {t.hero.role} — {pick(site.location)}
              </p>
              <a className={styles.cta} href="#work">
                <span>{t.hero.cta}</span>
                <span className={styles.ctaArrow} aria-hidden="true">
                  ↓
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <p className={`meta ${styles.scroll}`} aria-hidden="true">
        {t.hero.scroll}
      </p>
    </section>
  )
}
