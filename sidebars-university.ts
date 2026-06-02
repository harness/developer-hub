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
        // CD
        {
          type: "doc",
          label: "Continuous Delivery & GitOps",
          id: "continuous-delivery",
          className: "sidebar-cd",
        },
         // CI
        {
          type: "doc",
          label: "Continuous Integration",
          id: "continuous-integration",
          className: "sidebar-ci",
        },
        //idp
        {
          type: "doc",
          label: "Internal Developer Portal",
          id: "idp",
          className: "sidebar-idp"
        },
        //iacm
        {
          type: "doc",
          label: "Infrastructure as Code Management",
          id: "iacm",
          className: "sidebar-iacm"
        },
        // DB DevOps
        {
          type: "doc",
          label: "Database DevOps",
          id: "database-devops",
          className: "sidebar-dbdevops",
        },
        //fme
        {
          type: "doc",
          label: "Feature Management & Experimentation",
          id: "feature-management-experimentation",
          className: "sidebar-fme",
        },
        //ce
        {
          type: "doc",
          label: "Resilience Testing - CE",
          id: "chaos-engineering",
          className: "sidebar-ce"
        },
        //asp
        {
          type: "doc",
          label: "API & Application Discovery",
          id: "api-application-discovery",
          className: "sidebar-asp"
        },
        //arp
        {
          type: "doc",
          label: "Application & API Runtime Protection",
          id: "api-application-protection",
          className: "sidebar-arp"
        },
        //sto
        {
          type: "doc",
          label: "Application Security Testing - STO",
          id: "sto",
          className: "sidebar-sto"
        },
        //scs
        {
          type: "doc",
          label: "Application Security Testing - SCS",
          id: "scs",
          className: "sidebar-ssca"
        },
        //ccm
        {
          type: "doc",
          label: "Cloud & AI Cost Management",
          id: "cloud-cost-management",
          className: "sidebar-ccm"
        },

        //sei
        {
          type: "doc",
          label: "AI DLC Insights",
          id: "sei",
          className: "sidebar-sei"
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
