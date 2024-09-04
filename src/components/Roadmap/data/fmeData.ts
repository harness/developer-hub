import { Horizon } from "./roadmapData";

export const FmeData: Horizon = {
  Now: {
    description: "Q3 2024, Aug-Oct 2024",
    feature: [
      {
        tag: [{ value: "Measurement" }],
        title: "Rum agents sampling",
        description: "Control the number of events that are auto-captured by the Split Suite and RUM agents.",
      },
      {
        tag: [{ value: "Targeting" }],
        title: "Large segments",
        description: "New segment type enabling large-scale audience targeting up to 1M keys.",
      },
      {
        tag: [{ value: "Measurement" }],
        title: "Monitoring tab: feature traffic insights",
        description: "Analyze flag traffic in real time to understand trends and ensure proper targeting configuration.",
      },
      {
        tag: [{ value: "Better Together" }],
        title: "Access Split from within Harness app",
        description: "Allow Harness customers to authenticate and access Split from the Harness application.",
      },
    ],
  },
  Next: {
    description: "Q4 2024, Nov 2024-Jan 2025",
    feature: [
      {
        tag: [{ value: "Better Together" }],
        title: "Split Integration into Harness",
        description:
          "Incorporate Split as a fully native Harness module.",
      },
      {
        tag: [{ value: "Experimentation" }],
        title: "Reimagined experimentation dashboard",
        description:
          "A new, refreshed view for experimentation results to help simplify data interpretation.",
      },
      {
        tag: [{ value: "Targeting" }],
        title: "Flag Prerequisites",
        description:
          "Top level flag dependencies enforced (new) as well as within rules (existing).",
      },
    ],
  },
  Later: {
    description: "Q1 2025+, Feb 2025 & beyond",
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
        tag: [{value: "Targeting"}, {value: "Better Together"}],
        title: "Rule-based segments",
        description: "Assign feature availability for user groups based on different conditions, with all the power of Split targeting.",
      },
    ],
  },
  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "Alerting" }],
        title: "Significance alerting for guardrail metrics",
        description: "Automatically receive alerts on any guardrail metric without manual configuration.",
      },
      {
        tag: [{ value: "Targeting" }],
        title: "Semantic version targeting",
        description: "Easily define targeting rules for new features using the native semantic version matcher.",
      },
      {
        tag: [{ value: "Measurement" }, {value: "SDK"}],
        title: "Split Suite for iOS",
        description: "Eliminate the need to connect the RUM agents to the SDK separately with a single unified SDK.",
      },
      {
        tag: [{ value: "Measurement" }, {value: "Experimentation"}],
        title: "Guardrail metrics",
        description: "A new category of metrics that can be used to protect every release and improve metric organization.",
      },
      {
        tag: [{ value: "SDK" }, {value: "Security"}],
        title: "SDK Certificate pinning",
        description:
          "Enhanced Mobile SDK support to ensure mobile apps connect only to trusted servers.",
      },
    ],
  },
};
