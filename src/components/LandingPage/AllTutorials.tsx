import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import TutorialCard from "./TutorialCard";
import { FeaturedList } from "./data/allTutorialsData";
import { CIList } from "./data/continuousIntegrationData";
import { CDList } from "./data/continuousDeliveryData";
import { CCMList } from "./data/cloudCostManagementData";
import { FFList } from "./data/featureFlagsData";
import { SRMList } from "./data/serviceReliabilityManagementData";
import { STOList } from "./data/securityTestingOrchestrationData";
import { CEList } from "./data/chaosEngineeringData";
import { PlatformList } from "./data/platformData";
import { CETList } from "./data/continuousErrorTrackingData";
import { IDPList } from "./data/internalDeveloperPortalData";
import { SMPList } from "./data/smpData";
import styles from "./styles.module.scss";
import cardStyles from "./TutorialCard.module.scss";

export default function AllTutorials() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    // <Layout title="All Tutorials" description="All Tutorials">
    //   <ul className={styles.breadCrumb}>
    //     <li>Get Started</li>
    //     <li>All Tutorials</li>
    //   </ul>
    <div className={clsx("container", cardStyles.allTutorials)}>
      <div className={styles.topSection}>
        <h1>All Tutorials</h1>
        <p>
          Learn intelligent software delivery skills with step-by-step
          tutorials, interactive labs, videos and reference docs.
        </p>
      </div>
      <div className={styles.subSection}>
        <h3>All Featured Tutorials</h3>
        <TutorialCard FeatureList={FeaturedList} featuredCard={true} />
      </div>
      <div className={styles.subSection}>
        <div className={styles.SectionName}>
          <img src={`${baseUrl}img/icon_ci.svg`} />
          <h3>Set up CI Pipelines</h3>
        </div>
        <TutorialCard FeatureList={CIList} />
      </div>
      <div className={styles.subSection}>
        <div className={styles.SectionName}>
          <img src={`${baseUrl}img/icon_cd.svg`} />
          <h3>Set up CD Pipelines</h3>
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
          <img src={`${baseUrl}img/icon_cet.svg`} />
          <h3>Track Errors</h3>
        </div>
        <TutorialCard FeatureList={CETList} />
      </div>
      <div className={styles.subSection}>
        <div className={styles.SectionName}>
          <img src={`${baseUrl}img/icon_idp.svg`} />
          <h3>Manage Developer Portal</h3>
        </div>
        <TutorialCard FeatureList={IDPList} />
      </div>
      <div className={styles.subSection}>
        <div className={styles.SectionName}>
          <img src={`${baseUrl}img/logo.svg`} />
          <h3>Administer Harness Platform</h3>
        </div>
        <TutorialCard FeatureList={PlatformList} />
      </div>
      <div className={styles.subSection}>
        <div className={styles.SectionName}>
          <img src={`${baseUrl}img/logo.svg`} />
          <h3>Administer Harness Self-Managed Enterprise Edition</h3>
        </div>
        <TutorialCard FeatureList={SMPList} />
      </div>
    </div>
    // </Layout>
  );
}
