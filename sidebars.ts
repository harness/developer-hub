import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
const sidebars: SidebarsConfig = {
  
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
        // Artifact Registry landing page
        {
          type: "link",
          label: "Artifact Registry ",
          className: "sidebar-ar",
          href: "/docs/artifact-registry",
          customProps: {
            description: "Store your artifacts natively with Harness."
          }
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
        // Database DevOps Landing Page
        {
          type: "link",
          href: "/docs/database-devops",
          label: "Database DevOps",
          className: "sidebar-dbdevops",

          customProps: {
            description:
              "Get started with Harness Database DevOps",
          },
        },
        // Infrastructure as Code Landing Page
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
        // SCS
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
        // Incident Response Landing Page
        {
          type: "link",
          href: "/docs/incident-response",
          label: "Incident Response",
          className: "sidebar-ir",
          customProps: {
            description:
              "Get started with Harness Incident Response",
          },
        },
        // SCS

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
        //{
        //  type: "link",
        //  href: "/docs/continuous-error-tracking",
        //  label: "Continuous Error Tracking",
        //  className: "sidebar-cet",
        //
        //  customProps: {
        //    description:
        //      "Learn how you can identify, triage, and resolve errors in applications.",
        //  },
        //},
        {
          type: "link",
          href: "/docs/internal-developer-portal",
          label: "Internal Developer Portal",
          className: "sidebar-idp",

          customProps: {
            description: "Get started with Harness Internal Developer Portal",
          },
        },
        // Cloud Development Environments Landing Page
        {
          type: "link",
          label: "Cloud Development Environments",
          className: "sidebar-cde",
          href: "/docs/cloud-development-environments",
          
          customProps: {
            description:
              "Accelerate developer experience with secure, scalable and pre-configured development environments",
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
  //Additional Items in this parent can go here.
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
        description:
          "Get started with Harness Continuous Integration",
      },
      collapsed: true,
      items: [
    {
      type: "html",
      value: "New to Harness CI?",
      className: "horizontal-bar",
    },
    "continuous-integration/get-started/overview",
    "continuous-integration/get-started/key-concepts",
    "continuous-integration/get-started/onboarding-guide",
    {
      type: "html",
      value: "Use Harness CI",
      className: "horizontal-bar",
    },
    {
      type: "category",
      label: "Migrate to Harness CI",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: [ { type: "autogenerated", dirName: "continuous-integration/migration-guides", } ],
    },
    {
      type: "category",
      label: "Use Harness CI",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: [ { type: "autogenerated", dirName: "continuous-integration/use-ci", } ],
    },
    {
      type: "category",
      label: "Secure Harness CI",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: [ { type: "autogenerated", dirName: "continuous-integration/secure-ci", } ],
    },
    {
      type: "html",
      value: "Troubleshooting & Resources",
      className: "horizontal-bar",
    },
    "continuous-integration/ci-supported-platforms",
    "continuous-integration/get-started/ci-subscription-mgmt",
    {
      type: "category",
      label: "Troubleshoot Harness CI",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: [ { type: "autogenerated", dirName: "continuous-integration/troubleshoot-ci", } ],
    },
    {
      type: "category",
      label: "Tutorials and Code Samples",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: [ { type: "autogenerated", dirName: "continuous-integration/development-guides", } ],
    },
    ]
  },
    // Release Notes
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
  artifactregistry: [
    {
      type: "category",
      label: "Artifact Registry",
      className: "sidebar-ar",
      link: {
        type: "doc",
        id: "artifact-registry",
      },
      customProps: {
        description: "Learn how to store artifacts securely.",
      },
      collapsed: true,
      items: [
    {
      type: "html",
      value: "New to Artifact Registry?",
      className: "horizontal-bar",
    },
    "artifact-registry/get-started/overview", 
    "artifact-registry/get-started/quickstart",    
    {
      type: "html",
      value: "Use Artifact Registry",
      className: "horizontal-bar",
    },
    {
      type: "category",
      label: "Manage Registries",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: [ { type: "autogenerated", dirName: "artifact-registry/manage-registries", } ],
    },
    {
      type: "category",
      label: "Manage Artifacts",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: [ { type: "autogenerated", dirName: "artifact-registry/manage-artifacts", } ],
    },
    "artifact-registry/supported-formats",
    {
      type: "category",
      label: "Platform Integrations",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: [ { type: "autogenerated", dirName: "artifact-registry/platform-integrations", } ],
    },
    {
      type: "html",
      value: "Troubleshooting & Resources",
      className: "horizontal-bar",
    },
    "artifact-registry/whats-supported",
    {
      type: "category",
      label: "Authorization & Authentication",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: [ { type: "autogenerated", dirName: "artifact-registry/troubleshooting/authorization", } ],
    },
      ],
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
      type: "html",
      value: "New to IaCM?",
      className: "horizontal-bar",
    },
    "infra-as-code-management/get-started/overview",
    "infra-as-code-management/get-started/get-started",
    {
      type: "html",
      value: "Use IaCM",
      className: "horizontal-bar",
    },
    {
      type: "category",
      label: "Workspaces",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: [ { type: "autogenerated", dirName: "infra-as-code-management/workspaces", } ],
    },
    {
      type: "category",
      label: "Pipelines",
      link: {
        type: "generated-index",
        slug:"/category/iacm-pipelines"
      },
      collapsed: true,
      items: [ { type: "autogenerated", dirName: "infra-as-code-management/pipelines", } ],
    },
    {
      type: "category",
      label: "Module Registry",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: [ { type: "autogenerated", dirName: "infra-as-code-management/iacm-features/module-registry", } ],
    },
    {
      type: "category",
      label: "Policy & Governance",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: [ { type: "autogenerated", dirName: "infra-as-code-management/policies-governance", } ],
    },
    {
      type: "category",
      label: "Project Settings",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: [ { type: "autogenerated", dirName: "infra-as-code-management/project-setup", } ],
    },
    {
      type: "category",
      label: "Remote Backends",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: [ { type: "autogenerated", dirName: "infra-as-code-management/remote-backends", } ],
    },
    {
      type: "category",
      label: "Reports & Insights",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: [ { type: "autogenerated", dirName: "infra-as-code-management/reports-insights", } ],
    },
    {
      type: "html",
      value: "Troubleshooting & Resources",
      className: "horizontal-bar",
    },
    "infra-as-code-management/whats-supported",
    "infra-as-code-management/iacm-best-practices",
    "infra-as-code-management/iacm-security",
    "infra-as-code-management/faq",
    ]
  },
    // Release Notes
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
    }, 
    // Release Notes
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
  
  databasedevops: [
    // Database DevOps Landing Page
    {
      type: "category",
      label: "Database DevOps",
      link: {
        type: "doc",
        id: "database-devops",
      },
      className: "sidebar-dbdevops",
      customProps: {
        description:
          "Learn how to manage Harness Database DevOps.",
      },
      collapsed: true,
      items: [{ type: "autogenerated", dirName: "database-devops" }],
    }, 
    // Release Notes
    {
      type: "link",
      label: "Release Notes",
      className: "sidebar-Release_Notes",
      href: "/release-notes/database-devops",
      customProps: {
        description: "Learn about recent changes to Harness Database DevOps.",
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
      items: [ 
      {
        type: "html",
        value: '<span style="color:#000000; font-weight:1000;"> New to CCM? </span>',
        className: "horizontal-bar",
      },
      "cloud-cost-management/get-started/overview",
      "cloud-cost-management/whats-supported",
      {
        type: "category",
        label: "Onboarding",
        link: {
          type: "generated-index",
        },
       collapsed: true,
       items: [ { type: "autogenerated", dirName: "cloud-cost-management/get-started/onboarding-guide", } ],
      },

      {
        type: "category",
        label: "CCM on Harness Self-Managed Enterprise Edition",
        link: {
          type: "generated-index",
        },
       collapsed: true,
       items: [ { type: "autogenerated", dirName: "cloud-cost-management/get-started/ccm-smp", } ],
      },
      {
        type: "html",
        value: '<span style="color:#000000; font-weight:1000;"> Use CCM </span>',
        className: "horizontal-bar",
      },
      "cloud-cost-management/get-started/key-concepts",
      {
        type: "category",
        label: "Root Cost Analysis",
        link: {
          type: "generated-index",
        },
       collapsed: true,
       items: [ { type: "autogenerated", dirName: "cloud-cost-management/3-use-ccm-cost-reporting/3-root-cost-analysis", } ],
      },
      {
        type: "category",
        label: "CCM Architecture Diagrams",
        link: {
          type: "generated-index",
        },
       collapsed: true,
       items: [ { type: "autogenerated", dirName: "cloud-cost-management/architecture-diagrams", } ],
      },
      {
        type: "html",
        value: '<span style="color:#4B5563; font-weight:600;"> Cost Reporting </span>',
        className: "horizontal-bar",
      },
      {
        type: "category",
        label: "Perspectives",
        link: {
          type: "generated-index",
        },
       collapsed: true,
       items: [ { type: "autogenerated", dirName: "cloud-cost-management/3-use-ccm-cost-reporting/1-ccm-perspectives", } ],
      },
      {
        type: "category",
        label: "BI Dashboards",
        link: {
          type: "generated-index",
        },
       collapsed: true,
       items: [ { type: "autogenerated", dirName: "cloud-cost-management/3-use-ccm-cost-reporting/6-use-ccm-dashboards", } ],
      },
      {
        type: "category",
        label: "Cost Categories",
        link: {
          type: "generated-index",
        },
       collapsed: true,
       items: [ { type: "autogenerated", dirName: "cloud-cost-management/3-use-ccm-cost-reporting/2-ccm-cost-categories", } ],
      },
      {
        type: "category",
        label: "Anomalies",
        link: {
          type: "generated-index",
        },
       collapsed: true,
       items: [ { type: "autogenerated", dirName: "cloud-cost-management/3-use-ccm-cost-reporting/anomaly-detection", } ],
      },
      {
        type: "html",
        value: '<span style="color:#4B5563; font-weight:600;">Cost Optimization </span>',
        className: "horizontal-bar",
      },
      {
        type: "category",
        label: "Recommendations",
        link: {
          type: "generated-index",
        },
       collapsed: true,
       items: [ { type: "autogenerated", dirName: "cloud-cost-management/4-use-ccm-cost-optimization/1-ccm-recommendations", } ],
      },
      {
        type: "category",
        label: "AutoStopping Rules",
        link: {
          type: "generated-index",
        },
       collapsed: true,
       items: [ { type: "autogenerated", dirName: "cloud-cost-management/4-use-ccm-cost-optimization/1-optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules", } ],
      },
      {
        type: "category",
        label: "Cluster Orchestrator for AWS EKS clusters (Beta)",
        link: {
          type: "generated-index",
        },
       collapsed: true,
       items: [ { type: "autogenerated", dirName: "cloud-cost-management/4-use-ccm-cost-optimization/cluster-orchestrator", } ],
      },
      {
        type: "category",
        label: "Commitment Orchestrator",
        link: {
          type: "generated-index",
        },
       collapsed: true,
       items: [ { type: "autogenerated", dirName: "cloud-cost-management/4-use-ccm-cost-optimization/commitment-orch-docs", } ],
      },
      {
        type: "html",
        value: '<span style="color:#4B5563; font-weight:600;"> Cost Governance </span>',
        className: "horizontal-bar",
      },
      {
        type: "category",
        label: "Budgets",
        link: {
          type: "generated-index",
        },
       collapsed: true,
       items: [ { type: "autogenerated", dirName: "cloud-cost-management/5-use-ccm-cost-governance/ccm-budgets", } ],
      },
      {
        type: "category",
        label: "Asset Governance",
        link: {
          type: "generated-index",
        },
       collapsed: true,
       items: [ { type: "autogenerated", dirName: "cloud-cost-management/5-use-ccm-cost-governance/asset-governance", } ],
      },
      {
        type: "html",
        value: '<span style="color:#000000; font-weight:1000;"> CCM Resources</span>',
        className: "horizontal-bar",
      },
      {
        type: "category",
        label: "Access Control",
        link: {
          type: "generated-index",
        },
       collapsed: true,
       items: [ { type: "autogenerated", dirName: "cloud-cost-management/access-control", } ],
      },
      "cloud-cost-management/ccm-auditing",
      "cloud-cost-management/product-behaviour",
      {
        type: "category",
        label: "AutoStopping Guides",
        link: {
          type: "generated-index",
        },
       collapsed: true,
       items: [ { type: "autogenerated", dirName: "cloud-cost-management/4-use-ccm-cost-optimization/autostopping-guides", } ],
      },
    ]
    },
      // Release Notes
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
  incidentresponse: [
    {
      type: "category",
      label: "Incident Response",
      className: "sidebar-ir",
      link: {
        type: "doc",
        id: "incident-response",
      },
      customProps: {
        description: "Revolutionize incident management by focusing on proactive issue prevention and accelerated resolution.",
      },
      collapsed: true,
      items: [
        {
          type: "html",
          value: "New to IR?",
          className: "horizontal-bar",
        },
        "incident-response/get-started/overview",
        {
          type: "html",
          value: "Use IR",
          className: "horizontal-bar",
        },
        {
          type:"category",
          label: "Alerts",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "incident-response/alerts", } ],
        },
        {
          type:"category",
          label: "Incidents",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "incident-response/incidents", } ],
        },
        {
          type:"category",
          label: "AI IR Agent",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "incident-response/ai-ir-agent", } ],
        },
        {
          type:"category",
          label: "Oncall",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "incident-response/oncall", } ],
        },
        {
          type:"category",
          label: "Runbooks",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "incident-response/runbooks", } ],
        },
        {
          type: "html",
          value: "Troubleshooting & Resources",
          className: "horizontal-bar",
        },
        "incident-response/resources/whats-supported",
        "incident-response/resources/ir-best-practices",
        "incident-response/resources/faq"
      ],
    },
     // Roadmap
     {
      type: "link",
      label: "Roadmap",
      className: "sidebar-roadmap",
      href: "/roadmap/#ir",
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
  clouddevelopmentenvironment: [
    {
      type: "category",
      label: "Cloud Development Environments",
      className: "sidebar-cde",
      link: {
        type: "doc",
        id: "cloud-development-environments",
      },
      customProps: {
        description:
          "Accelerate developer experience with secure, scalable and pre-configured development environments",
      },
      collapsed: true,
      items: [{ type: "autogenerated", dirName: "cloud-development-environments" }],
    }, // Release Notes
    {
      type: "link",
      label: "Release Notes",
      className: "sidebar-Release_Notes",
      href: "/release-notes/cloud-development-environments",
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

export default sidebars;
