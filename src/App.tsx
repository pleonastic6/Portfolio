import { Suspense, lazy, useEffect, useState } from 'react'
import { site } from './data/site'
import { I18nProvider, useI18n } from './i18n'
import { Cursor } from './components/Cursor'
import { Footer } from './components/Footer'
import { Frame } from './components/Frame'
import { Backdrop } from './components/Backdrop'
import { Navigation } from './components/Navigation'
import { Hero } from './sections/Hero'
import { Work } from './sections/Work'
import { About } from './sections/About'
import { WhatWeBuild } from './sections/WhatWeBuild'
import { Team } from './sections/Team'
import { Skills } from './sections/Skills'
import { Contact } from './sections/Contact'
// Unterseiten erst laden, wenn sie aufgerufen werden — sie gehoeren nicht
// in das Bundle, das ueber die Startseite entscheidet.
const Legal = lazy(() => import('./pages/Legal').then((m) => ({ default: m.Legal })))
const CaseStudy = lazy(() =>
  import('./pages/CaseStudy').then((m) => ({ default: m.CaseStudy })),
)
import { useHashRoute } from './hooks/useHashRoute'

function Page() {
  const { t } = useI18n()
  const [ready, setReady] = useState(false)
  const route = useHashRoute()

  // ruhiges Aufblenden nach dem ersten Frame statt harter Sprung
  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  // Rueckkehr von einer Rechtsseite: zur Sprungmarke, sonst nach oben
  useEffect(() => {
    if (route.name !== 'home') return
    const id = window.location.hash.slice(1)
    const target = id ? document.getElementById(id) : null
    const frame = requestAnimationFrame(() => {
      if (target) target.scrollIntoView()
      else window.scrollTo(0, 0)
    })
    return () => cancelAnimationFrame(frame)
  }, [route])

  if (route.name !== 'home') {
    return (
      <div className="page" data-ready={ready}>
        {site.customCursor && <Cursor />}
        <Backdrop />
        <Frame />
        <Suspense fallback={<div className={'shell'} style={{ minHeight: '60svh' }} />}>
          {route.name === 'case' ? <CaseStudy slug={route.slug} /> : <Legal kind={route.name} />}
        </Suspense>
        <Footer />
      </div>
    )
  }

  return (
    <div className="page" data-ready={ready}>
      <a className="skip-link" href="#main">
        {t.nav.skip}
      </a>

      {site.customCursor && <Cursor />}
      <Backdrop />
      <Frame />
      <Navigation />

      <main id="main">
        <Hero />
        <Work />
        <About />
        <WhatWeBuild />
        <Team />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <I18nProvider>
      <Page />
    </I18nProvider>
  )
}
