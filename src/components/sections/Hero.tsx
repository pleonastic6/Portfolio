import { useI18n } from '../../i18n'
import { Container } from '../ui/Container'

export function Hero() {
  const { t } = useI18n()

  return (
    <section id="home" className="section" style={{ paddingBlock: 0 }} aria-label={t.hero.name}>
      <Container>
        <div className="hero">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1 className="hero__headline">{t.hero.headline}</h1>
          <p className="hero__subline">{t.hero.subline}</p>

          <div className="hero__actions">
            <a className="btn btn--primary" href="#projects">
              {t.hero.primaryCta}
            </a>
            <a className="btn btn--ghost" href="#contact">
              {t.hero.secondaryCta}
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
