import { Horizon } from "./roadmapData";
import type { ModuleTheme } from "./roadmapPalette";

export const ccmModuleTheme: ModuleTheme = {
  moduleKey: "ccm",
  moduleTitle: "Cloud Cost Management",
  palette: {
    light: { bg: "#01C9CC", text: "#ECFFFF" },
    dark: { bg: "#0D3D3E", text: "#7ED9DB" },
  },
};

export const CcmData: Horizon = {
  Released: {
    description: "What has been released",
    feature: [
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
        tag: [{value: "Anomalies"}],
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
        tag: [{value: "Visibility"}],
        title: "Cost Category Enhancements",
        description:
          "[Released: December 2025] Performance improvements - 2x Query speeds, Support to leverage cost categories across all CCM features: Recommendations, Asset Governance, Budgets",
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
        tag: [{value: " Asset Governance" }],
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
        tag: [{value: "Perspectives" }],
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
        tag: [{value: "Perspectives"}],
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
      }
    ],
  },
 Now:{
  description: "Q2 CY'26, May 2026 - July 2026",
    feature: [
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Anomaly FinOps AI Assistant ",
        description: "AI-powered insights to help FinOps teams analyze anomalies and notify the right stakeholders.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Variance breakdown by service, team, and cost category",
        description: "Variance breakdown by service, team, and cost category with clear linkage from alert to investigation view.",
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
        title: "IaCM<>CCM integration for automated application of recommendations",
        description: "Integration with IaCM for automated application of recommendations at source ",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Show impact of applied recommendations using perspectives or reports",
        description: "Show impact of applied recommendations using perspectives and reports.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Whitelisting of RI, SP, Services for anomalies",
        description: "Whitelisting of Reserved Instances, Savings Plans, and Services to exclude them while generating anomalies.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Split anomalies into active/ongoing and one-time",
        description: "Split anomalies into 'active/ongoing' (spike still in effect) and 'one-time' (spike happened and spend came back down).",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Additional tuning options for recommendations",
        description: "Additional tuning options for pass-through and governance recommendations.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Global cost preferences for all recommendation types",
        description: "Global cost preferences needed for all recommendation types (particularly Net Amortized, and list cost) for Azure and GCP.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Include utilization metrics for all recommendations",
        description: "Include utilization metrics for all recommendations and additional metadata for pass-through recommendations.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "First class integration with JIRA and ServiceNow",
        description: "First class integration with JIRA and ServiceNow to raise tickets and delegate actioning of detected anomalies.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Capture Recommendations Savings in Jira and Snow",
        description: "Capture recommendations savings in Jira and ServiceNow for tracking and reporting.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "AutoStopping"}],
        title: "Smart Advisor for Kubernetes Cluster",
        description: "Smart Advisor helps you uncover cost-saving opportunities by identifying underused cloud resources and recommending the ideal Autostopping configurations.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "AutoStopping"}],
        title: "Azure & AWS Spot support in Autostopping",
        description: "Support for Azure and AWS Spot instances in AutoStopping to optimize cost savings.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "RBAC for Cluster Orchestrator",
        description: "Role-based access control to enhance security and governance in Cluster Orchestrator.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Cluster Orchestrator for AKS",
        description: "Cluster Orchestrator support for Azure Kubernetes Service (AKS) including Discovery, Scale up and down, Spot Handling (Interruption, Fallback, Reverse Fallback, Schedule window), Karpenter with Azure Latest version, Nodepool and Nodeclass, Setup.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Cluster Orchestrator Terraform Module",
        description: "Terraform module support for Cluster Orchestrator deployment and configuration.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Cluster Orch EKS GA",
        description: "General Availability of Cluster Orchestrator for Amazon EKS.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Observability in Cluster Orchestrator",
        description: "Enhanced observability and monitoring capabilities for Cluster Orchestrator.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Cost visibility"}],
        title: "K8S Data Ingestion for AWS (SCAD)",
        description: "Addresses data correctness issues in the K8S Data Ingestion process, including lost events, node status discrepancies, and customer concerns about delegate-less K8S cluster costs.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Cost visibility"}],
        title: "CCM Overview Page Revamp",
        description: "Revamp of the CCM Overview page.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Commitment Orchestrator for RDS GA ",
        description: "General Availability of Commitment Orchestrator for Amazon RDS, enabling better cost-efficiency through commitment management for database services.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Set Email Alerts For Expiring RIs and SPs",
        description: "Set email alerts for expiring RIs and SPs to help users proactively manage their commitments and avoid unexpected charges.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Azure support in Commitment Orchestrator",
        description: "Azure support in Commitment Orchestrator including Utilization, Savings, Coverage, and Permissions visibility.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "AWS Savings Plan Database Discovery/Support",
        description: "Discovery and support for AWS Savings Plans for RDS and ElastiCache databases.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Commitment V2 GA",
        description: "General Availability of Commitment Orchestrator v2.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Elasticache Dashboard Support",
        description: "Commitment Orchestrator will be able to purchase RI's for your Elasticache usage",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Support RIs for OpenSearch",
        description: "Support RIs for OpenSearch in Commitment Orchestrator.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Cost Categories"}],
        title: "AI in Cost Categories",
        description: "AI-powered insights to help users analyze their commitments and notify the right stakeholders.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Cost visibility"}],
        title: "Unit Cost Final Finishes",
        description: "Final finishes for Unit Cost.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Cost visibility"}],
        title: "Data Ingestion Status Update",
        description: "Introduces a centralized Data Jobs Status section and real-time notifications for active data jobs, third-party outages, and widget-specific alerts across ingestion, Cost Category backfills, PDT updates, and external issues impacting Harness CCM.",
        backgroundColor: "var(--yellow-50)",
      },
    ],
 },
Later:{
    description: "Q3 2026 and beyond",
    feature: [
      {
        tag: [{value: "AutoStopping"}],
        title: "Autostopping Global Schedules",
        description:
          "Global schedules for Autostopping allowing users to define usage windows for shared resources.",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "GCP Passthrough recommendations Support with Google Cloud Recommender",
        description:
          "Support for GCP Passthrough recommendations with Google Cloud Recommender to increase the scope of recommendations across all major GCP resource types.",
      },
      {
        tag: [{value: "Innovation"}],
        title: " FinOps Workflows ",
        description:
          "Automated workflows to simplify and scale the adoption of FinOps practices and CCM features across organizations.",
      },
       {
        tag: [{value: "Cluster Orchestrator"}],
        title: " Cluster Orchestrator for EKS (GA) ",
        description:
          "Workload-driven intelligent K8s node auto scaling with distributed spot orchestration and advanced bin packing",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Cluster Orchestrator for AKS",
        description:
          "Automates AKS cluster provisioning, scaling, and node pool management with policy-driven orchestration",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Commitment Orchestrator for Azure",
        description:
          "Exentding capabilities of Commitment Orchestrator for Azure.",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Intelligence for thresholds - account and CC level",
        description: "Intelligent threshold setting for anomalies at account and cost category level.",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Recommendations OPA Policy - CD integration",
        description: "Recommendations OPA Policy with CD integration ",
      },
    ],
  }
};
