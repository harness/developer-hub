// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

const sidebars = {
  allcontent: [
    // Documentation Parent
    {
      type: "category",
      label: "Documentation",
      className: "sidebar-all_docs",
      link: {
        type: "doc",
        id: "index",
      },
      collapsed: true,
      items: [
        // Platform Landing Page

        {
          type: "link",
          label: "Platform",
          className: "sidebar-platform",
          href: "/docs/platform",
          customProps: {
            description:
              "Learn how to manage Harness features that integrate with all modules.",
          },
        },
        // Code Repository Landing Page
        {
          type: "link",
          label: "Code Repository",
          className: "sidebar-cr",
          href: "/docs/code-repository",
          customProps: {
            description:
              "Manage code in Harness, and accelerate development with security at scale. (Beta)",
          },
        },
        // Continuous Integration landing page
        {
          type: "link",
          label: "Continuous Integration",
          className: "sidebar-ci",
          href: "/docs/continuous-integration",
          customProps: {
            description:
              "Learn how you can build faster and be more productive.",
          },
        },
        // Continuous Delivery Landing Page
        {
          type: "link",
          label: "Continuous Delivery & GitOps",
          className: "sidebar-cd",
          href: "/docs/continuous-delivery",
          customProps: {
            description:
              "Learn how to make your software releases more efficient and reliable.",
          },
        },
        {
          type: "link",
          href: "/docs/infrastructure-as-code-management",
          label: "Infrastructure as Code Management",
          className: "sidebar-iacm",

          customProps: {
            description:
              "Get started with Harness Infrastructure as Code Management",
          },
        },
        // Feature Flags Landing Page
        {
          type: "link",
          href: "/docs/feature-flags",
          label: "Feature Flags",
          className: "sidebar-ff",

          customProps: {
            description:
              "Learn how to change your software's functionality without deploying new code.",
          },
        },
        // Cloud Cost Management Landing Page
        {
          type: "link",
          href: "/docs/cloud-cost-management",
          label: "Cloud Cost Management",
          className: "sidebar-ccm",

          customProps: {
            description: "Learn how to manage and optimize cloud costs.",
          },
        },
        {
          type: "link",
          href: "/docs/security-testing-orchestration",
          label: "Security Testing Orchestration",
          className: "sidebar-sto",

          customProps: {
            description: "Learn how to left shift your security testing.",
          },
        },
        // SSCA
        {
          type: "link",
          href: "/docs/software-supply-chain-assurance",
          label: "Supply Chain Security",
          className: "sidebar-ssca",

          customProps: {
            description: "Learn how to secure your software supply chain.",
          },
        },
        {
          type: "link",
          href: "/docs/chaos-engineering",
          label: "Chaos Engineering",
          className: "sidebar-ce",
          customProps: {
            description: "Learn how to build and validate resilience.",
          },
        },
        // SSCA

        // Service Reliability Management Page
        {
          type: "link",
          href: "/docs/service-reliability-management",
          label: "Service Reliability Management",
          className: "sidebar-srm",

          customProps: {
            description:
              "Learn how to use real-time insights to improve the reliability of applications and services.",
          },
        },
        // Continuous Error Tracking landing page
        {
          type: "link",
          href: "/docs/continuous-error-tracking",
          label: "Continuous Error Tracking",
          className: "sidebar-cet",

          customProps: {
            description:
              "Learn how you can identify, triage, and resolve errors in applications.",
          },
        },
        {
          type: "link",
          href: "/docs/internal-developer-portal",
          label: "Internal Developer Portal",
          className: "sidebar-idp",

          customProps: {
            description: "Get started with Harness Internal Developer Portal",
          },
        },
        // SEI
        {
          type: "link",
          href: "/docs/software-engineering-insights",
          label: "Software Engineering Insights",
          className: "sidebar-sei",

          customProps: {
            description:
              "Learn how data-led insights can remove bottlenecks and improve productivity.",
          },
        },
        // SMP landing page
        {
          type: "link",
          href: "/docs/self-managed-enterprise-edition",
          label: "Self-Managed Enterprise Edition",
          className: "sidebar-smp",
          customProps: {
            description:
              "Learn how to use this end-to-end solution for continuous, self-managed delivery.",
          },
        },
        // Harness Open Source
        {
          type: "link",
          href: "/docs/open-source",
          label: "Open Source",
          className: "sidebar-opensource",
          customProps: {
            description:
              "Learn about the latest open source offerings from Harness.",
          },
        },
        {
          type: "category",
          label: "Harness FirstGen",
          className: "sidebar-harness-firstGen",
          link: {
            type: "generated-index",
            slug: "/first-gen",
          },
          customProps: {
            description: "Learn how to use Harness FirstGen modules.",
          },
          collapsed: true,
          items: [
            {
              type: "autogenerated",
              dirName: "first-gen",
            },
          ],
        },
        {
          type: "category",
          label: "FAQs",
          className: "sidebar-faqs",
          link: {
            type: "generated-index",
            slug: "/faqs",
          },

          customProps: {
            description: "Find answers to frequently asked questions.",
          },
          collapsed: true,
          items: [
            {
              type: "autogenerated",
              dirName: "faqs",
            },
          ],
        },
        {
          type: "category",
          label: "Troubleshooting",
          link: {
            type: "generated-index",
            slug: "/troubleshooting",
          },
          className: "sidebar-troubleshooting",
          customProps: {
            description:
              "Find details about common error messages, what causes them, and solutions.",
          },
          collapsed: true,
          items: [
            {
              type: "autogenerated",
              dirName: "troubleshooting",
            },
          ],
        },
        {
          type: "category",
          label: "Harness Cloud Operations",
          link: {
            type: "generated-index",
            slug: "/harness-cloud-operations",
          },
          className: "sidebar-Cloud_Operations",
          customProps: {
            description: "Information on how the Harness SaaS is managed.",
          },
          collapsed: true,
          items: [
            {
              type: "autogenerated",
              dirName: "harness-cloud-operations",
            },
          ],
        },
        // Release Notes
        {
          type: "link",
          label: "Release Notes",
          className: "sidebar-Release_Notes",
          href: "/release-notes",
          customProps: {
            description: "Learn about recent changes to Harness products.",
          },
        },
        // API Docs
        {
          type: "link",
          label: "API Reference",
          className: "sidebar-API_Reference",
          href: "https://apidocs.harness.io/",

          customProps: {
            description: "Harness API Docs.",
          },
        },
      ],
    },
  ],
  dbdevopsbeta: [
    {
      /*
      type: "doc",
      label: "DBDevOps",
      id: "database-devops",
      */
      type: "category",
      label: "Database DevOps",
      link: {
        type: "generated-index",
        slug: "/database-devops",
        /* Uncomment this block while we have a landing page for module docs
        type: "doc",
        id: "database-devops",
        */
      },
      collapsed: true,
      items: [
        {
          type: "autogenerated",
          dirName: "database-devops",
        },
      ],
    },

    //Additional Items in this parent can go here.
  ],
  //   individual module page sidebar start
  coderepository: [
    {
      type: "category",
      label: "Code Repository",
      className: "sidebar-cr",
      link: {
        type: "doc",
        id: "code-repository",
      },
      customProps: {
        description:
          "Manage code in Harness, and accelerate development with security at scale. (Beta)",
      },
      collapsed: true,
      items: [{ type: "autogenerated", dirName: "code-repository" }],
    },
    // Release Notes
    {
      type: "link",
      label: "Release Notes",
      className: "sidebar-Release_Notes",
      href: "/release-notes/code-repository",
      customProps: {
        description: "Learn about recent changes to Harness products.",
      },
    },
     // Roadmap
     {
      type: "link",
      label: "Roadmap",
      className: "sidebar-roadmap",
      href: "/roadmap/#code",
      customProps: {
        description: "Learn about recent changes to Harness products.",
      },
    },
    // API Docs
    {
      type: "link",
      label: "API Reference",
      className: "sidebar-API_Reference",
      href: "https://apidocs.harness.io/tag/repository/",
      customProps: {
        description: "Harness API Docs.",
      },
    },
    // All Docs
    {
      type: "link",
      label: "Show All Docs",
      className: "sidebar-all_docs",
      href: "/docs",
      customProps: {
        description: "All Docs.",
      },
    },
  ],

  platform: [
    {
      type: "category",
      label: "Platform",
      className: "sidebar-platform",
      link: {
        type: "doc",
        id: "platform",
      },
      customProps: {
        description:
          "Learn how to manage Harness features that integrate with all modules.",
      },
      collapsed: true,
      items: [
        {
          type: "autogenerated",
          dirName: "platform",
        },
      ],
    },
    // Release Notes
    {
      type: "link",
      label: "Release Notes",
      className: "sidebar-Release_Notes",
      href: "/release-notes/platform",
      customProps: {
        description: "Learn about recent changes to Harness products.",
      },
    },
     // Roadmap
     {
      type: "link",
      label: "Roadmap",
      className: "sidebar-roadmap",
      href: "/roadmap/#platform",
      customProps: {
        description: "Learn about recent changes to Harness products.",
      },
    },
    // API Docs
    {
      type: "link",
      label: "API Reference",
      className: "sidebar-API_Reference",
      href: "https://apidocs.harness.io/",
      customProps: {
        description: "Harness API Docs.",
      },
    },
    // All Docs
    {
      type: "link",
      label: "Show All Docs",
      className: "sidebar-all_docs",
      href: "/docs",
      customProps: {
        description: "All Docs.",
      },
    },
  ],

  continuousintegration: [
    {
      type: "category",
      label: "Continuous Integration",
      className: "sidebar-ci",
      link: {
        type: "doc",
        id: "continuous-integration",
      },
      customProps: {
        description: "Learn how you can build faster and be more productive.",
      },
      collapsed: true,
      items: [{ type: "autogenerated", dirName: "continuous-integration" }],
    }, // Release Notes
    {
      type: "link",
      label: "Release Notes",
      className: "sidebar-Release_Notes",
      href: "/release-notes/continuous-integration",
      customProps: {
        description: "Learn about recent changes to Harness products.",
      },
    },
     // Roadmap
     {
      type: "link",
      label: "Roadmap",
      className: "sidebar-roadmap",
      href: "/roadmap/#ci",
      customProps: {
        description: "Learn about recent changes to Harness products.",
      },
    },
    // API Docs
    {
      type: "link",
      label: "API Reference",
      className: "sidebar-API_Reference",
      href: "https://apidocs.harness.io/",
      customProps: {
        description: "Harness API Docs.",
      },
    },
    // All Docs
    {
      type: "link",
      label: "Show All Docs",
      className: "sidebar-all_docs",
      href: "/docs",
      customProps: {
        description: "All Docs.",
      },
    },
  ],
  continuousdelivery: [
    {
      type: "category",
      label: "Continuous Delivery & GitOps",
      className: "sidebar-cd",
      link: {
        type: "doc",
        id: "continuous-delivery",
      },
      customProps: {
        description:
          "Learn how to make your software releases more efficient and reliable.",
      },
      collapsed: true,
      items: [{ type: "autogenerated", dirName: "continuous-delivery" }],
    }, // Release Notes
    {
      type: "link",
      label: "Release Notes",
      className: "sidebar-Release_Notes",
      href: "/release-notes/continuous-delivery",
      customProps: {
        description: "Learn about recent changes to Harness products.",
      },
    },
     // Roadmap
     {
      type: "link",
      label: "Roadmap",
      className: "sidebar-roadmap",
      href: "/roadmap/#cd",
      customProps: {
        description: "Learn about recent changes to Harness products.",
      },
    },
    // API Docs
    {
      type: "link",
      label: "API Reference",
      className: "sidebar-API_Reference",
      href: "https://apidocs.harness.io/",
      customProps: {
        description: "Harness API Docs.",
      },
    },
    // All Docs
    {
      type: "link",
      label: "Show All Docs",
      className: "sidebar-all_docs",
      href: "/docs",
      customProps: {
        description: "All Docs.",
      },
    },
  ],
  infrastructureascodemanagement: [
    {
      type: "category",
      label: "Infrastructure as Code Management",
      className: "sidebar-iacm",
      link: {
        type: "doc",
        id: "infrastructure-as-code-management",
      },
      customProps: {
        description:
          "Get started with Harness Infrastructure as Code Management",
      },
      collapsed: true,
      items: [
        {
          type: "autogenerated",
          dirName: "infra-as-code-management",
        },
      ],
    }, // Release Notes
    {
      type: "link",
      label: "Release Notes",
      className: "sidebar-Release_Notes",
      href: "/release-notes/infrastructure-as-code-management",
      customProps: {
        description: "Learn about recent changes to Harness products.",
      },
    },
     // Roadmap
     {
      type: "link",
      label: "Roadmap",
      className: "sidebar-roadmap",
      href: "/roadmap/#iacm",
      customProps: {
        description: "Learn about recent changes to Harness products.",
      },
    },
    // API Docs
    {
      type: "link",
      label: "API Reference",
      className: "sidebar-API_Reference",
      href: "https://apidocs.harness.io/",
      customProps: {
        description: "Harness API Docs.",
      },
    },
    // All Docs
    {
      type: "link",
      label: "Show All Docs",
      className: "sidebar-all_docs",
      href: "/docs",
      customProps: {
        description: "All Docs.",
      },
    },
  ],
  featureflags: [
    // Feature Flags Landing Page
    {
      type: "category",
      label: "Feature Flags",
      className: "sidebar-ff",
      link: {
        type: "doc",
        id: "feature-flags",
      },
      customProps: {
        description:
          "Learn how to change your software's functionality without deploying new code.",
      },
      collapsed: true,
      items: [{ type: "autogenerated", dirName: "feature-flags" }],
    }, // Release Notes
    {
      type: "link",
      label: "Release Notes",
      className: "sidebar-Release_Notes",
      href: "/release-notes/feature-flags",
      customProps: {
        description: "Learn about recent changes to Harness products.",
      },
    },
     // Roadmap
     {
      type: "link",
      label: "Roadmap",
      className: "sidebar-roadmap",
      href: "/roadmap/#ff",
      customProps: {
        description: "Learn about recent changes to Harness products.",
      },
    },
    // API Docs
    {
      type: "link",
      label: "API Reference",
      className: "sidebar-API_Reference",
      href: "https://apidocs.harness.io/",
      customProps: {
        description: "Harness API Docs.",
      },
    },
    // All Docs
    {
      type: "link",
      label: "Show All Docs",
      className: "sidebar-all_docs",
      href: "/docs",
      customProps: {
        description: "All Docs.",
      },
    },
  ],
  cloudcostmanagement: [
    // Cloud Cost Management Landing Page
    {
      type: "category",
      label: "Cloud Cost Management",
      className: "sidebar-ccm",
      link: {
        type: "doc",
        id: "cloud-cost-management",
      },
      customProps: {
        description: "Learn how to manage and optimize cloud costs.",
      },
      collapsed: true,
      items: [{ type: "autogenerated", dirName: "cloud-cost-management" }],
    }, // Release Notes
    {
      type: "link",
      label: "Release Notes",
      className: "sidebar-Release_Notes",
      href: "/release-notes/cloud-cost-management",
      customProps: {
        description: "Learn about recent changes to Harness products.",
      },
    },
     // Roadmap
     {
      type: "link",
      label: "Roadmap",
      className: "sidebar-roadmap",
      href: "/roadmap/#ccm",
      customProps: {
        description: "Learn about recent changes to Harness products.",
      },
    },
    // API Docs
    {
      type: "link",
      label: "API Reference",
      className: "sidebar-API_Reference",
      href: "https://apidocs.harness.io/",
      customProps: {
        description: "Harness API Docs.",
      },
    },
    // All Docs
    {
      type: "link",
      label: "Show All Docs",
      className: "sidebar-all_docs",
      href: "/docs",
      customProps: {
        description: "All Docs.",
      },
    },
  ],
  securitytestingorchestration: [
    {
      type: "category",
      label: "Security Testing Orchestration",
      className: "sidebar-sto",
      link: {
        type: "doc",
        id: "security-testing-orchestration",
      },
      customProps: {
        description: "Learn how to left shift your security testing.",
      },
      collapsed: true,
      items: [
        {
          type: "autogenerated",
          dirName: "security-testing-orchestration",
        },
      ],
    }, // Release Notes
    {
      type: "link",
      label: "Release Notes",
      className: "sidebar-Release_Notes",
      href: "/release-notes/security-testing-orchestration",
      customProps: {
        description: "Learn about recent changes to Harness products.",
      },
    },
     // Roadmap
     {
      type: "link",
      label: "Roadmap",
      className: "sidebar-roadmap",
      href: "/roadmap/#sto",
      customProps: {
        description: "Learn about recent changes to Harness products.",
      },
    },
    // API Docs
    {
      type: "link",
      label: "API Reference",
      className: "sidebar-API_Reference",
      href: "https://apidocs.harness.io/",
      customProps: {
        description: "Harness API Docs.",
      },
    },
    // All Docs
    {
      type: "link",
      label: "Show All Docs",
      className: "sidebar-all_docs",
      href: "/docs",
      customProps: {
        description: "All Docs.",
      },
    },
  ],
  softwaresupplychainassurance: [
    {
      type: "category",
      label: "Supply Chain Security",
      className: "sidebar-ssca",
      link: {
        type: "doc",
        id: "software-supply-chain-assurance",
      },
      customProps: {
        description: "Learn how to secure your software supply chain.",
      },
      collapsed: true,
      items: [
        {
          type: "autogenerated",
          dirName: "software-supply-chain-assurance",
        },
      ],
    }, // Release Notes
    {
      type: "link",
      label: "Release Notes",
      className: "sidebar-Release_Notes",
      href: "/release-notes/software-supply-chain-assurance",
      customProps: {
        description: "Learn about recent changes to Harness products.",
      },
    },
     // Roadmap
     {
      type: "link",
      label: "Roadmap",
      className: "sidebar-roadmap",
      href: "/roadmap/#ssca",
      customProps: {
        description: "Learn about recent changes to Harness products.",
      },
    },
    // API Docs
    {
      type: "link",
      label: "API Reference",
      className: "sidebar-API_Reference",
      href: "https://apidocs.harness.io/",
      customProps: {
        description: "Harness API Docs.",
      },
    },
    // All Docs
    {
      type: "link",
      label: "Show All Docs",
      className: "sidebar-all_docs",
      href: "/docs",
      customProps: {
        description: "All Docs.",
      },
    },
  ],
  chaosengineering: [
    {
      type: "category",
      label: "Chaos Engineering",
      className: "sidebar-ce",
      link: {
        type: "doc",
        id: "chaos-engineering",
      },
      customProps: {
        description: "Learn how to build and validate resilience.",
      },
      collapsed: true,
      items: [
        {
          type: "autogenerated",
          dirName: "chaos-engineering",
        },
      ],
    }, // Release Notes
    {
      type: "link",
      label: "Release Notes",
      className: "sidebar-Release_Notes",
      href: "/release-notes/chaos-engineering",
      customProps: {
        description: "Learn about recent changes to Harness products.",
      },
    },
     // Roadmap
     {
      type: "link",
      label: "Roadmap",
      className: "sidebar-roadmap",
      href: "/roadmap/#ce",
      customProps: {
        description: "Learn about recent changes to Harness products.",
      },
    },
    // API Docs
    {
      type: "link",
      label: "API Reference",
      className: "sidebar-API_Reference",
      href: "https://apidocs.harness.io/chaos.html",
      customProps: {
        description: "Harness API Docs.",
      },
    },
    // All Docs
    {
      type: "link",
      label: "Show All Docs",
      className: "sidebar-all_docs",
      href: "/docs",
      customProps: {
        description: "All Docs.",
      },
    },
  ],
  servicereliabilitymanagement: [
    // Service Reliability Management Page
    {
      type: "category",
      label: "Service Reliability Management",
      className: "sidebar-srm",
      link: {
        type: "doc",
        id: "service-reliability-management",
      },
      customProps: {
        description:
          "Learn how to use real-time insights to improve the reliability of applications and services.",
      },
      collapsed: true,
      items: [
        {
          type: "autogenerated",
          dirName: "service-reliability-management",
        },
      ],
    }, // Release Notes
    {
      type: "link",
      label: "Release Notes",
      className: "sidebar-Release_Notes",
      href: "/release-notes/service-reliability-management",
      customProps: {
        description: "Learn about recent changes to Harness products.",
      },
    },
     // Roadmap
     {
      type: "link",
      label: "Roadmap",
      className: "sidebar-roadmap",
      href: "/roadmap/#srm",
      customProps: {
        description: "Learn about recent changes to Harness products.",
      },
    },
    // API Docs
    {
      type: "link",
      label: "API Reference",
      className: "sidebar-API_Reference",
      href: "https://apidocs.harness.io/",
      customProps: {
        description: "Harness API Docs.",
      },
    },
    // All Docs
    {
      type: "link",
      label: "Show All Docs",
      className: "sidebar-all_docs",
      href: "/docs",
      customProps: {
        description: "All Docs.",
      },
    },
  ],
  continuouserrortracking: [
    // Continuous Error Tracking landing page
    {
      type: "category",
      label: "Continuous Error Tracking",
      className: "sidebar-cet",
      link: {
        type: "doc",
        id: "continuous-error-tracking",
      },
      customProps: {
        description:
          "Learn how you can identify, triage, and resolve errors in applications.",
      },
      collapsed: true,
      items: [
        {
          type: "autogenerated",
          dirName: "continuous-error-tracking",
        },
      ],
    }, // Release Notes
    {
      type: "link",
      label: "Release Notes",
      className: "sidebar-Release_Notes",
      href: "/release-notes/continuous-error-tracking",
      customProps: {
        description: "Learn about recent changes to Harness products.",
      },
    },
    // API Docs
    {
      type: "link",
      label: "API Reference",
      className: "sidebar-API_Reference",
      href: "https://apidocs.harness.io/",
      customProps: {
        description: "Harness API Docs.",
      },
    },
    // All Docs
    {
      type: "link",
      label: "Show All Docs",
      className: "sidebar-all_docs",
      href: "/docs",
      customProps: {
        description: "All Docs.",
      },
    },
  ],
  internaldeveloperportal: [
    {
      type: "category",
      label: "Internal Developer Portal",
      className: "sidebar-idp",
      link: {
        type: "doc",
        id: "internal-developer-portal",
      },
      customProps: {
        description: "Get started with Harness Internal Developer Portal",
      },
      collapsed: true,
      items: [
        {
          type: "autogenerated",
          dirName: "internal-developer-portal",
        },
      ],
    }, // Release Notes
    {
      type: "link",
      label: "Release Notes",
      className: "sidebar-Release_Notes",
      href: "/release-notes/internal-developer-portal",
      customProps: {
        description: "Learn about recent changes to Harness products.",
      },
    },
     // Roadmap
     {
      type: "link",
      label: "Roadmap",
      className: "sidebar-roadmap",
      href: "/roadmap/#idp",
      customProps: {
        description: "Learn about recent changes to Harness products.",
      },
    },
    // API Docs
    {
      type: "link",
      label: "API Reference",
      className: "sidebar-API_Reference",
      href: "https://apidocs.harness.io/",
      customProps: {
        description: "Harness API Docs.",
      },
    },
    // All Docs
    {
      type: "link",
      label: "Show All Docs",
      className: "sidebar-all_docs",
      href: "/docs",
      customProps: {
        description: "All Docs.",
      },
    },
  ],
  softwareengineeringinsights: [
    {
      type: "category",
      label: "Software Engineering Insights",
      className: "sidebar-sei",
      link: {
        type: "doc",
        id: "software-engineering-insights",
      },
      customProps: {
        description:
          "Learn how data-led insights can remove bottlenecks and improve productivity.",
      },
      collapsed: true,
      items: [
        {
          type: "autogenerated",
          dirName: "software-engineering-insights",
        },
      ],
    }, // Release Notes
    {
      type: "link",
      label: "Release Notes",
      className: "sidebar-Release_Notes",
      href: "/release-notes/software-engineering-insights",
      customProps: {
        description: "Learn about recent changes to Harness products.",
      },
    },
     // Roadmap
     {
      type: "link",
      label: "Roadmap",
      className: "sidebar-roadmap",
      href: "/roadmap/#sei",
      customProps: {
        description: "Learn about recent changes to Harness products.",
      },
    },
    // API Docs
    {
      type: "link",
      label: "API Reference",
      className: "sidebar-API_Reference",
      href: "https://apidocs.harness.io/",
      customProps: {
        description: "Harness API Docs.",
      },
    },
    // All Docs
    {
      type: "link",
      label: "Show All Docs",
      className: "sidebar-all_docs",
      href: "/docs",
      customProps: {
        description: "All Docs.",
      },
    },
  ],
  selfmanagedenterpriseedition: [
    {
      type: "category",
      label: "Self-Managed Enterprise Edition",
      className: "sidebar-smp",
      link: {
        type: "doc",
        id: "self-managed-enterprise-edition",
      },
      customProps: {
        description:
          "Learn how to use this end-to-end solution for continuous, self-managed delivery.",
      },
      collapsed: true,
      items: [
        {
          type: "autogenerated",
          dirName: "self-managed-enterprise-edition",
        },
      ],
    }, // Release Notes
    {
      type: "link",
      label: "Release Notes",
      className: "sidebar-Release_Notes",
      href: "/release-notes/self-managed-enterprise-edition",
      customProps: {
        description: "Learn about recent changes to Harness products.",
      },
    },
    // API Docs
    {
      type: "link",
      label: "API Reference",
      className: "sidebar-API_Reference",
      href: "https://apidocs.harness.io/",
      customProps: {
        description: "Harness API Docs.",
      },
    },
    // All Docs
    {
      type: "link",
      label: "Show All Docs",
      className: "sidebar-all_docs",
      href: "/docs",
      customProps: {
        description: "All Docs.",
      },
    },
  ],
  opensource: [
    {
      type: "category",
      label: "Open Source",
      className: "sidebar-opensource",
      link: {
        type: "doc",
        id: "open-source",
      },
      customProps: {
        description:
          "Learn about the latest open source offerings from Harness.",
      },
      collapsed: true,
      items: [{ type: "autogenerated", dirName: "open-source" }],
    },
    // Release Notes
    {
      type: "link",
      label: "Release Notes",
      className: "sidebar-Release_Notes",
      href: "/release-notes/code-repository",
      customProps: {
        description: "Learn about recent changes to Harness products.",
      },
    },
     // Roadmap
     {
      type: "link",
      label: "Roadmap",
      className: "sidebar-roadmap",
      href: "/roadmap/#code",
      customProps: {
        description: "Learn about recent changes to Harness products.",
      },
    },
    // API Docs
    {
      type: "link",
      label: "API Reference",
      className: "sidebar-API_Reference",
      href: "https://apidocs.harness.io/tag/repository/",
      customProps: {
        description: "Harness API Docs.",
      },
    },
    // All Docs
    {
      type: "link",
      label: "Show All Docs",
      className: "sidebar-all_docs",
      href: "/docs",
      customProps: {
        description: "All Docs.",
      },
    },
  ],
};

module.exports = sidebars;
