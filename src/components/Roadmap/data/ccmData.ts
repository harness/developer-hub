import { Horizon } from "./roadmapData";

export const CcmData: Horizon = {
  Now: {
    description: "What is being delivered now",
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
    description: "What is being developed next",
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
    description: "What is being developed later",
    feature: [
      {
        tag: [{ value: "K8s" }, { value: "Security" }],
        title: "Sustainability",
        description: "Tracking carbon footprint impact of cloud consumptionr",
      },
      {
        tag: [{ value: "K8s" }, { value: "Security" }],
        title: "SaaS cost optimization ",
        description: "Optimize spend and utilization of SaaS tools beyond cloud providers",
      },
    ],
  },
};
