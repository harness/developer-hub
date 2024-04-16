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
import { useColorMode } from "@docusaurus/theme-common";
export default function CI() {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    // <Layout title="CI" description="CI">
    //   <ul className={styles.breadCrumb}>
    //     <li>Get Started</li>
    //     <li>Build and Test Code</li>
    //   </ul>
    <div className="container">
      <div className={styles.SectionName}>
        <h3>
          Set up CI pipelines to automate building, testing, & publishing of
          artifacts
        </h3>
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
              <Link href="/docs/continuous-integration">
                <button
                  className={clsx(
                    "button button--lg",
                    styles.btn,
                    styles.btnCI
                  )}
                >
                  Documentation <i className="fa-solid fa-arrow-right"></i>
                </button>
              </Link>
              <Link href="https://harness.io/products/continuous-integration">
                <button className={styles.link}>Learn More</button>
              </Link>
            </div>
          </div>
          <div className={styles.illustrationContainer}>
            <img
              className={styles.illustration}
              src={
                colorMode === "light"
                  ? `${baseUrl}img/ci.svg`
                  : `${baseUrl}img/CI_dark_mode.svg`
              }
            />
          </div>
        </div>
      </div>
      <div className={styles.subSection}>
        <h3 id="featured-documentation">Featured Documentation</h3>
        <TutorialCard FeatureList={FeaturedList} featuredCard={true} />
      </div>
    </div>
    // </Layout>
  );
}
