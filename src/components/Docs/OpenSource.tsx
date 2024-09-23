import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './styles.module.scss';
import TutorialCard, { TutorialCards } from '../LandingPage/TutorialCard';
// Define the cards in "***Data.ts"
import { docsCards } from './data/openSourceData';

export default function Code() {
  const { siteConfig: { baseUrl = '/' } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_platform.svg`} />
            <h1>Open Source</h1>
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
            Harness Open Source is an all-in-one platform that integrates source code management, CI/CD pipelines, hosted development environments, and artifact management.
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
    // </Layout>
  );
}
