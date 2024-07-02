import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";
import TutorialCard from "./TutorialCard";
import { FeaturedList, CEList } from "./data/chaosEngineeringData";
import { useColorMode } from "@docusaurus/theme-common";
export default function CE() {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.SectionName}>
        <h3>Ensure app and infrastructure resilience</h3>
      </div>
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_ce.svg`} />
            <h1>Chaos Engineering</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/docs/chaos-engineering">
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

            <Link href="/release-notes/chaos-engineering">
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
              Harness CE helps you find your system's weak points using
              controlled systems-level failure experiments, and equips you with
              the information you need to prevent them from happening in the
              future. The result? Increased systems reliability and less
              downtime.
            </p>
            <div className={styles.alignCenter}>
              <Link href="/docs/chaos-engineering">
                <button
                  className={clsx(
                    "button button--lg",
                    styles.btn,
                    styles.btnCE
                  )}
                >
                  Documentation <i className="fa-solid fa-arrow-right"></i>
                </button>
              </Link>
              <Link href="https://harness.io/products/chaos-engineering">
                <button className={styles.link}>Learn more</button>
              </Link>
            </div>
          </div>
          {/* <div>
            <img src={`${baseUrl}img/ce.svg`} />
          </div> */}
          <div className={styles.illustrationContainer}>
            <img
              className={styles.illustration}
              src={
                colorMode === "light"
                  ? `${baseUrl}img/ce.svg`
                  : `${baseUrl}img/CE_Landing_Page_dark_mode.svg`
              }
            />
          </div>
        </div>
      </div>
      <div className={styles.subSection}>
        <h3>Featured tutorials</h3>
        <TutorialCard FeatureList={FeaturedList} featuredCard={true} />
      </div>
      <div className={styles.subSection}>
        <h3 id="all-tutorials">Harness Chaos Engineering tutorials</h3>
        <TutorialCard FeatureList={CEList} />
      </div>
    </div>
    // </Layout>
  );
}
