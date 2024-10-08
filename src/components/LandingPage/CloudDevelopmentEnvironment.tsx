import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";
import TutorialCard from "./TutorialCard";
import {
  FeaturedList,
  // DroneList,
  CDEList,
} from "./data/cloudDevelopmentEnvironmentData.ts";
import { useColorMode } from "@docusaurus/theme-common";
export default function CDE() {
  const { colorMode } = useColorMode();

  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.SectionName}>
        <h3>
        Create Cloud Development Environments, which are pre-configured, and can be used for seamless development experience by developers. 
        </h3>
      </div>
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img width={64} src={`${baseUrl}img/cde_illustration.svg`} />
            <h1>Cloud Development Environments (BETA)</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/docs/cloud-development-environment">
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
            <Link href="/release-notes/cloud-development-environment">
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
            Harness CDEs are Development Environments, which are preconfigured, remote, ready-to-use  environments that developers can quickly spin up from anywhere and start writing code, debugging, and collaborating with other developers.
            </p>
            <div className={styles.alignCenter}>
              <Link href="/docs/cloud-development-environment">
                <button
                  className={clsx(
                    "button button--lg",
                    styles.btn,
                    styles.btnIDP
                  )}
                >
                  Documentation <i className="fa-solid fa-arrow-right"></i>
                </button>
              </Link>
              <Link href="https://www.harness.io/blog/introducing-harness-internal-developer-portal-beta-release">
                <button className={styles.link}>Learn more</button>
              </Link>
            </div>
          </div>

          <div className={styles.illustrationContainer}>
            <img
              className={styles.illustration}
              src={
                colorMode === "light"
                  ? `${baseUrl}img/cde_illustration.svg`
                  : `${baseUrl}img/cde_illustration_dark.svg.svg`
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
        {/*
        <h3>
          Drone Tutorials
        </h3>
        <TutorialCard FeatureList={DroneList} />
        */}
        <h3 id="all-tutorials">All CDE Tutorials</h3>
        <TutorialCard FeatureList={CDEList} />
      </div>
    </div>
    // </Layout>
  );
}
