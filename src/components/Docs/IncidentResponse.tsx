import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';
import { TutorialCards } from '@site/src/components/TutorialCard/TutorialCard';
import styles from './styles.module.scss';
// Define the cards in "***Data.ts"
import { useColorMode } from '@docusaurus/theme-common';
import { docsCards } from './data/incidentResponseData';
export default function IR() {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = '/' } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon-ir.svg`} />
            <h1>Incident Response</h1>
          </div>
          <div className={styles.btnContainer}>
          </div>
        </div>
        <div className={styles.spaceBetween}>
          <div className={styles.content}>
            <p>
            Harness Incident Response (IR) is a cutting-edge module that 
            revolutionizes incident management by focusing on proactive issue 
            prevention and accelerated resolution. A key differentiator is its 
            ability to correlate change events from disparate sources, 
            such as CI/CD pipelines, Feature Flags, 3rd Party changes, and 
            deployments, providing unparalleled context for incident attribution. 
            Harness IR automates prioritization and response orchestration while 
            integrating seamlessly with existing tools like ServiceNow, Slack, and 
            monitoring systems. Real-time visibility into service health, error 
            budgets, and associated changes empower teams to resolve incidents 
            faster, minimize downtime, and drive operational excellence.
            </p>
            <div className={styles.illustrationContainer}>
              <img
                className={styles.illustration}
                src={
                  colorMode === 'light'
                    ? `${baseUrl}img/ir-landing-page.svg`
                    : `${baseUrl}img/ir-landing-page-dark.svg`
                }
              />
            </div>
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
      <div className={styles.subSection}></div>
    </div>
  );
}
