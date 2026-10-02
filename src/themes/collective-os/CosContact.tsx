import { useCallback, useEffect, useState } from 'react'
import { site, socials } from '../../data/site'
import { useI18n } from '../../i18n'
import { useInView } from '../../hooks/useInView'
import { MassingModel } from './MassingModel'
import { Btn, Fade, Split, ui } from './ui'
import styles from './CosContact.module.css'

/**
 * Abschluss als Planausschnitt: drei Spalten mit gestrichelten Achsen und
 * Koordinaten an den Kreuzungspunkten, in der Mitte die Aufforderung,
 * darunter das Modell noch einmal — diesmal ohne Bemassung.
 */
export function CosContact() {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)
  const deco = useInView<HTMLDivElement>(0.25)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2200)
    return () => window.clearTimeout(timer)
  }, [copied])

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
    } catch {
      /* ohne Clipboard bleibt der mailto-Link */
    }
  }, [])

  return (
    <section id="contact" className={styles.cta} aria-labelledby="contact-title">
      <div className={styles.headRow}>
        <div className={`${styles.cell} ${styles.left}`}>
          <span className={styles.coord}>[0,246]</span>
        </div>
        <div className={`${styles.cell} ${styles.center}`}>
          <span className={`${styles.coord} ${styles.coordTop}`}>[831,0]</span>
          <p className={`${ui.mono} ${styles.label}`}>
            [{t.contact.index}] {t.contact.title}
          </p>
        </div>
        <div className={`${styles.cell} ${styles.right}`}>
          <span className={`${styles.coord} ${styles.coordTop}`}>[2303,0]</span>
        </div>
      </div>

      <div className={styles.mainRow}>
        <div className={`${styles.cell} ${styles.left}`}>
          <span className={styles.coord}>[0,544]</span>
        </div>
        <div className={`${styles.cell} ${styles.center} ${styles.mainCenter}`}>
          <Split id="contact-title" text={t.contact.statement.join(' ')} className={`${ui.h2} ${styles.title}`} />
          <Fade as="p" className={`${ui.txt16} ${styles.sub}`} delay={120}>
            {t.contact.lead}
          </Fade>
          <Fade className={styles.btns} delay={200}>
            <Btn href={`mailto:${site.email}`}>{t.cos.contactButton}</Btn>
            <Btn variant="outline" onClick={copy} icon={false}>
              {copied ? t.contact.copied : t.cos.copyEmail}
            </Btn>
          </Fade>
          <p className={`${ui.mono12} ${styles.mail}`}>
            {site.email} — {t.contact.responseTime}
          </p>
        </div>
        <div className={`${styles.cell} ${styles.right} ${styles.socials}`}>
          <p className={ui.mono12}>{t.contact.socialLabel}</p>
          {socials.map((social) => (
            <a key={social.id} href={social.href} target="_blank" rel="noreferrer" className={styles.social}>
              <span className={`${ui.mono} ${ui.ink}`}>{social.label}</span>
              <span className={`${ui.mono12} ${ui.muted}`}>{social.handle}</span>
            </a>
          ))}
        </div>
      </div>

      <div className={styles.decoRow}>
        <div className={`${styles.cell} ${styles.left}`} />
        <div ref={deco.ref} className={`${styles.cell} ${styles.center} ${styles.decoCenter}`}>
          <MassingModel annotations={false} drawn={deco.inView} className={styles.model} />
        </div>
        <div className={`${styles.cell} ${styles.right}`} />
      </div>
    </section>
  )
}
