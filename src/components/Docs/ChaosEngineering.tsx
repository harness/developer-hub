import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';
import { TutorialCards } from '@site/src/components/TutorialCard/TutorialCard';
import styles from './styles.module.scss';
// Define the cards in "***Data.ts"
import { useColorMode } from '@docusaurus/theme-common';
import { docsCards } from './data/chaosEngineeringData';
import Admonition from '@theme/Admonition';

export default function ChaosEngineering() {
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
              Chaos Engineering is the practice of proactively introducing faults into your applications or infrastructure and test the resilience of business services. Developers, QA teams, Performance test teams and SREs run chaos experiments to measure the resilience of the systems and find the weaknesses in that process.
            </p>
            <p>
              Harness Chaos Engineering provides end-to-end tooling to resilience testing via the chaos engineering principles. Enterprises can build highly scalable resilience testing practice with Harness because of the following capabilities:
            </p>
            <ul>
              <li><strong>Experiments</strong> - faults, probes and actions</li>
              <li><strong>ChaosGuard</strong> for governance</li>
              <li><strong>Delegates</strong> - scalability</li>
              <li><strong>Connectors</strong> for integration</li>
              <li><strong>Resilience management</strong> - Resilience scores, coverages, weaknesses and mitigation plans</li>
              <li><strong>AI Powered</strong>: Recommendations</li>
              <li><strong>MCP Tools</strong> for AI Agent communication and simplifying the end user experience</li>
            </ul>
            <p>
              In addition, the Harness platform provides the required enterprise capabilities like RBACs, SSO, logs and auditing making the entire solution scalable and easy to implement.
            </p>
            
            <h3 id="new-chaos-studio-features">New Chaos Studio Features</h3>
            <div>
              <Admonition type="info" title="New Chaos Studio Features">
              <p>
                Harness Chaos Engineering now offers an enhanced <strong>New Chaos Studio</strong> experience with advanced capabilities and enhanced UX. The studio version you see depends on your onboarding date:
              </p>
              <ul>
                <li><strong>New Chaos Studio</strong>: Available for customers onboarded on or after August 21, 2025</li>
                <li><strong>Old Chaos Studio</strong>: Available for customers onboarded before August 21, 2025</li>
              </ul>
              <h4>New Chaos Studio Features</h4>
              <p>The New Chaos Studio includes these enhanced capabilities:</p>
              <ul>
                <li><strong><Link href="/docs/chaos-engineering/guides/actions/">Actions</Link></strong>: Execute custom operations, delays, and scripts during experiments</li>
                <li><strong><Link href="/docs/chaos-engineering/guides/templates/">Templates</Link></strong>: Reusable fault, probe, and action templates for standardized chaos engineering</li>
                <li><strong><Link href="/docs/chaos-engineering/guides/chaoshubs/chaos-hub-scopes">Chaos Hubs Across Different Scopes</Link></strong>: Enhanced chaos hub management with flexible scoping options</li>
                <li><strong><Link href="/docs/chaos-engineering/guides/probes/experiment-level-probes/">Experiment Level Probes</Link></strong>: Advanced probing capabilities at the experiment level</li>
                <li><strong><Link href="/docs/category/custom-faults">Custom Faults</Link></strong>: Create and manage custom fault definitions for specific use cases</li>
                <li><strong><Link href="/docs/chaos-engineering/guides/chaos-experiments/fault-template">Runtime Variable Support</Link></strong>: Dynamic variable handling during experiment execution</li>
                <li><strong><Link href="/docs/chaos-engineering/guides/chaos-experiments/timeline-view-experiments">Timeline View</Link></strong>: Visual timeline representation of experiment execution and results</li>
              </ul>
              <p>
                If you're an existing customer and want to access the New Chaos Studio features, contact your Harness support representative.
              </p>
            </Admonition>
            </div>
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
    </div>
  );
}
