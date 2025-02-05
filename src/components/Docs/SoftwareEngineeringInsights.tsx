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
            <h1>Software Engineering Insights</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/release-notes/software-engineering-insights">
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
              Harness Software Engineering Insights (SEI) enables engineering
              leaders to make data-driven decisions that improve engineering
              productivity, efficiency, alignment, planning, and execution. It
              provides actionable insights into software delivery and workflows
              across teams, processes, and systems to improve software quality,
              enhance developer experience, and accelerate time to value. Learn
              how you can use data-led insights to remove bottlenecks and
              improve productivity.
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
