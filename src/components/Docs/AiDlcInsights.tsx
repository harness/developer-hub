import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';

import { TutorialCards } from '../TutorialCard/TutorialCard';
import { docsCards } from './data/aiDlcInsightsData';
import AiDlcInsightsOnboardingIllustration from './illustrations/AiDlcInsightsOnboardingIllustration';

import styles from './styles.module.scss';

export default function AiDlcInsights() {
  const { colorMode } = useColorMode();
  const {
    siteConfig: { baseUrl = '/' } = {},
  } = useDocusaurusContext();
  const { pathname } = useLocation();
  // The animated onboarding illustration is a 3k-docs-only experiment for
  // now; /docs keeps the page exactly as it was (no illustration).
  const is3kDocs = pathname.startsWith('/3k-docs');

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

            {is3kDocs && (
              <div className={styles.illustrationContainer}>
                <AiDlcInsightsOnboardingIllustration />
              </div>
            )}
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