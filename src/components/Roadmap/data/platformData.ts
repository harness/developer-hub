import { link } from "fs";
import { Horizon } from "./roadmapData";
import { DEFAULT_MODULE_THEME } from "./roadmapPalette";

export const platformModuleTheme = { ...DEFAULT_MODULE_THEME, moduleKey: "platform", moduleTitle: "Platform" };

export const platformData: Horizon = {
  Now: {
    description: "🚧 Q3 2026, Aug 2026 - Oct 2026",
    feature: [
      {
        title: "Dashboards (GA)",
        description:
        "AI-powered dashboard creation combined with a manual dashboard builder experience, including SMP support and migration capabilities for existing Custom Dashboards.",
        tag: [{ value: "Dashboard" }],
      },
      {
        title: "Unified Data Platform - (All environments)",
        description:
        "A centralized, AI-enabled data platform available across all environments for integrating, managing, and securing data throughout the software development lifecycle (SDLC), with SMP support for enhanced extensibility and integrations.",
        tag: [{ value: "UDP" }],
      },
      {
        title: "Knowledge Graph (GA)",
        description:
          "Knowledge Graph is available as part of Harness 3.0, with support for evaluations (evals) and third-party data integrations.",
        tag: [{ value: "Knowledge Graph" }],
      },
      {
        title: "Unified Harness CLI (GA)",
        description:
          "A single command-line interface for seamlessly interacting with Harness modules and streamlining developer workflows.",
        tag: [{ value: "Developer Experience" }],
      },
      {
        title: "HarnessID - User and Workload Identity Management (GA)",
        description:
          "A unified Identity & Access Management (IAM) platform for Harness: one place to define, issue, and verify identity for users, pipelines, services, and AI agents.",
        tag: [{ value: "IAM" }],
      },
    ],
  },
  Next: {
    description: "🪄 Q4 2026, Nov 2026 - Jan 2027",
    feature: [
      {
        title: "Dashboards support for CCM",
        description:
          "Extend post-GA Dashboards support to the Cloud Cost Management (CCM) module.",
        tag: [{ value: "Dashboard" }],
      },
      {
        title: "Customer Portal for feature requests (GA)",
        description:
          "A customer-facing portal for submitting, tracking, and voting on Harness feature requests.",
        tag: [{ value: "Customer Portal" }],
      },
      {
        title: "In-product recommendation system",
        description:
          "Contextual, in-product recommendations that surface the next best action and relevant platform capabilities based on how you use Harness.",
        tag: [{ value: "Developer Experience" }],
      },
    ],
  },
  Later: {
    description: "🔭 Q1 2027, Feb 2027 - Apr 2027",
    feature: [
        {
        title: "Unified Harness CLI - Security Testing and Cost Management agents",
        description:
          "Unified Harness CLI with agents for Security Testing Orchestration (STO) and Cloud Cost Management (CCM), so you can run and manage those workflows from the command line.",
        tag: [{ value: "Developer Experience" }],
      },
      {
        title: "Harness ID - connectors and SMP enablement",
        description:
          "Complete coverage for the connectors and enable Harness ID for the Self-Managed Platform (SMP).",
        tag: [{ value: "IAM" }],
      },
      {
        title: "Centralized certificate management",
        description:
          "Ability for users to add the certificates to delegate to make the call to Harness Manager.",
        tag: [{ value: "Security" }],
      },
    ],
  },
  Released: {
    description: "✅ What has been released",
    feature: [
      {
        title: "Dashboards (Open Beta)",
        description:
          "AI-powered dashboard creation alongside a manual dashboard builder experience, with support for SMP integrations.",
        tag: [{ value: "Dashboard" }],
        link: "/docs/platform/dashboards/dashboard-standard/overview",
      },
      {
        title: "Unified Data Platform - (Selected environments)",
        description:
          "A centralized, AI-enabled data platform for integrating, managing, and securing data across the software development lifecycle (SDLC).",
        tag: [{ value: "UDP" }],
      },
      {
        title: "Knowledge Graph (Beta)",
        description:
          "A graph-based data layer that connects siloed information into a unified, queryable, and visual representation.",
        tag: [{ value: "Knowledge Graph" }],
        link: "/docs/platform/knowledge-graph/overview",
      },
      {
        title: "Product Usage Analytics (GA)",
        description:
          "A feature-centric engagement dashboard that reveals the depth of user activity across modules.",
        tag: [{ value: "Analytics" }],
        link: "/docs/platform/subscriptions-licenses/usage-analytics",
      },
      {
        title: "Personalized Status Page (GA)",
        description:
          "Personalized status pages tailored to customer environments, delivering relevant service health insights, incident visibility, and platform status updates.",
        tag: [{ value: "Statuspage" }],
        link: "/docs/platform/status-portal/view-personalized-status-portal",
      },
      {
        title: "Unified Harness CLI (Beta)",
        description:
          "A single command-line interface for interacting with and managing Harness platform modules.",
        tag: [{ value: "Developer Experience" }],
        link: "/docs/platform/harness-cli/harness-cli-overview",
      },
    ],
  }, 
};
