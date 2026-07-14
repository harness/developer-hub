import { Horizon } from "./roadmapData";
import type { ModuleTheme } from "./roadmapPalette";

export const seiModuleTheme: ModuleTheme = {
  moduleKey: "sei",
  moduleTitle: "Software Engineering Insights",
  palette: {
    light: { bg: "#F6FFF2", text: "#30841F" },
    dark: { bg: "#1E3320", text: "#8ED982" },
  },
};

export const SeiData: Horizon = {
  Now: {
    description: "Q2 2026, May-Jul 2026",
    feature: [
      {
        tag: [{ value: "AI" }, { value: "Insights" }],
        title: "AI DLC Insights",
        description: "Track adoption, cost, and impact of AI agent(s) with support for Cursor, Windsurf, GitHub CoPilot, and Claude Code.",
      },
      {
        tag: [{ value: "Custom Dashboards" }],
        title: "Custom Insights Dashboards",
        description: "Define and track custom metrics with your AI DLC Insights data, reported consistently across the organization.",
      },
      {
        tag: [{ value: "Governance" }],
        title: "Centralized Team Settings",
        description: "Enhanced Org Tree management allowing for editing of team structures while automatically retaining inherited settings.",
      },
      {
        tag: [{ value: "Efficiency" }, { value: "Insights" }],
        title: "Lead Time for Changes Improvements",
        description: "Advanced analytics and bottleneck detection focused on optimizing Lead Time for Changes.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "PagerDuty Integration",
        description: "Deep-link PagerDuty into AI DLC Insights to correlate operational incident data with developer productivity metrics.",
      },
    ],
  },

  Next: {
    description: "Q3 2026, Aug-Oct 2026",
    feature: [
      {
        tag: [{ value: "Insights" }],
        title: "Optimizable Spend",
        description: "Identify optimizable spending opportunities across your organization's use of AI coding tools.",
      },
      {
        tag: [{ value: "Insights" }],
        title: "Agent Support",
        description: "Add support for integrating with various AI agents such as Kiro and Gemini to enhance productivity and streamline workflows.",
      },
      {
        tag: [{ value: "Insights" }],
        title: "AI Engineering Coach",
        description: "Developer and manager-level views that provide coaching and guidance for areas of optimization to increase efficiency and performance.",
      },
      {
        tag: [{ value: "AI" }],
        title: "Harness AI Integration",
        description: "Use Harness AI to query and understand your team's performance and identify bottlenecks.",
      },
     ],
  },
  
  Later: {
    description: "Q3 2026+, August 2026 & beyond",
    feature: [
      {
        tag: [{ value: "Surveys" }],
        title: "Surveys",
        description: "Measure Developer Satisfaction with built-in surveys. Correlate developer sentiment with metrics for deeper insights.",
      },
      {
        tag: [{ value: "Insights" }, { value: "AI" }],
        title: "Automation through Worker Agents",
        description: "Convert insights into actions based on the goals you define. Allow the Harness Efficiency Agent to provide notifications and digests to teams and managers.",
      },
      {
        tag: [{ value: "Insights" }],
        title: "Planning",
        description: "Accurate forecasting and planning built on historical performance to prevent overcommitment, drive team satisfaction, and forecast AI engineering spend.",
      },
      {
        tag: [{ value: "Insights" }],
        title: "Scoring",
        description: "Combine engineering metrics into unified scoring models (e.g., AI, DORA), providing a simple way to benchmark team performance and monitor engineering outcomes.",
      },
    ],
  },
  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "AI" }, { value: "Insights" }],
        title: "AI Summaries and Recommendations",
        description: "AI-first summarization of insights, including clear recommendations and summaries for managers and leaders to drive measurable change.",
        link: "https://developer.harness.io/release-notes/ai-dlc-insights#ai-summaries-on-insights-dashboards"
      },
      {
        tag: [{ value: "Custom Dashboards" }],
        title: "Studio",
        description: "Define and track custom metrics with your SEI data, reported consistently across the organization.",
        link: "https://developer.harness.io/release-notes/ai-dlc-insights#new-feature-studio-for-aidi-is-in-beta",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "ServiceNow Integration",
        description: "Integrate ServiceNow incident data to compute and track Mean Time to Recovery, Change Failure Rate, and Deployment Frequency.",
        link: "https://developer.harness.io/release-notes/ai-dlc-insights#new-enhancement-servicenow-integration-and-itsm-configuration-in-aidi",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "qTest Integration",
        description: "Integrate qTest execution and testing activity data to enhance reporting and analysis.",
        link: "https://developer.harness.io/docs/software-engineering-insights/harness-sei/setup-sei/configure-integrations/qtest",
      },
      {
        tag: [{ value: "AI" }, { value: "Insights" }],
        title: "AI Summaries and Recommendations",
        description: "AI-first summarization of insights, including clear recommendations and summaries for managers and leaders to drive measurable change.",
        link: "https://developer.harness.io/release-notes/ai-dlc-insights#new-enhancement-ai-summaries-on-insights-dashboards",
      },
      {
        tag: [{ value: "Insights" }],
        title: "Developer Filters for LTTC",
        description: "Enable or disable developer filters for Lead Time to Change.",
        link: "https://developer.harness.io/release-notes/ai-dlc-insights#enable-or-disable-developer-filtering-for-lead-time-for-changes-lttc",
      },
      {
        tag: [{ value: "Teams" }],
        title: "Select Multiple Source Code Management Integrations",
        description: "Enable or disable developer filters for Lead Time to Change.",
        link: "https://developer.harness.io/release-notes/ai-dlc-insights#select-multiple-scm-integrations-in-team-settings",
      },
      {
        tag: [{ value: "User Experience" }, { value: "New Features" }],
        title: "AI DLC Insights",
        description:
          "AI DLC Insights implementation optimized for low latency and near real-time access. Comes with out-of-the-box Efficiency, Productivity and Business Alignment insights, consistently reported across the entire organization.",
        link:"https://developer.harness.io/docs/software-engineering-insights/harness-sei/sei-overview",
      },
      {
        tag: [{ value: "Onboarding" }, { value: "Ease of Maintenance" }],
        title: "AI DLC Insights Refinements",
        description:
          "Multi-level Org Trees, Trendlines, Metric Maturity Model, improved Integration Monitoring, Custom Issue Management fields, Developer APIs, Export APIs, Activity Logs, Auto Developer Identity, and an improved correlation engine for Lead Time Tracking.",
        link:"https://developer.harness.io/docs/software-engineering-insights/harness-sei/setup-sei/setup-org-tree#multi-level-hierarchies",
        },
      {
        tag: [{ value: "Onboarding" }, { value: "Ease of Maintenance" }],
        title: "RBAC in AI DLC Insights",
        description:
          "Improved granular role-based access for more control and increased reusability.",
        link:"https://developer.harness.io/docs/software-engineering-insights/harness-sei/get-started/rbac/",
      },
      {
        tag: [{ value: "Insights" } ],
        title: "Beta Availability",
        description:
          "Beta availability of new features in AI DLC Insights, including the Windsurf and Cursor integrations for AI Insights, AI Recommendations, the ArmorCode integration for Security Insights, and the SonarQube integration for Test Insights.",
        link:"https://developer.harness.io/release-notes/ai-dlc-insights/#january-2026",
      },
    ],
  },
};