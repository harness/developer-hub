import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";
import TutorialCard from "./TutorialCard";
import { FeaturedList, DBDevOpsList } from "./data/databaseDevOpsData";
import { useColorMode } from "@docusaurus/theme-common";
export default function FF() {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.SectionName}>
        <h3>Rollout new features progressively</h3>
      </div>
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_dbdevops.svg`} />
            <h1>Database DevOps (Beta) </h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/docs/database-devops">
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

            <Link href="/release-notes/database-devops">
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
              Harness Database DevOps (DB DevOps) is a new module that seamlessly integrates database changes into CI/CD pipelines, automating schema management and governance. It provides full visibility into database changes across environments, ensuring reliable rollbacks and compliance with centralized policies. With GitOps workflows and support for major databases, it enables developers and DBAs to collaborate more effectively, reducing bottlenecks and deployment risks.
            </p>
            <div className={styles.alignCenter}>
              <Link href="/docs/database-devops">
                <button
                  className={clsx(
                    "button button--lg",
                    styles.btn,
                    styles.btnFF
                  )}
                >
                  Documentation <i className="fa-solid fa-arrow-right"></i>
                </button>
              </Link>
              <Link href="https://harness.io/products/database-devops">
                <button className={styles.link}>Learn more</button>
              </Link>
            </div>
          </div>
          {/* <div>
            <img src={`${baseUrl}img/ff.svg`} />
          </div> */}
          <div className={styles.illustrationContainer}>
            <img
              className={styles.illustration}
              src={
                colorMode === "light"
                  ? `${baseUrl}img/dbdevops_landing_page_lightmode.svg`
                  : `${baseUrl}img/dbdevops_landing_page_darkmode.svg`
              }
            />
          </div>
        </div>
      </div>
      <div className={styles.subSection}>
        <h3>Featured Tutorials</h3>
        <TutorialCard FeatureList={FeaturedList} featuredCard={true} />
      </div>
      <div className={styles.subSection}>
        <h3 id="all-tutorials">All DB DevOps Tutorials</h3>
        <TutorialCard FeatureList={DBDevOpsList} />
      </div>
    </div>
    // </Layout>
  );
}
