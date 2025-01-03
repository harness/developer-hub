import { Horizon } from "./roadmapData";

export const FmeData: Horizon = {
  Now: {
    description: "Q4 2024, Nov 2024-Jan 2025",
    feature: [
      {
        tag: [{ value: "Targeting" }],
        title: "Large segments",
        description: "New segment type enabling large-scale audience targeting up to 1M keys.",
      },
      {
        tag: [{ value: "Targeting" }],
        title: "Flag impressions toggle",
        description: "Disable the flow of impressions for individual flags.",
      },
      {
        tag: [{ value: "Measurement" }],
        title: "Rum agents sampling",
        description: "Control the number of events that are auto-captured by the Split Suite and RUM agents.",
      },
    ],
  },
  Next: {
    description: "Q1 2025, Feb-Apr 2025",
    feature: [
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
          "Assign feature availability for user groups based on different conditions, with all the power of Split targeting.",
      },
      {
        tag: [{ value: "Better Together" }],
        title: "Split integration into Harness",
        description:
          "Incorporate Split as a fully native Harness module.",
      },
      {
        tag: [{ value: "Experimentation" }],
        title: "Reimagined experimentation dashboard",
        description:
          "A new, refreshed view for experimentation results to help simplify data interpretation.",
      },
    ],
  },
  Later: {
    description: "Q2 2025+, May 2025 & beyond",
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
        title: "Thin client SDKs for JavaScript and mobile",
        description: "No rules are stored client-side. Instead, these thin clients utilize a cloud service for evaluation.",
      },
      {
        tag: [{ value: "SDK" }],
        title: "Extend SDK support",
        description: "Support additional SDKs like Erlang.",
      },
    ],
  },
  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "Targeting" }],
        title: "SemVer attribute dictionary support",
        description: "Support SemVer type attributes and suggested values in the attribute dictionary to streamline entry & reduce risk of errors.",
      },
      {
        tag: [{ value: "Better Together" }],
        title: "Access Split from within Harness app",
        description: "Allow Harness customers to authenticate and access Split from the Harness application.",
      },
      {
        tag: [{ value: "Monitoring" }],
        title: "Feature flag alerts on Monitoring tab",
        description: "Show significance alerts on the monitoring tab, in addition to the threshold-based alerts shown now.",
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
