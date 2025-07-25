import { Horizon } from "./roadmapData";

export const SeiData: Horizon = {
  Now: {
    description: "Q2, May 2025 - Jul 2025",
    feature: [
      {
        tag: [{ value: "User Experience" }, { value: "New Features" }],
        title: "SEI 2.0",
        description: "SEI 2.0 brings a modern UX to enable executive insights with team level actionability. SEI 2.0 will bring new collection tree navigation with support for Efficiency / Productivity / Business Alignment tracking for all teams (with Historical Trends).",
      },
      {
        tag: [{ value: "Onboarding" }],
        title: "New SEI 2.0 Onoarding",
        description: "Quick setup for integrations, sync contributors, build org trees, build profiles and see Insights.",
      },
      {
        tag: [{ value: "Onboarding" }, { value: "Ease of Maintenance"}],
        title: "New CSV based Org Trees",
        description: "Creating and maintaining Org Trees now becomes a breeze with the CSV based org trees that stay in sync with regular CSV updates.",
      },
      {
        tag: [{ value: "Insights" }],
        title: "Playground",
        description: "Quick time to value and ability to play with Insights, in a Playground that provides Insights across the entire organization.",
      },
      {
        tag: [{ value: "Insights" }],
        title: "Exports",
        description: "Ability to export dashboards and widgets as PDF / CSV, to allow for easy sharing of org metrics",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "ServiceNow Integration (GA)",
        description: "ServiceNow Integration to tie incident and change request data with DORA metrics.",
      },
    ],
  },

  Next: {
    description: "Q3, Aug 2025 - Oct 2025",
    feature: [
      {
        tag: [{ value: "Integrations" }, { value: "Ease of Maintenance"}],
        title: "Workday Integration (GA)",
        description: "Direct sync with Workday to enable seamless onboarding of teams to SEI 2.0.",
      },
      {
        tag: [{ value: "Actionability" }],
        title: "Scoring, Goals, KPIs & Benchmarks",
        description: "Make metrics and insights actionable by tracking scores, setting goals, assigning KPIs and comparing across benchmarks.",
      },
      {
        tag: [{ value: "Insights" }],
        title: "DevOps Insights",
        description: "See deep insights into your DevOps workflow, to truly assess flow and bottlenecks, after developers merge their code.",
      },
      {
        tag: [{ value: "Insights" }],
        title: "Surveys",
        description: "Add the qualitative context to your quantitative metrics, with the help of surveys that help assess Developer Satisfaction.",
      },
     ],
  },
  
  Later: {
    description: "Nov 2025 & Beyond",
    feature: [
      {
        tag: [{ value: "AI" }, { value: "Insights" }],
        title: "AI Usage & Impact",
        description: "Measure, track and optimize the usage and impact of AI Coding Assistants in your developer organization.",
      },
      {
        tag: [{ value: "AI" }, { value: "Agents"}],
        title: "AI Efficiency Agent",
        description: "An Agent that offers recommendations for improving productivity, removing bottlenecks, and enhancing developer experience based on qualitative and quantitative insights.",
      },
      {
        tag: [{ value: "AI" }, { value: "Recommendations"}],
        title: "AI Recommendations",
        description: "Provides actionable recommendations, beyond just the Insights.",
      },
      {
        tag: [{ value: "Harness Platform" }],
        title: "Support for Harness Delegates",
        description: "SEI integrations that require an agent can now leverage Harness Delegates, commonly deployed at all existing Harness customers.",
      },
      {
        tag: [{ value: "Insights" }],
        title: "Canvas",
        description: "Set up your personal Canvas that provides a custom dashboard, to track your specific metrics.",
      },
      {
        tag: [{ value: "Insights" }, { value: "Cohorts" }],
        title: "Cohort Analysis",
        description: "Define Dynamic Cohorts that allow qualitative & quantitative analysis across multiple cohorts, before/after analysis & more.",
      },
    ],
  },
};
