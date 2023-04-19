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
            <Link href="/tutorials/run-chaos-experiments">
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
              <a href="/docs/chaos-engineering/get-started/introduction-to-chaos-module">Chaos engineering</a> is the discipline of performing experiments on a software to build 
              confidence in the system's capability to withstand turbulent and unexpected conditions. 
              It is a tool that helps identify weaknesses and misconfiguration in the services. Harness Chaos Engineering module takes a holistic-approach to chaos engineering, and doesn't merely focus on fault-injection. It is designed to help users setup a fully-operational chaos function that is based on the original <a href = "https://principlesofchaos.org/">principles of chaos</a> as well as addressing several enterprise needs around its practice.
            </p>
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
      <div className={styles.subSection}>
        <h3>Feature Highlights</h3>
        <TutorialCard FeatureList={featureHighlights} featuredCard={true} />
        </div>
        <div className={styles.subSection}>
        <h3>Featured Tutorials</h3>
        <TutorialCard FeatureList={featuredTutorials} featuredCard={true} />
      </div>
    </div>
    // </Layout>
  );
}