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
              <a href="/docs/chaos-engineering/get-started/introduction-to-chaos-module">Harness Chaos Engineering (CE)</a> provides the end-to-end tooling required to achieve Continuous Resilience in your
              Software Development Life Cycle. Using Harness CE, your developers, QA teams, and SREs inject chaos experiments in a controlled fashion, either to assert resilience against pre-determined faults, or to find weaknesses
              against them. Harness CE helps to achieve faster incident response and recovery times, increases overall service resilience, optimizes costs, and results in an improved customer experience.
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
