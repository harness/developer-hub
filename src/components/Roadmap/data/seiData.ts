import { Horizon } from "./roadmapData";
import type { ModuleTheme } from "./roadmapPalette";

export const seiModuleTheme: ModuleTheme = {
  moduleKey: "sei",
  moduleTitle: "AI DLC Insights",
  palette: {
    light: { bg: "#F6FFF2", text: "#30841F" },
    dark: { bg: "#1E3320", text: "#8ED982" },
  },
};

export const SeiData: Horizon = {
  Now: {
    description: "Q1 2026, Feb-Apr 2026",
    feature: [
      {
        tag: [{ value: "AI" }, { value: "Insights" }],
        title: "AI Insights",
        description: "Track usage, cost, and impact of AI agent(s) with support for custom dashboards, Windsurf, GitHub CoPilot, and Claude Code.",
      },
      {
        tag: [{ value: "AI" }, { value: "Insights" }],
        title: "AI Summaries and Recommendations",
        description: "AI-first summarization of insights, including clear recommendations and summaries for managers and leaders to drive measurable change.",
      },
      {
        tag: [{ value: "Custom Dashboards" }],
        title: "Canvas",
        description: "Define and track custom metrics with your AI DLC Insights data, reported consistently across the organization.",
      },
      {
        tag: [{ value: "Onboarding" }],
        title: "Intelligent Team Onboarding",
        description: "Automatically detect and configure all the right IM projects, SCM repos, CI/CD pipelines for a team, to make the onboarding process seamless.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "ServiceNow Integration",
        description: "Integrate ServiceNow incident data to compute and track Mean Time to Recovery, Change Failure Rate, and Deployment Frequency.",
      },
    ],
  },

  Next: {
    description: "Q2 2026, May-Jul 2026",
    feature: [
      {
        tag: [{ value: "Actionability" }],
        title: "Goals, KPIs, and Benchmarks",
        description: "Track goals and KPIs while leveraging benchmarks to drive accountability.",
      },
      {
        tag: [{ value: "Insights" }],
        title: "Conversational Analytics",
        description: "Converse with the Efficiency Agent to generate custom metrics, charts, and access actionable insights.",
      },
      {
        tag: [{ value: "Insights" }, { value: "New Feature" }],
        title: "Surveys",
        description: "Measure Developer Satisfaction with built-in surveys. Correlate developer sentiment with metrics for deeper insights.",
      },
      {
        tag: [{ value: "Insights" }, { value: "New Feature" }],
        title: "Executive Reporting",
        description: "Generate personalized executive reports that connect company-wide goals and KPIs to team-level performance, helping leaders identify where to focus support and how to drive better outcomes.",
      },
     ],
  },
  
  Later: {
    description: "Q3 2026+, August 2026 & beyond",
    feature: [
      {
        tag: [{ value: "Insights" }, { value: "New Feature" }],
        title: "Automation",
        description: "Convert insights into actions based on the goals you define. Allow the Harness Efficiency Agent to optimize CI/CD pipelines, OPA policies, SLO budgets, feature flag rollouts, and more.",
      },
      {
        tag: [{ value: "New Feature" }],
        title: "Planning",
        description: "Accurate forecasting and planning built on historical performance to prevent overcommitment and drive team satisfaction.",
      },
      {
        tag: [{ value: "New Feature" }],
        title: "Capitalization",
        description: "Automate R&D costs for quick and auditable software capitalization reporting.",
      },
    ],
  },
  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "User Experience" }, { value: "New Features" }],
        title: "SEI 2.0",
        description:
          "SEI 2.0 implementation optimized for low latency and near real-time access. Comes with out-of-the-box Efficiency, Productivity and Business Alignment insights, consistently reported across the entire organization.",
        link:"https://developer.harness.io/docs/software-engineering-insights/harness-sei/sei-overview",
      },
      {
        tag: [{ value: "Onboarding" }, { value: "Ease of Maintenance" }],
        title: "SEI 2.0 Refinements",
        description:
          "Multi-level Org Trees, Trendlines, Metric Maturity Model, improved Integration Monitoring, Custom Issue Management fields, Developer APIs, Export APIs, Activity Logs, Auto Developer Identity, and an improved correlation engine for Lead Time Tracking.",
        link:"https://developer.harness.io/docs/software-engineering-insights/harness-sei/setup-sei/setup-org-tree#multi-level-hierarchies",
        },
      {
        tag: [{ value: "Onboarding" }, { value: "Ease of Maintenance" }],
        title: "RBAC in SEI 2.0",
        description:
          "Improved granular role-based access for more control and increased reusability.",
        link:"https://developer.harness.io/docs/software-engineering-insights/harness-sei/get-started/rbac/",
      },
      {
        tag: [{ value: "Insights" } ],
        title: "Beta Availability",
        description:
          "Beta availability of new features in SEI 2.0, including the Windsurf and Cursor integrations for AI Insights, AI Recommendations, the ArmorCode integration for Security Insights, and the SonarQube integration for Test Insights.",
        link:"https://developer.harness.io/release-notes/ai-dlc-insights/#january-2026",
      },
    ],
  },
};