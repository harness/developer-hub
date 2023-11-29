import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import styles from "./styles.module.scss";
import { TutorialCards } from "../LandingPage/TutorialCard";
// Define the cards in "***Data.ts"
import { docsCards } from "./data/iacmData";

export default function Iacm() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img width={64} src={`${baseUrl}img/iacm-icon.svg`} />
            <h1>Infrastructure as Code Management Documentation</h1>
          </div>
          {/*
            TODO: Re-add this when the release notes are added to the docs
            <div className={styles.btnContainer}>
              <Link href="/release-notes/infrastructure-as-code-management">
                <button className={styles.btn}>
                  <img src={`${baseUrl}img/icon_release_notes.svg`} />
                  Release Notes
                </button>
              </Link>
            </div>
          */}
        </div>
        <div className={styles.spaceBetween}>
          <div className={styles.content}>
            <p>Manage your Infrastructure as Code End-to-End. This module is currently in BETA.</p>
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
      {/* <div className={styles.sectionDivider}></div> */}
      <div className={styles.subSection}>
        {/* <h3>Featured Tutorials</h3> */}
        {/* <TutorialCard FeatureList={FeaturedList} featuredCard={true} /> */}
      </div>
    </div>
  );
}
