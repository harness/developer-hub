import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import React from 'react';
import { TutorialCards } from '@site/src/components/TutorialCard/TutorialCard';
import styles from './styles.module.scss';
// Define the cards in "***Data.ts"
import { useColorMode } from '@docusaurus/theme-common';
import { docsCards } from './data/application&APISecurityTestingData';
import ApplicationApiSecurityTestingOnboardingIllustration from './illustrations/ApplicationApiSecurityTestingOnboardingIllustration';
export default function AST() {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = '/' } = {} } = useDocusaurusContext();
  const { pathname } = useLocation();
  // The animated onboarding illustration is a 3k-docs-only experiment for
  // now; /docs keeps the page exactly as it was (empty illustration
  // container).
  const is3kDocs = pathname.startsWith('/3k-docs');
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon-api-security-testing.svg`} />
            <h1>Application & API Security Testing</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="https://docs.traceable.ai/docs/productrn26">
              <button className={styles.btn}>
                {/* <i className="fa-regular fa-file"></i> */}
                <img src={`${baseUrl}img/icon_release_notes.svg`} />
                Release Notes
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.spaceBetween}>
          <div className={styles.content} style={{ width: '100%' }}>
            <p>
              With Security Testing (AAST), your applications and APIs are continously monitored and tested to reveal issues (vulnerabilities), misconfigurations, and threats before they impact your users. By analyzing API traffic, scanning for risks, such as broken authentication and data exposure, it ensures that your application is secure and reliable. This proactive approach helps you detect and resolve issues early, protect sensitive data, and prevent disruptions while maintaining trust across your application and APIs.
            </p>
            {is3kDocs && (
              <div className={styles.illustrationContainer}>
                <ApplicationApiSecurityTestingOnboardingIllustration />
              </div>
            )}
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
    </div>
  );
}
