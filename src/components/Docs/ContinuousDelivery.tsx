import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import { TutorialCards } from '@site/src/components/TutorialCard/TutorialCard';
import styles from './styles.module.scss';
// Define the cards in "***Data.ts"
import { useColorMode } from '@docusaurus/theme-common';
import { docsCards } from './data/continuousDeliveryData';
export default function CD() {
  const { siteConfig: { baseUrl = '/' } = {} } = useDocusaurusContext();
  const { colorMode } = useColorMode();
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_cd.svg`} />
            <h1>Continuous Delivery & GitOps</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/kb/continuous-delivery">
              <button className={styles.btn}>
                <img src={`${baseUrl}img/icon_tutorials.svg`} />
                Knowledge Base
              </button>
            </Link>
            <Link href="/release-notes/continuous-delivery">
              <button className={styles.btn}>
                <img src={`${baseUrl}img/icon_release_notes.svg`} />
                Release Notes
              </button>
            </Link>
            <Link href="https://apidocs.harness.io/">
              <Tooltip placement="top" overlay="API Reference">
                <button className={styles.btnMini}>
                  <img src={`${baseUrl}img/icon_api_docs.svg`} />
                </button>
              </Tooltip>
            </Link>
            <Link href="https://registry.terraform.io/providers/harness/harness/latest/docs">
              <Tooltip placement="top" overlay="Terraform Provider">
                <button className={styles.btnMini}>
                  <img src={`${baseUrl}img/icon_terraform.svg`} />
                </button>
              </Tooltip>
            </Link>
          </div>
        </div>
        <div className={styles.spaceBetween}>
          <div className={styles.content}>
            <p>
              Harness Continuous Delivery (CD) and GitOps enables deployment of
              application and infrastructure changes in a safe and sustainable
              way. Your CD pipelines and GitOps workflows can automate all of
              the steps necessary to get your changes into production. Make your
              software releases more efficient and reliable with Harness CD and
              GitOps.
            </p>
            <div className={styles.illustrationContainer}>
              <img
                className={styles.illustration}
                src={
                  colorMode === 'light'
                    ? `${baseUrl}img/cd.svg`
                    : `${baseUrl}img/CD_Landing_Page_dark_mode.svg`
                }
              />
            </div>
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
    </div>
  );
}
