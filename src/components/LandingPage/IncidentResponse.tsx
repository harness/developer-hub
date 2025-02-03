import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";
import TutorialCard from "./TutorialCard";
import { FeaturedList, IncidentResponseList } from "./data/incidentResponseData";
import { useColorMode } from "@docusaurus/theme-common";
export default function FF() {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.SectionName}>
        <h3>Respond to incidents</h3>
      </div>
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_dbdevops.svg`} />
            <h1>Incident Response (COMING SOON) </h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/docs/incident-response">
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
          </div>
        </div>
        <div className={styles.spaceBetween}>
          <div className={styles.content}>
            <p>
            Harness Incident Response (IR) is a cutting-edge module that revolutionizes incident management by focusing on proactive issue prevention and accelerated resolution. A key differentiator is its ability to correlate change events from disparate sources, such as CI/CD pipelines, Feature Flags, 3rd Party changes, and deployments, providing unparalleled context for incident attribution. Harness IR automates prioritization and response orchestration while integrating seamlessly with existing tools like ServiceNow, Slack, and monitoring systems. Real-time visibility into service health, error budgets, and associated changes empower teams to resolve incidents faster, minimize downtime, and drive operational excellence.            </p>
            <div className={styles.alignCenter}>
              <Link href="/docs/incident-response">
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
              <Link href="https://harness.io/products/incident-response">
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
        <h3 id="all-tutorials">All Incident Response Tutorials</h3>
        <TutorialCard FeatureList={IncidentResponseList} />
      </div>
    </div>
    // </Layout>
  );
}