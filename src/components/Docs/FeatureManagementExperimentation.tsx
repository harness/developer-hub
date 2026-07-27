import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useLocation } from "@docusaurus/router";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./styles.module.scss";
import TutorialCard, { TutorialCards } from "../TutorialCard/TutorialCard";
// Define the cards in "***Data.ts"
import { docsCards } from "./data/featureManagementExperimentationData";
import FmeOnboardingIllustration from "./illustrations/FmeOnboardingIllustration";

import { useColorMode } from "@docusaurus/theme-common";
export default function FME() {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  const { pathname } = useLocation();
  // The animated onboarding illustration is a 3k-docs-only experiment for
  // now; /docs keeps the original static illustration.
  const is3kDocs = pathname.startsWith("/3k-docs");
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_fme.svg`} />
            <h1>Feature Management & Experimentation</h1>
          </div>
        </div>
        <div className={styles.spaceBetween}>
          <div className={styles.content}>
            <p>
              Harness Feature Management & Experimentation (FME) is a feature management platform that helps you manage feature releases, monitor performance, and run experiments for data-driven development.
            </p>
            <div className={styles.illustrationContainer}>
              {is3kDocs ? (
                <FmeOnboardingIllustration />
              ) : (
                <img
                  className={styles.illustration}
                  src={
                    colorMode === "light"
                      ? `${baseUrl}img/fme-docs-main-light-mode.svg`
                      : `${baseUrl}img/fme-docs-main-dark-mode.svg`
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <TutorialCards data={docsCards} sectionClass={styles.subSection} />
    </div>
    // </Layout>
  );
}
