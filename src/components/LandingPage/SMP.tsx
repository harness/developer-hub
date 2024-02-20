import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";
import TutorialCard from "./TutorialCard";
import { SMPList } from "./data/smpData";
import { useColorMode } from "@docusaurus/theme-common";
export default function SMP() {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      {/* <img src="/img/cd.svg" /> */}
      <div className={styles.SectionName}>
        <h3>Administer Harness Self-Managed Enterprise Edition</h3>
      </div>
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img
              src={`${baseUrl}img/icon_harness.svg`}
              alt="Harness Self-Managed Enterprise Edition"
            />
            <h1>Harness Self-Managed Enterprise Edition</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/docs/self-managed-enterprise-edition">
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

            <Link href="/release-notes/self-managed-enterprise-edition">
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
              Harness Self-Managed Enterprise Edition is designed to assist
              developers and DevOps teams in delivering software with maximum
              speed, quality, security, reliability, and resilience at the
              lowest possible cost. It helps you stay within the governance
              boundaries required to achieve organizational objectives.
            </p>
            <div className={styles.alignCenter}>
              <Link href="/docs/self-managed-enterprise-edition">
                <button
                  className={clsx(
                    "button button--lg",
                    styles.btn,
                    styles.btnCI
                  )}
                >
                  Documentation <i className="fa-solid fa-arrow-right"></i>
                </button>
              </Link>
              <Link href="https://harness.io/products/platform">
                <button className={styles.link}>Learn more</button>
              </Link>
            </div>
          </div>
          <div className={styles.illustrationContainer}>
            <img
              className={styles.illustration}
              src={
                colorMode === "light"
                  ? `${baseUrl}img/platform.svg`
                  : `${baseUrl}img/Harness_Platform_dark_mode.svg`
              }
            />
          </div>
        </div>
      </div>
      <div className={styles.subSection}>
        <h3 id="all-tutorials">
          All Self-Managed Enterprise Edition Tutorials
        </h3>
        <TutorialCard FeatureList={SMPList} />
      </div>
    </div>
    // </Layout>
  );
}
