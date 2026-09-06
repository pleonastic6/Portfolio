/**
 * Zentrale Seitenkonfiguration.
 * Domain, Kontakt, Social-Links und ein paar Schalter fuer die Praesentation.
 */

export type Localized = { de: string; en: string }

export const site = {
  name: 'Artur Renner',
  initials: 'AR',
  /** Vor dem Deployment eintragen (auch in index.html: canonical + og:url). */
  url: 'https://example.com',
  email: 'artur.renner6@gmail.com',
  location: { de: 'Deutschland', en: 'Germany' } satisfies Localized,
  /** technisches Detail im Hero — Koordinaten von Amberg */
  coordinates: '49.4453° N / 11.8625° E',
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
  {
    id: 'linkedin',
    label: 'LinkedIn',
    // TODO: eigene LinkedIn-URL eintragen
    href: 'https://www.linkedin.com/',
    handle: '/in/artur-renner',
  },
]

export type NavId = 'work' | 'about' | 'skills' | 'contact'

export const navItems: { id: NavId; href: string }[] = [
  { id: 'work', href: '#work' },
  { id: 'about', href: '#about' },
  { id: 'skills', href: '#skills' },
  { id: 'contact', href: '#contact' },
]
