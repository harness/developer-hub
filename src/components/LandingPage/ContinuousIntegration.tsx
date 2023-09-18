import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";
import TutorialCard from "./TutorialCard";
import {
  FeaturedList,
  // DroneList,
  CIList,
} from "./data/continuousIntegrationData";

export default function CI() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    // <Layout title="CI" description="CI">
    //   <ul className={styles.breadCrumb}>
    //     <li>Get Started</li>
    //     <li>Build and Test Code</li>
    //   </ul>
    <div className="container">
      <div className={styles.SectionName}>
        <h3>Set up CI pipelines to automate building, testing, & publishing of artifacts</h3>

      </div>
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_ci.svg`} />
            <h1>Continuous Integration</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/docs/continuous-integration">
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

            <Link href="/release-notes/continuous-integration">
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
              Harness CI helps you build and test your code. It also provides a
              bird's-eye view of all your builds — successful, failed, aborted,
              and expired — and the percentage of successful builds for
              individual codebases. You can easily see where your builds have
              failed and drill down into specific builds to troubleshoot and
              analyze the root causes.
            </p>
            <div className={styles.alignCenter}>
              <Link
                className={clsx("button button--lg", styles.btn, styles.btnCI)}
                to="#all-tutorials"
              >
                Tutorials <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <Link href="https://harness.io/products/continuous-integration">
                <button className={styles.link}>Learn more</button>
              </Link>
            </div>
          </div>
          <div>
            <img src={`${baseUrl}img/ci.svg`} />
          </div>
        </div>
      </div>
      <div className={styles.subSection}>
        <h3>Featured Tutorials</h3>
        <TutorialCard FeatureList={FeaturedList} featuredCard={true} />
      </div>
      <div className={styles.subSection}>
        {/*
        <h3>
          Drone Tutorials
        </h3>
        <TutorialCard FeatureList={DroneList} />
        */}
        <h3 id="all-tutorials">All CI Tutorials</h3>
        <TutorialCard FeatureList={CIList} />
      </div>
    </div>
    // </Layout>
  );
}