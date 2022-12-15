import React from "react";
import FaultCard, { FaultCardItem } from "./FaultCard";
import styles from "./ChaosFaults.module.scss";

/* Define the cards here */
const FaultCategories: FaultCardItem[] = [
  {
    title: "Kubernetes",
    description: <>Short description about this</>,
    faults: 31,
    category: "kubernetes",
  },
  {
    title: "Linux",
    description: <>Short description about this</>,
    faults: 31,
    category: "linux",
  },
  {
    title: "VMware",
    description: <>Achieve cost transparency and cut costs</>,
    faults: 14,
    category: "vmware",
  },
  {
    title: "AWS",
    description: <>Create SLOs. track error budgets, govern pipelines</>,
    faults: 35,
    category: "aws",
  },
  {
    title: "GCP",
    description: <>Scan your code, containers and apps</>,
    faults: 4,
    category: "gcp",
  },
  {
    title: "Azure",
    description: <>Ensure app and infrastructure resilience</>,
    faults: 7,
    category: "azure",
  },
  {
    title: "Kube-Resilience",
    description: <>Ensure app and infrastructure resilience</>,
    faults: 1,
    category: "kube-resilience",
  },
  {
    title: "Boutique Shop",
    description: <>Ensure app and infrastructure resilience</>,
    category: "boutique",
  },
];

export default function ChaosFaults() {
  return (
    <div className={styles.spaceBetween}>
      {FaultCategories.map((props, idx) => (
        <FaultCard key={idx} {...props} />
      ))}
    </div>
  );
}
