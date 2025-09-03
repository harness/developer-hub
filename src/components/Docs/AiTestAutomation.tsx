import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';
import { TutorialCards } from '@site/src/components/TutorialCard/TutorialCard';
import styles from './styles.module.scss';
// Define the cards in "***Data.ts"
import { useColorMode } from '@docusaurus/theme-common';
import { docsCards } from './data/aiTestAutomationData';
export default function AR() {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = '/' } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img width={64} src={`${baseUrl}img/logo-ata.svg`} />
            <h1>AI Test Automation</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/kb">
              <button className={styles.btn}>
                <img src={`${baseUrl}img/icon_tutorials.svg`} />
                Knowledge Base
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.spaceBetween}>
          <div className={styles.content}>
            <p>
              Harness AI Test Automation is a cutting-edge Generative AI-powered platform that
              revolutionizes software quality. By eliminating the complexity of traditional test
              automation, it empowers teams to create, execute, and maintain tests effortlessly.
              With AI-driven automation, it accelerates development cycles, reduces maintenance
              overhead, and ensures higher-quality software releases.
            </p>
            <p>
              <b> How Harness AI Test Automation Transforms Software Testing: </b>
            </p>
            <ul>
              <li>
                <b>10× Faster Test Creation</b>: The no-code, Generative AI-powered platform enables
                anyone to generate high-quality test cases within minutes, significantly reducing
                the time required for test authoring
              </li>
              <li>
                <b>70% Less Test Maintenance</b>: AI-driven test execution and self-healing
                capabilities minimize the burden of test maintenance, ensuring robust and reliable
                automated testing with minimal manual intervention.
              </li>
              <li>
                <b>5× Faster Release Cycles</b>: By automating end-to-end testing, Harness AI Test
                Automation accelerates software delivery, enabling teams to release high-quality
                applications more frequently and with confidence.
              </li>
            </ul>

            <div className={styles.illustrationContainer}>
              {/* <img
                className={styles.illustration}
                src={
                  colorMode === "light"
                    ? `${baseUrl}img/cde_illustration.svg`
                    : `${baseUrl}img/cde_illustration_dark.svg`
                }
              />{" "} */}
            </div>
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
    </div>
  );
}
