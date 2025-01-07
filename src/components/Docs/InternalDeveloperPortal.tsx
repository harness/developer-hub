import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./styles.module.scss";
import TutorialCard, { TutorialCards } from "../LandingPage/TutorialCard";
// Define the cards in "***Data.ts"
import { docsCards } from "./data/internalDeveloperPortal";
import { useColorMode } from "@docusaurus/theme-common";
export default function IDP() {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img width={64} src={`${baseUrl}img/icon_idp.svg`} />
            <h1>Internal Developer Portal</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/kb">
              <button className={styles.btn}>
                <img src={`${baseUrl}img/icon_tutorials.svg`} />
                Knowledge Base
              </button>
            </Link>
            <Link href="/release-notes/internal-developer-portal">
              <button className={styles.btn}>
                <img src={`${baseUrl}img/icon_release_notes.svg`} />
                Release Notes
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.spaceBetween}>
          <div className={styles.content}>
            <p>
              Harness IDP is a home for developers to create, manage, and
              explore software. It enables you to create new software components
              quickly while adhering to your company's best practices. It
              enables you to manage the software you own by presenting a
              developer-centric view of all relevant information such as service
              health, deployments, and alerts. It also enables you to explore
              the internal software ecosystem of the company, discover technical
              documentation, APIs, and services, all of which enable better
              collaboration.
            </p>
            <div className={styles.illustrationContainer}>
              {/* <img
                className={styles.illustration}
                src={
                  colorMode === "light"
                    ? `${baseUrl}img/idp.svg`
                    : `${baseUrl}img/IDP_dark _mode.svg`
                }
              />{" "} */}
            </div>
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
      <div className={styles.subSection}></div>
    </div>
    // </Layout>
  );
}
