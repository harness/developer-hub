import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import React from 'react';
import { TutorialCards } from '@site/src/components/TutorialCard/TutorialCard';
import styles from './styles.module.scss';
// Define the cards in "***Data.ts"
import { useColorMode } from '@docusaurus/theme-common';
import { docsCards } from './data/internalDeveloperPortal';
import InternalDeveloperPortalOnboardingIllustration from './illustrations/InternalDeveloperPortalOnboardingIllustration';
export default function IDP() {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = '/' } = {} } = useDocusaurusContext();
  const { pathname } = useLocation();
  const is3kDocs = pathname.startsWith('/3k-docs');
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img width={64} src={`${baseUrl}img/icon_idp.svg`} />
            <h1>Internal Developer Portal</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/docs/category/knowledge-base">
              <button className={styles.btn}>
                <img src={`${baseUrl}img/icon_tutorials.svg`} />
                Knowledge Base
              </button>
            </Link>
            <Link href="/release-notes/internal-developer-portal">
              <button className={styles.btn}>
                <img src={`${baseUrl}img/icon_release_notes.svg`} />
                Release Notes
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.spaceBetween}>
          <div className={styles.content} style={{ width: '100%' }}>
            <p>
              Harness IDP is a home for developers to create, manage, and
              explore software. It enables you to create new software components
              quickly while adhering to your company's best practices. It
              enables you to manage the software you own by presenting a
              developer-centric view of all relevant information such as service
              health, deployments, and alerts. It also enables you to explore
              the internal software ecosystem of the company, discover technical
              documentation, APIs, and services, all of which enable better
              collaboration.
            </p>
            <div className={styles.illustrationContainer}>
              {is3kDocs && <InternalDeveloperPortalOnboardingIllustration />}
            </div>
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
      <div className={styles.subSection}></div>
    </div>
  );
}
