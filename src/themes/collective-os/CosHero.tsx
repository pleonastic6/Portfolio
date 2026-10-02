import { useCallback, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { useI18n } from '../../i18n'
import { MassingModel, VOLUMES, roofAnchor } from './MassingModel'
import { Btn, Corners, Split, num, ui } from './ui'
import { useReady } from './useReady'
import styles from './CosHero.module.css'

/**
 * Einstieg wie ein Planblatt: oben die Zeichenflaeche mit dem Massenmodell,
 * unten eine Leiste mit Titel, Einleitung, Button und Arbeitsfeldern.
 *
 * Die Zeichnung reagiert auf den Zeiger: Fadenkreuz mit Koordinaten,
 * und jedes der vier Volumen nennt beim Ueberfahren, wer dahintersteht.
 */
export function CosHero() {
  const { t } = useI18n()
  const ready = useReady()
  const panelRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const [touched, setTouched] = useState(false)
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

    const vol = (event.target as Element | null)?.closest?.('.vol[data-index]')
    const index = vol ? Number(vol.getAttribute('data-index')) : -1
    setActive(index >= 0 ? index : null)
    if (index >= 0) setTouched(true)
  }, [])

  const onLeave = useCallback(() => {
    setActive(null)
    setInside(false)
  }, [])

  const members = t.team.members

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.inner}>
        <div
          ref={panelRef}
          className={styles.panel}
          data-inside={inside}
          data-active={active !== null}
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
            <MassingModel active={active} className={styles.model} />

            {VOLUMES.map((_, index) => {
              const anchor = roofAnchor(index)
              const member = members[index]
              return (
                <div
                  key={index}
                  className={styles.deco}
                  data-active={active === index}
                  style={{ left: `${anchor.left}%`, top: `${anchor.top}%` } as CSSProperties}
                  aria-hidden="true"
                >
                  <span className={styles.decoPlus} />
                  <div className={styles.decoBox}>
                    <span className={styles.decoNum}>{num(index)}</span>
                    <span className={styles.decoCode}>
                      {member?.name ?? ''} / {index === 0 ? 'A' : 'D'}
                    </span>
                    <span className={styles.decoText}>{member?.role}</span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className={styles.cross} aria-hidden="true">
            <span className={styles.crossX} />
            <span className={styles.crossY} />
            <div ref={cursorRef} className={styles.coord} data-x="0000" data-y="0000" />
            <div className={styles.interact}>
              <span className={styles.interactBlock} />
              <span className={styles.interactTxt}>
                {active !== null ? `${num(active)} ${members[active]?.name ?? ''}` : t.cos.hoverHint}
              </span>
            </div>
          </div>

          <div className={styles.intro} data-hide={touched} aria-hidden="true">
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
