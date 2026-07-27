import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import React from 'react';
import { TutorialCards } from '@site/src/components/TutorialCard/TutorialCard';
import styles from './styles.module.scss';
// Define the cards in "***Data.ts"
import { useColorMode } from '@docusaurus/theme-common';
import { docsCards } from './data/resilienceTestingData';
import ResilienceTestingOnboardingIllustration from './illustrations/ResilienceTestingOnboardingIllustration';

export default function ResilienceTesting() {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = '/' } = {} } = useDocusaurusContext();
  const { pathname } = useLocation();
  // The animated onboarding illustration is a 3k-docs-only experiment for
  // now; /docs keeps the page exactly as it was (no illustration container).
  const is3kDocs = pathname.startsWith('/3k-docs');
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_ce.svg`} />
            <h1>Resilience Testing</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/release-notes/chaos-engineering">
              <button className={styles.btn}>
                <img src={`${baseUrl}img/icon_release_notes.svg`} />
                Release Notes
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.spaceBetween}>
          <div className={styles.content} style={{ width: '100%', maxWidth: '1200px' }}>
            <p>
            Harness Resilience Testing provides a comprehensive platform to build confidence in your system's reliability through three integrated testing approaches: Chaos Testing, Load Testing, and Disaster Recovery Testing. By proactively validating that your systems can withstand and recover from failures, performance degradation, and disasters, you can identify weaknesses before they impact your users and business.
            </p>
            {is3kDocs && (
              <div className={styles.illustrationContainer}>
                <ResilienceTestingOnboardingIllustration />
              </div>
            )}
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
    </div>
  );
}
