import { useCallback, useEffect, useState } from 'react'
import { site, socials } from '../data/site'
import { useI18n } from '../i18n'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import styles from './Contact.module.css'

export function Contact() {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2200)
    return () => window.clearTimeout(timer)
  }, [copied])

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
    } catch {
      /* ohne Clipboard-Rechte bleibt der mailto-Link der Weg */
    }
  }, [])

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className="shell">
        <SectionHeader id="contact-title" index={t.contact.index} title={t.contact.title} />

        <Reveal>
          <p className={styles.statement}>
            {t.contact.statement.map((line) => (
              <span key={line} className={styles.statementLine}>
                {line}
              </span>
            ))}
          </p>
        </Reveal>

        <div className={styles.grid}>
          <Reveal className={styles.mailBlock} delay={80}>
            <p className="label">{t.contact.emailLabel}</p>
            <a className={styles.mail} href={`mailto:${site.email}`}>
              <span className={styles.mailText}>{site.email}</span>
              <span className={styles.mailArrow} aria-hidden="true">
                ↗
              </span>
            </a>
            <div className={styles.mailFoot}>
              <button type="button" className={`meta ${styles.copy}`} onClick={copyEmail}>
                {copied ? t.contact.copied : t.contact.copy}
              </button>
              <p className={`meta ${styles.response}`}>{t.contact.responseTime}</p>
            </div>
          </Reveal>

          <Reveal className={styles.side} delay={160}>
            <p className={styles.lead}>{t.contact.lead}</p>

            <ul className={styles.socials}>
              <li className="label">{t.contact.socialLabel}</li>
              {socials.map((social) => (
                <li key={social.id}>
                  <a className={styles.social} href={social.href} target="_blank" rel="noreferrer">
                    <span>{social.label}</span>
                    <span className={`meta ${styles.handle}`}>{social.handle}</span>
                    <span className={styles.socialArrow} aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
