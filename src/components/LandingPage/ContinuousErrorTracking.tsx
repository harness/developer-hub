import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";
import TutorialCard from "./TutorialCard";
import { FeaturedList, CETList } from "./data/continuousErrorTrackingData";

export default function CET() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.SectionName}>
        <h3>Developer Observability for Modern Applications</h3>
      </div>
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_cet.svg`} />
            <h1>Continuous Error Tracking</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/docs/continuous-error-tracking">
              <button
                className={clsx(
                  "button button--lg",
                  styles.btn,
                  styles.btnLight
                )}
              >
                {/* <i className="fa-regular fa-file"></i> */}
                <img src={`${baseUrl}img/icon_documentation.svg`} />
                Documentation
              </button>
            </Link>

            <Link href="/release-notes/continuous-error-tracking">
              <button
                className={clsx(
                  "button button--lg",
                  styles.btn,
                  styles.btnLight
                )}
              >
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
            Find and fix issues in minutes (instead of weeks) with full code level visibility
            and deep context that streamlines remediation efforts across teams — all while keeping
            your applications up and running. 
            </p>
            <div className={styles.alignCenter}>
              <Link
                className={clsx("button button--lg", styles.btn, styles.btnCET)}
                to="#all-tutorials"
              >
                Tutorials <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <Link href="https://www.harness.io/products/continuous-error-tracking">
                <button className={styles.link}>Learn more</button>
              </Link>
            </div>
          </div>
          <div>
            <img src={`${baseUrl}img/cet.svg`} />
          </div>
        </div>
      </div>
      <div className={styles.subSection}>
        <h3>Featured Tutorials</h3>
        <TutorialCard FeatureList={FeaturedList} featuredCard={true} />
      </div>
      <div className={styles.subSection}>
        <h3 id="all-tutorials">All CET Tutorials</h3>
        <TutorialCard FeatureList={CETList} />
      </div>
    </div>
    // </Layout>
  );
}
