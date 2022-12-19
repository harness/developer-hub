import React from "react";
// import Link from "@docusaurus/Link";
// import clsx from "clsx";
// import Tooltip from "rc-tooltip";
// import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import TutorialCard, { CardItem, docType } from "./TutorialCard";
import "rc-tooltip/assets/bootstrap.css";
import styles from "./styles.module.scss";
// import moduleStyles from "./TutorialCard.module.scss";

/* Define the cards here */
const FeaturedList: CardItem[] = [
  {
    title: "Build & Test Code",
    module: "ci",
    icon: "img/icon_ci.svg",
    description: <>Create a CI build pipeline</>,
    type: [docType.Documentation, docType.Interactive, docType.Video],
    link: "/tutorials/build-code",
  },
  {
    title: "Deploy Services",
    module: "cd",
    icon: "img/icon_cd.svg",
    description: <>Create a CD deployment</>,
    type: [docType.Documentation, docType.Interactive, docType.Video],
    link: "/tutorials/deploy-services",
  },
  {
    title: "Manage Feature Flags",
    module: "ff",
    icon: "img/icon_ff.svg",
    description: <>Rollout new features progressively</>,
    type: [docType.Documentation, docType.Interactive],
    link: "/tutorials/manage-feature-flags",
  },
  {
    title: "Optimize Cloud Costs",
    module: "ccm",
    icon: "img/icon_ccm.svg",
    description: <>Achieve cost transparency and cut costs</>,
    type: [docType.Documentation, docType.Interactive, docType.Video],
    link: "/tutorials/manage-cloud-costs",
  },
  {
    title: "Manage SLOs",
    module: "srm",
    icon: "img/icon_srm.svg",
    description: <>Create SLOs. track error budgets, govern pipelines</>,
    type: [docType.Documentation, docType.Interactive, docType.Video],
    link: "/tutorials/manage-service-reliability",
  },
  {
    title: "Orchestrate Security Testings",
    module: "sto",
    icon: "img/icon_sto.svg",
    description: <>Scan your code, containers and apps</>,
    type: [docType.Documentation, docType.Interactive, docType.Video],
    link: "/tutorials/orchestrate-security-tests",
  },
  {
    title: "Run Chaos Experiments",
    module: "ce",
    icon: "img/icon_ce.svg",
    description: <>Ensure app and infrastructure resilience</>,
    type: [docType.Documentation, docType.Interactive],
    link: "/tutorials/run-chaos-experiments",
  },
];

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
