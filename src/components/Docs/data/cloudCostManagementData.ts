import {
  CardSections
} from "@site/src/components/TutorialCard/TutorialCard";
import { MODULES } from "@site/src/constants";

  /* Define the cards - start */

    // Docs
    export const docsCards: CardSections = [
      {
        name: "Get started with Cloud Cost Management",
        description:
          "",
        list: [
          {
            title: "Onboarding",
            module: MODULES.ccm,
            description:
              "Learn the basic concepts of Harness Cloud Cost Management and how to set up CCM for your cloud accounts.",
            link: "docs/cloud-cost-management/get-started/onboarding-guide/use-quick-create-k8s",
          },
          {
            title: "Overview",
            module: MODULES.ccm,
            description:
              "Learn about Harness Cloud Cost Management",
            link: "/docs/cloud-cost-management/get-started/overview",
          },
          {
            title: "What's Supported",
            module: MODULES.ccm,
            description:
              "Find details on supported features, providers and frameworks",
            link: "/docs/cloud-cost-management/whats-supported",
          },
        ],
      },
      {
        name: "Key features",
        description:
          "",
        list: [
          {
            title: "AutoStopping Rules",
            module: MODULES.ccm,
            description:
              "AutoStopping Rules make sure that your non-production resources run only when used, and never when idle.",
            link: "/docs/category/autostopping-rules",
          },
          {
            title: "Cloud Cost Recommendations",
            module: MODULES.ccm,
            description:
              "Optimize cloud costs by applying CCM recommendations.",
            link: "/docs/category/recommendations",
          },
          {
            title: "Commitment Orchestrator",
            module: MODULES.ccm,
            description:
              "Manage all cloud commitments with Commitment Orchestrator",
            link: "/docs/category/commitment-orchestrator",
            
          },
          {
            title: "Cost Categories",
            module: MODULES.ccm,
            description:
              "Use cost categories to take data across multiple sources and attribute it to business contexts.",
            link: "/docs/category/cost-categories",
          },
          {
            title: "Anomaly Detection",
            module: MODULES.ccm,
            description:
              "Identify unusual or unexpected changes in your cloud service expenses.",
            link: "/docs/cloud-cost-management/use-ccm-cost-reporting/anomaly-detection/a-detect-cloud-cost-anomalies-with-ccm",
          },
          {
            title: "Asset governance",
            module: MODULES.ccm,
            description:
              "Manage your cloud environment and cloud spend using the asset governance rules and budgets.",
            link: "/docs/category/asset-governance",
          },   
          {
            title: "Cluster Orchestrator",
            module: MODULES.ccm,
            description:
              "Cluster Orchestrator for EKS (Beta) to enhance workload-driven autoscaling and intelligent management of AWS Spot instances, contributing to overall cost efficiency.",
            link: "/docs/category/cluster-orchestrator-for-aws-eks-clusters-beta",
          },
          {
            title: "Perspectives",
            module: MODULES.ccm,
            description:
              "Group resources by what matters most to your business and create tailored views for engineering, finance, or leadership, all in one powerful, shareable dashboard.",
            link: "/docs/category/perspectives",
          },
          {
            title: "Budgets",
            module: MODULES.ccm,
            description:
              "Take control of your cloud spend with Harness CCM Budgets — set custom budgets and get real-time alerts before your costs exceed expectations.",
            link: "/docs/category/budgets",
          },
          {
            title: "BI Dashboards",
            module: MODULES.ccm,
            description:
              "Turn cloud data into actionable insights and model, analyze, and visualize key metrics to drive smarter, data-informed business decisions.",
            link: "/docs/category/bi-dashboards",
          },
        ],
    },
  ];
    /* Define the cards - end */