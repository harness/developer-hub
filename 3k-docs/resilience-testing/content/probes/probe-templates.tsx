import React from "react";
import { FaultCardItem } from "@site/src/components/ChaosEngineering/FaultCard";

export const probeTemplateCategories: FaultCardItem[] = [
  {
    title: "AWS",
    description: <>Command Probe templates for AWS</>,
    faults: 5,
    faultLabel: "templates",
    category: "aws-probes",
    link: "/docs/resilience-testing/chaos-testing/probes/probe-templates/aws",
  },
  {
    title: "GCP",
    description: <>Command Probe templates for GCP</>,
    faults: 3,
    faultLabel: "templates",
    category: "gcp-probes",
    link: "/docs/resilience-testing/chaos-testing/probes/probe-templates/gcp",
  },
  {
    title: "Kubernetes",
    description: <>Command Probe templates for Kubernetes</>,
    faults: 7,
    faultLabel: "templates",
    category: "kubernetes-probes",
    link: "/docs/resilience-testing/chaos-testing/probes/probe-templates/kubernetes",
  },
];
