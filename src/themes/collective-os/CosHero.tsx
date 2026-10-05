import { useI18n } from '../../i18n'
import collectiveMachine from '../../assets/design05/collective-machine.webp'
import { Btn, Split, ui } from './ui'
import { useReady } from './useReady'
import styles from './CosHero.module.css'

/**
 * Einstieg als Nothing-inspirierter Product-Hero: ein einziges zentrales
 * Keyvisual auf dunklem Dot-Raster. Keine zweite Gebaeudezeichnung und keine
 * Inspect-Hinweise mehr — die Hero soll wie ein fertiges Produkt wirken.
 */
export function CosHero() {
  const { t } = useI18n()
  const ready = useReady()

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.inner}>
        <div className={styles.panel}>
          <div className={styles.stage} data-ready={ready}>
            <div className={styles.heroPlate} aria-hidden="true">
              <span className={styles.heroPlateGrid} />
              <img className={styles.heroImage} src={collectiveMachine} alt="" decoding="async" />
              <span className={styles.heroImageVeil} />
              <span className={styles.heroIndex}>SYS / 01</span>
              <span className={styles.heroCaption}>COLLECTIVE MACHINE</span>
            </div>
          </div>
        </div>

        <div className={styles.bar}>
          <div className={styles.titleWrap}>
            <Split
              as="h1"
              id="hero-title"
              text={t.hero.headline}
              className={`${ui.h1} ${styles.title}`}
              ready={ready}
              delay={150}
            />
          </div>

          <div className={styles.subWrap}>
            <div className={styles.subInner}>
              <p className={`${ui.txt16} ${styles.sub}`}>{t.hero.lead}</p>
              <Btn variant="cell" href="#work" className={styles.discover}>
                {t.hero.cta}
              </Btn>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
