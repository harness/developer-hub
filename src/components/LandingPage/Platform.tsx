import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";
import TutorialCard from "./TutorialCard";
import { FeaturedList, PlatformList } from "./data/platformData";

export default function Platform() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    // <Layout title="CD" description="CD">
    //   <ul className={styles.breadCrumb}>
    //     <li>Get Started</li>
    //     <li>Deploy services</li>
    //   </ul>
    <div className="container">
    <div className={styles.SectionName}>
      <h3>Administer the Harness Platform with ease</h3>

    </div>
    <div className={styles.topSection}>
      <div className={styles.spaceBetween}>
        <div className={styles.moduleTitle}>
          <img src={`${baseUrl}img/icon_platform.svg`} />
          <h1>Harness Platform</h1>
        </div>
        <div className={styles.btnContainer}>
          <Link href="/docs/platform">
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

          <Link href="/release-notes/platform">
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
          Harness Platform is designed to assist developers and DevOps teams in delivering software with maximum speed, quality, security, reliability, and resilience at the lowest possible cost. It helps you stay within the governance boundaries required to achieve organizational objectives.
          </p>
          <div className={styles.alignCenter}>
            <Link
              className={clsx("button button--lg", styles.btn, styles.btnCI)}
              to="#all-tutorials"
            >
              Tutorials <i className="fa-solid fa-arrow-right"></i>
            </Link>
            <Link href="https://harness.io/products/platform">
              <button className={styles.link}>Learn more</button>
            </Link>
          </div>
        </div>
        <div>
          <img src={`${baseUrl}img/platform.svg`} />
        </div>
      </div>
    </div>
      <div className={styles.subSection}>
        <h3>Featured Tutorials</h3>
        <TutorialCard FeatureList={FeaturedList} featuredCard={true} />
      </div>
      <div className={styles.subSection}>
        <h3 id="all-tutorials">All Platform Tutorials</h3>
        <TutorialCard FeatureList={PlatformList} />
      </div>
    </div>
    // </Layout>
  );
}
