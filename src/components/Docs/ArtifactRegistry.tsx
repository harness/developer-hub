import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./styles.module.scss";
import TutorialCard, { TutorialCards } from "../LandingPage/TutorialCard";
// Define the cards in "***Data.ts"
import { docsCards } from "./data/artifactRegistryData";
import { useColorMode } from "@docusaurus/theme-common";
export default function AR() {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img width={64} src={`${baseUrl}img/icon_artifact_registry.svg`} />
            <h1>Artifact Registry (BETA)</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/kb">
              <button className={styles.btn}>
                <img src={`${baseUrl}img/icon_tutorials.svg`} />
                Knowledge Base
              </button>
            </Link>
            <Link href="/release-notes/artifact-registry">
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
            Harness Artifact Registry (AR) is a universal hub for all your artifacts, regardless of type. By centralizing artifact management in one secure location, we're streamlining the process of handling multiple registries across various platforms and tools. 
            </p>
            <div className={styles.illustrationContainer}>
              {/* <img
                className={styles.illustration}
                src={
                  colorMode === "light"
                    ? `${baseUrl}img/cde_illustration.svg`
                    : `${baseUrl}img/cde_illustration_dark.svg`
                }
              />{" "} */}
            </div>
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
    </div>
    // </Layout>
  );
}
