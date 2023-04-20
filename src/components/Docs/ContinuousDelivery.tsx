import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./styles.module.scss";
import TutorialCard, { TutorialCards } from "../LandingPage/TutorialCard";
// Define the cards in "***Data.ts"
import { featuredTutorials, docsCards } from "./data/continuousDeliveryData";

export default function CD() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_cd.svg`} />
            <h1>Continuous Delivery & GitOps Documentation</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/tutorials/deploy-services">
              <button className={styles.btn}>
                <img src={`${baseUrl}img/icon_tutorials.svg`} />
                Tutorials
              </button>
            </Link>
            <Link href="/release-notes/continuous-delivery">
              <button className={styles.btn}>
                <img src={`${baseUrl}img/icon_release_notes.svg`} />
                Release Notes
              </button>
            </Link>
            <Link href="https://registry.terraform.io/providers/harness/harness/latest/docs">
              <button className={styles.btn}>
                <img src={`${baseUrl}img/icon_documentation.svg`} />
                Harness Terraform documentation
              </button>
            </Link>
            <Link href="https://apidocs.harness.io/">
              <button className={styles.btn}>
                <img src={`${baseUrl}img/icon_documentation.svg`} />
                Harness API reference
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.spaceBetween}>
          <div className={styles.content}>
            <p>
              Make your software releases more efficient and reliable with
              Harness Continuous Delivery.
            </p>
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
      {featuredTutorials && featuredTutorials.length > 0 && (
        <>
          <div className={styles.sectionDivider}></div>
          <div className={styles.subSection}>
            <h3>Featured Tutorials</h3>
            <TutorialCard FeatureList={featuredTutorials} featuredCard={true} />
          </div>
        </>
      )}
    </div>
    // </Layout>
  );
}
