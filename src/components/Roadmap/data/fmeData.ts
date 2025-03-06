import { Horizon } from "./roadmapData";

export const FmeData: Horizon = {
  Now: {
    description: "Q1 2025, Feb-Apr 2025",
    feature: [
      {
        tag: [{ value: "Better Together" }],
        title: "Split integration into Harness, Part 1",
        description:
          "Incorporate Split as a fully native Harness module. Existing customers migrated.",
      },
      {
        tag: [{ value: "Targeting" }],
        title: "Flag impressions toggle",
        description: "Disable the flow of impressions for individual flags.",
      },
      {
        tag: [{ value: "Experimentation" }],
        title: "Reimagined experimentation design",
        description: "New workflow for designing experiments, decoupling experimentation analysis from flag monitoring use cases.",
      },
      {
        tag: [{ value: "Experimentation" }],
        title: "Reimagined experimentation dashboard",
        description: "Tabular experiment results dashboard + new features like comparison of multiple treatments & sample size visualization.",
      },
      {
        tag: [{ value: "Experimentation" }],
        title: "Experiment sample population chart",
        description: "See accumulation of sample population over time. Identify unexpected assignment or traffic level changes.",
      },
      {
        tag: [{ value: "Better Together" }],
        title: "Authn and authz on Harness platform",
        description: "Login, API scoping, and RBAC enhancements delivered by migration.",
      },
    ],
  },
  Next: {
    description: "Q2 2025, May-July 2025",
    feature: [
      {
        tag: [{ value: "Better Together" }],
        title: "Split integration into Harness, Part 2",
        description:
          "Migrate permission management to 100% Harness RBAC managed.",
      },
      {
        tag: [{ value: "Targeting" }],
        title: "Flag prerequisites",
        description:
          "Top level flag dependencies enforced (new) as well as within rules (existing).",
      },
      {
        tag: [{value: "Targeting"}, {value: "Better Together"}],
        title: "Rule-based segments",
        description:
          "Assign feature availability for user groups based on different conditions, with all the power of FME targeting.",
      },
      {
        tag: [{ value: "SDK" }],
        title: "Remote evaluation client-side SDKs",
        description: "No rules are exposed to client-side. Instead, these thin clients utilize a secure cloud service for flag evaluations.",
      },
    ],
  },
  Later: {
    description: "Q3 2025+, Aug 2025 & beyond",
    feature: [
      {
        tag: [{ value: "Better Together" }],
        title: "Automated release pipelines with feature flag data checks",
        description: "Leverage Harness pipelines with flags and built-in data checks to safely automate releases.",
      },
      {
        tag: [{ value: "Experimentation" }],
        title: "Warehouse-native experimentation",
        description: "Experiment directly on impressions & events in your data warehouse.",
      },
      {
        tag: [{ value: "SDK" }],
        title: "Extend SDK support",
        description: "Support additional SDKs like Erlang.",
      },
      {
        tag: [{ value: "Monitoring" }, {value: "Experimentation"}],
        title: "Expanded guardrail metric insights",
        description: "Make data-driven decisions at every stage of your rollout, even if it doesn’t meet the requirements for statistical comparison.",
      },
    ],
  },
  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "SDK" }],
        title: "Elixir SDK",
        description: "First of new SDKs to be added after joining Harness.",
      },
      {        
        tag: [{value: "AI Agents"}],
        title: "AI results interpretation conversation",
        description:
          "AI-generated metric results summary can be asked follow-up questions.",
        link:"https://www.split.io/releases/2025-01-08/",
      },
      {
        tag: [{ value: "Targeting" }],
        title: "Large segments",
        description: "New segment type enabling large-scale audience targeting up to 1M keys. Even higher limits available by request.",
        link:"https://www.split.io/releases/2025-01-07/",
      },
      {
        tag: [{ value: "Better Together" }],
        title: "Access Split from within Harness app",
        description: "Allow Harness customers to authenticate and access Split from the Harness application.",
      },
      {
        tag: [{ value: "Targeting" }],
        title: "SemVer attribute dictionary support",
        description: "Support SemVer type attributes and suggested values in the attribute dictionary to streamline entry & reduce risk of errors.",
        link:"https://www.split.io/releases/2024-12-06/",
      },
      {
        tag: [{ value: "Monitoring" }],
        title: "Feature flag alerts on Monitoring tab",
        description: "Show guardrail and key metric alerts on the monitoring tab, in addition to the threshold-based alerts shown prev.",
        link:"https://www.split.io/releases/2024-11-27",
      },
      {
        tag: [{ value: "Measurement" }],
        title: "Monitoring tab: feature traffic insights",
        description: "Analyze flag traffic in real time to understand trends and ensure proper targeting configuration.",
        link:"https://www.split.io/releases/2024-09-12",
      },
      {
        tag: [{ value: "Alerting" }, {value: "Experimentation"}],
        title: "Significance alerting for guardrail metrics",
        description: "Automatically receive alerts on any guardrail metric without manual configuration.",
        link:"https://www.split.io/releases/2024-09-04/",
      },
      {
        tag: [{ value: "Targeting" }],
        title: "Semantic version targeting",
        description: "Easily define targeting rules for new features using the native semantic version matcher.",
        link:"https://www.split.io/releases/2024-06-06",
      },
      {
        tag: [{ value: "Measurement" }, {value: "SDK"}],
        title: "Split Suite for Browser, iOS, Android",
        description: "Eliminate the need to connect the RUM agents to the SDK separately with a single unified SDK.",
        link:"https://help.split.io/hc/en-us/sections/22701959913229-Client-side-Suites",
      },
      {
        tag: [{ value: "Measurement" }, {value: "Experimentation"}],
        title: "Guardrail metrics",
        description: "A new category of metrics that can be used to protect every release and improve metric organization.",
        link:"https://www.split.io/releases/2024-06-14/",
      },
      {
        tag: [{ value: "SDK" }, {value: "Security"}],
        title: "SDK certificate pinning",
        description: "Enhanced Mobile (iOS and Android) SDK support to ensure mobile apps connect only to trusted servers.",
        link:"https://help.split.io/hc/en-us/articles/360020401491-iOS-SDK#certificate-pinning",
      },
    ],
  },
};
