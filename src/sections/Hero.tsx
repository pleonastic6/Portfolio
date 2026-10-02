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
          <aside className={styles.osPanel} aria-label="ADDD Collective OS status map">
            <div className={styles.osBar}>
              <span className={styles.osDots} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="meta">ADDD/OPS-MAP · LIVE</span>
            </div>
            <div className={styles.osCanvas}>
              <i className={styles.osScan} aria-hidden="true" />
              <span className={`${styles.osCable} ${styles.osCableOne}`} />
              <span className={`${styles.osCable} ${styles.osCableTwo}`} />
              <span className={`${styles.osCable} ${styles.osCableThree}`} />
              <span className={`${styles.osCable} ${styles.osCableFour}`} />
              <div className={`${styles.osNode} ${styles.osCore}`}>
                <b>ADDD CORE</b>
                <span>idea → architecture → prototype → launch</span>
              </div>
              <div className={`${styles.osNode} ${styles.osNodeOne}`}>
                <b>ARTUR</b>
                <span>frontend · product · chaos into UI</span>
              </div>
              <div className={`${styles.osNode} ${styles.osNodeTwo}`}>
                <b>DAVID</b>
                <span>backend · data · infra logic</span>
              </div>
              <div className={`${styles.osNode} ${styles.osNodeThree}`}>
                <b>DAVID</b>
                <span>systems · tooling · automation</span>
              </div>
              <div className={`${styles.osNode} ${styles.osNodeFour}`}>
                <b>DOMINIK</b>
                <span>quality · docs · delivery</span>
              </div>
              <div className={styles.osHud}>
                <span>SYS.LOG</span>
                <strong>✓</strong> input: messy idea
                <strong>✓</strong> build: interactive prototype
                <strong>↯</strong> accent: noir / gold / redline / CAD grid
                <strong>→</strong> review: ready for brutal feedback
              </div>
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
