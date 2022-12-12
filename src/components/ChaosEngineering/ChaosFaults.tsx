import React from "react";
import clsx from "clsx";
import ChaosCard, { CardItem, docType } from "./ChaosCard";
import styles from "./ChaosEngineering.module.scss";
import moduleStyles from "./ChaosCard.module.scss";

/* Define the cards here */
const FeaturedList: CardItem[] = [
  {
    title: "Chaos Faults for Kubernetes",
    module: "ce",
    icon: "/img/icon_ce.svg",
    description: (
      <>
        Kubernetes faults disrupt the resources running on a Kubernetes cluster.
        They can be categorized into Pod-level faults and Node-level faults.
      </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "31",
    link: "/docs/chaos-engineering/chaos-faults/kubernetes/",
  },
  {
    title: "TypeScript and React Feature Flags",
    module: "ff",
    icon: "/img/icon_ff.svg",
    description:
      "Walks you through adding JavaScript Feature Flags to a TypeScript and React Application.",
    newDoc: true,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/manage-feature-flags/typescript-react-first-feature-flag",
  },
  {
    title: "Scan a NodeJS Application",
    module: "sto",
    icon: "/img/icon_sto.svg",
    description: (
      <>Scanning a NodeJS Application and prioritizing scan results.</>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/orchestrate-security-tests/nodejs-firstscan",
  },
  {
    title: "Onboard with Terraform",
    module: "platform",
    icon: "/img/logo.svg",
    description: (
      <>
        Automate lifecycle management of orgs, projects, services, environments,
        connectors and pipelines using the Harness Terraform Provider.
      </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "5 min",
    link: "/tutorials/platform/onboard-terraform-provider",
  },
];

export default function ChaosFaults() {
  return (
    <div className={clsx("container", moduleStyles.allFaults)}>
      <div className={styles.subSection}>
        {/* <h3>Featured Faults</h3> */}
        <ChaosCard FeatureList={FeaturedList} featuredCard={true} />
      </div>
    </div>
  );
}
