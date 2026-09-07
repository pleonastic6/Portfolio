import type { CSSProperties } from 'react'
import { site } from '../data/site'
import { useI18n } from '../i18n'
import styles from './Hero.module.css'

/**
 * Volle Bildschirmhöhe, Typografie als Hauptmotiv.
 * Die Wörter laufen gestaffelt hinter je einer Maske hoch (Hero.module.css).
 */
export function Hero() {
  const { t, pick } = useI18n()

  return (
    // data-intro: der Aufbau startet erst auf das Signal aus main.tsx.
    <section id="top" className={styles.hero} aria-labelledby="hero-title" data-intro>
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
          {t.hero.headline.map((line, lineIndex) => (
            <span key={line} className={styles.line}>
              {/* Wortweise gestaffelt: jedes Wort steigt hinter seiner eigenen
                  Maske hoch. Der Satz baut sich damit auf, statt zeilenweise
                  aufzuklappen — bei identischen Kosten deutlich lebendiger. */}
              {line.split(' ').map((word, wordIndex) => (
                <span key={`${lineIndex}-${wordIndex}`} className={styles.word}>
                  <span
                    className={styles.wordInner}
                    style={
                      { '--d': `${240 + lineIndex * 130 + wordIndex * 75}ms` } as CSSProperties
                    }
                  >
                    {word}
                  </span>
                </span>
              ))}
            </span>
          ))}
        </h1>

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
