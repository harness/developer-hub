import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";
import TutorialCard, { TutorialCards } from "../LandingPage/TutorialCard";
// Define the cards in "***Data.ts"
import { featuredTutorials, docsCards } from "./data/cloudCostManagementData";

export default function CCM() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_ccm.svg`} />
            <h1>Cloud Cost Management Documentation</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/tutorials/cloud-costs">
              <button className={styles.btn}>  
                {/* <i className="fa-regular fa-file"></i> */}
                <img src={`${baseUrl}img/icon_tutorials.svg`} />
                Tutorials
              </button>
            </Link>
            <Link href="/release-notes/cloud-cost-management">
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
          Harness CCM is a cutting-edge cloud cost management solution that empowers your FinOps, infrastructure, and engineering teams with intelligent tools to optimize your cloud spend. 
          With its advanced business intelligence (BI) capabilities, CCM provides complete cost transparency across teams in your organization.
          </p>
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
      <div className={styles.sectionDivider}></div>
      {/*<div className={styles.subSection}>*/}
        {/*<h3>Featured Tutorials</h3>*/}
        {/*<TutorialCard FeatureList={featuredTutorials} featuredCard={true} />*/}
      {/*</div>*/}
    </div>
    // </Layout>
  );
}






          