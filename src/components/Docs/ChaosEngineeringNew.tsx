import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';
import { TutorialCards } from '@site/src/components/TutorialCard/TutorialCard';
import styles from './styles.module.scss';
// Define the cards in "***Data.ts"
import { useColorMode } from '@docusaurus/theme-common';
import { docsCards } from './data/chaosEngineeringNewData';

export default function ChaosEngineeringNew() {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = '/' } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_ce.svg`} />
            <h1>Chaos Engineering (New)</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/kb/chaos-engineering">
              <button className={styles.btn}>
                {/* <i className="fa-regular fa-file"></i> */}
                <img src={`${baseUrl}img/icon_tutorials.svg`} />
                Knowledge Base
              </button>
            </Link>
            <Link href="/release-notes/chaos-engineering">
              <button className={styles.btn}>
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
              Harness Chaos Engineering helps you test how resilient your applications are by intentionally breaking things in a controlled way.
            </p>
            <p>
            Instead of waiting for your systems to fail unexpectedly in production (which always happens at the worst possible time), you deliberately introduce small failures during normal operations to see how your applications respond. This might mean temporarily shutting down a database, adding network delays, or consuming extra CPU resources.
              {/* Build confidence in your system's resilience with Harness Chaos Engineering. 
              Proactively identify weaknesses through controlled chaos experiments, validate 
              system reliability, and ensure your applications can withstand real-world failures. 
              Leverage advanced fault injection, automated experiments, and comprehensive monitoring 
              to create truly resilient systems. */}
            </p>
            <div className={styles.illustrationContainer}>
              <img
                className={styles.illustration}
                src={
                  colorMode === 'light'
                    ? `${baseUrl}img/ce.svg`
                    : `${baseUrl}img/CE_Landing_Page_dark_mode.svg`
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
