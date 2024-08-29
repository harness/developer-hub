import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import styles from "./styles.module.scss";
import { TutorialCards } from "../LandingPage/TutorialCard";
// Define the cards in "***Data.ts"
import { docsCards } from "./data/iacmData";
import { useColorMode } from "@docusaurus/theme-common";

export default function Iacm() {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img width={64} src={`${baseUrl}img/iacm-icon.svg`} />
            <h1>Infrastructure as Code Management</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/release-notes/infrastructure-as-code-management">
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
              Harness Infrastructure as Code allows you to define, deploy, and
              manage infrastructure across environments, ensuring compliance and
              control. Key features include cost estimation, approval steps, PR
              automation, policy enforcement, and drift detection, which can
              integrate seamlessly with other Harness modules and third-party
              services, enhancing your DevOps lifecycle.
            </p>
            <div className={styles.illustrationContainer}>
              <img
                className={styles.illustration}
                src={
                  colorMode === "light"
                    ? `${baseUrl}img/iacm_landing.png`
                    : `${baseUrl}img/iacm_landing dark.png`
                }
              />
            </div>
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
    </div>
  );
}
