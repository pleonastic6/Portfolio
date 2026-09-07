
/** Ein Abschnitt auf den Rechtsseiten. */
export type LegalBlock = {
  heading: string
  body: string[]
}

/**
 * Struktur aller Oberflaechentexte.
 * en.ts und de.ts werden gegen diesen Typ geprueft — fehlende oder
 * ueberzaehlige Keys fallen beim Build auf.
 */
export type Translation = {
  meta: {
    label: string
    code: string
    htmlLang: string
    documentTitle: string
  }
  nav: {
    work: string
    about: string
    skills: string
    contact: string
    menu: string
    close: string
    available: string
    unavailable: string
    language: string
    skip: string
    home: string
  }
  hero: {
    label: string
    headline: [string, string, string]
    lead: string
    cta: string
    scroll: string
    role: string
  }
  work: {
    index: string
    title: string
    counter: string
    viewProject: string
    viewCode: string
    readCase: string
    role: string
    stack: string
    year: string
    placeholderNote: string
  }
  about: {
    index: string
    title: string
    statement: string
    bio: string[]
    facts: {
      location: string
      focus: string
      studies: string
      status: string
    }
    values: {
      focus: string
      studies: string
      status: string
    }
  }
  skills: {
    index: string
    title: string
    lead: string
  }
  contact: {
    index: string
    title: string
    statement: [string, string]
    lead: string
    emailLabel: string
    socialLabel: string
    copy: string
    copied: string
    responseTime: string
  }
  legal: {
    back: string
    updated: string
    imprintTitle: string
    privacyTitle: string
    responsible: string
    contact: string
    address: string
    hosting: string
    imprint: LegalBlock[]
    privacy: LegalBlock[]
  }
  footer: {
    built: string
    rights: string
    colophon: string
    imprint: string
    privacy: string
  }
}
