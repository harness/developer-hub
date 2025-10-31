import { Horizon } from "./roadmapData";

export const FmeData: Horizon = {
  Now: {
    description: "Q3 2025, Aug-Oct 2025",
    feature: [
      {
        tag: [{ value: "Better Together" }],
        title: "Split integration into Harness",
        description:
          "Incorporate Split as a fully native Harness module. Login, API scoping, and RBAC enhancements delivered by migration. Existing customers migrated.",
      },
      {
        tag: [{ value: "Monitoring" }, {value: "Experimentation"}],
        title: "Flag impressions properties bag",
        description: "Decorate impression records with properties to use in downstream processing. Support for the following SDKs and Split Proxy / Synchronizer is coming this quarter: Go, PHP Thin Client (via SplitD), .NET, and Flutter.",
      },
      {
        tag: [{ value: "SDK" }],
        title: "OpenFeature provider updates",
        description: "Ongoing support for OpenFeature providers in Java, Node.js, and Browser SDKs.",
      },
      {
        tag: [{ value: "SDK" }],
        title: "Harness Forward proxy for FME",
        description: "Centralize traffic going outside of a customer’s cloud. Unlike the current Split Proxy, it does not require environment-specific configuration.",
      },
      {
        tag: [{ value: "Experimentation" }],
        title: "Experiment entry event filter",
        description: "Define an entry event at the experiment level to filter exposures, ensuring sample sizes only reflect users who were exposed to your experiment.",
      },
    ],
  },
  Next: {
    description: "Q4 2025, Nov-Jan 2026",
    feature: [
      {
        tag: [{ value: "Better Together" }],
        title: "Granular permissions in RBAC",
        description:
          "Migrate permission management for FME object and environment-level permissions to Harness RBAC. Previously titled, Split integration into Harness, Part 2.",
      },
      {
        tag: [{ value: "SDK" }],
        title: "Remote evaluation client-side SDKs",
        description: "No rules are exposed to client-side. Instead, these thin clients utilize a secure cloud service for flag evaluations.",
      },
      {
        tag: [{value: "Targeting"}, {value: "Better Together"}],
        title: "Flag prerequisites",
        description:
          "Top level flag dependencies enforced (new) as well as within rules (existing).",
      },
      {
        tag: [{ value: "Experimentation" }],
        title: "Warehouse-native experimentation",
        description: "Experiment directly on impressions & events in your data warehouse.",
      },
      {
        tag: [{ value: "Better Together" }],
        title: "Automated release pipelines",
        description: "Leverage Harness pipelines for feature flags to automate release processes.",
      },
    ],
  },
  Later: {
    description: "Q1 2026+, Feb 2026 & beyond",
    feature: [
      {
        tag: [{ value: "Better Together" }],
        title: "Data checks in automated release pipelines",
        description: "Add built-in data checks to increase safety for feature flag driven releases.",
      },
      {
        tag: [{ value: "SDK" }],
        title: "Extend SDK support",
        description: "Support additional SDKs.",
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
        tag: [{value: "Targeting"}, {value: "Better Together"}],
        title: "Rule-based segments",
        description:
          "Assign feature availability for user groups based on different conditions, with all the power of FME targeting.",
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#new-feature-support-for-rule-based-segments",
      },
      {
        tag: [{ value: "Targeting" }],
        title: "Client side SDKs cache expiration",
        description:
          "Control when local cache on device expires.",
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#new-feature-control-cache-expiration-for-client-side-sdks"
      },
      {
        tag: [{ value: "Targeting" }],
        title: "Flag impressions toggle",
        description: "Disable the flow of impressions for individual flags.",
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#new-feature-feature-flag-impression-toggle",
      },
      {
        tag: [{ value: "Experimentation" }],
        title: "Reimagined experimentation design",
        description: "New workflow for designing experiments, decoupling experimentation analysis from flag monitoring use cases.",
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#new-feature-experiments-dashboard",
      },
      {
        tag: [{ value: "Experimentation" }],
        title: "Reimagined experimentation dashboard",
        description: "Tabular experiment results dashboard + new features like comparison of multiple treatments & sample size visualization.",
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#new-feature-experiments-dashboard",
      },
      {
        tag: [{ value: "Experimentation" }],
        title: "Experiment sample population chart",
        description: "See accumulation of sample population over time. Identify unexpected assignment or traffic level changes.",
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#new-feature-experiments-dashboard",
      },
      {
        tag: [{ value: "SDK" }],
        title: "Flag impressions properties bag",
        description: "Decorate impression records with properties to use in downstream processing. Supported in Browser, Android, iOS, JavaScript, React, React Native, Redux, Node.js, and Java SDKs.",
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#new-feature-append-impression-properties",
      },
      {
        tag: [{ value: "SDK" }],
        title: "Elixir SDK",
        description: "First of new SDKs to be added after joining Harness.",
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#new-sdk-elixir-sdk",
      },
      {        
        tag: [{value: "AI Agents"}],
        title: "AI results interpretation conversation",
        description:
          "AI-generated metric results summary can be asked follow-up questions.",
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#new-feature-release-agent-ai-chatbot",
      },
      {
        tag: [{ value: "Targeting" }],
        title: "Large segments",
        description: "New segment type enabling large-scale audience targeting up to 1M keys. Even higher limits available by request.",
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#new-feature-targeting---large-segments",
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
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#2024-12-06",
      },
      {
        tag: [{ value: "Monitoring" }],
        title: "Feature flag alerts on Monitoring tab",
        description: "Show guardrail and key metric alerts on the monitoring tab, in addition to the threshold-based alerts shown prev.",
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#2024-11-27",
      },
      {
        tag: [{ value: "Measurement" }],
        title: "Monitoring tab: feature traffic insights",
        description: "Analyze flag traffic in real time to understand trends and ensure proper targeting configuration.",
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#2024-09-12",
      },
      {
        tag: [{ value: "Alerting" }, {value: "Experimentation"}],
        title: "Significance alerting for guardrail metrics",
        description: "Automatically receive alerts on any guardrail metric without manual configuration.",
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#2024-09-04",
      },
      {
        tag: [{ value: "Targeting" }],
        title: "Semantic version targeting",
        description: "Easily define targeting rules for new features using the native semantic version matcher.",
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#2024-06-06",
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
        link:"https://developer.harness.io/release-notes/feature-management-experimentation/#2024-06-14",
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
