import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";
import TutorialCard from "./TutorialCard";
import { SMPList } from "./data/smpData";

export default function SMP() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    // <Layout title="CD" description="CD">
    //   <ul className={styles.breadCrumb}>
    //     <li>Get Started</li>
    //     <li>Deploy services</li>
    //   </ul>
    <div className="container">
      {/* <img src="/img/cd.svg" /> */}
      <div className={styles.SectionName}>
        <h3>Administer Harness Self-Managed Enterprise Edition</h3>
      </div>
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img
              src={`${baseUrl}img/icon_harness.svg`}
              alt="Harness Self-Managed Enterprise Edition"
            />
            <h1>Harness Self-Managed Enterprise Edition</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/docs/self-managed-enterprise-edition">
              <button
                className={clsx(
                  "button button--lg",
                  styles.btn,
                  styles.btnLight
                )}
              >
                {/* <i className="fa-regular fa-file"></i> */}
                <img src={`${baseUrl}img/icon_documentation.svg`} />
                Documentation
              </button>
            </Link>

            <Link href="/release-notes/self-managed-enterprise-edition">
              <button
                className={clsx(
                  "button button--lg",
                  styles.btn,
                  styles.btnLight
                )}
              >
                {/* <i className="fa-regular fa-file"></i> */}
                <img src={`${baseUrl}img/icon_release_notes.svg`} />
                Release Notes
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.subSection}>
        <h3 id="all-tutorials">All Self-Managed Enterprise Edition Tutorials</h3>
        <TutorialCard FeatureList={SMPList} />
      </div>
    </div>
    // </Layout>
  );
}
