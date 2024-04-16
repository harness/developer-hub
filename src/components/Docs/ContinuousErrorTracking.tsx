import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./styles.module.scss";
import TutorialCard, { TutorialCards } from "../LandingPage/TutorialCard";
// Define the cards in "***Data.ts "
import { docsCards } from "./data/continuousErrorTrackingData";
import { useColorMode } from "@docusaurus/theme-common";
export default function CET() {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_cet.svg`} />
            <h1>Continuous Error Tracking</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/kb/continuous-error-tracking">
              <button className={styles.btn}>
                {/* <i className="fa-regular fa-file"></i> */}
                <img src={`${baseUrl}img/icon_tutorials.svg`} />
                Knowledge Base
              </button>
            </Link>
            <Link href="/release-notes/continuous-error-tracking">
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
              Identify, triage, and resolve errors proactively with Harness
              Continuous Error Tracking (CET) in your services across CI, CD,
              QA, and production environments. Find and fix issues in minutes
              (instead of weeks) with full code level visibility and deep
              context that streamlines remediation efforts across teams — all
              while keeping your applications up and running. Harness CET is
              developer observability for modern applications.
            </p>
            <div className={styles.illustrationContainer}>
              <img
                className={styles.illustration}
                src={
                  colorMode === "light"
                    ? `${baseUrl}img/cet.svg`
                    : `${baseUrl}img/CET_Landing_Page_dark_mode.svg`
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
