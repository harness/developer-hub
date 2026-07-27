import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import React from 'react';
import { TutorialCards } from '@site/src/components/TutorialCard/TutorialCard';
import styles from './styles.module.scss';
// Define the cards in "***Data.ts"
import { useColorMode } from '@docusaurus/theme-common';
import { docsCards } from './data/aiSecurity';
import AiSecurityOnboardingIllustration from './illustrations/AiSecurityOnboardingIllustration';
export default function AISec() {
  const { siteConfig: { baseUrl = '/' } = {} } = useDocusaurusContext();
  const { pathname } = useLocation();
  const is3kDocs = pathname.startsWith('/3k-docs');
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon-ai-security.svg`} alt="AI Security" />
            <h1>AI Security</h1>
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
                AI Security provides you with visibility into AI APIs and MCP assets across environments and understand how they interact with your applications. You can monitor threats targeting AI endpoints, investigate related issues, and test AI endpoints for vulnerabilities such as prompt injection and sensitive data exposure. These capabilities help you manage AI risk using the same security workflows applied to your APIs.
            </p>
            {is3kDocs && (
              <div className={styles.illustrationContainer}>
                <AiSecurityOnboardingIllustration />
              </div>
            )}
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
    </div>
  );
}
