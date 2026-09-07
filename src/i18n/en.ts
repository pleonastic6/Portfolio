import type { Translation } from './types'

export const en: Translation = {
  meta: {
    label: 'English',
    code: 'EN',
    htmlLang: 'en',
    documentTitle: 'Artur Renner — Designer & Developer',
  },
  nav: {
    work: 'Work',
    about: 'About',
    skills: 'Skills',
    contact: 'Contact',
    menu: 'Menu',
    close: 'Close',
    available: 'Available for projects',
    unavailable: 'Currently booked',
    language: 'Change language',
    skip: 'Skip to content',
    home: 'Back to top',
  },
  hero: {
    label: 'Portfolio',
    headline: ['Building digital', 'experiences with', 'clarity & character.'],
    lead: 'Designer & developer focused on thoughtful digital experiences, interfaces and products.',
    cta: 'Explore selected work',
    scroll: 'Scroll',
    role: 'Design & Development',
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
    statement: 'I create digital experiences where simplicity, technology and personality meet.',
    bio: [
      'I study at OTH Amberg-Weiden and work where data meets design: information visualisation, frontend engineering, and the quiet decisions in between that decide whether something feels considered or merely finished.',
      'What interests me is the craft behind the visible result — clean data pipelines, consistent design systems, tools that make the next step faster. Type, spacing and timing get my attention, because that is where quality is actually noticed.',
    ],
    facts: {
      location: 'Based in',
      focus: 'Focus',
      studies: 'Studies',
      status: 'Status',
    },
    values: {
      focus: 'Design / Development',
      studies: 'OTH Amberg-Weiden',
      status: 'Available for selected projects',
    },
  },
  skills: {
    index: '03',
    title: 'Skills & technology',
    lead: 'The set I work with — chosen for what it lets me build, not for the logo.',
  },
  contact: {
    index: '04',
    title: 'Contact',
    statement: ["Let's create", 'something great.'],
    lead: 'Open to freelance work, working-student roles and collaborations. The fastest way in is an email.',
    emailLabel: 'Email',
    socialLabel: 'Elsewhere',
    copy: 'Copy',
    copied: 'Copied',
    responseTime: 'Usually replies within a day',
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
    built: 'Built with care',
    rights: 'All rights reserved',
    colophon: 'Vite / React / TypeScript',
    imprint: 'Imprint',
    privacy: 'Privacy',
  },
}
