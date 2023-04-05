import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import TutorialCard from "./TutorialCard";
import {
  FeaturedList,
  CIList,
  CDList,
  CCMList,
  FFList,
  SRMList,
  STOList,
  CEList,
  PlatformList,
} from "./data/allTutorialsData";
import styles from "./styles.module.scss";
import moduleStyles from "./TutorialCard.module.scss";

export default function AllTutorials() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    // <Layout title="All Tutorials" description="All Tutorials">
    //   <ul className={styles.breadCrumb}>
    //     <li>Get Started</li>
    //     <li>All Tutorials</li>
    //   </ul>
    <div className={clsx("container", moduleStyles.allTutorials)}>
      <div className={styles.topSection}>
        <h1>All Tutorials</h1>
        <p>
          Learn intelligent software delivery skills with step-by-step
          tutorials, interactive labs, videos and reference docs.
        </p>
      </div>
      <div className={styles.subSection}>
        <h3>Featured Tutorials</h3>
        <TutorialCard FeatureList={FeaturedList} featuredCard={true} />
      </div>
      <div className={styles.subSection}>
        <div className={styles.SectionName}>
          <img src={`${baseUrl}img/icon_ci.svg`} />
          <h3>Build & Test Code</h3>
        </div>
        <TutorialCard FeatureList={CIList} />
      </div>
      <div className={styles.subSection}>
        <div className={styles.SectionName}>
          <img src={`${baseUrl}img/icon_cd.svg`} />
          <h3>Deploy Services</h3>
        </div>
        <TutorialCard FeatureList={CDList} />
      </div>
      <div className={styles.subSection}>
        <div className={styles.SectionName}>
          <img src={`${baseUrl}img/icon_ff.svg`} />
          <h3>Manage Feature Flags</h3>
        </div>
        <TutorialCard FeatureList={FFList} />
      </div>
      <div className={styles.subSection}>
        <div className={styles.SectionName}>
          <img src={`${baseUrl}img/icon_ccm.svg`} />
          <h3>Optimize Cloud Costs</h3>
        </div>
        <TutorialCard FeatureList={CCMList} />
      </div>
      <div className={styles.subSection}>
        <div className={styles.SectionName}>
          <img src={`${baseUrl}img/icon_srm.svg`} />
          <h3>Manage Service Reliability</h3>
        </div>
        <TutorialCard FeatureList={SRMList} />
      </div>
      <div className={styles.subSection}>
        <div className={styles.SectionName}>
          <img src={`${baseUrl}img/icon_sto.svg`} />
          <h3>Orchestrate Security Tests</h3>
        </div>
        <TutorialCard FeatureList={STOList} />
      </div>
      <div className={styles.subSection}>
        <div className={styles.SectionName}>
          <img src={`${baseUrl}img/icon_ce.svg`} />
          <h3>Run Chaos Experiments</h3>
        </div>
        <TutorialCard FeatureList={CEList} />
      </div>
      <div className={styles.subSection}>
        <div className={styles.SectionName}>
          <img src={`${baseUrl}img/logo.svg`} />
          <h3>Administer Harness Platform</h3>
        </div>
        <TutorialCard FeatureList={PlatformList} />
      </div>
    </div>
    // </Layout>
  );
}