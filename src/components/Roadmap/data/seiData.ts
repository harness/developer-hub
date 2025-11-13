import { Horizon } from "./roadmapData";

export const SeiData: Horizon = {
  Now: {
    description: "Q4, Nov 2025 - Jan 2026",
    feature: [
      {
        tag: [{ value: "AI" }, { value: "Insights" }],
        title: "AI Summaries and Recommendations",
        description: "AI-first summarization of insights, including clear recommendations and summaries for managers and leaders to drive measurable change.",
      },
      {
        tag: [{ value: "AI" }, { value: "Insights" }],
        title: "AI Insights",
        description: "Track usage, cost, and impact of AI agent(s) across Productivity and Efficiency dashboards, reported across organization and teams.",
      },
      {
        tag: [{ value: "Insights" }],
        title: "Sprint Insights",
        description: "Insights into the efficiency of your sprint process that enable you to track and optimize plan, creep, or delivery-related metrics.",
      },
      {
        tag: [{ value: "Insights" }],
        title: "Flow Insights",
        description: "Insights into the flow of work and overall team throughput.",
      },
      {
        tag: [{ value: "Insights" }],
        title: "Additional Insights",
        description: "Security Insights, Test Insights, Quality Insights, and custom insights.",
      },
    ],
  },

  Next: {
    description: "Q1, Feb 2026 - April 2026",
    feature: [
      {
        tag: [{ value: "Actionability" }],
        title: "Scoring, Goals, KPIs, and Benchmarks",
        description: "Track scores, compare with benchmarks, define goals, and drive accountability.",
      },
      {
        tag: [{ value: "Insights" }],
        title: "Conversational Analytics & Canvas",
        description: "Converse with the Efficiency Agent to generate custom metrics, charts, and arrange them on a Canvas.",
      },
      {
        tag: [{ value: "Onboarding" }],
        title: "Automated Team Onboarding",
        description: "Automatically detect and configure all the right IM projects, SCM repos, CI/CD pipelines for a team, to make the onboarding process seamless.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Integrations",
        description: "ServiceNow, GitLab CI/CD, and Jira Services Management.",
      },
     ],
  },
  
  Later: {
    description: "May 2026 & Beyond",
    feature: [
      {
        tag: [{ value: "Insights" }, { value: "New Feature" }],
        title: "DevSecOps Insights",
        description: "Deep insights into the build, test, secure, deploy, and feature flagging workflows through the DevSecOps user journey.",
      },
      {
        tag: [{ value: "Insights" }, { value: "New Feature" }],
        title: "Surveys",
        description: "Measure Developer Satisfaction with built-in surveys. Correlate developer sentiment with metrics for deeper insights.",
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
        link:"https://developer.harness.io/docs/category/sei-recommended",
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
    ],
  },
};