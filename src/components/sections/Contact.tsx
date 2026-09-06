import { useState } from 'react'
import { site, socials } from '../../content/site'
import { useI18n } from '../../i18n'
import { Section } from '../ui/Section'

export function Contact() {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* Clipboard nicht verfuegbar - der mailto-Link bleibt als Weg */
    }
  }

  return (
    <Section id="contact" title={t.contact.title} lead={t.contact.lead}>
      <p className="contact__mail">{site.email}</p>

      <div className="contact__actions">
        <a className="btn btn--primary" href={`mailto:${site.email}`}>
          {t.contact.emailCta}
        </a>
        <button type="button" className="btn btn--ghost" onClick={copyEmail}>
          {copied ? t.contact.copied : t.contact.copy}
        </button>
      </div>

      <div style={{ marginTop: 'var(--space-7)' }}>
        <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>
          {t.contact.elsewhere}
        </p>
        <div className="link-row">
          {socials.map((social) => (
            <a
              key={social.id}
              className="link-inline"
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </Section>
  )
}
