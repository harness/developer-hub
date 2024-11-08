import { Horizon } from "./roadmapData";

export const CcmData: Horizon = {
  "Q1 CY'23": {
    description: "Q1 CY'23, Feb-Apr 2023",
    feature: [
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Azure VM Recommendations",
        description: "Support for Azure VM optimisation (Rightsizing, Cleanup)",
        backgroundColor: "var(--green-100)",
        link: "https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-optimization/ccm-recommendations/azure-vm",
      },
      {
        tag: [{value: "Cost Platform"}],
        title: "On-Prem/Self-Managed Support",
        description: "Support to run CCM in an On-Premise customer environment",
        backgroundColor: "var(--green-100)",
        link: "https://developer.harness.io/docs/category/ccm-on-harness-self-managed-enterprise-edition",
      },
      {
        tag: [{value: "Cost Platform"}],
        title: "Margin Obfuscation & Markups for MSPs",
        description:
          "Ability for MSPs to set markups at various levels of granularity (Accounts, Service etc.)",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "AutoStopping"}],
        title: "CDN Support for AutoStopping",
        description:
          "Fine-tune cost anomaly detection with an ignore list, added support for comments, and integrations with popular ticketing systems (JIRA, ServiceNow).",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "AutoStopping"}],
        title: "ALB Support Perfromance Improvements ",
        description:
          "Significant reduction in resource requirements for ALB based AS Rules",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Budget Groups",
        description:
          "Hierarchial Organisation of budgets with roll ups & cascading effects",
        backgroundColor: "var(--green-100)",
        link: "https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-governance/ccm-budgets/create-budget-group/",
      },
    ],
  },
  "Q2 CY'23": {
    description: "Q2 CY'23, May-Jul 2023",
    feature: [
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Recommendation Workflows ",
        description:
          "Support for Ignore list, JIRA/ SNOW integration, Applied recommendations dashboard (Docs)",
        backgroundColor: "var(--green-100)",
        link: "https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-optimization/ccm-recommendations/home-recommendations#apply-recommendations",
      },
      {
        tag: [{value: "Visibility"}],
        title: "Perspective Preferences ",
        description:
          "Flexibility to tailor the cost data presented in your perspective. Ex. Include/ Exclude discounts, Tax etc (Docs)",
        backgroundColor: "var(--purple-100)",
        link: "https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/perspective-preferences",
      },
      {
        tag: [{value: "Visibility"}],
        title: "Shared Costs support - Cost Categories ",
        description:
          "Share Costs across various cost buckets with various sharing strategies (Docs)",
        backgroundColor: "var(--green-100)",
        link: "https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-cost-categories/ccm-cost-categories#create-shared-cost-buckets",
      },
      {
        tag: [{value: "AutoStopping"}],
        title: "K8s AutoStopping Improvements",
        description:
          "Support for State Sync, Fixed Schedules & Inline dependencies",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Asset Governance"}],
        title: "Cloud Asset Governance for AWS",
        description:
          "FinOps-as-code policies for AWS with Out of  the box recommendations (Docs)",
        backgroundColor: "var(--green-100)",
        link: "https://developer.harness.io/docs/category/governance-for-aws",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Budgets - Capacity Planning ",
        description: "Support for yearly forecasts in Budgets",
        backgroundColor: "var(--green-100)",
      },
    ],
  },
  "Q3 CY'23": {
    description: "Q3 CY'23, Aug-Oct 2023",
    feature: [
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Forecasting Enhancements ",
        description:
          "Fine-tuned custom forecasting alogorithms resulting in improved accuracy",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Anomaly Detection Improvements ",
        description:
          "Improved accuracy to avoid False positives, Support for Harness K8s Tag based anomaly detection",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Cost Platform"}],
        title: "On-Prem/Self-Managed Airgapped Support - AWS",
        description:
          "Support to run CCM in an On-Premise customer environment in an Airgapped setup",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "AutoStopping"}],
        title: "Sample AutoStopping Rule Creation",
        description:
          "Automated creation of sample applications via Terraform that can be used to trial AutoStopping",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "AutoStopping"}],
        title: "HPA Support for K8s AutoStopping ",
        description:
          "Support to scale down workloads to a non-zero replica count to work with HPA",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Asset Governance"}],
        title: "AIDA for Asset Governance ",
        description:
          "Craft policies using AI with natural language queries (Docs)",
        backgroundColor: "var(--purple-100)",
        link: "https://developer.harness.io/docs/category/harness-aida-for-asset-governance",
      },
      {
        tag: [{value: "Asset Governance"}],
        title: "Cost Correlation for AWS Asset Governance",
        description: "Correlate cost impact of policy runs to identify savings",
        backgroundColor: "var(--green-100)",
      },
    ],
  },
  "Q4 CY'23": {
    description: "Q4 CY'23, Nov-Jan 2024",
    feature: [
      {
        tag: [],
        title: "Improved RBAC ",
        description:
          "Support for granular RBAC for Recommendations, Anomalies, Budgets & Asset Governance entities (Docs)",
        backgroundColor: "var(--green-100)",
        link: "https://developer.harness.io/docs/cloud-cost-management/access-control/ccm-roles-and-permissions",
      },
      {
        tag: [{value: "Visibility"}],
        title: "Label Performance Enhancements ",
        description:
          "3x improvements in query times for dashboards leveraging cloud labels & tags",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "AutoStopping"}],
        title: "Terraform Provider for Autostopping Rules",
        description: "Programmatically manage and configure AutoStopping Rules",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "AutoStopping"}],
        title: "Commitment Orchestrator for AWS",
        description:
          "Automated purchasing and management of commitments to maximize savings, compute coverage and utilization",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Asset Governance"}],
        title: "Cloud Asset Governance for Azure",
        description:
          "FinOps-as-code policies for AWS with Out of  the box recommendations (Docs)",
        backgroundColor: "var(--green-100)",
        link: "https://developer.harness.io/docs/category/governance-for-azure",
      },
      {
        tag: [{value: "Asset Governance"}],
        title: "Cost Correlation for Azure Asset Governance",
        description: "Correlate cost impact of policy runs to identify savings",
        backgroundColor: "var(--green-100)",
      },
    ],
  },
  "Q1 CY'24": {
    description: "Q1 CY'24, Feb-Apr 2024",
    feature: [
      {
        tag: [{value: "Visibility"}],
        title: "Cost Category Enhancements",
        description:
          "Performance improvements - 2x Query speeds, Support to leverage cost categories across all CCM features: Recommendations, Asset Governance, Budgets",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Cluster Orchestrator for EKS",
        description:
          "Workload-driven intelligent node autoscaling with distributed spot orchestration",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Commitment Orchestrator - User Approvals ",
        description:
          "Manual user approval of commitment purchases and exchanges for more granular control",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Asset Governance"}],
        title: "Multi-Policy Support",
        description:
          "Support to run multiple policies in a single rule to create a workflow of policies",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Asset Governance"}],
        title: "Cloud Asset Governance for GCP",
        description:
          "FinOps-as-code policies for GCP with out-of-the-box recommendations (Docs)",
        backgroundColor: "var(--green-100)",
        link: "https://developer.harness.io/docs/category/governance-for-gcp",
      },
      {
        tag: [{value: "Asset Governance"}],
        title: "Cost Correlation for GCP Asset Governance",
        description: "Correlate cost impact of policy runs to identify savings",
        backgroundColor: "var(--green-100)",
      },
    ],
  },
  "Q2 CY'24": {
    description: "Q2 CY'24, May-Jul 2024",
    feature: [
      {
        tag: [{value: "Visibility"}],
        title: "Azure preferences",
        description: "Support between Actual and Amortized cost in Azure Preferences.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Tags support for Recommendations ",
        description:
          "Tags are supported for recommendations and filtering is allowed.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Asset Governance"}],
        title: "Governance Cost Correlation support for new resources",
        description:
          "New resources added for all three clouds for Cost Correlation.",
        backgroundColor: "var(--green-100)",
      },

    ],
  },
  "Q3 CY'24": {
    description: "Q3 CY'24, Aug-Oct 2024",
    feature: [
      {
        tag: [{value: "Asset Governance"}],
        title: "Custom Recommendations powered by Governance ",
        description:
          "Allows users to generate recommendations for all the type of resources supported for Cost Correlation. ",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Anomalies"}],
        title: "Anomaly Detection 2.0",
        description:
          "Enhanced anomaly detection capabilities with drill-down analysis. Includes support for cost category anomalies, customizable workflows, and preferences for setting percentage deviations and minimum cost thresholds.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Recommendations RBAC enhancements",
        description:
          "",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Commitment Orchestrator for RDS (Beta) ",
        description:
          "",
        backgroundColor: "var(--green-100)",
      },
    ],
  },
  "Q4 CY'24": {
    description: "Q4 CY'24, Nov-Jan 2025",
    feature: [
      {
        tag: [{value: " Asset Governance" }],
        title: "FInOps AI assistant (Beta)",
        description:
          "The FinOps AI Assistant leverages generative AI to automate the creation and enforcement of cloud governance policies, enabling faster cloud optimization. ",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Recommendation preferences ",
        description:
          "The Recommendation Preferences feature enables users to customize and save their tuning settings for various resources like Kubernetes workloads, NodePools, ECS services, and AWS VMs.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: " "}],
        title: " ROI Dashboard ",
        description:
          "The ROI Dashboard provides customers with a centralized view of the return on investment generated by CCM’s features. It displays relevant metrics and enables users to craft compelling narratives around the data, making it easier to communicate insights and share the dashboard with stakeholders.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Commitment Orchestrator Inventory ",
        description:
          "Provides a centralized view of all account commitments, including details on Convertible and Standard RIs, Compute and EC2 Savings Plans, and statuses.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Workload Bin-packing for EKS Cluster Orchestrator",
        description:
          "Efficient scheduling and placement of containers onto nodes for optimizing node count and utilization",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "AutoStopping"}],
        title: "Smart Advisor",
        description:
          "Smart Advisor helps you uncover cost-saving opportunities by identifying underused cloud resources and recommending the ideal Autostopping configurations."
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "AutoStopping"}],
        title: "Overlapping Schedules",
        description:
          "Overlapping schedules allow teams across time zones to define their usage windows for shared resources. By prioritizing these schedules, users can effectively manage conflicts and ensure accurate resource allocation."
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "AutoStopping"}],
        title: "Granular RBAC",
        description:
          "Granular RBAC in Harness Autostopping introduces fine-grained control over Rules and Connectors as separate resources, enabling more precise permission management."
        backgroundColor: "var(--green-100)",
      },
       {
        tag: [{value: "AutoStopping"}],
        title: "Bulk Processing of AutoStopping Rules",
        description:"Bulk processing of Autostopping rules enables users to select and update multiple rules at once to simplify the management of multiple rules simultaneously."
        backgroundColor: "var(--green-100)",
      },
    ],
  },
};
