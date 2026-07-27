import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import React from 'react';
import { TutorialCards } from '@site/src/components/TutorialCard/TutorialCard';
import styles from './styles.module.scss';
// Define the cards in "***Data.ts"
import { docsCards } from './data/releaseManagementData';
import ReleaseOrchestrationOnboardingIllustration from './illustrations/ReleaseOrchestrationOnboardingIllustration';

export default function ReleaseManagement() {
  const { siteConfig: { baseUrl = '/' } = {} } = useDocusaurusContext();
  const { pathname } = useLocation();
  const is3kDocs = pathname.startsWith('/3k-docs');
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon-rm.svg`} />
            <h1>Release Orchestration</h1>
          </div>
          <div className={styles.btnContainer}>
            {/* Release Notes link can be added here when available */}
          </div>
        </div>
        <div className={styles.spaceBetween}>
          <div className={styles.content} style={{ width: '100%' }}>
            <p>
              Learn how to orchestrate and manage complex software releases across multiple services and teams.
            </p>
            {is3kDocs && (
              <div className={styles.illustrationContainer}>
                <ReleaseOrchestrationOnboardingIllustration />
              </div>
            )}
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
    </div>
  );
}

