import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./styles.module.scss";
import TutorialCard, { TutorialCards } from "../LandingPage/TutorialCard";
// Define the cards in "***Data.ts"
import { featuredTutorials, docsCards } from "./data/selfManagedEnterpriseEditionData";

export default function CD() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_harness.svg`} />
            <h1>Self-Managed Enterprise Edition Documentation</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/tutorials/self-managed-enterprise-edition">
              <button className={styles.btn}>
                {/* <i className="fa-regular fa-file"></i> */}
                <img src={`${baseUrl}img/icon_tutorials.svg`} />
                Tutorials
              </button>
            </Link>
            <Link href="/release-notes/self-managed-enterprise-edition">
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
            Harness Self-Managed Enterprise Edition is an end-to-end solution for continuous, self-managed delivery.
            </p>
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
      <div className={styles.subSection}>
        </div>
        <div className={styles.subSection}>
      </div>
    </div>
    // </Layout>
  );
}