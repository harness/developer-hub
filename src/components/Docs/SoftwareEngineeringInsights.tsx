import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';
import { TutorialCards } from '@site/src/components/TutorialCard/TutorialCard';
import styles from './styles.module.scss';
// Define the cards in "***Data.ts"
import { useColorMode } from '@docusaurus/theme-common';
import Telemetry from '@site/src/components/Telemetry';
import { SEIActions } from '@site/src/components/Telemetry/TememetryConstants';
import { docsCards } from './data/softwareEngineeringInsightsData';

export default function SEI() {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();

  


    const handleReleaseNotesClick = () => {
      <Telemetry event={SEIActions.SEIReleaseNotes} button="ReleaseNotes" />;
    };

  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_sei.svg`} />
            <h1>AI DLC Insights</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/release-notes/ai-dlc-insights">
              <button className={styles.btn} onClick={handleReleaseNotesClick}>
                {/* <i className="fa-regular fa-file"></i> */}
                <img src={`${baseUrl}img/icon_release_notes.svg`} />
                Release Notes
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.spaceBetween}>
          <div className={styles.content}>
            <p>
              AI DLC Insights gives engineering leaders a unified view of AI adoption, spend efficiency, and delivery impact across coding agents, teams, and workflows. Track how AI-generated work moves through the development lifecycle, and understand whether your AI investment is helping your teams ship better software faster.
            </p>
            <div className={styles.illustrationContainer}>
              <img
                className={styles.illustration}
                src={
                  colorMode === 'light'
                    ? `${baseUrl}img/sei.svg`
                    : `${baseUrl}img/SEI_Landing_Page_dark_mode.svg`
                }
              />{' '}
            </div>
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
    </div>
  );
}
