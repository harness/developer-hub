import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';

import { TutorialCards } from '../TutorialCard/TutorialCard';
import { docsCards } from './data/aiDlcInsightsData';

import styles from './styles.module.scss';

export default function AiDlcInsights() {
  const { colorMode } = useColorMode();
  const {
    siteConfig: { baseUrl = '/' } = {},
  } = useDocusaurusContext();

  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img width={64} src={`${baseUrl}img/icon_sei.svg`} />
            <h1>AI DLC Insights</h1>
          </div>

          <div className={styles.btnContainer}>
            <Link href="/release-notes/ai-dlc-insights">
              <button className={styles.btn}>
                <img src={`${baseUrl}img/icon_release_notes.svg`} />
                Release Notes
              </button>
            </Link>
          </div>
        </div>

        <div className={styles.spaceBetween}>
          <div className={styles.content}>
            <p>
              AI DLC Insights gives engineering leaders a unified view of AI
              adoption, spend efficiency, and delivery impact across coding
              agents, teams, and workflows. Track how AI-generated work moves
              through the development lifecycle, and understand whether your AI
              investment is helping your teams ship better software faster.
            </p>

          </div>
        </div>
      </div>

      <TutorialCards
        data={docsCards}
        sectionClass={styles.subSection}
      />
    </div>
  );
}