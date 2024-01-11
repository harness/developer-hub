import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./styles.module.scss";
import TutorialCard, { TutorialCards } from "../LandingPage/TutorialCard";
// Define the cards in "***Data.ts"
import { featuredTutorials, docsCards } from "./data/codeRepositoryData";

export default function Code() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_code.svg`} />
            <h1>Code Repository Documentation</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/tutorials">
              <button className={styles.btn}>
                {/* <i className="fa-regular fa-file"></i> */}
                <img src={`${baseUrl}img/icon_tutorials.svg`} />
                Tutorials
              </button>
            </Link>
            <Link href="/release-notes">
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
              Learn how you can accelerate development with security at scale.
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
