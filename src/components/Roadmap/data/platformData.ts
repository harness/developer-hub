import { link } from "fs";
import { Horizon } from "./roadmapData";
import { DEFAULT_MODULE_THEME } from "./roadmapPalette";

export const platformModuleTheme = { ...DEFAULT_MODULE_THEME, moduleKey: "platform", moduleTitle: "Platform" };

export const platformData: Horizon = {
  Now: {
    description: "🚧 Q2 2026, May 2026 - Jul 2026",
    feature: [
      {
        title: "Dashboards (Closed Beta)",
        description:
          "AI-powered dashboard creation alongside a manual dashboard builder experience, with support for SMP integrations.",
        tag: [{ value: "Dashboard" }],
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
      },
      {
        title: "Product Usage Analytics (GA)",
        description:
          "A feature-centric engagement dashboard that reveals the depth of user activity across modules.",
        tag: [{ value: "Analytics" }],
      },
      {
        title: "Personalized Status Page (GA)",
        description:
          "Personalized status pages tailored to customer environments, delivering relevant service health insights, incident visibility, and platform status updates.",
        tag: [{ value: "Statuspage" }],
      },
      {
        title: "Unified Harness CLI (Beta)",
        description:
          "A single command-line interface for interacting with and managing Harness platform modules.",
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
    description: "🪄 Q3 2026, Aug 2026 - Oct 2026",
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
        title: "Harness ID - Cloud providers & secrets connectors (GA)",
        description:
          "A unified Identity & Access Management (IAM) platform for Harness that provides a centralized way to define, issue, and verify identities for users, pipelines, services, and AI agents, along with support for key cloud provider integrations and secrets connectors.",
        tag: [{ value: "IAM" }],
      },
    ],
  },
  Later: {
    description: "🔭 Q4 2026, Nov 2026 - Jan 2027",
    feature: [
      {
        title: "Dashboards support for CCM",
        description:
          "Extend Dashboards support for Cloud Cost Management module.",
        tag: [{ value: "Dashboard" }],
      },
      {
        title: "Centralized certificate management",
        description:
          "Ability for users to add the certificates to delegate to make the call to Harness Manager.",
        tag: [{ value: "Security" }],
      },
      {
        title: "Harness Marketplace",
        description:
          "A centralized Harness Ecosystem Marketplace for discovering, installing, and managing plugins, agents, templates, dashboards, and third-party integrations across the platform.",
        tag: [{ value: "Platform" }],
      },
      {
        title: "Harness ID - SMP enablement",
        description:
          "Clean up remaining connectors and enable Harness ID for Self-Managed Platform (SMP).",
        tag: [{ value: "IAM" }],
      },
    ],
  },
  Released: {
    description: "✅ What has been released",
    feature: [
      {
        title: "Service Account Token Notifications",
        description:
          "Proactive visibility into service account token lifecycle events, delivering advanced alerts through configured notification channels to prevent pipeline disruptions from expired tokens.",
        tag: [{ value: "Notify" }],
        link: "/docs/platform/notifications/notifications/centralised-notification#configure-service-account-token-notifications"
      },
      {
        title: "Platform Alerts",
        description:
          "An in-app notification framework that automatically surfaces important account-level events, such as approaching resource limits and new system release announcements, directly within the Harness UI.",
        tag: [{ value: "Platform" }],
        link: "/docs/platform/notifications/platform-alerts"
      },
      {
        title: "Move Project across Organizations (Closed Beta)",
        description:
          "Move a project from one organization to another to support scenarios like ownership change.",
        tag: [{ value: "Platform" }],
        link: "/docs/platform/organizations-and-projects/move-projects/overview"
      },
      {
        title: "Alerting on platform limits",
        description:
          "Users can now set up email alerts to receive notifications when their account reaches 80%, 95%, or 100% of their platform resource limits.",
        tag: [{ value: "Platform" }],
        link: "/docs/platform/notifications/notification-settings/#emails-for-platform-limit-alerts"
      },
    ],
  }, 
};
