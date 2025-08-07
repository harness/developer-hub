import { Horizon } from "./roadmapData";

export const SeiData: Horizon = {
  Now: {
    description: "Q3, Aug 2025 - Oct 2025",
    feature: [
      {
        tag: [{ value: "AI" }, { value: "Insights" }],
        title: "AI Summaries and Recommendations",
        description: "AI-first summarization of insights, including clear recommendations for managers and leaders to drive change.",
      },
      {
        tag: [{ value: "AI" }, { value: "Insights" }],
        title: "AI Insights",
        description: "Track usage, cost, and impact of AI agent(s) across Productivity and Efficiency dashboards, reported across organization and teams.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "ServiceNow Integration (GA)",
        description: "Plug ServiceNow into Harness SEI for computing MTTR and CFR.",
      },
      {
        tag: [{ value: "Onboarding" }],
        title: "Intelligent Teams Onboarding",
        description: "Smooth onboarding of teams with team-level defaults and intelligent auto-inferring of team settings.",
      },
    ],
  },

  Next: {
    description: "Q4, Nov 2025 - Jan 2026",
    feature: [
      {
        tag: [{ value: "AI" }, { value: "New Feature"}],
        title: "AI Efficiency Agent",
        description: "Daily or weekly developer briefs, focus zones, manager briefs, and planning assistance.",
      },
      {
        tag: [{ value: "Actionability" }],
        title: "Scoring, Goals, KPIs & Benchmarks",
        description: "Drive accountability and transformation with scores, goals, and KPIs.",
      },
      {
        tag: [{ value: "Insights" }],
        title: "Benchmarks",
        description: "Help managers understand good and bad vs. industry benchmarks.",
      },
      {
        tag: [{ value: "Insights" }],
        title: "Surveys",
        description: "Measure Developer Satisfaction with built-in surveys. Correlate developer sentiment with metrics to draw deep insights.",
      },
      {
        tag: [{ value: "Onboarding" }],
        title: "Harness Delegate",
        description: "Seamless and secure setup with Harness delegates for on-premises connectivity.",
      },
     ],
  },
  
  Later: {
    description: "Feb 2026 & Beyond",
    feature: [
      {
        tag: [{ value: "Insights" }, { value: "New Feature" }],
        title: "Cohort Analysis",
        description: "Ability to create dynamic cohorts and run experiments.",
      },
      {
        tag: [{ value: "Insights" }, { value: "New Feature" }],
        title: "Canvas",
        description: "A customizable tab to carry over utilized metrics and widgets.",
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
          "Brand new SEI 2.0 implementation optimized for low latency and near real-time access. Comes with out-of-the-box Efficiency, Productivity and Business Alignment insights, consistently reported across the entire organization.",
        link:"http://localhost:3000/docs/category/sei-recommended",
      },
      {
        tag: [{ value: "Onboarding" }, { value: "Ease of Maintenance" }],
        title: "Automated Developer and Organization Management",
        description:
          "Build a completely automated Developer and Org Tree management system, which self-refreshes as the organization evolves.",
      },
      {
        tag: [{ value: "Onboarding" }, { value: "Ease of Maintenance" }],
        title: "Decentralized Management",
        description:
          "SEI 2.0 provides a decentralized management experience that empowers SEI administrators to manage the organization and profiles, while delegating team management to team managers.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Faster Integrations",
        description:
          "Integrations now work faster and in near real-time for accurate and actionable insights.",
      },
    ],
  },
};