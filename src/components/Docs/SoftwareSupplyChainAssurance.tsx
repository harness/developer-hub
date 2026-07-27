import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import React from 'react';
import { TutorialCards } from '@site/src/components/TutorialCard/TutorialCard';
import styles from './styles.module.scss';
// Define the cards in "***Data.ts"
import { docsCards } from './data/softwareSupplyChainAssuranceData';
import SoftwareSupplyChainAssuranceOnboardingIllustration from './illustrations/SoftwareSupplyChainAssuranceOnboardingIllustration';

export default function SSCA() {
  const { siteConfig: { baseUrl = '/' } = {} } = useDocusaurusContext();
  const { pathname } = useLocation();
  const is3kDocs = pathname.startsWith('/3k-docs');
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_ssca.svg`} />
            <h1>Supply Chain Security</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/docs/category/how-to-guides">
              <button className={styles.btn}>
                {/* <i className="fa-regular fa-file"></i> */}
                <img src={`${baseUrl}img/icon_tutorials.svg`} />
                Knowledge Base
              </button>
            </Link>
            <Link href="/release-notes/software-supply-chain-assurance">
              <button className={styles.btn}>
                {/* <i className="fa-regular fa-file"></i> */}
                <img src={`${baseUrl}img/icon_release_notes.svg`} />
                Release Notes
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.spaceBetween}>
          <div className={styles.content} style={{ width: '100%' }}>
            <p>
              The Harness Supply Chain Security (SCS) module
              addresses the challenges of securing your software supply chain.
              The SCS module aims to help you establish trust in the software
              supply chain, manage open-source components, ensure policy
              compliance, identify security vulnerabilities, and enable rapid
              responses to new threats. Learn how you can set up your pipelines
              to secure your software supply chain.
            </p>
            <div className={styles.illustrationContainer}>
              {is3kDocs ? (
                <SoftwareSupplyChainAssuranceOnboardingIllustration />
              ) : (
                <img
                  className={styles.illustration}
                  src={`${baseUrl}img/ssca_Landing_Page.svg`}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
    </div>
  );
}
