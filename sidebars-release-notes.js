// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

const sidebars = {
  releaseNotes: [
    // Release Notes Parent
    {
      type: "category",
      label: "Release Notes",
      link: {
        // type: "generated-index",
        type: "doc",
        id: "whats-new",
      },
      collapsed: true,
      items: [
        {
          type: "doc",
          label: "What's new",
          id: "whats-new",
          // link: {
          //   type: "doc",
          //   id: "whats-new",
          // },
          // collapsed: true,
          // items: [],
        },
        {
          type: "doc",
          label: "Early access features",
          id: "early-access",
          // link: {
          //   type: "doc",
          //   id: "early-access",
          // },
          // collapsed: true,
          // items: [],
        },
        {
          type: "doc",
          label: "Continuous Integration release notes",
          id: "continuous-integration-release-notes",
          // link: {
          //   type: "doc",
          //   id: "continuous-integration-release-notes",
          // },
          // collapsed: true,
          // items: [],
        },
        {
          type: "doc",
          label: "Continuous Delivery & GitOps release notes",
          id: "continuous-delivery-release-notes",
          // link: {
          //   type: "doc",
          //   id: "continuous-delivery-release-notes",
          // },
          // collapsed: true,
          // items: [],
        },
        {
          type: "doc",
          label: "Cloud Cost Management release notes",
          id: "cloud-cost-management-release-notes",
          // link: {
          //   type: "doc",
          //   id: "cloud-cost-management-release-notes",
          // },
          // collapsed: true,
          // items: [],
        },
        {
          type: "doc",
          label: "Feature Flag release notes",
          id: "feature-flag-release-notes",
          // link: {
          //   type: "doc",
          //   id: "feature-flag-release-notes",
          // },
          // collapsed: true,
          // items: [],
        },
        {
          type: "doc",
          label: "Service Reliability Management release notes",
          id: "service-reliability-management-release-notes",
          // link: {
          //   type: "doc",
          //   id: "service-reliability-management-release-notes",
          // },
          // collapsed: true,
          // items: [],
        },
        {
          type: "doc",
          label: "Security Testing Orchestration release notes",
          id: "security-testing-orchestration-release-notes",
          // link: {
          //   type: "doc",
          //   id: "security-testing-orchestration-release-notes",
          // },
          // collapsed: true,
          // items: [],
        },
        {
          type: "doc",
          label: "Chaos Engineering release notes",
          id: "chaos-engineering-release-notes",
          // link: {
          //   type: "doc",
          //   id: "chaos-engineering-release-notes",
          // },
          // collapsed: true,
          // items: [],
        },
        {
          type: "doc",
          label: "Harness Platform release notes",
          id: "harness-platform-release-notes",
          // link: {
          //   type: "doc",
          //   id: "harness-platform-release-notes",
          // },
          // collapsed: true,
          // items: [],
        },
        {
          type: "doc",
          label: "Self-managed Enterprise Edition release notes",
          id: "self-managed-enterprise-edition-release-notes",
          // link: {
          //   type: "doc",
          //   id: "self-managed-enterprise-edition-release-notes",
          // },
          // collapsed: true,
          // items: [],
        },
      ],
    },
    {
      type: "link",
      label: "Subscribe via RSS",
      href: "pathname:///release-notes/rss.xml",
      className: "sidebar-item-rss",
      customProps: {
        target: "_blank",
      },
    },

    //Additional Items in this parent can go here.
  ],
};

module.exports = sidebars;
