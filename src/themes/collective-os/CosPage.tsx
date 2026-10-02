import type { CSSProperties } from 'react'
import { useI18n } from '../../i18n'
import { CosHeader } from './CosHeader'
import { CosHero } from './CosHero'
import { CosAbout } from './CosAbout'
import { CosBuild } from './CosBuild'
import { CosWork } from './CosWork'
import { CosTeam } from './CosTeam'
import { CosSkills } from './CosSkills'
import { CosContact } from './CosContact'
import { CosFooter } from './CosFooter'
import styles from './CosPage.module.css'

const particles = [
  [7, 17, 3, 0, -24, 18, 0.42],
  [18, 9, 2, 1.2, 18, -14, 0.34],
  [31, 22, 4, 2.1, -16, 20, 0.26],
  [46, 12, 2, 0.7, 28, 16, 0.38],
  [63, 20, 3, 1.9, -22, -18, 0.28],
  [82, 11, 2, 2.8, 20, 22, 0.32],
  [94, 27, 4, 1.4, -18, 12, 0.22],
  [11, 39, 2, 2.4, 26, -16, 0.3],
  [24, 48, 5, 0.6, -20, 14, 0.18],
  [39, 42, 2, 3.1, 16, -20, 0.36],
  [54, 55, 3, 1.6, -28, 18, 0.3],
  [72, 44, 2, 0.3, 18, 16, 0.4],
  [87, 52, 5, 2.5, -26, -14, 0.2],
  [5, 66, 3, 1.1, 22, -18, 0.26],
  [19, 78, 2, 3.3, -18, 12, 0.34],
  [34, 69, 4, 0.9, 20, -20, 0.24],
  [49, 83, 2, 2.7, -22, 14, 0.32],
  [61, 72, 3, 1.7, 24, -12, 0.28],
  [76, 84, 2, 0.5, -16, -18, 0.36],
  [91, 70, 4, 2.2, 18, 16, 0.22],
  [14, 24, 7, 3.6, -10, 12, 0.11],
  [57, 31, 6, 2.9, 14, -10, 0.12],
  [69, 63, 7, 3.8, -12, 10, 0.1],
  [28, 88, 6, 1.5, 10, -12, 0.12],
] as const

/**
 * Design 05 als eigenes Layout. Dieselben Inhalte wie die anderen Designs
 * (i18n, data/), aber ein anderes Raster: alles liegt in einem festen
 * Blattrahmen, Abschnitte und Spalten sind durch Haarlinien getrennt.
 */
export function CosPage() {
  const { t } = useI18n()

  return (
    <div className={styles.page}>
      <a className="skip-link" href="#main">
        {t.nav.skip}
      </a>

      <div className={styles.particles} aria-hidden="true">
        {particles.map(([x, y, s, d, dx, dy, o], index) => (
          <span
            key={index}
            className={styles.particle}
            style={
              {
                '--x': x,
                '--y': y,
                '--s': s,
                '--d': `${d}s`,
                '--dx': `${dx}px`,
                '--dy': `${dy}px`,
                '--o': o,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className={styles.frame} aria-hidden="true">
        <div className={styles.frameInner}>
          <span className={`${styles.corner} ${styles.cTL}`} />
          <span className={`${styles.corner} ${styles.cTR}`} />
          <span className={`${styles.corner} ${styles.cBL}`} />
          <span className={`${styles.corner} ${styles.cBR}`} />
        </div>
      </div>

      <CosHeader />

      <main id="main" className={styles.main}>
        <CosHero />
        <CosWork />
        <CosAbout />
        <CosBuild />
        <CosTeam />
        <CosSkills />
        <CosContact />
      </main>

      <div className={styles.main}>
        <CosFooter />
      </div>
    </div>
  )
}
