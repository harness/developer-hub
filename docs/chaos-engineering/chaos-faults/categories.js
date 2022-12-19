import React from "react";

import { experiments as KubernetesExperiments } from "./kubernetes/experiments";
import { experiments as AwsExperiments } from "./aws/experiments";
import { experiments as AzureExperiments } from "./azure/experiments";

export const categories = [
  {
    title: "Kubernetes",
    description: <>Short description about this</>,
    faults: KubernetesExperiments.length,
    category: "kubernetes",
  },
  {
    title: "Linux",
    description: <>Short description about this</>,
    faults: 36,
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
    faults: AwsExperiments.length,
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
    faults: AzureExperiments.length,
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
