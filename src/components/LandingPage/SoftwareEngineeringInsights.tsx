import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";
import TutorialCard from "./TutorialCard";
import { FeaturedList, SEIList } from "./data/softwareEngineeringInsightsData";
import { useColorMode } from "@docusaurus/theme-common";
export default function SEI() {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.SectionName}>
        <h3>Create insights, setup your SEI profiles and configure reports.</h3>
      </div>
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img width={64} src={`${baseUrl}img/icon_sei.svg`} />
            <h1>Software Engineering Insights</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/docs/software-engineering-insights">
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
            <Link href="/release-notes/software-engineering-insights">
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
              Harness Software Engineering Insights (SEI) enables engineering
              leaders to make data-driven decisions that improve engineering
              productivity, efficiency, alignment, planning, and execution. It
              provides actionable insights into software delivery and workflows
              across teams, processes, and systems to improve software quality,
              enhance developer experience, and accelerate time to value.
            </p>
            <div className={styles.alignCenter}>
              <Link href="/docs/software-engineering-insights">
                <button
                  className={clsx(
                    "button button--lg",
                    styles.btn,
                    styles.btnSEI
                  )}
                >
                  Documentation <i className="fa-solid fa-arrow-right"></i>
                </button>
              </Link>
              <Link href="https://www.harness.io/blog/introducing-software-engineering-insights">
                <button className={styles.link}>Learn more</button>
              </Link>
            </div>
          </div>
          {/* <div>
            <img src={`${baseUrl}img/sei.svg`} />
          </div> */}
          <div className={styles.illustrationContainer}>
            <img
              className={styles.illustration}
              src={
                colorMode === "light"
                  ? `${baseUrl}img/sei.svg`
                  : `${baseUrl}img/SEI_Landing_Page_dark_mode.svg`
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
        <h3 id="all-tutorials">All SEI Tutorials</h3>
        <TutorialCard FeatureList={SEIList} />
      </div>
    </div>
    // </Layout>
  );
}
