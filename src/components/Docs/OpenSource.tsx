import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';
import { TutorialCards } from '@site/src/components/TutorialCard/TutorialCard';
import styles from './styles.module.scss';
// Define the cards in "***Data.ts"
import { useColorMode } from '@docusaurus/theme-common';
import { docsCards } from './data/openSourceData';
export default function OpenSource() {
  const { siteConfig: { baseUrl = '/' } = {} } = useDocusaurusContext();
  const { colorMode } = useColorMode();
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img
              className={styles.illustration}
              style={{ height: '72px', marginBottom: '15px' }}
              src={
                colorMode === 'light'
                  ? `${baseUrl}img/icon_opensource_light.svg`
                  : `${baseUrl}img/icon_opensource_dark.svg`
              }
            />
            <h1 style={{ display: 'none' }}>Open Source</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/kb">
              <button className={styles.btn}>
                {/* <i className="fa-regular fa-file"></i> */}
                <img src={`${baseUrl}img/icon_tutorials.svg`} />
                Knowledge Base
              </button>
            </Link>
            <Link href="https://github.com/harness/gitness/releases">
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
              Harness Open Source is an all-in-one platform that integrates
              source code management, CI/CD pipelines, hosted development
              environments, and artifact management.
            </p>{' '}
            <div className={styles.illustrationContainer}>
              <img
                className={styles.illustration}
                src={`${baseUrl}img/Code_Repo_Landing_Page.png`}
              />
            </div>
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
    </div>
  );
}
