import { useColorMode } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';
import { TutorialCards } from '@site/src/components/TutorialCard/TutorialCard';
import { docsCards } from './data/featureFlagsData';

export default function FF() {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = '/' } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      {/* Banner at the very top */}
      <div
        className={styles.tipBanner}
        style={{ backgroundColor: '#fff9c4', padding: '16px', borderRadius: '8px' }}
      >
        <p>
          <strong>Note</strong>: This documentation is for Harness Feature Flags. 
          For customers who have migrated to or are using Feature Management Engine (FME), refer to the{' '}
          <a href="/docs/feature-management-experimentation">FME documentation</a> for the latest features and SDK updates. 
        </p>
      </div>

      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_ff.svg`} />
            <h1>Feature Flags</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/release-notes/feature-flags">
              <button className={styles.btn}>
                <img src={`${baseUrl}img/icon_release_notes.svg`} />
                Release Notes
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.spaceBetween}>
          <div className={styles.content}>
            <p>
              Harness Feature Flags (FF) is a feature management solution that
              lets you change your software's functionality without deploying
              new code. It does this by letting you hide code or behavior
              without having to ship new versions of the software. A feature
              flag is like a powerful <i>If</i> statement.
            </p>
            <div className={styles.illustrationContainer}>
              <img
                className={styles.illustration}
                src={
                  colorMode === "light"
                    ? `${baseUrl}img/ff.svg`
                    : `${baseUrl}img/FF_Landing_Page_dark_mode.svg`
                }
              />
            </div>
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
    </div>
  );
}