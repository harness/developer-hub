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
      {/* <img src="/img/cd.svg" /> */}
      <div className={styles.SectionName}>
        <h3>Administer the Harness Platform with ease</h3>
      </div>
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img
              src={`${baseUrl}img/icon_harness.svg`}
              alt="Harness Platform"
            />
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
