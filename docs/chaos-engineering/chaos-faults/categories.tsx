import React from "react";
import { FaultCardItem } from "@site/src/components/ChaosEngineering/FaultCard";
import { experiments as AwsExperiments } from "./aws/experiments";
import { experiments as AzureExperiments } from "./azure/experiments";
import { experiments as CloudFoundryExperiments } from "./cloud-foundry/experiments";
import { experiments as GcpExperiments } from "./gcp/experiments";
import { experiments as KubeResilienceExperiments } from "./kube-resilience/experiments";
import { experiments as KubernetesExperiments } from "./kubernetes/experiments";
import { experiments as LinuxExperiments } from "./linux/experiments";
import { experiments as SshExperiments } from "./ssh/experiments";
import { experiments as LoadExperiments } from "./load/experiments";
import { experiments as VMWareExperiments } from "./vmware/experiments";
import { experiments as WindowsExperiments } from "./windows/experiments";
import { experiments as BYOCExperiments } from "./byoc/experiments";

export const categories: FaultCardItem[] = [
  {
    title: "AWS",
    description: <>Chaos faults for AWS</>,
    faults: AwsExperiments.length,
    category: "aws",
  },
  {
    title: "Azure",
    description: <>Chaos faults for Azure </>,
    faults: AzureExperiments.length,
    category: "azure",
  },
  {
    title: "BYOC",
    description: <>Custom Chaos Faults</>,
    faults: BYOCExperiments.length,
    category: "byoc",
  },
  {
    title: "Cloud Foundry",
    description: <>Chaos faults for Cloud Foundry </>,
    faults: CloudFoundryExperiments.length,
    category: "cloud-foundry",
  },
  {
    title: "GCP",
    description: <>Chaos faults for GCP</>,
    faults: GcpExperiments.length,
    category: "gcp",
  },
  {
    title: "Kube-Resilience",
    description: <>Chaos faults for Kube-resilience </>,
    faults: KubeResilienceExperiments.length,
    category: "kube-resilience",
  },
  {
    title: "Kubernetes",
    description: <>Chaos faults for Kubernetes </>,
    faults: KubernetesExperiments.length,
    category: "kubernetes",
  },
  {
    title: "Linux",
    description: <>Chaos faults for Linux </>,
    faults: LinuxExperiments.length,
    category: "linux",
  },
  {
    title: "Load",
    description: <>Chaos faults for Load </>,
    faults: LoadExperiments.length,
    category: "load",
  },
  {
    title: "SSH",
    description: <>Chaos faults for SSH</>,
    faults: SshExperiments.length,
    category: "ssh",
  },
  {
    title: "VMware",
    description: <>Chaos faults for VMware</>,
    faults: VMWareExperiments.length,
    category: "vmware",
  },
  {
    title: "Windows",
    description: <>Chaos faults for Windows</>,
    faults: WindowsExperiments.length,
    category: "windows",
  },
];
