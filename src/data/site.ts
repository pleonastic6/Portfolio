/**
 * Zentrale Seitenkonfiguration.
 * Domain, Kontakt, Social-Links und ein paar Schalter fuer die Praesentation.
 */

export type Localized = { de: string; en: string }

export const site = {
  name: 'ADDD',
  initials: 'ADDD',
  /** Vor dem Deployment eintragen (auch in index.html: canonical + og:url). */
  url: 'https://pleonastic6.github.io/Portfolio/',
  email: 'artur.renner6@gmail.com',
  location: { de: 'Deutschland', en: 'Germany' } satisfies Localized,
  /** technisches Detail im Hero — Koordinaten von Amberg */
  coordinates: 'Artur / David / David / Dominik',
  /** Erscheint als Statuspunkt in der Navigation. false blendet ihn aus. */
  available: true,
  /** Eigener Cursor auf Desktop. Bei Bedarf hier abschalten. */
  customCursor: true,
  year: 2026,
} as const

export type SocialLink = {
  id: string
  label: string
  href: string
  handle: string
}

export const socials: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/pleonastic6',
    handle: '@pleonastic6',
  },
]

export type NavId = 'work' | 'about' | 'build' | 'team' | 'skills' | 'contact'

export const navItems: { id: NavId; href: string }[] = [
  { id: 'work', href: '#work' },
  { id: 'about', href: '#about' },
  { id: 'build', href: '#build' },
  { id: 'team', href: '#team' },
  { id: 'skills', href: '#skills' },
  { id: 'contact', href: '#contact' },
]

/**
 * Angaben fuer Impressum und Datenschutzerklaerung.
 *
 * WICHTIG: Ohne ladungsfaehige Anschrift ist ein Impressum unvollstaendig.
 * Vor der Veroeffentlichung unter eigener Domain ausfuellen.
 */
export const legal = {
  addressLines: ['Strasse Hausnummer', 'PLZ Amberg', 'Deutschland'],
  /** Wer die Seite ausliefert - beim Wechsel auf eigenen Webspace anpassen. */
  host: {
    name: 'GitHub, Inc.',
    address: '88 Colin P Kelly Jr St, San Francisco, CA 94107, USA',
  },
} as const
