import { Horizon } from "./roadmapData";

export const CcmData: Horizon = {
  Now: {
    description: "Q1 2024, Feb-Apr 2024",
    feature: [
      {
        tag: [],
        title: "FinOps Workflows ",
        description: "Automated workflow to adopt FinOps practices and CCM features at scale",
      },
      {
        tag: [],
        title: "Cluster Orchestrator",
        description: "Workload-driven intelligent node autoscaling for EKS",
      },
      {
        tag: [],
        title: "Commitment Orchestrator",
        description: "Automated purchasing and management of AWS RIs and Savings to maximize savings",
      },
      {
        tag: [],
        title: "Asset Governance for GCP",
        description: "Cost management, security and compliance policies for GCP",
      },
    ],
  },
  Next: {
    description: "Q2 2024, May-Jul 2024",
    feature: [
      {
        tag: [],
        title: "Smart Advisor",
        description: "Easy management and progress tracking for AutoStopping candidates across cloud accounts and resources",
      },
      {
        tag: [],
        title: "Universal Cost Adaptor",
        description: "Unified way to ingest cost data from any external sources",
      },
      {
        tag: [],
        title: "Conversational FinOps",
        description: "Natural language prompts to query complex cloud cost analaytics and insights",
      },
    ],
  },
  Later: {
    description: "Q3 2024+, Aug 2024 & beyond",
    feature: [
      {
        tag: [{ value: "K8s" }, { value: "Security" }],
        title: "Sustainability",
        description: "Tracking carbon footprint impact of cloud consumption",
      },
      {
        tag: [{ value: "K8s" }, { value: "Security" }],
        title: "SaaS cost optimization ",
        description: "Optimize spend and utilization of SaaS tools beyond cloud providers",
      },
    ],
  },
};
