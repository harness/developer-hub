import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./styles.module.scss";
import TutorialCard, { TutorialCards } from "../LandingPage/TutorialCard";
// Define the cards in "***Data.ts"
import { docsCards } from "./data/selfManagedEnterpriseEditionData";
import { useColorMode } from "@docusaurus/theme-common";

export default function CD() {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_harness.svg`} />
            <h1>Self-Managed Enterprise Edition</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/kb">
              <button className={styles.btn}>
                {/* <i className="fa-regular fa-file"></i> */}
                <img src={`${baseUrl}img/icon_tutorials.svg`} />
                Knowledge Base
              </button>
            </Link>
            <Link href="/release-notes/self-managed-enterprise-edition">
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
            Harness Self-Managed Enterprise Edition is a comprehensive, on-premise solution for continuous software delivery. It empowers developers and DevOps teams to deliver software quickly, securely, reliably, and cost-effectively, while maintaining governance compliance to meet organizational goals.  <br></br><br></br>
            Harness releases the Self-Managed Enterprise Edition monthly, with periodic hotfixes as needed.
            </p>
            <div className={styles.illustrationContainer}>
              <img
                className={styles.illustration}
                src={
                  colorMode !== "light"
                    ? `${baseUrl}img/Platform_Landing_Page.svg`
                    : `${baseUrl}img/Platform_Landing_Page_dark_mode.svg`
                }
              />
            </div>
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
    </div>
    // </Layout>
  );
}
