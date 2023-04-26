import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./styles.module.scss";
import TutorialCard, { TutorialCards } from "../LandingPage/TutorialCard";
// Define the cards in "***Data.ts"
import { featuredTutorials, docsCards } from "./data/serviceReliabilityManagementData";

export default function SRM() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_srm.svg`} />
            <h1>Service Reliability Management Documentation</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/tutorials/service-reliability">
              <button className={styles.btn}>
                {/* <i className="fa-regular fa-file"></i> */}
                <img src={`${baseUrl}img/icon_tutorials.svg`} />
                Tutorials
              </button>
            </Link>
            <Link href="/release-notes//service-reliability-management">
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
            Harness Service Reliability Management (SRM) helps your engineering and DevOps teams to balance feature velocity and bug fixes along with the stability and reliability needs in a production environment.
            </p>
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
      {featuredTutorials && featuredTutorials.length > 0 && (
        <>
          <div className={styles.sectionDivider}></div>
          <div className={styles.subSection}>
            <h3>Featured Tutorials</h3>
            <TutorialCard FeatureList={featuredTutorials} featuredCard={true} />
          </div>
        </>
      )}
    </div>
    // </Layout>
  );
}
