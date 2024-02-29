import { Horizon } from "./roadmapData";

export const SeiData: Horizon = {
  Now: {
    description: "Q1 2024, Feb-Apr 2024",
    feature: [
      {
        tag: [{ value: "Easy Adoption" }],
        title: "Automated Identity Consolidation",
        description: "Streamline management of identities from integrations and contributors in SEI. This new flow reduces the integration onboarding time and simplifies the complexity for customers to manage the identity to contributor matches.",
      },
      {
        tag: [{ value: "Platform" }],
        title: "SEI on Harness GA",
        description: "Provide a consistent look and feel with the rest of Harness modules and leverage Harness platform capabilities, such as user authentication and authorization, and account and license management.",
      },
      {
        tag: [{ value: "Enhanced Insights" }],
        title: "DORA Enhancement",
        description: "Enhance the correlation in DORA.",
      },
      {
        tag: [{ value: "DX Survey" }],
        title: "Advanced Developer Experience Survey Beta",
        description: "Measure developer experience through customizable survey templates and benchmark the result across your organization and industry. The results, combined with quantitative insights generated from the SDLC tools, give leaders a comprehensive picture of developer productivity and delivery efficiency.",
      },
      {
        tag: [{ value: "Data Accuracy" }],
        title: "Built-in Data Ingestion Monitoring and Validation",
        description: "Monitor and validate data ingestion inside the product, allowing customers to monitor the data ingestion, proactively notify potential issues, and run spot checks for specific data points.",
      },
    ],
  },

  Next: {
    description: "Q2 2024, May-Jul 2024",
    feature: [
      {
        tag: [{ value: "Easy Adoption" }],
        title: "Fast Onboarding Mode",
        description: "Initiate onboarding with partial data ingestion to accelerate the initial onboarding process. This new mode gives instant data feedback to admins, helps identify possible integration issues, and minimizes the time to generate the first insight.",
      },
      {
        tag: [{ value: "Enhanced Insights" }],
        title: "Team Transformation and OKR Tracking",
        description: "Track transformation and OKR for each team, providing a clear view of progress and identifying areas to improve.",
      },
      {
        tag: [{ value: "Enhanced Insights" }],
        title: "Enhanced Executive Dashboard",
        description: "Provide organization-wide and holistic insights for executives to have a comprehensive view of productivity, efficiency, and developer experience.",
      },
      {
        tag: [{ value: "Enhanced Insights" }, { value: "AIDA"}],
        title: "Personalized Team Recommendations",
        description: "Offer recommendations for improving productivity, removing bottlenecks, enhancing developer experience based on qualitative and quantitative insights, powered by Harness AIDA.",
      },
    ],
  },
  
  Later: {
    description: "Q3 2024+, Aug 2024 & beyond",
    feature: [
      {
        tag: [{ value: "Easy Adoption" }],
        title: "Federated Team Configuration",
        description: "Empower teams throughout your organization to design insights dashboard autonomously. This feature reduces onboarding time and enables teams to customize insights according to their specific needs independently.",
      },
      {
        tag: [{ value: "Enhanced Insights" }],
        title: "Proactive Insights",
        description: "Provide insight based on historical trends.",
      },
    ],
  },
};
