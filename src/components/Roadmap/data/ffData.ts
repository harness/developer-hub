import { Horizon } from "./roadmapData";

export const FfData: Horizon = {
  Now: {
    description: "Q2 2024, May-Jul 2024",
    feature: [
      {
        tag: [{ value: "Target Group Enhancements" }],
        title: "Extend Operator Support (AND)",
        description: "New operator support to help with complex rules, conditions and clauses on targets.",
      },
      {
        tag: [{ value: "Pipelines" }],
        title: "Pipeline Templates",
        description: "Out of the box pipeline templates to easily setup automated workflows.",
      },
      {
        tag: [{ value: "Onboarding" }],
        title: "Improved Time to Value of Onboarding",
        description: "Reducing friction of setting up SDKs and Keys so your teams can start flagging within minutes.",
      },
      {
        tag: [{ value: "Git Experience" }],
        title: "Git Experience 2.0",
        description: "Increase the speed of our git sync across repos and general improvements for development teams to work together.",
      },
    ],
  },
  Next: {
    description: "Q3 2024, Aug-Oct 2024",
    feature: [
      {
        tag: [{ value: "Flag and Target Management" }],
        title: "Flag Tag Management v2",
        description:
          "Iterative improvements on existing flag tag management such as toggling a group of flags.",
      },
      {
        tag: [{ value: "Experimentation" }],
        title: "A/B Testing",
        description:
          "Improved A/B testing framework for segmenting tests between targets.",
      },
      {
        tag: [{ value: "SDKs" }],
        title: "SDK Troubleshooting with AIDA",
        description:
          "Use AIDA to help you diagnose SDK issues and improvements in your code.",
      },
      {
        tag: [{ value: "OpenSource" }],
        title: "OpenFeature SDK Support",
        description: "Besides GoLang OpenFeature SDK support we will build out more language support based on requests from our community.",
      },
      {
        tag: [{ value: "OpenSource" }],
        title: "Gitness + Feature Flags",
        description: "Add boolean flags to Gitness to improve how our community develops and improves their experience.",
      },
    ],
  },
  Later: {
    description: "Q4 2024+, Nov 2024 & beyond",
    feature: [
      {
        tag: [{ value: "Platform Integration" }],
        title: "Chaos Engineering and Feature Flag Integration 2.0",
        description: "Ability to automatically test the resilience of a feature based on a feature flag change.",
      },
      {
        tag: [{ value: "Platform Integration" }],
        title: "Feature Flag Integration with Software Engineering Insights",
        description: "Ability to integrate with the SEI module to understand how feature flags impact team's velocity and other DORA metrics.",
      },
    ],
  },
  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "Platform Integration" }],
        title: "Cost Impact of a Feature Change",
        description: "Ability to see cost impact of a feature change and relate it to a cloud cost issue.",
      },
      {
        tag: [{ value: "Proxy" }],
        title: "Proxy Re-architecture for Scalability Improvements",
        description: "Redesign of proxy architecture for new level of resilience.",
      },
      {
        tag: [{ value: "RBAC" }],
        title: "Splitting Create and Edit Roles for RBAC Enhancements",
        description: "Enhancement granularity of RBAC permissions across defined roles and environments.",
      },
      {
        tag: [{ value: "Lifecycle Management" }],
        title: "Custom Configuration for Stale Flag Cleanup",
        description:
          "Ability to choose custom criteria such as age of flag to determine stale flag definition.",
      },
      {
        tag: [{ value: "Lifecycle Management" }],
        title: "Automated Stale Flag Removal",
        description:
          "Ability to automatically identify stale flags and remove directly from your code base.",
        // link: "/release-notes/feature-flags#java-sdk-1",
      },
      {
        tag: [{ value: "Pipelines" }],
        title: "Expressions in Pipelines",
        description: "Ability to use expressions in feature flag pipelines for dynamic changes.",
      },
      {
        tag: [{ value: "Flag and Target Management" }],
        title: "Flag Tag Management",
        description: "Ability to add a tag to a group of flags. Customers are using this to show services grouped together, team ownership, or business events related to a feature flag.",
      },
    ],
  },
};
