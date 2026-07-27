import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import React from 'react';
import { TutorialCards } from '@site/src/components/TutorialCard/TutorialCard';
import styles from './styles.module.scss';
// Define the cards in "***Data.ts"
import { useColorMode } from '@docusaurus/theme-common';
import { docsCards } from './data/aiData';
import HarnessAiOnboardingIllustration from './illustrations/HarnessAiOnboardingIllustration';

export default function HarnessAI() {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = '/' } = {} } = useDocusaurusContext();
  const { pathname } = useLocation();
  // The animated onboarding illustration is a 3k-docs-only experiment for
  // now, matching the pattern used on the other module landing pages.
  const is3kDocs = pathname.startsWith('/3k-docs');
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img width={64} src={`${baseUrl}img/icon_aida.svg`} />
            <h1>Harness AI</h1>
          </div>
        </div>
        <div className={styles.spaceBetween}>
          <div className={styles.content}>
            <p>
              Harness AI is an AI-first developer platform that brings intelligent assistance to
              every stage of the software delivery lifecycle. From natural language pipeline
              creation and AI-powered troubleshooting to IDE integrations, worker agents, and
              an MCP server for external AI tools, Harness AI meets developers and platform
              engineers where they work.
            </p>
            {is3kDocs ? (
              <div className={styles.illustrationContainer}>
                <HarnessAiOnboardingIllustration />
              </div>
            ) : (
              <ul>
                <li>
                  <b>Create and manage pipelines with natural language</b>: Use the DevOps Agent
                  to generate and update pipeline YAML from plain-English descriptions, directly
                  from the Harness UI or your IDE.
                </li>
                <li>
                  <b>Troubleshoot faster</b>: The AI Assistant diagnoses failed builds and
                  deployments, surfaces root causes, and suggests fixes, without leaving the
                  platform.
                </li>
                <li>
                  <b>Connect your tools</b>: Integrate with VS Code, Cursor, Claude Desktop,
                  and Gemini CLI via the Harness MCP Server, giving any AI agent full access to
                  your Harness environment.
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
    </div>
  );
}