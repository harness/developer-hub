import { Horizon } from "./roadmapData";
import type { ModuleTheme } from "./roadmapPalette";

export const ccmModuleTheme: ModuleTheme = {
  moduleKey: "ccm",
  moduleTitle: "Cloud & AI Cost Management",
  palette: {
    light: { bg: "#01C9CC", text: "#ECFFFF" },
    dark: { bg: "#0D3D3E", text: "#7ED9DB" },
  },
};

export const CcmData: Horizon = {
  Released: {
    description: "What has been released",
    feature: [
      // Q3 CY'26 - added from planning sheet
      {
        tag: [{value: "Cost Visibility"}],
        title: "AI-assisted Report creation",
        description: "AI-powered creation of Perspectives/Views including discovery of relevant cost categories, labels, tags, and rule creation.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Cost Visibility"}],
        title: "AI-assisted Unit Costs creation",
        description: "AI-powered creation of unit cost definitions including discovery of relevant unit metrics.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Cost Visibility"}],
        title: "AI-assisted Cost Insights",
        description: "AI-powered cost insights and analysis on cloud spend, top spenders, trends, etc across cloud and AI spend.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Cost Visibility"}],
        title: "AI-assisted Commitment analysis",
        description: "AI-powered analysis on commitment portfolio, savings, coverage, utilization and optimization opportunities.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Cost Visibility"}],
        title: "AI-assisted Cost Categories creation",
        description: "AI-powered creation of Cost Categories including discovery of relevant labels and tags, and rule creation.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "AI Cost Management"}],
        title: "AI Traces for Cost Management",
        description: "Granular AI Traces for cost management at the agent, service, session, model, run and request level.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "AI Cost Management"}],
        title: "Additional AI Cost Connectors for Cursor, GitHub Co-pilot, Claude Desktop",
        description: "Additional AI Cost connectors for cost management of Cursor, GitHub Co-pilot, Claude Desktop.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Anomaly FinOps AI Assistant",
        description: "AI-powered insights to help FinOps teams analyze anomalies and notify the right stakeholders.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Whitelisting of RI, SP, Services for anomalies",
        description: "Whitelisting of Reserved Instances, Savings Plans, and Services to exclude them while generating anomalies.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Capture Recommendations Savings in Jira and Snow",
        description: "Capture recommendations savings in Jira and ServiceNow for tracking and reporting.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Commitment Orchestrator for RDS GA",
        description: "General Availability of Commitment Orchestrator for Amazon RDS, enabling better cost-efficiency through commitment management for database services.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "AWS Savings Plan Database Discovery/Support",
        description: "Discovery and support for AWS Savings Plans for RDS and ElastiCache databases.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Cost Visibility"}],
        title: "CACM Overview Page Revamp",
        description: "Revamp of the CACM Overview page.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Cost Visibility"}],
        title: "Unit Cost Economics",
        description: "Unit Cost Economics to track cost per outcome and other complex unit cost definitions, including ingestion of custom unit metrics.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Cost Visibility"}],
        title: "Data Ingestion Status Update",
        description: "Introduces a centralized Data Jobs Status section and real-time notifications for active data jobs, third-party outages, and widget-specific alerts across ingestion, Cost Category backfills, PDT updates, and external issues impacting Harness CACM.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "AI Cost Management"}],
        title: "AI Cost Management",
        description: "One attribution model for AI costs. Production AI maps to session and interaction, developer AI maps to PR, commit, and ticket, and both roll up into unit costs.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Cost Visibility"}],
        title: "Unit Economics",
        description: "Track cost per customer, transaction, or feature so finance, product, and engineering can tie spend to business outcomes.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Commitment Orchestrator Expanded Support",
        description: "Automatically purchase, renew, exchange, and rebalance RIs and SPs as usage shifts, now with extended support for RDS, ElastiCache, and OpenSearch.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Auto-Inference of Savings",
        description: "Auto-inference of savings (partially realized) in Recommendations.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Budget perspective decouple",
        description: "Decoupling budget perspectives with cost category support.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "AWS Passthrough recommendations support with Cost Optimization Hub (EC2, EBS, RDS)",
        description: "Increases the scope of Recommendations across all major AWS resource types, giving you a complete view of savings opportunities in your cloud environment. ",
        backgroundColor: "var(--green-100)",
      },
      // January 2025 Releases
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Anomaly Lookback Support",
        description: "[Released: February 2026] Anomaly lookback support to detect anomalies based on historical data.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Anomaly Detection v2 (GA)",
        description:
          "[Released: January 2026] Enhanced anomaly detection capabilities with drill-down analysis. Includes support for cost category anomalies, customizable workflows, and preferences for setting percentage deviations and minimum cost thresholds.",
        backgroundColor: "var(--green-100)",
        link: "https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-reporting/anomaly-detection/getting-started-with-ccm-anomaly-detection"
      },
      {
        tag: [{value: "AutoStopping"}],
        title: "AutoStopping Alerts",
        description:
          "[Released: January 2026] Configure notifications for critical events related to your AutoStopping rules.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Auto-Inference of Savings",
        description: "[Released: December 2025] Auto-inference of savings (fully realized) in Recommendations.",
        backgroundColor: "var(--green-100)",
        link:"https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-optimization/ccm-recommendations/home-recommendations#auto-inferences"
      },
            // December 2025 Releases
      
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Nodepools and Nodeclasses Configuration via Harness UI",
        description:
          "[Released: December 2026] UI-based configuration management for Nodepools and Nodeclasses.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Cost Visibility"}],
        title: "Cost Category Enhancements",
        description:
          "[Released: December 2025] Performance improvements - 2x Query speeds, Support to leverage cost categories across all CACM features: Recommendations, Asset Governance, Budgets",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Cluster Orchestrator for EKS",
        description:
          "[Released: December 2025] Workload-driven intelligent node autoscaling with distributed spot orchestration",
        backgroundColor: "var(--green-100)",
        link:"https://developer.harness.io/release-notes/cloud-cost-management#december-2025---cluster-orchestrator-release---070"
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Tags support for Recommendations ",
        description:
          "[Released: October 2025] Tags are supported for recommendations and filtering is allowed.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Asset Governance" }],
        title: "FInOps AI assistant (Beta)",
        description:
          "[Released: December 2025] The FinOps AI Assistant leverages generative AI to automate the creation and enforcement of cloud governance policies, enabling faster cloud optimization. ",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)" }],
        title: " Bulk Management and Filtering in Budgets",
        description:
          "[Released: October 2025] Select and modify multiple budgets simultaneously, adjust budget amounts by percentage or fixed value, manage alerts across multiple budgets (add/remove recipients, delete alerts), clone budgets with customizable options for thresholds and recipients",
        backgroundColor:"var(--green-100)",
        link: "https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-governance/ccm-budgets/create-a-budget#budgets-overview-page"
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)" }],
        title: "Ticketing Tool Mapping",
        description:
          "[Released: October 2025] Ticketing Tool Mapping for Recommendations",
        backgroundColor:"var(--green-100)",
        link: "https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-optimization/ccm-recommendations/home-recommendations#aws"
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)" }],
        title: " Budget Folders",
        description:
          "[Released: October 2025] Budget Folders to improve usability and streamline budget management. Budgets are now automatically associated with the Perspective folder under which they were created. This provides a consistent folder structure across both Perspectives and Budgets.",
        backgroundColor: "var(--green-100)",
        link: "https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-governance/ccm-budgets/create-a-budget#budgets-overview-page"
      },
      {
        tag: [{value: "Cost Visibility" }],
        title: "Dynamic Cost Categories Toggle in Perspectives",
        description:
          "[Released: September 2025] Dynamic Cost Categories Toggle in Perspectives",
        backgroundColor: "var(--green-100)",
        link: "https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/key-concepts#dynamic-cost-categories-toggle"
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)" }],
        title: " Jira Status Mapping in Recommendations",
        description:
          "[Released: August 2025] Jira Status Mapping in Recommendations",
        backgroundColor: "var(--green-100)",
        link: "https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-optimization/ccm-recommendations/home-recommendations#recommendation-settings"
      },
      {
        tag: [{value: "Cluster Orchestrator" }],
        title: "Cluster Capacity Limits",
        description:
          "[Released: August 2025]For Karpenter Nodepools, users can now set maximum CPU (cores) and memory (bytes) limits as guardrails to prevent uncontrolled cluster scaling.",
        backgroundColor: "var(--green-100)",
        link:"https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-optimization/cluster-orchestrator/feature-of-co"
      },
      {
        tag: [{value: "Asset Governance"}],
        title: " Rules Generating Recommendations",
        description:
          "[Released: August 2025] Rule and Target Account Exclusions in Governance Recommendations, enabling you to define custom default rules that apply globally or to specific account subsets. ",
        backgroundColor: "var(--green-100)",
        link:"https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/recommendations#rules-generating-recommendations"
      },
      {
        tag: [{value: "Cost Visibility"}],
        title: "Dynamic Perspective Reports",
        description:
          "[Released: August 2025]Create reports from your perspectives to bookmark specific filter and grouping configurations. No need to rebuild the same view repeatedly — just save it once and access it anytime.",
        backgroundColor: "var(--green-100)",
        link:"https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/key-concepts#dynamic-perspective-reports"
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Commitment Orchestrator Inventory ",
        description:
          "[Released: September 2025] Unified inventory eliminates the need for separate AWS views or manual exports, giving you complete visibility directly inside Harness.",
        backgroundColor: "var(--green-100)",
        link:"https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-optimization/commitment-orch-docs/version-two/aws/dashboard#ec2"
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Cluster Orchestrator Schedules",
        description:
          "[Released: December 2025] Cluster Orchestrator schedules allowing users to define usage windows for shared resources.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "VPA Support for Cluster Orchestrator",
        description:
          "[Released: November 2025] Automatically adjusts the CPU and memory resource requests and limits of containers in pods based on their historical usage",
        backgroundColor: "var(--green-100)",
        link:"https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-optimization/cluster-orchestrator/feature-of-co#vpa-vertical-pod-autoscaler"
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "RDS (Beta)",
        description: " Beta release of Commitment Orchestrator for Amazon RDS, enabling better cost-efficiency through commitment management for database services.",
        backgroundColor: "var(--green-100)",
      },
    ],
  },
 Now:{
  description: "Q3 CY'26, Aug 2026 - Oct 2026",
    feature: [
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Set Advance Email Alerts for Expiring RIs and SPs",
        description: "Sends proactive email alerts when Reserved Instances (RIs) and Savings Plans (SPs) are nearing expiration, so customers can renew or adjust before losing coverage and incurring unexpected on-demand charges.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "AutoStopping"}],
        title: "Azure & AWS Spot Support in AutoStopping",
        description: "Adds support for Azure and AWS Spot instances in AutoStopping to optimize cost savings.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Cost Visibility"}],
        title: "K8S Data Ingestion (SCAD)",
        description: "Improves Kubernetes cost data ingestion accuracy and granularity, addressing lost events, node-status discrepancies, and cost visibility for delegate-less K8s clusters.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Data Scope Support Extended to Recommendations, Anomalies & Governance",
        description: "Extends enterprise Data Scope access controls to Recommendations, Anomalies, and Governance, so restricted users only see recommendations/anomalies within their permitted scope.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Cluster & Commitment Integration Enhancements",
        description: "Improves how Cluster Orchestrator savings and Commitment Orchestrator coverage work together, giving a more complete view of cluster cost savings.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Cost Visibility"}],
        title: "Unit Cost Economics Support in Custom Dashboards",
        description: "Unit cost economics and ingested unit metrics for cost per outcome within Custom Dashboards.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "AutoStopping"}],
        title: "Enhanced AutoStopping Terraform Support",
        description: "Enhances Terraform support for configuring AutoStopping via Infrastructure as Code with drift detection.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Azure VM Support for Commitment Orchestration",
        description: "Granular visibility and orchestration of Azure VM committments.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Enhanced Recommendations Experience",
        description: "Enhanced experience reporting and usability for optimization Recommendations.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Cost Visibility"}],
        title: "Shift-left actioning of Recommendations with IaCM Integration",
        description: "Integration of Infrastructure-as-Code Management (IaCM) to surface resource level recommendations in workspaces and auto apply recommendations at source without drift.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "AI Cost Management"}],
        title: "User AI Cost Governance",
        description: "Active governance and enforcement of user-level AI spend with enforcement at the user, provider and model level.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Azure Passthrough recommendations support with Azure Advisor",
        description: "Support for Azure Passthrough recommendations for: Snapshot to Standard, VM Reserved Instances, Blob Reserved Capacity, Delete Unattached Disks, Files Reserved Capacity.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Anomaly detection integration with JIRA and ServiceNow",
        description: "First class integration with JIRA and ServiceNow to raise tickets and delegate actioning of detected anomalies.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Support RIs for OpenSearch with Commitment Orchestrator",
        description: "Support RIs for OpenSearch in Commitment Orchestrator.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "AI Cost Management"}],
        title: "AI Spend Explorer by Users",
        description: "Breaks down AI spend by individual user, so teams can see who is driving AI cost.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "AI Cost Management"}],
        title: "AI Spend Explorer by Agents",
        description: "Breaks down AI spend by agent/model, so teams can see which AI agents are driving cost.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "AI Cost Management"}],
        title: "AI Spend Capitalization Insights",
        description: "Surfaces which AI spend can be capitalized vs expensed, helping finance teams with accounting treatment of AI costs.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "AI Cost Management"}],
        title: "Engineering ROI Intelligence",
        description: "Connects engineering spend (including AI) to output and business impact, giving a view into engineering return on investment.",
        backgroundColor: "var(--yellow-50)",
      },
    ],
 },
Later:{
    description: "Q4 CY'26 and beyond",
    feature: [
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "ElastiCache Commitment Support",
        description: "Commitment Orchestrator can discover and purchase Reserved Instances for ElastiCache usage.",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Cluster Orchestrator for AKS",
        description: "Cluster Orchestrator support for Azure Kubernetes Service (AKS), including discovery, scale up/down, Spot handling (interruption, fallback, reverse fallback, schedule windows), Karpenter (latest Azure version), Nodepool/Nodeclass setup, and policy-driven automated provisioning and node pool management.",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Reject Lifecycle for Commitment Orchestrator Recommendation",
        description: "Lets customers reject/dismiss Commitment Orchestrator recommendations they do not want to act on.",
      },
      {
        tag: [{value: "AI Cost Management"}],
        title: "AI Cost Optimization Recommendations",
        description: "Optimization recommendations for AI spend with model routing, context window optimization, prompt caching, etc.",
      },
      {
        tag: [{value: "AI Cost Management"}],
        title: "Production Agent AI Cost Governance",
        description: "Active governance and enforcement of production agent AI spend with enforcement at the agent, provider and model level.",
      },
      {
        tag: [{value: "AutoStopping"}],
        title: "Smart Advisor for Kubernetes Cluster",
        description: "Smart Advisor helps you uncover cost-saving opportunities by identifying underused cloud resources and recommending the ideal Autostopping configurations.",
      },
      {
        tag: [{value: "AutoStopping"}],
        title: "Autostopping Global Schedules",
        description: "Global schedules for Autostopping allowing users to define usage windows for shared resources.",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "GCP Passthrough recommendations Support with Google Cloud Recommender",
        description: "Support for GCP Passthrough recommendations with Google Cloud Recommender to increase the scope of recommendations across all major GCP resource types.",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Dynamic Anomaly Detection thresholds",
        description: "Intelligent threshold setting for anomalies at account and cost category level.",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Recommendations OPA Policy - CD integration",
        description: "Recommendations OPA Policy with CD integration.",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Show impact of applied recommendations using perspectives or reports",
        description: "Show impact of applied recommendations using perspectives and reports.",
      },
      {
        tag: [{value: "AI Cost Management"}],
        title: "AI Cost & Performance Benchmarking",
        description: "Benchmarks AI cost and performance across models/providers to help teams choose the most cost-effective option for their workload.",
      },
      {
        tag: [{value: "AI Cost Management"}],
        title: "Context-Aware Engineering Governance",
        description: "Applies governance policies to engineering/AI usage based on context (e.g. project, team, environment) rather than static rules.",
      },
    ],
  }
};
