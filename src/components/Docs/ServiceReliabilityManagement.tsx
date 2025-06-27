import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';
import { TutorialCards } from '@site/src/components/TutorialCard/TutorialCard';
import styles from './styles.module.scss';
// Define the cards in "***Data.ts"
import { docsCards } from './data/serviceReliabilityManagementData';

import { useColorMode } from '@docusaurus/theme-common';
export default function SRM() {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = '/' } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_srm.svg`} />
            <h1>Service Reliability Management</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/kb/service-reliability-management">
              <button className={styles.btn}>
                {/* <i className="fa-regular fa-file"></i> */}
                <img src={`${baseUrl}img/icon_tutorials.svg`} />
                Knowledge Base
              </button>
            </Link>
            <Link href="/release-notes/service-reliability-management">
              <button className={styles.btn}>
                {/* <i className="fa-regular fa-file"></i> */}
                <img src={`${baseUrl}img/icon_release_notes.svg`} />
                Release Notes
              </button>
            </Link>
          </div>
        </div>
        <div style={{ 
          backgroundColor: '#FFF3CD', 
          border: '1px solid #FFECB5', 
          borderRadius: '4px', 
          padding: '16px', 
          marginTop: '16px', 
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{ 
            marginRight: '12px', 
            fontSize: '20px', 
            color: '#856404' 
          }}>⚠️</div>
          <div>
            <strong>Deprecation Notice:</strong> The Service Reliability Management module will be deprecated soon. Please plan to migrate to alternative solutions.
          </div>
        </div>
        <div className={styles.spaceBetween}>
          <div className={styles.content}>
            <p>
              Harness Service Reliability Management (SRM) helps engineering and
              DevOps teams balance feature velocity and bug fixes with the
              stability and reliability needs of a production environment. You
              can monitor SLOs, track error budget burndown, and identify change
              impact.
            </p>
            <div className={styles.illustrationContainer}>
              <img
                className={styles.illustration}
                src={
                  colorMode === 'light'
                    ? `${baseUrl}img/srm.svg`
                    : `${baseUrl}img/SRM_Landing_ Page_dark_mode.svg`
                }
              />{' '}
            </div>
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
    </div>
  );
}
