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
