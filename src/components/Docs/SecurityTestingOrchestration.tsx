import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./styles.module.scss";
import TutorialCard, { TutorialCards } from "../LandingPage/TutorialCard";
// Define the cards in "***Data.ts"
import { docsCards } from "./data/securityTestingOrchestrationData";
import { useColorMode } from "@docusaurus/theme-common";
export default function STO() {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_sto.svg`} />
            <h1>Security Testing Orchestration</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/kb/security-testing-orchestration">
              <button className={styles.btn}>
                {/* <i className="fa-regular fa-file"></i> */}
                <img src={`${baseUrl}img/icon_tutorials.svg`} />
                Knowledge Base
              </button>
            </Link>
            <Link href="/release-notes/security-testing-orchestration">
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
              With Harness Security Testing Orchestration (STO), your pipelines
              can detect security vulnerabilities automatically. Harness STO
              enables DevOps and Security teams teams to left shift security
              testing as a key outcome of their DevSecOps initiative. STO
              orchestrates scanning, intelligently deduplicating scanner output,
              prioritizing remediations, and enforcing governance into your
              pipelines. STO puts scanning directly into your pipelines to
              ensure that vulnerabilities are caught and fixed before your
              products are ever released.
            </p>
            <div className={styles.illustrationContainer}>
              <img
                className={styles.illustration}
                src={
                  colorMode === "light"
                    ? `${baseUrl}img/sto.svg`
                    : `${baseUrl}img/STO_Dark.svg`
                }
              />{" "}
            </div>
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
    </div>
    // </Layout>
  );
}
