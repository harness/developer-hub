import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';
import { TutorialCards } from '@site/src/components/TutorialCard/TutorialCard';
import styles from './styles.module.scss';
// Define the cards in "***Data.ts"
import { useColorMode } from '@docusaurus/theme-common';
import { docsCards } from './data/application&APIRuntimeProtectionData';
export default function ARP() {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = '/' } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_api_runtime_protection.svg`} />
            <h1>Application & API Runtime Protection</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="https://docs.traceable.ai/docs/productrn25">
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
              With Runtime Protection, your application and APIs are defended in near real time against active threats. Protection enables security and operation teams to monitor attacks, block malicious traffic, and safeguard sensitive data in near real time. It provides visibility into threat actors, APIs under attack, bot activity, while enforcing fine-grained policies to minimize risk without disrupting legitimate users. By combining advanced detection, automated defenses, and flexible policy management, Protection ensures that your applications and APIs remain resilient, compliant, and secure in production.
            </p>
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
    </div>
  );
}
