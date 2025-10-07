import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';
import { TutorialCards } from '@site/src/components/TutorialCard/TutorialCard';
import styles from './styles.module.scss';
// Define the cards in "***Data.ts"
import { useColorMode } from '@docusaurus/theme-common';
import { docsCards } from './data/application&APISecurityPostureData';
export default function ASP() {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = '/' } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon-api-security-posture.svg`} />
            <h1>Application & API Security Posture</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="https://docs.traceable.ai/docs/productrn25">
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
              Application and API Security Posture provides a comprehensive view of all APIs within your organization. By discovering APIs through traffic monitoring and code analysis, it helps you understand their API ecosystem, track changes, and maintain visibility across environments. The platform organizes APIs by attributes such as authentication methods, data sensitivity, and exposure, while also highlighting security risks and policy violations. With insights into API usage, ownership, and conformance against specifications, you can prioritize issues, enforce security standards, while maintaining strong, proactive security posture across your application and APIs.
            </p>
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
    </div>
  );
}
