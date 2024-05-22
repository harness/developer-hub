import { Horizon } from "./roadmapData";

export const CcmData: Horizon = {
  Now: {
    description: "Q2 2024, May-Jul 2024",
    feature: [
      {
        tag: [],
        title: "Cluster Orchestrator for EKS",
        description: "Simplify EKS cluster management with workload-driven intelligent node autoscaling with distributed spot orchestration.",
      },
      {
        tag: [],
        title: "Cloud Asset Governance for GCP",
        description: "FinOps-as-code policies for GCP with out-of-the-box recommendations.",
      },
      {
        tag: [],
        title: "Commitment Orchestrator for AWS (EC2)",
        description: "Automated purchasing and management of commitments to maximize savings, compute coverage, and utilization. Support for EC2 instances.",
      },
      {
        tag: [],
        title: "Cost Anomaly Workflows",
        description: "Fine-tune cost anomaly detection with an ignore list, added support for comments, and integrations with popular ticketing systems (JIRA, ServiceNow).",
      },
    ],
  },
  Next: {
    description: "Q3 2024, Aug-Oct 2024",
    feature: [
      {
        tag: [],
        title: "Cloud Asset Governance - IaCM Integration ",
        description: "Shift left FinOps-as-code guardrails to prevent leaks at the point of infrastructure provisioning.",
      },
      {
        tag: [],
        title: "Commitment Orchestrator for AWS (RDS)",
        description: "Automated purchasing and management of commitments to maximize savings, compute coverage, and utilization. Added support for RDS.",
      },
      {
        tag: [],
        title: "Universal Cost Adaptor for External Data Ingestion",
        description: "Consolidate cost data from any external sources into a single platform for unified cost management.",
      },
      {
        tag: [],
        title: "Workload Bin-packing for EKS Cluster Orchestrator",
        description: "Efficient scheduling and placement of containers onto nodes for optimizing node count and utilization.",
      },
      {
        tag: [],
        title: "Cost Category Enhancements",
        description: "Faster cost analysis with 2x query speeds and added support to leverage cost categories across all CCM features: Recommendations, Asset Governance, and Budgets.",
      },
    ],
  },
  Later: {
    description: "Q4 2024 & beyond",
    feature: [
      {
        tag: [],
        title: "FinOps Workflows  ",
        description: "Automated workflow to adopt FinOps practices and CCM features at scale",
      },
      {
        tag: [],
        title: "AutoStopping Enforcement",
        description: "Ensure that all target resources have Cloud AutoStopping rules in place for automatic cost savings during idle periods.",
      },
      {
        tag: [],
        title: "Cloud Asset Governance - Security & Compliance",
        description: "Support for CSPM and compliance policy packs such as CIS, GDPR etc.",
      },
      {
        tag: [],
        title: "Smart Advisor for AutoStopping",
        description: "Identify and target short-lived non-production cloud accounts and clusters to track savings potential and progress made",
      },
    ],
  },
};

