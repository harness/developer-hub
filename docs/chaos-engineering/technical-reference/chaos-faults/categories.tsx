import React from "react";
import { FaultCardItem } from "@site/src/components/ChaosEngineering/FaultCard";
import { experiments as AwsExperiments } from "./aws/experiments";
import { experiments as AzureExperiments } from "./azure/experiments";
import { experiments as GcpExperiments } from "./gcp/experiments";
import { experiments as KubeResilienceExperiments } from "./kube-resilience/experiments";
import { experiments as KubernetesExperiments } from "./kubernetes/experiments";
import { experiments as VMWareExperiments } from "./vmware/experiments";
import { experiments as LoadExperiments } from "./load/experiments";
import { experiments as LinuxExperiments } from "./linux/experiments";

export const categories: FaultCardItem[] = [
  {
    title: "Kubernetes",
    description: <>Chaos faults for Kubernetes </>,
    faults: KubernetesExperiments.length,
    category: "kubernetes",
  },
  {
    title: "VMware",
    description: <>Chaos faults for VMware</>,
    faults: VMWareExperiments.length,
    category: "vmware",
  },
  {
    title: "AWS",
    description: <>Chaos faults for AWS</>,
    faults: AwsExperiments.length,
    category: "aws",
  },
  {
    title: "GCP",
    description: <>Chaos faults for GCP</>,
    faults: GcpExperiments.length,
    category: "gcp",
  },
  {
    title: "Azure",
    description: <>Chaos faults for Azure </>,
    faults: AzureExperiments.length,
    category: "azure",
  },
  {
    title: "Kube-Resilience",
    description: <>Chaos faults for Kube-resilience </>,
    faults: KubeResilienceExperiments.length,
    category: "kube-resilience",
  },
  {
    title: "Load",
    description: <>Chaos faults for Load </>,
    faults: LoadExperiments.length,
    category: "load",
  },
  {
    title: "Linux",
    description: <>Build production ready and resilient applications. </>,
    faults: LinuxExperiments.length,
    category: "linux",
  },
  {
    title: "Security chaos",
    description: <>Chaos faults for security CIS </>,
    faults: LoadExperiments.length,
    category: "security-chaos",
  },
];
