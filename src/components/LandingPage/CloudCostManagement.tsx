import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";
import TutorialCard from "./TutorialCard";
import { FeaturedList, CCMList } from "./data/cloudCostManagementData";

export default function CCM() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    // <Layout title="CCM" description="CCM">
    //   <ul className={styles.breadCrumb}>
    //     <li>Get Started</li>
    //     <li>Optimize Cloud Costs</li>
    //   </ul>
    <div className="container">
      <div className={styles.SectionName}>
        <h3>Achieve cost transparency and cut costs</h3>
      </div>
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_ccm.svg`} />
            <h1>Cloud Cost Management</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/docs/cloud-cost-management">
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

            <Link href="/release-notes/cloud-cost-management">
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
              Harness CCM is an intelligent cloud cost management solution for
              FinOps, Infrastructure, and Engineering teams. Harness CCM
              provides:
              <ul>
                <li>
                  Complete cost transparency across engineering and finance with
                  robust business intelligence (BI)
                </li>
                <li>
                  Ability to reduce wasted cloud costs by up to 75% with
                  Intelligent Cloud AutoStopping
                </li>
              </ul>
            </p>
            <div className={styles.alignCenter}>
              <Link
                className={clsx("button button--lg", styles.btn, styles.btnCCM)}
                to="#all-tutorials"
              >
                Tutorials <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <Link href="https://harness.io/products/cloud-cost">
                <button className={styles.link}>Learn more</button>
              </Link>
            </div>
          </div>
          <div>
            <img src={`${baseUrl}img/ccm.svg`} />
          </div>
        </div>
      </div>
      <div className={styles.subSection}>
        <h3>Featured Tutorials</h3>
        <TutorialCard FeatureList={FeaturedList} featuredCard={true} />
      </div>
      <div className={styles.subSection}>
        <h3 id="all-tutorials">All CCM Tutorials</h3>
        <TutorialCard FeatureList={CCMList} />
      </div>
    </div>
    // </Layout>
  );
}
