import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';
import { TutorialCards } from '@site/src/components/TutorialCard/TutorialCard';
import styles from './styles.module.scss';
// Define the cards in "***Data.ts"
import { useColorMode } from '@docusaurus/theme-common';
import { docsCards } from './data/chaosEngineeringData';

export default function ChaosEngineering() {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = '/' } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_ce.svg`} />
            <h1>Chaos Engineering</h1>
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
              Chaos Engineering is the practice of proactively introducing faults into your applications or infrastructure and test the resilience of business services. Developers, QA teams, Performance test teams and SREs run chaos experiments to measure the resilience of the systems and find the weaknesses in that process.
            </p>
            <p>
              Harness Chaos Engineering provides end-to-end tooling to resilience testing via the chaos engineering principles. Enterprises can build highly scalable resilience testing practice with Harness because of the following capabilities:
            </p>
            <ul>
              <li><strong>Experiments</strong> - faults, probes and actions</li>
              <li><strong>ChaosGuard</strong> for governance</li>
              <li><strong>Delegates</strong> - scalability</li>
              <li><strong>Connectors</strong> for integration</li>
              <li><strong>Resilience management</strong> - Resilience scores, coverages, weaknesses and mitigation plans</li>
              <li><strong>AI Powered</strong>: Recommendations</li>
              <li><strong>MCP Tools</strong> for AI Agent communication and simplifying the end user experience</li>
            </ul>
            <p>
              In addition, the Harness platform provides the required enterprise capabilities like RBACs, SSO, logs and auditing making the entire solution scalable and easy to implement.
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
