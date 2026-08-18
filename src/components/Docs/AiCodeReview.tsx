import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';
import { TutorialCards } from '@site/src/components/TutorialCard/TutorialCard';
import styles from './styles.module.scss';
// Define the cards in "***Data.ts"
import { docsCards } from './data/aiCodeReviewData';
import AiCodeReviewOnboardingIllustration from './illustrations/AiCodeReviewOnboardingIllustration';

export default function AiCodeReview() {
  const { siteConfig: { baseUrl = '/' } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon-ai-code-review.svg`} alt="" />
            <h1>AI Code Review</h1>
          </div>
          <div className={styles.btnContainer}></div>
        </div>
        <div className={styles.spaceBetween}>
          <div className={styles.content} style={{ width: '100%' }}>
            <p>
              Harness AI Code Review runs an AI agent against a pull request and
              reports each review criterion as a status check, on GitHub and on
              Harness Code Repository.
            </p>
            <p>
              The agent does not read the diff in isolation. It calls Harness
              tools to bring delivery context into the review, so it can flag a
              change that is correct in the file and wrong for the system around
              it.
            </p>
            <p>
              You define what the agent checks. Review criteria are set at a
              space or at a repository, and a repository inherits from the
              spaces above it, so a standard can be applied once and enforced
              everywhere.
            </p>
            <div className={styles.illustrationContainer}>
              <AiCodeReviewOnboardingIllustration />
            </div>
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
      <div className={styles.subSection}></div>
    </div>
  );
}
