import { Horizon } from "./roadmapData";

export const CcmData: Horizon = {
  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{value: "AutoStopping"}],
        title: "Granular RBAC",
        description:
          "Granular RBAC in Harness Autostopping introduces fine-grained control over Rules and Connectors as separate resources, enabling more precise permission management.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: " Integration with Cluster Orchestrator",
        description:
          "Enhancing Commitment Orchestrator with seamless Cluster Orchestrator integration.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Nodepools and Nodeclasses Configuration via Harness UI",
        description:
          "UI-based configuration management for Nodepools and Nodeclasses.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Reverse Fallback V2",
        description:
          " Improved failover and fallback mechanisms for Cluster Orchestrator.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Platform"}],
        title: " External Data Ingestion (Beta) ",
        description:
          "Focus compliant external data ingestion to ingest SaaS (Ex. Snowflake, Databricks etc.)",
        backgroundColor: "var(--green-100)",
      },
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
      {
        tag: [{value: "Asset Governance"}],
        title: "Custom Recommendations powered by Governance ",
        description:
          "Allows users to generate recommendations for all the type of resources supported for Cost Correlation. ",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Anomalies"}],
        title: "Anomaly Detection 2.0 (Beta)",
        description:
          "Enhanced anomaly detection capabilities with drill-down analysis. Includes support for cost category anomalies, customizable workflows, and preferences for setting percentage deviations and minimum cost thresholds.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Commitment Orchestrator for RDS (Beta) ",
        description:
          "The Commitment Orchestrator for RDS (Beta) extends our automated savings capabilities to Amazon RDS, helping organizations maximize cost efficiency by optimizing Reserved Instances (RIs) and Savings Plans",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: " Asset Governance" }],
        title: "FInOps AI assistant (Beta)",
        description:
          "The FinOps AI Assistant leverages generative AI to automate the creation and enforcement of cloud governance policies, enabling faster cloud optimization. ",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Recommendation preferences ",
        description:
          "The Recommendation Preferences feature enables users to customize and save their tuning settings for various resources like Kubernetes workloads, NodePools, ECS services, and AWS VMs.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Platform"}],
        title: " ROI Dashboard ",
        description:
          "The ROI Dashboard provides customers with a centralized view of the return on investment generated by CCM’s features. It displays relevant metrics and enables users to craft compelling narratives around the data, making it easier to communicate insights and share the dashboard with stakeholders.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Commitment Orchestrator Inventory ",
        description:
          "Provides a centralized view of all account commitments, including details on Convertible and Standard RIs, Compute and EC2 Savings Plans, and statuses.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Workload Bin-packing for EKS Cluster Orchestrator",
        description:
          "Efficient scheduling and placement of containers onto nodes for optimizing node count and utilization",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Configurable Karpenter Node Time-To-Live (TTL) in Harness UI",
        description:
          "Configurable Karpenter Node Time-To-Live (TTL) allows users to set node lifetimes directly within the interface, simplifying node management.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Spot Orchestration: Reverse Fallback Retry",
        description:
          "Reverse Fallback Retry enables automatic rollback of workloads to their original nodes or environments once they’re available, ensuring efficient resource use. ",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Workload Distribution Rule at Workload & Namespace level",
        description:
          "Workload Distribution Rules enable precise control over workload placement within clusters at both workload and namespace levels, enhancing resource balance, policy compliance, and workload isolation across Kubernetes environments.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "AutoStopping"}],
        title: "Overlapping Schedules",
        description:
          "Overlapping schedules allow teams across time zones to define their usage windows for shared resources. By prioritizing these schedules, users can effectively manage conflicts and ensure accurate resource allocation",
        backgroundColor: "var(--green-100)",
      },
       {
        tag: [{value: "AutoStopping"}],
        title: "Bulk Processing of AutoStopping Rules",
        description:"Bulk processing of Autostopping rules enables users to select and update multiple rules at once to simplify the management of multiple rules simultaneously.",
        backgroundColor: "var(--green-100)",
      },
    ],
  },
 Now:{
  description: "Q3 CY'25, Aug 2025 - Oct 2025",
    feature: [
      {
        tag: [{value: "AutoStopping"}],
        title: "Smart Advisor",
        description:
          "Smart Advisor helps you uncover cost-saving opportunities by identifying underused cloud resources and recommending the ideal Autostopping configurations.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Anomaly FinOps AI Assistant ",
        description:" AI-powered insights to help FinOps teams analyze anomalies and notify the right stakeholders.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "RBAC for Cluster Orchestrator",
        description:
          "Role-based access control to enhance security and governance in Cluster Orchestrator.",
        backgroundColor: "var(--yellow-100)",
      },
     
    ],
 },
Later:{
    description: "Q4 2025 and beyond",
    feature: [
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: " Budgets 2.0 ",
        description:
          "Granular budgeting with version control, rule-based alerts, and CSV uploads for dynamic cost tracking along with AI-powered forecasts and budget suggestions",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Commitment Orchestrator for RDS GA ",
        description:
          "General Availability of Commitment Orchestrator for Amazon RDS, enabling better cost-efficiency through commitment management for database services.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "Asset Governance"}],
        title: " Governance Notifications ",
        description:
          "Alert notifications on evaluations for prompt alerting.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "AutoStopping"}],
        title: "AutoStopping Onboarding Assistant for EKS",
        description:
          "A smart onboarding assistant for AutoStopping that automates resource identification, rule creation, and bulk configuration for Kubernetes-based environments.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "Innovation"}],
        title: " FinOps Workflows ",
        description:
          "Automated workflows to simplify and scale the adoption of FinOps practices and CCM features across organizations.",
        backgroundColor: "var(--yellow-100)",
      },
       {
        tag: [{value: "Cluster Orchestrator"}],
        title: " Cluster Orchestrator for EKS (GA) ",
        description:
          "Workload-driven intelligent K8s node auto scaling with distributed spot orchestration and advanced bin packing",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Cluster Orchestrator for AKS",
        description:
          "Automates AKS cluster provisioning, scaling, and node pool management with policy-driven orchestration",
        backgroundColor: "var(--yellow-100)",
      },
    ],
  }
};
