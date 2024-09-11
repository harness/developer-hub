// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

const sidebars = {
  university: [
    // University Parent
    {
      type: "category",
      label: "University",
      className: "sidebar-univ",
      link: {
        type: "doc",
        id: "university-home",
        //type: 'generated-index',
      },
      collapsed: false,
      items: [
        // CI
        {
          type: "doc",
          label: "Continuous Integration",
          id: "continuous-integration",
          className: "sidebar-ci",
        },
        // CD
        {
          type: "doc",
          label: "Continuous Delivery & GitOps",
          id: "continuous-delivery",
          className: "sidebar-cd",
        },

        //ff
        {
          type: "doc",
          label: "Feature Flags",
          id: "feature-flags",
          className: "sidebar-ff",
        },
        //CCM
        {
          type: "doc",
          label: "Cloud Cost Management",
          id: "cloud-cost-management",
           className:"sidebar-ccm"
        },
        //sto
        {
          type: "doc",
          label: "Security Testing Orchestration",
          id: "sto",
           className:"sidebar-sto"
        },
        //sei
        {
          type: "doc",
          label: "Software Engineering Insights",
          id: "sei",
           className:"sidebar-sei"
        },
        //ce
        {
          type: "doc",
          label: "Chaos Engineering",
          id: "chaos-engineering",
           className:"sidebar-ce"
        },
        //idp
        {
          type: "doc",
          label: "Internal Developer Portal",
          id: "idp",
           className:"sidebar-idp"
        },
        //vILT
        {
          type: "link",
          label: "Virtual Instructor-Led Calendar",
          href: "https://university-registration.harness.io/calendar",
          className: "sidebar-vilt-cal",
        },
        // Instructions
        {
          type: "doc",
          label: "Instructions",
          id: "instructions",
          className: "sidebar-ilt-instructions",
        },
        // FAQs
        {
          type: "doc",
          label: "FAQs",
          id: "faqs",
          className: "sidebar-faqs",
        },
      ],
    },
  ],
};

module.exports = sidebars;
