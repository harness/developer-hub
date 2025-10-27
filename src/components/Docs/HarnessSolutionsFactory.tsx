import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';
import { TutorialCards } from '@site/src/components/TutorialCard/TutorialCard';
import styles from './styles.module.scss';
// Define the cards in "***Data.ts"
import { docsCards } from './data/harnessSolutionsFactory';

import { useColorMode } from '@docusaurus/theme-common';
export default function Platform() {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = '/' } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_harness.svg`} />
            <h1>Harness Solutions Factory</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/release-notes/harness-solutions-factory">
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
              Harness Solutions Factory (HSF) is a scalable automation framework designed to help organizations rapidly deploy and manage Harness resources through self-service workflows, governance, and best practices, all out of the box. 
              Whether you're enabling new teams, setting up golden templates, or driving adoption of Harness at scale, HSF provides a repeatable, governed foundation to help you get started faster and stay standardized across your organization.
            </p>
            <div className={styles.illustrationContainer}>
              <img
                className={styles.illustration}
                src={
                  colorMode !== 'light'
                    ? `${baseUrl}img/Platform_Landing_Page.svg`
                    : `${baseUrl}img/Platform_Landing_Page_dark_mode.svg`
                }
              />
            </div>
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
    </div>
  );
}
