import React from "react";
import { DrillCategory } from "@site/src/components/ChaosEngineering/EnterpriseHubExplorer";

import { experiments as awsFaults } from "../../../chaos-engineering/faults/chaos-faults/aws/experiments";
import { experiments as azureFaults } from "../../../chaos-engineering/faults/chaos-faults/azure/experiments";
import { experiments as cloudFoundryFaults } from "../../../chaos-engineering/faults/chaos-faults/cloud-foundry/experiments";
import { experiments as gcpFaults } from "../../../chaos-engineering/faults/chaos-faults/gcp/experiments";
import { experiments as kubeResilienceFaults } from "../../../chaos-engineering/faults/chaos-faults/kube-resilience/experiments";
import { experiments as kubernetesFaults } from "../../../chaos-engineering/faults/chaos-faults/kubernetes/experiments";
import { experiments as linuxFaults } from "../../../chaos-engineering/faults/chaos-faults/linux/experiments";
import { experiments as loadFaults } from "../../../chaos-engineering/faults/chaos-faults/load/experiments";
import { experiments as sshFaults } from "../../../chaos-engineering/faults/chaos-faults/ssh/experiments";
import { experiments as vmwareFaults } from "../../../chaos-engineering/faults/chaos-faults/vmware/experiments";
import { experiments as windowsFaults } from "../../../chaos-engineering/faults/chaos-faults/windows/experiments";

import { awsProbeTemplates } from "../probes/probe-templates/aws/templates";
import { gcpProbeTemplates } from "../probes/probe-templates/gcp/templates";
import { kubernetesProbeTemplates } from "../probes/probe-templates/kubernetes/templates";

import { customScriptActionTemplates } from "../actions/action-templates/custom-script/templates";

const FAULTS = "/docs/chaos-engineering/faults/chaos-faults";
const PROBES = "/docs/resilience-testing/chaos-testing/probes/probe-templates";
const ACTIONS = "/docs/resilience-testing/chaos-testing/actions/action-templates";

export const faultTemplateDrill: DrillCategory[] = [
  { title: "AWS", category: "aws", description: <>Fault templates for AWS</>, items: awsFaults, itemLinkBase: `${FAULTS}/aws/`, itemLabel: "faults" },
  { title: "Azure", category: "azure", description: <>Fault templates for Azure</>, items: azureFaults, itemLinkBase: `${FAULTS}/azure/`, itemLabel: "faults" },
  { title: "Cloud Foundry", category: "cloud-foundry", description: <>Fault templates for Cloud Foundry</>, items: cloudFoundryFaults, itemLinkBase: `${FAULTS}/cloud-foundry/`, itemLabel: "faults" },
  { title: "GCP", category: "gcp", description: <>Fault templates for GCP</>, items: gcpFaults, itemLinkBase: `${FAULTS}/gcp/`, itemLabel: "faults" },
  { title: "Kube-Resilience", category: "kube-resilience", description: <>Fault templates for Kube-Resilience</>, items: kubeResilienceFaults, itemLinkBase: `${FAULTS}/kube-resilience/`, itemLabel: "faults" },
  { title: "Kubernetes", category: "kubernetes", description: <>Fault templates for Kubernetes</>, items: kubernetesFaults, itemLinkBase: `${FAULTS}/kubernetes/`, itemLabel: "faults" },
  { title: "Linux", category: "linux", description: <>Fault templates for Linux</>, items: linuxFaults, itemLinkBase: `${FAULTS}/linux/`, itemLabel: "faults" },
  { title: "Load", category: "load", description: <>Fault templates for Load</>, items: loadFaults, itemLinkBase: `${FAULTS}/load/`, itemLabel: "faults" },
  { title: "SSH", category: "ssh", description: <>Fault templates for SSH</>, items: sshFaults, itemLinkBase: `${FAULTS}/ssh/`, itemLabel: "faults" },
  { title: "VMware", category: "vmware", description: <>Fault templates for VMware</>, items: vmwareFaults, itemLinkBase: `${FAULTS}/vmware/`, itemLabel: "faults" },
  { title: "Windows", category: "windows", description: <>Fault templates for Windows</>, items: windowsFaults, itemLinkBase: `${FAULTS}/windows/`, itemLabel: "faults" },
];

export const probeTemplateDrill: DrillCategory[] = [
  { title: "AWS", category: "aws-probes", description: <>Probe templates for AWS</>, items: awsProbeTemplates, itemLinkBase: `${PROBES}/aws`, itemLabel: "templates" },
  { title: "GCP", category: "gcp-probes", description: <>Probe templates for GCP</>, items: gcpProbeTemplates, itemLinkBase: `${PROBES}/gcp`, itemLabel: "templates" },
  { title: "Kubernetes", category: "kubernetes-probes", description: <>Probe templates for Kubernetes</>, items: kubernetesProbeTemplates, itemLinkBase: `${PROBES}/kubernetes`, itemLabel: "templates" },
];

export const actionTemplateDrill: DrillCategory[] = [
  { title: "Custom Script", category: "custom-script-actions", description: <>Action templates for custom script execution</>, items: customScriptActionTemplates, itemLinkBase: `${ACTIONS}/custom-script`, itemLabel: "templates" },
];
