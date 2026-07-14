import { Horizon } from "./roadmapData";
import type { ModuleTheme } from "./roadmapPalette";

export const aidiModuleTheme: ModuleTheme = {
  moduleKey: "aidi",
  moduleTitle: "AI DLC Insights",
  palette: {
    light: { bg: "#F6FFF2", text: "#30841F" },
    dark: { bg: "#1E3320", text: "#8ED982" },
  },
};

export const AidiData: Horizon = {
  Now: {
    description: "Q2 2026, May-Jul 2026",
    feature: [
      {
        tag: [{ value: "Custom Dashboards" }],
        title: "Custom Insights Dashboards",
        description:
          "Define and track custom metrics with your AI DLC Insights data, consistently reported across your organization.",
      },
      {
        tag: [{ value: "Governance" }],
        title: "Centralized Team Settings",
        description:
          "Enhanced Org Tree management allowing teams to manage structures while retaining inherited settings.",
      },
      {
        tag: [{ value: "Efficiency" }, { value: "Insights" }],
        title: "Lead Time for Changes Improvements",
        description:
          "Advanced analytics and bottleneck detection focused on improving Lead Time for Changes.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "PagerDuty Integration",
        description:
          "Connect PagerDuty incident data with AI DLC Insights to correlate operational events with engineering metrics.",
      },
    ],
  },

  Next: {
    description: "Q3 2026, Aug-Oct 2026",
    feature: [
      {
        tag: [{ value: "Insights" }],
        title: "Optimizable Spend",
        description:
          "Identify opportunities to optimize spending across AI coding tool usage.",
      },
      {
        tag: [{ value: "AI Agents" }],
        title: "Agent Support",
        description:
          "Add support for additional AI agents including Kiro and Gemini to expand AI engineering visibility.",
      },
      {
        tag: [{ value: "AI" }, { value: "Insights" }],
        title: "AI Engineering Coach",
        description:
          "Provide developer and manager-level recommendations to improve engineering efficiency and performance.",
      },
      {
        tag: [{ value: "AI" }],
        title: "Harness AI Integration",
        description:
          "Use Harness AI to understand engineering performance and identify improvement opportunities.",
      },
    ],
  },

  Later: {
    description: "Q3 2026+, August 2026 & beyond",
    feature: [
      {
        tag: [{ value: "Surveys" }],
        title: "Developer Surveys",
        description:
          "Measure developer satisfaction and correlate sentiment with engineering metrics.",
      },
      {
        tag: [{ value: "AI" }, { value: "Automation" }],
        title: "Automation through Worker Agents",
        description:
          "Turn insights into automated actions with AI-powered notifications and recommendations.",
      },
      {
        tag: [{ value: "Planning" }],
        title: "Engineering Planning",
        description:
          "Forecast delivery, team capacity, and AI engineering spend using historical performance data.",
      },
      {
        tag: [{ value: "Insights" }],
        title: "Engineering Scoring",
        description:
          "Create unified scoring models to benchmark engineering performance and monitor outcomes.",
      },
    ],
  },

  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "AI" }, { value: "Insights" }],
        title: "AI DLC Insights",
        description:
          "Track AI adoption, cost, and impact of AI coding agents with support for Cursor, Windsurf, GitHub Copilot, and Claude Code.",
        link: "https://developer.harness.io/docs/software-engineering-insights/harness-sei/setup-sei/agent/",
      },
      {
        tag: [{ value: "AI" }, { value: "Insights" }],
        title: "AI Summaries and Recommendations",
        description:
          "AI-powered summaries and recommendations that help managers and leaders identify opportunities for improvement.",
        link:
          "https://developer.harness.io/release-notes/ai-dlc-insights#ai-summaries-on-insights-dashboards",
      },
      {
        tag: [{ value: "Custom Dashboards" }],
        title: "Studio",
        description:
          "Create custom metrics and dashboards using AI DLC Insights data.",
        link:
          "https://developer.harness.io/release-notes/ai-dlc-insights#new-feature-studio-for-aidi-is-in-beta",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "ServiceNow Integration",
        description:
          "Connect ServiceNow incident data to measure engineering reliability metrics.",
        link:
          "https://developer.harness.io/release-notes/ai-dlc-insights#new-enhancement-servicenow-integration-and-itsm-configuration-in-aidi",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "qTest Integration",
        description:
          "Connect qTest execution data to enhance engineering reporting and analysis.",
        link:
          "https://developer.harness.io/docs/software-engineering-insights/harness-sei/setup-sei/configure-integrations/qtest",
      },
      {
        tag: [{ value: "Insights" }],
        title: "Developer Filters for Lead Time for Changes",
        description:
          "Enable or disable developer filtering for Lead Time for Changes metrics.",
        link:
          "https://developer.harness.io/release-notes/ai-dlc-insights#enable-or-disable-developer-filtering-for-lead-time-for-changes-lttc",
      },
      {
        tag: [{ value: "Teams" }],
        title: "Multiple SCM Integrations in Team Settings",
        description:
          "Configure multiple source code management integrations for teams.",
        link:
          "https://developer.harness.io/release-notes/ai-dlc-insights#select-multiple-scm-integrations-in-team-settings",
      },
      {
        tag: [{ value: "User Experience" }],
        title: "AI DLC Insights",
        description:
          "AI DLC Insights provides near real-time visibility into Efficiency, Productivity, Business Alignment, and AI Engineering insights across your organization.",
        link:
          "https://developer.harness.io/docs/software-engineering-insights/harness-sei/sei-overview",
      },
      {
        tag: [{ value: "Onboarding" }],
        title: "AI DLC Insights Refinements",
        description:
          "Improved onboarding and administration with multi-level Org Trees, improved integrations, developer APIs, export APIs, activity logs, and enhanced identity management.",
        link:
          "https://developer.harness.io/docs/software-engineering-insights/harness-sei/setup-sei/setup-org-tree#multi-level-hierarchies",
      },
      {
        tag: [{ value: "Access Control" }],
        title: "RBAC in AI DLC Insights",
        description:
          "Improved role-based access control with more granular permissions and reusable configurations.",
        link:
          "https://developer.harness.io/docs/software-engineering-insights/harness-sei/get-started/rbac/",
      },
      {
        tag: [{ value: "Beta" }],
        title: "AI DLC Insights Beta Features",
        description:
          "Beta features including AI coding agent integrations, AI Recommendations, Security Insights, and Test Insights integrations.",
        link:
          "https://developer.harness.io/release-notes/ai-dlc-insights/#january-2026",
      },
    ],
  },
};