import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";
import TutorialCard from "./TutorialCard";
import { FeaturedList, GSList } from "./data/gettingStartedData";

export default function GS() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.SectionName}>
        <h3>Getting Started Tutorials</h3>
      </div>
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/logo.svg`} />
            <h1>Getting Started</h1>
          </div>

        </div>
        <div className={styles.spaceBetween}>
          <div className={styles.content}>
            <p>
              Getting started tutorials to get you moving in the right direction.
            </p>
            <div className={styles.alignCenter}>
              <Link
                className={clsx("button button--lg", styles.btn, styles.btnCI)}
                to="#all-tutorials"
              >
                Tutorials <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.subSection}>
        <h3>Featured Tutorials</h3>
        <TutorialCard FeatureList={FeaturedList} featuredCard={true} />
      </div>
      <div className={styles.subSection}>
        <h3 id="all-tutorials">All Getting Started Tutorials</h3>
        <TutorialCard FeatureList={GSList} />
      </div>
    </div>
    // </Layout>
  );
}
