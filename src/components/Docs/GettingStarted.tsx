import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./styles.module.scss";
import TutorialCard, { TutorialCards } from "../LandingPage/TutorialCard";
// Define the cards in "***Data.ts"
import { featuredTutorials, docsCards } from "./data/gettingStartedData";

export default function gs() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_harness.svg`} />
            <h1>Get Started</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/tutorials">
              <button className={styles.btn}>
                <img src={`${baseUrl}img/icon_tutorials.svg`} />
                Tutorials
              </button>
            </Link>
            <Link href="/release-notes/whats-new">
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
              Learn about Harness basic concepts, architecture, and supported platforms and technologies.
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