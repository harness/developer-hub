import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import React from 'react';
import { TutorialCards } from '@site/src/components/TutorialCard/TutorialCard';
import styles from './styles.module.scss';
// Define the cards in "***Data.ts"
import { docsCards } from './data/platformData';
import PlatformOnboardingIllustration from './illustrations/PlatformOnboardingIllustration';

import { useColorMode } from '@docusaurus/theme-common';
export default function Platform() {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = '/' } = {} } = useDocusaurusContext();
  const { pathname } = useLocation();
  // The animated onboarding illustration is a 3k-docs-only experiment for
  // now; /docs keeps the page exactly as it was (static SVG illustration).
  const is3kDocs = pathname.startsWith('/3k-docs');
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_harness.svg`} />
            <h1>Harness Platform</h1>
          </div>
          <div className={styles.btnContainer}>
            {/* Platform KB articles live at /docs/category/articles.
                /docs/category/knowledge-base is the Internal Developer Portal
                category, so do not point Platform at it. */}
            <Link href="/docs/category/articles">
              <button className={styles.btn}>
                {/* <i className="fa-regular fa-file"></i> */}
                <img src={`${baseUrl}img/icon_tutorials.svg`} />
                Knowledge Base
              </button>
            </Link>
            <Link href="/release-notes/platform">
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
              Harness Platform provides the shared foundation for all Harness modules. 
              Manage user access, authentication, secrets, delegates, governance, 
              and audit trails from a single control plane. 
              With built-in role-based access control (RBAC), 
              single sign-on (SSO), and policy enforcement, 
              Harness Platform gives your organization the security and visibility
              it needs to scale DevOps across teams and environments.
            </p>
            <div className={styles.illustrationContainer}>
              {is3kDocs ? (
                <PlatformOnboardingIllustration />
              ) : (
                <img
                  className={styles.illustration}
                  src={
                    colorMode !== 'light'
                      ? `${baseUrl}img/platform-landing-page.svg`
                      : `${baseUrl}img/platform-landing-page-dark-mode.svg`
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
    </div>
  );
}
