import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';
import { TutorialCards } from '@site/src/components/TutorialCard/TutorialCard';
import styles from './styles.module.scss';
// Define the cards in "***Data.ts"
import { useColorMode } from '@docusaurus/theme-common';
import { docsCards } from './data/chaosEngineeringData';
export default function CE() {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = '/' } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_ce.svg`} />
            <h1>Chaos Engineering</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/kb/chaos-engineering">
              <button className={styles.btn}>
                {/* <i className="fa-regular fa-file"></i> */}
                <img src={`${baseUrl}img/icon_tutorials.svg`} />
                Knowledge Base
              </button>
            </Link>
            <Link href="/release-notes/chaos-engineering">
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
              <h3>Resilience Testing Made Easy</h3>
              Harness Chaos Engineering (HCE) module provides an end-to-end tooling
              to do the <strong>Resilience Testing</strong> in both lower and production environments.
              Resilience measurement of the services can be automated such that informed 
              decisions are taken in the change management process of the Software 
              Delivery Life Cycle or SDLC. The practice of introducing, implementing,
              and improvising the <strong>Resilience Testing</strong> is made easy by the chaos experimentation
              process.

              
              <p>
                <p>
                Chaos experiments help in measuring the resilience of the services. 
                Harness Chaos Engineering module comes with more than <strong>200</strong> different types
                of out-of-the-box faults using which chaos experiments can be created and 
                orchestrated in a few minutes. Chaos Experiments give out Resilience Score
                as the outcome of a successful run which can be used to take informed decisions
                by <strong>QA Engineers</strong> or <strong>Performance Test Engineers</strong> or <strong>SREs</strong> in their effort to improve
                the resilience posture of their applications or business services.
                </p>
                
              </p>

              <p>
               <h3>Resilience Posture</h3>
               Resilience Posture of a module or an application or a business service is an indicator of 
               how resilient the system is against perceived risks of failures in either software or
               infrastructure or the third party systems. Harness Chaos Engineering helps in building
               a process of automating the continuous or the on-demand measurement of Resiliene Posture.


               The Resilience Posture helps in taking importance decisions while making deployment changes,
               making new product releases, doing infrastructure upgrades and also acting as an external 
               indicator of Reliability for end users and third party service providers.
              </p>
            </p>

          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
      <div className={styles.subSection}></div>
    </div>
  );
}
