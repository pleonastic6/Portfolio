import type { Translation } from './types'

export const en: Translation = {
  meta: {
    label: 'English',
    code: 'EN',
    htmlLang: 'en',
    documentTitle: 'ADDD — Developer Collective',
  },
  nav: {
    work: 'Work',
    about: 'About',
    build: 'What we build',
    team: 'Team',
    skills: 'Skills',
    contact: 'Contact',
    menu: 'Menu',
    close: 'Close',
    available: 'Open to collaboration',
    unavailable: 'Currently booked',
    language: 'Change language',
    skip: 'Skip to content',
    home: 'Back to top',
  },
  hero: {
    label: 'Collective',
    headline: ['Four developers.', 'One collective.', 'Shared craft.'],
    lead: 'ADDD is a developer collective by Artur, David, David and Dominik — young, open-ended and serious about building software well.',
    cta: 'See our work',
    scroll: 'Scroll',
    role: 'Software Development',
  },
  work: {
    index: '01',
    title: 'Selected work',
    counter: 'Projects',
    viewProject: 'View project',
    viewCode: 'View code',
    readCase: 'Read the case study',
    role: 'Role',
    stack: 'Stack',
    year: 'Year',
    placeholderNote: 'Visual pending',
  },
  about: {
    index: '02',
    title: 'About',
    statement: 'Four developers who chose to work together. What we build is still forming; how we approach it is already settled.',
    bio: [
      'ADDD is Artur, David, David and Dominik — four developers who want to build software together rather than alone. The collective is young and the focus is still open, but the shared standard is clear: readable, robust work beats fast assembly.',
      'Between us: frontend, data work, tools and design. ADDD is not a finished product and not a classic agency yet — it is a shared frame for projects, experiments and software worth showing.',
    ],
    facts: {
      location: 'Based in',
      focus: 'Focus',
      studies: 'Members',
      status: 'Status',
    },
    values: {
      focus: 'Software Development',
      studies: 'Artur · David · David · Dominik',
      status: 'Open to early collaborations',
    },
  },
  build: {
    index: '03',
    title: 'What we build',
    lead: 'Not a fixed agency box yet. More like a shared field for projects that should be technically clean and visually specific.',
    items: [
      {
        title: 'Web interfaces',
        text: 'Portfolios, landing pages and small apps that avoid template fatigue while staying maintainable.',
      },
      {
        title: 'Tools & automation',
        text: 'Internal helpers, scripts and workflows that remove repetition and give developers time back.',
      },
      {
        title: 'Data visualization',
        text: 'Raw data becomes maps, scenes and interfaces that reveal patterns instead of just showing tables.',
      },
      {
        title: 'Experiments',
        text: 'Prototypes, playful studies and technical tests — small enough to try, serious enough to learn from.',
      },
    ],
  },
  team: {
    index: '04',
    title: 'Team',
    lead: 'ADDD stands for Artur, David, David and Dominik. Four developers, no inflated agency theatre yet — but enough energy to actually build things.',
    members: [
      { name: 'Artur', role: 'Frontend / data / design', text: 'Connects interfaces, data visualization and a system-minded view of design.' },
      { name: 'David', role: 'Development', text: 'Part of the collective. A sharper focus will be added once we can name it honestly.' },
      { name: 'David', role: 'Development', text: 'Part of the collective. Not filler — just not overdefined before real projects shape the role.' },
      { name: 'Dominik', role: 'Development', text: 'Part of the collective. Focus follows when project responsibility becomes concrete.' },
    ],
  },
  skills: {
    index: '05',
    title: 'Skills & technology',
    lead: 'What we work with — built up across four developers, chosen for what it makes possible.',
  },
  contact: {
    index: '06',
    title: 'Contact',
    statement: ['Something worth', 'building together?'],
    lead: 'ADDD is early and our direction is still open. We are happy to talk about projects, collaborations and work that interests us. Until there is a shared address, contact temporarily goes through the email below.',
    emailLabel: 'Contact',
    socialLabel: 'Find us',
    copy: 'Copy',
    copied: 'Copied',
    responseTime: 'We aim to reply within a few days',
  },
  legal: {
    back: 'Back to the homepage',
    updated: 'Last updated: September 2026',
    imprintTitle: 'Legal notice',
    privacyTitle: 'Privacy policy',
    responsible: 'Responsible',
    contact: 'Contact',
    address: 'Address',
    hosting: 'Hosting',
    imprint: [
      {
        heading: 'Information pursuant to § 5 DDG',
        body: [
          'This website is a private portfolio and is not operated commercially. The details below fulfil the German information requirements for digital services.',
        ],
      },
      {
        heading: 'Responsible for content under § 18 (2) MStV',
        body: ['The person named above, at the address given above.'],
      },
      {
        heading: 'Liability for content',
        body: [
          'The content of these pages was created with care. No guarantee can be given for its accuracy, completeness or timeliness. As a service provider I am responsible for my own content under general law, but not obliged to monitor transmitted or stored third-party information.',
        ],
      },
      {
        heading: 'Liability for links',
        body: [
          'This site contains links to external websites over whose content I have no control. The respective provider is always responsible for that content. The linked pages were checked for legal violations at the time of linking; none were apparent. Links will be removed promptly if violations become known.',
        ],
      },
      {
        heading: 'Copyright',
        body: [
          'The content and works created by me on these pages are subject to German copyright law. Third-party contributions are marked as such. Reproduction, modification and distribution beyond the limits of copyright require my written consent.',
        ],
      },
      {
        heading: 'Dispute resolution',
        body: [
          'The European Commission provides a platform for online dispute resolution. I am neither willing nor obliged to take part in dispute resolution proceedings before a consumer arbitration board.',
        ],
      },
    ],
    privacy: [
      {
        heading: 'Overview',
        body: [
          'This website is deliberately built to collect as little as possible: no cookies, no analytics, no advertising networks, no embedded third-party services. There is no contact form and there are no user accounts.',
          'Personal data only arises where it is technically unavoidable (server log files) or where you contact me yourself.',
        ],
      },
      {
        heading: 'Server log files',
        body: [
          'When you open this website your browser transmits technically necessary data, which the host stores in log files: IP address, date and time of access, the address requested, the amount of data transferred, the referrer, and details about your browser and operating system.',
          'The legal basis is Art. 6 (1) (f) GDPR — the legitimate interest in operating the site securely and without faults. This data is not combined with other sources.',
        ],
      },
      {
        heading: 'Fonts and external content',
        body: [
          'All typefaces are bundled with the project and served from the same server as the site itself. No connection is made to Google Fonts or any other content delivery network, so your IP address is not passed to a third party.',
        ],
      },
      {
        heading: 'Local storage in your browser',
        body: [
          'The site remembers your language choice (German or English) in your browser\'s local storage. That entry stays on your device, is never sent to the server and is not evaluated. You can delete it at any time in your browser settings.',
        ],
      },
      {
        heading: 'Contact by email',
        body: [
          'If you write to me, I process your details solely to handle your enquiry. The legal basis is Art. 6 (1) (b) GDPR for contract-related enquiries, otherwise Art. 6 (1) (f) GDPR. The data is deleted once it is no longer needed and no retention obligations apply.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'You have the right to information about the data stored about you, and to its correction, deletion or restriction of processing. You also have a right to data portability and a right to object to processing based on legitimate interests.',
          'You may also lodge a complaint with a data protection supervisory authority. In Bavaria this is the Bayerisches Landesamt für Datenschutzaufsicht in Ansbach.',
        ],
      },
    ],
  },
  footer: {
    built: 'Built by ADDD',
    rights: 'All rights reserved',
    colophon: 'Vite / React / TypeScript',
    imprint: 'Imprint',
    privacy: 'Privacy',
  },
}
