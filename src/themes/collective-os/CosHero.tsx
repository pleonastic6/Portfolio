import { useI18n } from '../../i18n'
import { Btn, Split, ui } from './ui'
import { useReady } from './useReady'
import styles from './CosHero.module.css'

function CollectiveDiagram() {
  return (
    <svg className={styles.diagram} viewBox="0 0 960 470" role="img" aria-label="Vier verbundene Module bilden das ADDD-System">
      <g className={styles.guides}>
        <path d="M40 55H920M40 235H920M40 415H920" />
        <path d="M120 20V450M360 20V450M600 20V450M840 20V450" />
        <path d="M95 85H865V390H95Z" />
      </g>
      <g className={styles.connectors}>
        <path d="M275 172H388M572 172H685M480 253V326" />
        <path d="M275 326H388M572 326H685" />
        <circle cx="480" cy="253" r="6" />
      </g>
      <g className={styles.modules}>
        <g transform="translate(145 105)">
          <path d="M0 28 48 0h130l48 28v134l-48 28H48L0 162Z" />
          <path d="M48 0v28h130V0M0 28h226M48 190v-28h130v28" />
          <text x="18" y="55">01 / A</text><text x="18" y="143">ARTUR</text>
        </g>
        <g transform="translate(367 105)">
          <path d="M0 28 48 0h130l48 28v134l-48 28H48L0 162Z" />
          <path d="M48 0v28h130V0M0 28h226M48 190v-28h130v28" />
          <text x="18" y="55">02 / D</text><text x="18" y="143">DAVID</text>
        </g>
        <g transform="translate(589 105)">
          <path d="M0 28 48 0h130l48 28v134l-48 28H48L0 162Z" />
          <path d="M48 0v28h130V0M0 28h226M48 190v-28h130v28" />
          <text x="18" y="55">03 / D</text><text x="18" y="143">DAVID</text>
        </g>
        <g transform="translate(367 285)">
          <path d="M0 22 38 0h150l38 22v80l-38 22H38L0 102Z" />
          <path d="M38 0v22h150V0M0 22h226" />
          <text x="18" y="49">04 / D</text><text x="18" y="92">DOMINIK</text>
        </g>
      </g>
      <g className={styles.redlines}>
        <path d="M104 76H308M825 396V275" />
        <rect x="306" y="72" width="9" height="9" />
        <rect x="821" y="268" width="9" height="9" />
        <text x="104" y="67">COLLECTIVE ASSEMBLY / REV. 01</text>
        <text x="839" y="392" transform="rotate(-90 839 392)">FOUR INPUTS / ONE OUTPUT</text>
      </g>
    </svg>
  )
}

export function CosHero() {
  const { t } = useI18n()
  const ready = useReady()

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.sheet}>
        <div className={styles.ruler} aria-hidden="true" />
        <div className={styles.meta} aria-hidden="true">
          <span>ADDD / SYSTEM 01</span>
          <span>DE — 49.44° N</span>
        </div>
        <div className={styles.drawing} data-ready={ready}>
          <CollectiveDiagram />
        </div>
        <p className={styles.annotation}>A developer collective assembled for interfaces, tools and useful experiments.</p>
      </div>

      <div className={styles.statement}>
        <div className={styles.titleWrap}>
          <Split
            as="h1"
            id="hero-title"
            text={t.hero.headline}
            className={`${ui.h1} ${styles.title}`}
            ready={ready}
            delay={120}
          />
        </div>
        <div className={styles.copy}>
          <p className={`${ui.txt16} ${styles.lead}`}>{t.hero.lead}</p>
        </div>
        <Btn variant="cell" href="#work" className={styles.discover}>
          {t.hero.cta}
        </Btn>
      </div>
    </section>
  )
}
