import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./styles.module.scss";
import TutorialCard, { TutorialCards } from "../LandingPage/TutorialCard";
// Define the cards in "***Data.ts"
import { featuredTutorials, docsCards, featureHighlights } from "./data/chaosEngineeringData";

export default function CD() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_ce.svg`} />
            <h1>Chaos Engineering Documentation</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/tutorials/chaos-experiments">
              <button className={styles.btn}>
                {/* <i className="fa-regular fa-file"></i> */}
                <img src={`${baseUrl}img/icon_tutorials.svg`} />
                Tutorials
              </button>
            </Link>
            <Link href="/release-notes/chaos-engineering">
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
              <a href="/docs/chaos-engineering/get-started/introduction-to-chaos-module">Chaos engineering</a> helps perform experiments on software to build 
              confidence in the system's capability to withstand turbulent and unexpected conditions. 
              It helps identify weaknesses and misconfiguration in the services, thereby building and validating resilience. 
            </p>
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
      <div className={styles.subSection}>
        <h3>Feature highlights</h3>
        <TutorialCard FeatureList={featureHighlights} />
        </div>
        <div className={styles.subSection}>
        <h3>Featured tutorials</h3>
        <TutorialCard FeatureList={featuredTutorials} />
      </div>
    </div>
    // </Layout>
  );
}