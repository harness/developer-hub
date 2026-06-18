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
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Fine-Tune Recommendations with Presets and Preferences",
        description: "[Released: June 2026] Tailor recommendations to your reality. New presets and preferences for pass-through and governance recommendations let you align savings guidance with your organization's policies, risk tolerance, and operating model.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Email Alerts for Expiring RIs and Savings Plans",
        description: "[Released: June 2026] Stay ahead of every renewal. Proactive email alerts for expiring Reserved Instances and Savings Plans help teams renew or adjust commitments on time and avoid unexpected on-demand charges.",
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
        tag: [{value: "AI Cost Management"}],
        title: "Track AI Provider Spend Directly in Harness with AI Connectors",
        description: "Bring your AI bills into the same pane of glass as your cloud spend. New AI connectors pull cost data from providers like OpenAI and Anthropic directly into Cloud Cost Management, so you can monitor, attribute, and optimize AI spend alongside the rest of your infrastructure.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "AI Cost Management"}],
        title: "Trace-Level Cost Visibility for Every AI Agent Run",
        description: "Understand exactly what your AI agents cost, run by run. ",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "AI Cost Management"}],
        title: "Measure AI Efficiency with Custom Unit Cost Metrics",
        description: "Tie AI spend to the outcomes that matter to your business. Build custom unit cost metrics,to track trends over time, and prove the ROI of your AI investments.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "FinOps AI Assistant for Anomalies",
        description: "Put an AI analyst on every cost anomaly. The FinOps AI Assistant explains what changed and why, surfaces likely root cause, and notifies the right stakeholders, turning hours of manual investigation into minutes.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Pinpoint Spend Variance by Service, Team, and Cost Category",
        description: "Go from \"spend is up\" to \"here's exactly where\" in one click. Break down cost variance by service, team, and cost category with a clear path from the alert straight into a focused investigation view.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Expanded Azure Savings with Azure Advisor Recommendations",
        description: "Unlock more Azure savings out of the box with native Azure Advisor recommendations, including Snapshot to Standard, VM Reserved Instances, Blob Reserved Capacity, unattached disk cleanup, and Files Reserved Capacity, all surfaced and actioned inside Harness.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Reduce Anomaly Noise by Ignoring RIs and SPs",
        description: "Cut the noise from expected spend. Ignore Reserved Instance and Savings Plan purchases so anomaly detection focuses only on the unexpected changes that actually need your attention.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Consistent Cost Views with Global Cost Preferences",
        description: "Set your cost basis once and apply it everywhere. Global cost preferences, including Net Amortized and list cost, now extend across all recommendation types for Azure and GCP, ensuring every team sees savings the same way.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Act with Confidence Using Built-In Utilization Metrics",
        description: "See the usage data behind every recommendation. Utilization metrics and richer metadata for pass-through recommendations give teams the context they need to act on savings opportunities with confidence.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Expanding first class integration with JIRA and ServiceNow for Anomalies",
        description: "Expanding our first class integration with JIRA and ServiceNow to automatically raise tickets as part of your anomaly investigation workflow, so FinOps teams can route ownership and drive resolution directly from their existing ITSM tools.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Expanding First Class JIRA and ServiceNow Integration for Recommendations Savings",
        description: "Expanding our first class integration with JIRA and ServiceNow to capture realized recommendation savings on every ticket, giving FinOps and engineering leaders auditable savings tracking and reporting inside their existing ITSM workflows.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "AutoStopping"}],
        title: "Smart Advisor for Kubernetes Cost Savings",
        description: "Let Harness find the savings for you. Smart Advisor automatically identifies underused Kubernetes resources and recommends the ideal AutoStopping configuration, making it effortless to capture savings without manual analysis.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "AutoStopping"}],
        title: "Maximize Spot Savings on Azure and AWS with AutoStopping",
        description: "Combine the deep discounts of Spot with intelligent AutoStopping. Native support for Azure and AWS Spot instances helps you stack savings on idle, non-production, and bursty workloads automatically.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Cluster Orchestrator for Amazon EKS GA",
        description: "Production-ready intelligent node autoscaling for Amazon EKS. Now generally available, Cluster Orchestrator delivers workload-driven scaling and distributed Spot orchestration to cut Kubernetes compute costs with enterprise confidence.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Cost visibility"}],
        title: "More Accurate Kubernetes Cost Data on AWS and GCP",
        description: "Trust your Kubernetes cost numbers. SCAD-based improvements to K8s data ingestion for AWS and GCP deliver higher data accuracy, eliminate lost events and node-status discrepancies, and support delegate-less cluster cost collection.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Cost visibility"}],
        title: "Reimagined Cost Management Overview Experience",
        description: "Start every day with clarity. A redesigned overview experience surfaces your most important cost insights, trends, and savings opportunities the moment you log in, no digging required.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Commitment Orchestrator for Amazon RDS is Now GA",
        description: "Automate database commitment management at scale. Now generally available for Amazon RDS, Commitment Orchestrator continuously optimizes Reserved Instance coverage to drive maximum savings on your database spend.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Capture Savings Plan Coverage for AWS Databases",
        description: "Extend Savings Plan optimization to your data tier. Automatic discovery and support for AWS Savings Plans across RDS and ElastiCache helps you unlock additional savings on database workloads.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Commitment Orchestrator's newest version is Now GA",
        description: "The next generation of automated commitment management is here. Now generally available, Commitment Orchestrator v2 delivers smarter optimization, broader coverage, and a streamlined experience for maximizing commitment-based savings.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Automated Reserved Instance Savings for ElastiCache",
        description: "Extend hands-off commitment management to ElastiCache. Commitment Orchestrator can now automatically purchase and manage Reserved Instances for your ElastiCache usage, capturing savings without manual effort.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Automated Reserved Instance Savings for OpenSearch",
        description: "Maximize savings on your search and analytics workloads. Commitment Orchestrator now supports Reserved Instances for OpenSearch, automating commitment coverage across even more AWS services.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Cost Categories"}],
        title: "AI-Assisted Cost Categories",
        description: "Organize your cloud spend in minutes, not weeks. AI-powered assistance helps you build and refine cost categories automatically, so every dollar maps cleanly to the teams, products, and services that own it.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Cost visibility"}],
        title: "Connect Cloud Spend to Business Value with Unit Cost",
        description: "Measure what really matters, cost per customer, per transaction, per deployment. The latest Unit Cost enhancements help you tie cloud spend directly to business outcomes and tell a sharper efficiency story to leadership.",
        backgroundColor: "var(--yellow-50)",
      },
      {
        tag: [{value: "Cost visibility"}],
        title: "Real-Time Transparency into Your Cost Data Pipeline",
        description: "Always know the state of your data. A centralized Data Jobs Status hub with real-time notifications keeps you informed about active jobs, cloud provider outages, Cost Category backfills, and PDT updates, so you can trust your numbers and act without guesswork.",
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
          "Automated workflows to simplify and scale the adoption of FinOps practices and CACM features across organizations.",
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
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Cluster Orchestrator Comes to Azure Kubernetes Service (AKS)",
        description:
          "Bring intelligent, workload-aware autoscaling to AKS. Full Cluster Orchestrator support for Azure includes automated discovery, scale up/down, advanced Spot handling (interruption, fallback, reverse fallback, and schedule windows), and Karpenter on the latest Azure version.",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Apply Recommendations at the Source with IaCM",
        description:
          "Close the loop between insight and action. Native integration with Harness IaCM lets you apply cost recommendations directly in your infrastructure code, so savings are realized at the source instead of getting stuck in a backlog.",
      },
    ],
  }
};
