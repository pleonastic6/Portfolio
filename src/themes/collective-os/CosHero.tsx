import { useCallback, useRef, useState, type PointerEvent } from 'react'
import { useI18n } from '../../i18n'
import collectiveMachine from '../../assets/design05/collective-machine.webp'
import { Btn, Corners, Split, ui } from './ui'
import { useReady } from './useReady'
import styles from './CosHero.module.css'

/**
 * Einstieg als Nothing-inspirierter Product-Hero: ein einziges zentrales
 * Keyvisual auf dunklem Dot-Raster. Keine zweite Gebaeudezeichnung darueber,
 * damit das Motiv nicht nach uebereinandergelegten Assets aussieht.
 */
export function CosHero() {
  const { t } = useI18n()
  const ready = useReady()
  const panelRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [inside, setInside] = useState(false)

  const onMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const panel = panelRef.current
    if (!panel) return
    const rect = panel.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    panel.style.setProperty('--px', `${x}px`)
    panel.style.setProperty('--py', `${y}px`)
    const label = cursorRef.current
    if (label) {
      label.dataset.x = String(Math.round(x)).padStart(4, '0')
      label.dataset.y = String(Math.round(y)).padStart(4, '0')
    }

  }, [])

  const onLeave = useCallback(() => {
    setInside(false)
  }, [])

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.inner}>
        <div
          ref={panelRef}
          className={styles.panel}
          data-inside={inside}
          onPointerMove={onMove}
          onPointerEnter={() => setInside(true)}
          onPointerLeave={onLeave}
          onPointerDown={onMove}
        >
          <div className={styles.ruler}>
            <Corners />
            <span className={`${styles.tickX} ${ui.dashX}`} aria-hidden="true" />
            <span className={`${styles.tickY} ${ui.dashY}`} aria-hidden="true" />
          </div>

          <div className={styles.stage} data-ready={ready}>
            <div className={styles.heroPlate} aria-hidden="true">
              <span className={styles.heroPlateGrid} />
              <img className={styles.heroImage} src={collectiveMachine} alt="" decoding="async" />
              <span className={styles.heroImageVeil} />
              <span className={styles.heroIndex}>SYS / 01</span>
              <span className={styles.heroCaption}>COLLECTIVE MACHINE</span>
            </div>
          </div>

          <div className={styles.cross} aria-hidden="true">
            <span className={styles.crossX} />
            <span className={styles.crossY} />
            <div ref={cursorRef} className={styles.coord} data-x="0000" data-y="0000" />
            <div className={styles.interact}>
              <span className={styles.interactBlock} />
              <span className={styles.interactTxt}>{t.cos.hoverHint}</span>
            </div>
          </div>

          <div className={styles.intro} aria-hidden="true">
            <div className={styles.introHead}>
              <span className={styles.introTitle}>{t.cos.inspectTitle}</span>
              <span className={styles.introIc}>
                <span />
                <span />
              </span>
            </div>
            <p className={styles.introText}>{t.cos.inspectText}</p>
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
            <ul className={styles.work}>
              {t.build.items.map((item) => (
                <li key={item.title} className={styles.workItem}>
                  <span className={styles.workIc} aria-hidden="true" />
                  <span className={ui.mono}>{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
