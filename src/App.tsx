import { useEffect, useState } from 'react'
import { site } from './data/site'
import { I18nProvider, useI18n } from './i18n'
import { Cursor } from './components/Cursor'
import { Footer } from './components/Footer'
import { Frame } from './components/Frame'
import { Navigation } from './components/Navigation'
import { Hero } from './sections/Hero'
import { Work } from './sections/Work'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Contact } from './sections/Contact'

function Page() {
  const { t } = useI18n()
  const [ready, setReady] = useState(false)

  // ruhiges Aufblenden nach dem ersten Frame statt harter Sprung
  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="page" data-ready={ready}>
      <a className="skip-link" href="#main">
        {t.nav.skip}
      </a>

      {site.customCursor && <Cursor />}
      <Frame />
      <Navigation />

      <main id="main">
        <Hero />
        <Work />
        <About />
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
