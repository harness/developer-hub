import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";
import TutorialCard from "./TutorialCard";
import {
  FeaturedList,
  // DroneList,
  IDPList,
} from "./data/internalDeveloperPortalData";

export default function IDP() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.SectionName}>
        <h3>
          Create service onboarding pipelines, setup your software catalog and
          configure plugins.
        </h3>
      </div>
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img width={64} src={`${baseUrl}img/icon_idp.svg`} />
            <h1>Internal Developer Portal</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/docs/internal-developer-portal">
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
            <Link href="/release-notes/internal-developer-portal">
              <button
                className={clsx(
                  "button button--lg",
                  styles.btn,
                  styles.btnLight
                )}
              >
                <img src={`${baseUrl}img/icon_release_notes.svg`} />
                Release Notes
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.spaceBetween}>
          <div className={styles.content}>
            <p>
              Harness IDP enables you to create new software components quickly
              while adhering to your company’s best practices. It enables you to
              manage the software you own by presenting a developer-centric view
              of all relevant information such as service health, deployments,
              and alerts. It also enables you to explore the internal software
              ecosystem of the company, discover technical documentation, APIs,
              and services, all of which enable better collaboration.
            </p>
            <div className={styles.alignCenter}>
              <Link
                className={clsx("button button--lg", styles.btn, styles.btnIDP)}
                to="#all-tutorials"
              >
                Tutorials <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <Link href="https://www.harness.io/blog/introducing-harness-internal-developer-portal-beta-release">
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
        <h3 id="all-tutorials">All IDP Tutorials</h3>
        <TutorialCard FeatureList={IDPList} />
      </div>
    </div>
    // </Layout>
  );
}
