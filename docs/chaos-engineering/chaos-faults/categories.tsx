import React from "react";
import { FaultCardItem } from "@site/src/components/ChaosEngineering/FaultCard";
import { experiments as AwsExperiments } from "./aws/experiments";
import { experiments as AzureExperiments } from "./azure/experiments";
import { experiments as GcpExperiments } from "./gcp/experiments";
import { experiments as KubeResilienceExperiments } from "./kube-resilience/experiments";
import { experiments as KubernetesExperiments } from "./kubernetes/experiments";
import { experiments as VMWareExperiments } from "./vmware/experiments";

export const categories: FaultCardItem[] = [
  {
    title: "Kubernetes",
    description: <>Short description about this</>,
    faults: KubernetesExperiments.length,
    category: "kubernetes",
  },
  //{
  //  title: "Linux",
  //  description: <>Short description about this</>,
  //  faults: 36,
  //  category: "linux",
  //},
  {
    title: "VMware",
    description: <>Achieve cost transparency and cut costs</>,
    faults: VMWareExperiments.length,
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
    faults: GcpExperiments.length,
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
    faults: KubeResilienceExperiments.length,
    category: "kube-resilience",
  },
//  {
//   title: "Boutique Shop",
//    description: <>Ensure app and infrastructure resilience</>,
//    category: "boutique",
//  },
];
