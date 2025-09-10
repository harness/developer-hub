import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';
const sidebars: SidebarsConfig = {
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
        // CR
        {
          type: "doc",
          label: "Code Repository",
          id: "cr",
          className: "sidebar-cr",
        },
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
        // DB DevOps
        {
          type: "doc",
          label: "Database DevOps",
          id: "database-devops",
          className: "sidebar-dbdevops",
        },
        //iacm
        {
          type: "doc",
          label: "Infrastructure as Code Management",
          id: "iacm",
          className: "sidebar-iacm"
        },
        //ff
        {
          type: "doc",
          label: "Feature Flags",
          id: "feature-flags",
          className: "sidebar-ff",
        },
        //fme
        {
          type: "link",
          label: "Feature Management & Experimentation",
          href: "https://arcade.split.io/",
          className: "sidebar-fme",
        },
        //CCM
        {
          type: "doc",
          label: "Cloud Cost Management",
          id: "cloud-cost-management",
          className: "sidebar-ccm"
        },
        //sto
        {
          type: "doc",
          label: "Security Testing Orchestration",
          id: "sto",
          className: "sidebar-sto"
        },
        //SCS
        {
          type: "doc",
          label: "Supply Chain Security",
          id: "scs",
          className: "sidebar-ssca"
        },
        //ce
        {
          type: "doc",
          label: "Chaos Engineering",
          id: "chaos-engineering",
          className: "sidebar-ce"
        },
        //idp
        {
          type: "doc",
          label: "Internal Developer Portal",
          id: "idp",
          className: "sidebar-idp"
        },
        //sei
        {
          type: "doc",
          label: "Software Engineering Insights",
          id: "sei",
          className: "sidebar-sei"
        },
         //tbh
        {
          type: "doc",
          label: "Traceable by Harness",
          id: "traceable-by-harness",
          className: "sidebar-tbh"
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
          label: "Hands-on Instructions",
          id: "instructions",
          className: "sidebar-ilt-instructions",
        },
        // Policies and FAQs
        {
          type: "doc",
          label: "Policies & FAQs",
          id: "policies-and-faqs",
          className: "sidebar-faqs",
        },
      ],
    },
  ],
};

export default sidebars;
