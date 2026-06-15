import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';
import { TutorialCards } from '@site/src/components/TutorialCard/TutorialCard';
import ModuleLandingPageAnimation from '@site/src/components/ModuleLandingPageAnimation/ModuleLandingPageAnimation';
import { iacmConfig } from '@site/src/components/ModuleLandingPageAnimation/configs';
import styles from './styles.module.scss';
import { docsCards } from './data/iacmData';

export default function Iacm() {
  const { siteConfig: { baseUrl = '/' } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img width={64} src={`${baseUrl}img/iacm-icon.svg`} />
            <h1>Infrastructure as Code Management</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/release-notes/infrastructure-as-code-management">
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
              Harness Infrastructure as Code Management lets you define, deploy,
              and manage infrastructure across environments with built-in
              compliance and control. Key features include cost estimation,
              approval steps, PR automation, policy enforcement, drift detection,
              and configuration management with Ansible.
            </p>
            <ModuleLandingPageAnimation
              sequences={iacmConfig.sequences}
              color={iacmConfig.color}
              startInset={32}
              endInset={32}
            />
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
    </div>
  );
}
