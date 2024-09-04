import { Horizon } from "./roadmapData";

export const FfData: Horizon = {
  Now: {
    description: "Q3 2024, Aug-Oct 2024",
    feature: [
      {
        tag: [{ value: "SDKs" }],
        title: "Improve SDK Reliability and Hardening",
        description: "Hardening our SDKs for reliability and performance for our customers for various SDKs.",
      },
    ],
  },
  Next: {
    description: "Q4 2024, Nov-Jan 2025",
    feature: [
      {
        tag: [{ value: "Platform Integration" }],
        title: "See Harness Feature Management and Experimentation Roadmap for details",
        description: "Learn more about the better together story with Harness and Split.",
      },
    ],
  },
  Later: {
    description: "Q1 2025+, Feb 2025 & beyond",
    feature: [
      {
        tag: [{ value: "Platform Integration" }],
        title: "See Harness Feature Management and Experimentation Roadmap for details",
        description: "Learn more about the better together story with Harness and Split.",
      },
    ],
  },
  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "Experimentation" }],
        title: "A/B Testing",
        description:
          "Achieved through acquistion of Split FME product.",
      },
      {
        tag: [{ value: "OpenSource" }],
        title: "OpenFeature SDK Support",
        description: "We now support multiple OpenFeature SDKs through our acquistion of Split FME product.",
      },
      {
        tag: [{ value: "Onboarding" }],
        title: "Improved Time to Value of Onboarding",
        description: "Reducing friction of setting up SDKs and Keys so your teams can start flagging within minutes.",
      },
      {
        tag: [{ value: "Git Experience" }],
        title: "Git Experience with Webhooks",
        description: "Increase the speed of our git sync across repos and general improvements for development teams to work together.",
      },
      {
        tag: [{ value: "Target Group Enhancements" }],
        title: "Extend Operator Support (AND)",
        description: "New operator support to help with complex rules, conditions and clauses on targets.",
      },
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
