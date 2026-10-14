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
 * ADDD als technisches Editorial: ein durchgehendes Papierblatt mit präzisem
 * Zellenraster. Inhalte bleiben gemeinsam mit den archivierten Designs, die
 * visuelle Grammatik gehört ausschließlich diesem aktiven Auftritt.
 */
export function CosPage() {
  const { t } = useI18n()

  return (
    <div className={styles.page}>
      <a className="skip-link" href="#main">
        {t.nav.skip}
      </a>

      <div className={styles.frame} aria-hidden="true">
        <span className={`${styles.corner} ${styles.cTL}`} />
        <span className={`${styles.corner} ${styles.cTR}`} />
        <span className={`${styles.corner} ${styles.cBL}`} />
        <span className={`${styles.corner} ${styles.cBR}`} />
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
