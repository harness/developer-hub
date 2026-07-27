import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import React from 'react';
import { TutorialCards } from '@site/src/components/TutorialCard/TutorialCard';
import styles from './styles.module.scss';
// Define the cards in "***Data.ts"
import { docsCards } from './data/codeRepositoryData';
import CodeRepositoryOnboardingIllustration from './illustrations/CodeRepositoryOnboardingIllustration';

export default function Code() {
  const { siteConfig: { baseUrl = '/' } = {} } = useDocusaurusContext();
  const { pathname } = useLocation();
  // The animated onboarding illustration is a 3k-docs-only experiment for
  // now; /docs keeps the page exactly as it was (static PNG illustration).
  const is3kDocs = pathname.startsWith('/3k-docs');
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_code.svg`} />
            <h1>Code Repository</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/release-notes/code-repository">
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
              Learn how you can accelerate development with security at scale.
            </p>{' '}
            <div className={styles.illustrationContainer}>
              {is3kDocs ? (
                <CodeRepositoryOnboardingIllustration />
              ) : (
                <img
                  className={styles.illustration}
                  src={`${baseUrl}img/Code_Repo_Landing_Page.png`}
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
