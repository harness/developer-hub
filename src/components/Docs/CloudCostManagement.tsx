import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";
import TutorialCard from "./TutorialCard";
// Define the cards in "***Data.ts"
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
        <h3>Optimize Cloud Costs</h3>
      </div>
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_ccm.svg`} />
            <h1>Cloud Cost Management</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/tutorials/manage-cloud-costs">
              <button
                className={clsx(
                  "button button--lg",
                  styles.btn,
                  styles.btnLight
                )}
              >
                {/* <i className="fa-regular fa-file"></i> */}
                <img src={`${baseUrl}img/icon_tutorials.svg`} />
                Tutorials
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
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
      <div className={styles.sectionDivider}></div>
      <div className={styles.subSection}>
        <h3>Featured Tutorials</h3>
        <TutorialCard FeatureList={featuredTutorials} featuredCard={true} />
      </div>
    </div>
    // </Layout>
  );
}






          