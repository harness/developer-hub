import { Horizon } from "./roadmapData";

export const SeiData: Horizon = {
  Now: {
    description: "Q1, Feb 2025 - Apr 2025",
    feature: [
      {
      tag: [{ value: "Enhanced Insigths" }],
      title: "Epic Insights (GA)",
      description: "Empowers Engineering Managers / Project Managers to actively track the progress and health of planned epics / initiatives / tactics."
      },
      {
      tag: [{ value: "AI" }, { value: "Enhanced Insigths" }],
      title: "AI Productivity Insights (Beta)",
      description: "Measure the impact of AI code assistant tools on developers' velocity and code quality."
      },
      {
        tag: [{ value: "Integrations" }],
        title: "ServiceNow Integration (GA)",
        description: "ServiceNow Integration to tie incident and change request data with DORA metrics.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Granular scoping of Integrations",
        description: "Improved ability to more granularly scope integrations such as GitGub, Harness CI/CD. E.g. GitHub Integration can be scoped down by org, repos, teams, etc.",
      },
    ],
  },

  Next: {
    description: "Q2, May 2025 - Jul 2025",
    feature: [
      {
        tag: [{ value: "User Experience" }, { value: "New Features" }],
        title: "SEI 2.0",
        description: "SEI 2.0 brings a modern UX to enable executive insights with team level actionability. SEI 2.0 will bring new collection tree navigation with support for Efficiency / Productivity / Business Alignment tracking for all teams (with Histoirical Trends).",
      },
      {
        tag: [{ value: "AI" }, { value: "Enhanced Insights" }],
        title: "AI Productivity Insights (GA)",
        description: "Measure the impact of AI code assistant tools on developers' velocity and code quality.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Workday Integration (GA)",
        description: "Workday Integration will enable seamless onboarding of teams to SEI 2.0.",
      },
      {
        tag: [{ value: "Onboarding" }],
        title: "New SEI 2.0 Onoarding",
        description: "New SEI 2.0 onboarding will directly integrate with HRIS systems, to automate collection tree building, while making maintenance automated.",
      },
      {
        tag: [{ value: "Harness Platform" }],
        title: "Support for Harness Delegates",
        description: "SEI integrations that require an agent can now leverage Harness Delegates, commonly deployed at all existing Harness customers.",
      },
     ],
  },
  
  Later: {
    description: "Aug 2025 & Beyond",
    feature: [
      {
        tag: [{ value: "Enhanced Insights" }, { value: "AIDA"}],
        title: "Personalized Team Recommendations",
        description: "Offer recommendations for improving productivity, removing bottlenecks, enhancing developer experience based on qualitative and quantitative insights, powered by Harness AIDA.",
      },
      {
        tag: [{ value: "DX Survey" }],
        title: "Advanced Developer Experience Survey Beta",
        description: "Measure developer experience through customizable survey templates and benchmark the result across your organization and industry. The results, combined with quantitative insights generated from the SDLC tools, give leaders a comprehensive picture of developer productivity and delivery efficiency.",
      },
      {
        tag: [{ value: "Enhanced Insights" }],
        title: "Proactive Insights",
        description: "Provide insight based on historical trends.",
      },
      {
        tag: [{ value: "Easy Adoption" }],
        title: "Fast Onboarding Mode",
        description: "Initiate onboarding with partial data ingestion to accelerate the initial onboarding process. This new mode gives instant data feedback to admins, helps identify possible integration issues, and minimizes the time to generate the first insight.",
      },
      {
        tag: [{ value: "Easy Adoption" }],
        title: "Federated Team Configuration",
        description: "Empower teams throughout your organization to design insights dashboard autonomously. This feature reduces onboarding time and enables teams to customize insights according to their specific needs independently.",
      },
      {
        tag: [{ value: "Platform" }],
        title: "BYOK support",
        description: "Support Bring Your Own Key (BYOK).",
      },
    ],
  },
};
