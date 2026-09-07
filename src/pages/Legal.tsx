import { useEffect } from 'react'
import { legal, site } from '../data/site'
import { useI18n } from '../i18n'
import { LanguageSwitcher } from '../components/LanguageSwitcher'

import styles from './Legal.module.css'

type LegalProps = {
  kind: 'imprint' | 'privacy'
}

/** Impressum und Datenschutz — eigene Ansicht, bewusst ohne Hauptnavigation. */
export function Legal({ kind }: LegalProps) {
  const { t } = useI18n()

  const title = kind === 'imprint' ? t.legal.imprintTitle : t.legal.privacyTitle
  const blocks = kind === 'imprint' ? t.legal.imprint : t.legal.privacy

  useEffect(() => {
    window.scrollTo(0, 0)
    // Der I18nProvider setzt den Titel ebenfalls; Effekte der Kinder laufen
    // vor denen der Eltern, deshalb erst im naechsten Frame ueberschreiben.
    const frame = requestAnimationFrame(() => {
      document.title = `${title} — ${site.name}`
    })
    return () => {
      cancelAnimationFrame(frame)
      document.title = t.meta.documentTitle
    }
  }, [title, t])

  return (
    <div className={styles.page}>
      <header className={`shell ${styles.head}`}>
        <a className={`label ${styles.back}`} href="#top">
          <span aria-hidden="true">←</span> {t.legal.back}
        </a>
        <LanguageSwitcher />
      </header>

      <main id="main" className={`shell ${styles.main}`}>
        <p className={`meta ${styles.updated}`}>{t.legal.updated}</p>
        <h1 className={styles.title}>{title}</h1>

        <dl className={styles.facts}>
          <div className={styles.fact}>
            <dt className="label">{t.legal.responsible}</dt>
            <dd>{site.name}</dd>
          </div>
          <div className={styles.fact}>
            <dt className="label">{t.legal.address}</dt>
            <dd>
              {legal.addressLines.map((line) => (
                <span key={line} className={styles.addressLine}>
                  {line}
                </span>
              ))}
            </dd>
          </div>
          <div className={styles.fact}>
            <dt className="label">{t.legal.contact}</dt>
            <dd>
              <a className={styles.link} href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </dd>
          </div>
          {kind === 'privacy' && (
            <div className={styles.fact}>
              <dt className="label">{t.legal.hosting}</dt>
              <dd>
                {legal.host.name}
                <span className={styles.addressLine}>{legal.host.address}</span>
              </dd>
            </div>
          )}
        </dl>

        <div className={styles.blocks}>
          {blocks.map((block) => (
            <section key={block.heading} className={styles.block}>
              <h2 className={styles.heading}>{block.heading}</h2>
              {block.body.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>

        <a className={`label ${styles.backBottom}`} href="#top">
          <span aria-hidden="true">←</span> {t.legal.back}
        </a>
      </main>
    </div>
  )
}
