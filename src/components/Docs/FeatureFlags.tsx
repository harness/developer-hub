import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';
import { TutorialCards } from '@site/src/components/TutorialCard/TutorialCard';
import styles from './styles.module.scss';
// Define the cards in "***Data.ts"
import { docsCards } from './data/featureFlagsData';

import { useColorMode } from '@docusaurus/theme-common';
export default function FF() {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = '/' } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_ff.svg`} />
            <h1>Feature Flags</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/kb/feature-flags">
              <button className={styles.btn}>
                {/* <i className="fa-regular fa-file"></i> */}
                <img src={`${baseUrl}img/icon_tutorials.svg`} />
                Knowledge Base
              </button>
            </Link>
            <Link href="/release-notes/feature-flags">
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
              Harness Feature Flags (FF) is a feature management solution that
              lets you change your software's functionality without deploying
              new code. It does this by letting you hide code or behavior
              without having to ship new versions of the software. A feature
              flag is like a powerful <i>If</i> statement.
            </p>
            <div className={styles.illustrationContainer}>
              <img
                className={styles.illustration}
                src={
                  colorMode === "light"
                    ? `${baseUrl}img/ff.svg`
                    : `${baseUrl}img/FF_Landing_Page_dark_mode.svg`
                }
              />{" "}
            </div>
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
    </div>
  );
}
