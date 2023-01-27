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
    description: <>Build production ready and resilient applications. </>,
    faults: KubernetesExperiments.length,
    category: "kubernetes",
  },
  {
    title: "VMware",
    description: <>Achieve cost transparency and cut costs</>,
    faults: VMWareExperiments.length,
    category: "vmware",
  },
  {
    title: "AWS",
    description: <>Create SLOs, track error budgets, and govern pipelines. </>,
    faults: AwsExperiments.length,
    category: "aws",
  },
  {
    title: "GCP",
    description: <>Scan your code, containers and applications.</>,
    faults: GcpExperiments.length,
    category: "gcp",
  },
  {
    title: "Azure",
    description: <>Ensure application and infrastructure resilience. </>,
    faults: AzureExperiments.length,
    category: "azure",
  },
  {
    title: "Kube-Resilience",
    description: <>Ensure application and infrastructure resilience. </>,
    faults: KubeResilienceExperiments.length,
    category: "kube-resilience",
  },
];
