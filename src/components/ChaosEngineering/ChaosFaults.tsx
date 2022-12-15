import React from "react";
import FaultCard, { FaultCardItem } from "./FaultCard";
import styles from "./ChaosFaults.module.scss";

/* Define the cards here */
const FaultCategories: FaultCardItem[] = [
  {
    title: "Kubernetes",
    icon: "/img/chaosfaults/k8s.svg",
    description: <>Short description about this</>,
    faults: 31,
    link: "#",
  },
  {
    title: "Linux",
    icon: "/img/chaosfaults/linux.svg",
    description: <>Short description about this</>,
    faults: 31,
    link: "#",
  },
  {
    title: "VMware",
    icon: "/img/chaosfaults/vmware.svg",
    description: <>Achieve cost transparency and cut costs</>,
    faults: 14,
    link: "#",
  },
  {
    title: "AWS",
    icon: "/img/chaosfaults/aws.svg",
    description: <>Create SLOs. track error budgets, govern pipelines</>,
    faults: 35,
    link: "#",
  },
  {
    title: "GCP",
    icon: "/img/chaosfaults/gcp.svg",
    description: <>Scan your code, containers and apps</>,
    faults: 4,
    link: "#",
  },
  {
    title: "Azure",
    icon: "/img/chaosfaults/azure.svg",
    description: <>Ensure app and infrastructure resilience</>,
    faults: 7,
    link: "#",
  },
  {
    title: "Kube-Resilience",
    icon: "/img/chaosfaults/kube_resilience.svg",
    description: <>Ensure app and infrastructure resilience</>,
    faults: 1,
    link: "#",
  },
  {
    title: "Boutique Shop",
    icon: "/img/chaosfaults/boutique.svg",
    description: <>Ensure app and infrastructure resilience</>,
    link: "#",
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
