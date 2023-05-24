import React from "react";
// import Link from "@docusaurus/Link";
// import clsx from "clsx";
// import Tooltip from "rc-tooltip";
// import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import TutorialCard from "./TutorialCard";
import { FeaturedList } from "./data/getStartedData";
import "rc-tooltip/assets/bootstrap.css";
import styles from "./styles.module.scss";

export default function GetStarted() {
  // const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.getStarted}>
        {/* <h1>Get Started</h1> */}
        <p>
          Learn intelligent software delivery skills with step-by-step
          tutorials, interactive labs, videos and reference docs.
        </p>
      </div>
      <TutorialCard FeatureList={FeaturedList} />
    </div>
  );
}
