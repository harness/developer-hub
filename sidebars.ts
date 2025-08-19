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
            description: 'Store your artifacts natively with Harness.',
          },
        },
        // AI Test Automation landing page
        {
          type: 'link',
          label: 'AI Test Automation',
          className: 'sidebar-ata',
          href: '/docs/ai-test-automation',
          customProps: {
            description: 'Store your AI Test Automation natively with Harness.',
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
        // Feature Management & Experimentation Landing Page
        {
          type: "link",
          href: "/docs/feature-management-experimentation",
          label: "Feature Management & Experimentation",
          className: "sidebar-fme",

          customProps: {
            description:
              "Learn how to enable data-driven features and gradual rollouts.",
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
          className: "sidebar-ce-new",
          customProps: {
            description: "Learn how to build and validate resilience.",
          },
        },
        // AI SRE Landing Page
        {
          type: "link",
          href: "/docs/ai-sre",
          label: "AI SRE",
          className: "sidebar-aisre",
          customProps: {
            description:
              "Get started with Harness AI SRE",
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
    {
      type: "category",
      label: "Platform Integrations",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: [ { type: "autogenerated", dirName: "artifact-registry/platform-integrations", } ],
    },
    "artifact-registry/ar-webhooks",
    {
      type: "html",
      value: "Troubleshooting & Resources",
      className: "horizontal-bar",
    },
    "artifact-registry/whats-supported",
    "artifact-registry/ar-best-practices",
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
        description: "All Docs."
      },
    },
  ],
  aitestautomation: [
    {
      type: 'category',
      label: 'AI Test Automation',
      className: 'sidebar-ata',
      link: {
        type: 'doc',
        id: 'ai-test-automation',
      },
      customProps: {
        description: 'Learn how to store AI Test Automation securely.',
      },
      collapsed: true,
      items: [
        {
          type: 'html',
          value: 'New to AI Test Automation',
          className: 'horizontal-bar',
        },
        'ai-test-automation/get-started/overview',
        'ai-test-automation/get-started/quickstart',
        {
          type: 'html',
          value: 'Use AI Test Automation',
          className: 'horizontal-bar',
        },
        {
          type: 'category',
          label: 'Test Authoring',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'ai-test-automation/test-authoring' }],
        },
        {
          type: 'category',
          label: 'Test Execution',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'ai-test-automation/test-execution' }],
        },
        {
          type: 'category',
          label: 'Test Environments',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'ai-test-automation/test-environments' }],
        },
        {
          type: 'category',
          label: 'Test Suites',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'ai-test-automation/test-suite' }],
        },
        {
          type: "html",
          value: "Best Practices & Resources",
          className: "horizontal-bar",
       },
        {
          type: 'category',
          label: 'Best Practices',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'ai-test-automation/best-practices' }],
        },
        {
          type: 'category',
          label: 'Additional Resources',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'ai-test-automation/additional-resources' }],
        },
      ]

    },
    // All Docs
    {
      type: 'link',
      label: 'Show All Docs',
      className: 'sidebar-all_docs',
      href: '/docs',
      customProps: {
        description: 'All Docs.',
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
      label: "CLI Commands",
      link: {
        type: "generated-index",
        slug:"/category/iacm-cli-commands"
      },
      collapsed: true,
      items: [ { type: "autogenerated", dirName: "infra-as-code-management/cli-commands", } ],
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
      label: "Manage Projects",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: [ { type: "autogenerated", dirName: "infra-as-code-management/manage-projects", } ],
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
  featuremanagementexperimentation: [
    // Feature Management & Experimentation
    {
      type: "category",
      label: "Feature Management & Experimentation",
      className: "sidebar-fme",
      link: {
        type: "doc",
        id: "feature-management-experimentation",
      },
      customProps: {
        description:
          "Learn how to enable data-driven features and gradual rollouts.",
      },
      collapsed: true,
      items: [
        {
          type: "html",
          value: "New to FME?",
          className: "horizontal-bar",
        },
        /* We could also do this way, if we want the tiles (for docs) to show on the Getting started page
        {
          type: "category",
          label: "Getting started",
          link: {
            type: "generated-index",
            slug: "feature-management-experimentation/getting-started",
          },
          collapsed: true,
          items: [ //{ type: "autogenerated", dirName: "feature-management-experimentation", }
            "feature-management-experimentation/getting-started/overview",
            "feature-management-experimentation/getting-started/onboarding-guide",
            "feature-management-experimentation/getting-started/tutorials/index",
          ],
        },
        */
        {
          type: "category",
          label: "Getting started",
          link: {
            type: "generated-index",
            slug: "feature-management-experimentation/getting-started",
          },
          collapsed: true,
          items: [
            { type: "autogenerated", 
              dirName: "feature-management-experimentation/10-getting-started",
            },
          ],
        },
        {
          type: "category",
          label: "SDKs and infrastructure",
          link: {
            type: "generated-index",
            slug: "feature-management-experimentation/sdks-and-infrastructure",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "feature-management-experimentation/20-sdks-and-infrastructure", }
          ],
        },
        {
          type: "html",
          value: "Features",
          className: "horizontal-bar",
        },
        {
          type: "category",
          label: "Feature management",
          link: {
            type: "generated-index",
            slug: "feature-management-experimentation/feature-management",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "feature-management-experimentation/40-feature-management", }
          ],
        },
        {
          type: "category",
          label: "Release monitoring",
          link: {
            type: "generated-index",
            slug: "feature-management-experimentation/release-monitoring",
          },
          collapsed: true,
          items: [
            { 
              type: "autogenerated", 
              dirName: "feature-management-experimentation/50-release-monitoring", 
            }
          ],
        },
        {
          type: "category",
          label: "Experimentation",
          link: {
            type: "generated-index",
            slug: "feature-management-experimentation/experimentation",
          },
          collapsed: true,
          items: [ 
            { 
              type: "autogenerated", 
              dirName: "feature-management-experimentation/60-experimentation", 
            }
          ],
        },
        {
          type: "category",
          label: "Release Agent",
          link: {
            type: "doc",
            id: "feature-management-experimentation/release-agent/index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "feature-management-experimentation/release-agent", }
          ],
        },
        {
          type: "html",
          value: "Management & Administration",
          className: "horizontal-bar",
        },
        {
          type: "category",
          label: "Team settings",
          link: {
            type: "doc",
            id: "feature-management-experimentation/team-and-project-settings/index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "feature-management-experimentation/team-and-project-settings", }
          ],
        },
        {
          type: "category",
          label: "Account settings",
          link: {
            type: "generated-index",
            slug: "feature-management-experimentation/account-settings",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "feature-management-experimentation/70-management-and-administration", }
          ],
        },
        {
          type: "category",
          label: "Integrations",
          link: {
            type: "doc",
            id: "feature-management-experimentation/integrations/index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "feature-management-experimentation/80-integrations", }
          ],
        },
        {
          type: "category",
          label: "API",
          link: {
            type: "doc",
            id: "feature-management-experimentation/api/index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "feature-management-experimentation/api", }
          ],
        },
        {
          type: "html",
          value: 'Troubleshooting & Resources',
          className: "horizontal-bar",
        },
        {
          type: "category",
          label: "Migrate from Split to Harness",
          link: {
            type: "doc",
            id: "feature-management-experimentation/split-to-harness/index",
          },
          collapsed: true,
          items: [
            "feature-management-experimentation/split-to-harness/how-it-works",
            "feature-management-experimentation/split-to-harness/administering-migrated-account",
            "feature-management-experimentation/split-to-harness/first-login",
            "feature-management-experimentation/split-to-harness/migrated-account",
            "feature-management-experimentation/split-to-harness/invitation",
            "feature-management-experimentation/split-to-harness/api-updates",
            "feature-management-experimentation/split-to-harness/sso-for-admins",
            "feature-management-experimentation/split-to-harness/api-for-split-admins",
          ],
        },
        "feature-management-experimentation/fme-support",
      ],
    },
    /* {
      type: "category",
      label: "FME Feature releases",
      collapsed: false,
      collapsible: false,
      items: [ */
        // Release Notes
        {
          type: "link",
          label: "Release Notes",
          className: "sidebar-Release_Notes",
          href: "/release-notes/feature-management-experimentation/",
          customProps: {
            description: "Learn about recent changes to Harness products.",
          },
        },
        // Roadmap
        {
          type: "link",
          label: "Roadmap",
          className: "sidebar-roadmap",
          href: "/roadmap/#fme",
          customProps: {
            description: "Learn about upcoming changes to Harness products.",
          },
        },
      /*],
    },*/
    /*{
      type: "category",
      label: "Harness Platform",
      collapsed: false,
      collapsible: false,
      items: [*/
        // API Docs
        {
          type: "link",
          label: "API Reference",
          className: "sidebar-API_Reference",
          href: "https://docs.split.io/reference/",
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
      /*],
    },*/
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
        value: '<span style="color:#000000; font-weight:1000;">New to CCM?</span>',
        className: "horizontal-bar",
      },
      "cloud-cost-management/get-started/overview",
      "cloud-cost-management/get-started/get-started",
      "cloud-cost-management/get-started/onboarding-guide/external-data-ingestion",
      {
        type: "html",
        value: '<span style="color:#000000; font-weight:1000;"> Use CCM </span>',
        className: "horizontal-bar",
      },
      "cloud-cost-management/get-started/key-concepts",
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
        label: "Cost Categories",
        link: {
          type: "generated-index",
        },
       collapsed: true,
       items: [ { type: "autogenerated", dirName: "cloud-cost-management/3-use-ccm-cost-reporting/2-ccm-cost-categories", } ],
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
        type: "html",
        value: '<span style="color:#4B5563; font-weight:600;">Cost Optimization </span>',
        className: "horizontal-bar",
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
        label: "Recommendations",
        link: {
          type: "generated-index",
        },
       collapsed: true,
       items: [ { type: "autogenerated", dirName: "cloud-cost-management/4-use-ccm-cost-optimization/1-ccm-recommendations", } ],
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
        type: "category",
        label: "Cluster Orchestrator for AWS EKS clusters (Beta)",
        link: {
          type: "generated-index",
        },
       collapsed: true,
       items: [ { type: "autogenerated", dirName: "cloud-cost-management/4-use-ccm-cost-optimization/cluster-orchestrator", } ],
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
        value: '<span style="color:#000000; font-weight:1000;">Troubleshooting & Resources</span>',
        className: "horizontal-bar",
      },
      "cloud-cost-management/whats-supported",
      "cloud-cost-management/feature-permissions",
      "cloud-cost-management/oidc-auth",
      "cloud-cost-management/product-behaviour",
      {
        type: "category",
        label: "Self-Managed Enterprise Edition",
        link: {
          type: "generated-index",
        },
       collapsed: true,
       items: [ { type: "autogenerated", dirName: "cloud-cost-management/get-started/ccm-smp", } ],
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
      {
        type: "category",
        label: "CCM Architecture Diagrams",
        link: {
          type: "generated-index",
        },
       collapsed: true,
       items: [ { type: "autogenerated", dirName: "cloud-cost-management/architecture-diagrams", } ],
      },
      "cloud-cost-management/ccm-auditing",
      {
        type: "category",
        label: "AutoStopping Guides",
        link: {
          type: "generated-index",
        },
       collapsed: true,
       items: [ { type: "autogenerated", dirName: "cloud-cost-management/4-use-ccm-cost-optimization/autostopping-guides", } ],
      },
      "cloud-cost-management/faq",
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
  // Chaos Engineering docs
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
          type: "html",
          value: '<span style="color:#000000; font-weight:1000;"> Getting Started </span>',
          className: "horizontal-bar",
        },
        "chaos-engineering/overview",
        "chaos-engineering/whats-supported",
        "chaos-engineering/on-premise-vs-saas",
        "chaos-engineering/key-concepts",
        "chaos-engineering/quickstart",
        {
          type: "html",
          value: '<span style="color:#000000; font-weight:1000;"> Guides </span>',
          className: "horizontal-bar",
        },
        {
          type: "category",
          label: "Chaos Experiments",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "chaos-engineering/guides/chaos-experiments", } ],
        },
        "chaos-engineering/guides/application-maps",
        "chaos-engineering/guides/service-discovery",
        "chaos-engineering/guides/gamedays",
        "chaos-engineering/guides/image-registry",
        {
          type: "category",
          label: "ChaosHub",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "chaos-engineering/guides/chaoshubs", } ],
        },
        {
          type: "category",
          label: "Chaos Dashboard",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "chaos-engineering/guides/dashboards", } ],
        },
        {
          type: "category",
          label: "Governance",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "chaos-engineering/guides/governance", } ],
        },
        {
          type: "category",
          label: "Infrastructure",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "chaos-engineering/guides/infrastructures", } ],
        },
        {
          type: "category",
          label: "Probes",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "chaos-engineering/guides/probes", } ],
        },
        {
          type: "category",
          label: "Actions",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "chaos-engineering/guides/actions", } ],
        },
        "chaos-engineering/guides/templates",
        {
          type: "category",
          label: "On-premises (SMP)",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "chaos-engineering/guides/on-premises-smp", } ],
        },
        {
          type: "category",
          label: "AI",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "chaos-engineering/guides/ai", } ],
        },
        "chaos-engineering/guides/license-consumption",
        {
          type: "html",
          value: '<span style="color:#000000; font-weight:1000;"> Faults </span>',
          className: "horizontal-bar",
        },
        "chaos-engineering/faults/chaos-faults",
        {
          type: "category",
          label: "Chaos Fault Categories",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          className: "sidebar-hidden",
          items: [ { type: "autogenerated", dirName: "chaos-engineering/faults/chaos-faults", } ],
        },
        {
          type: "category",
          label: "BYOC",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "chaos-engineering/faults/byoc", } ],
        },
        {
          type: "category",
          label: "Custom Faults",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "chaos-engineering/faults/custom-faults", } ],
        },
        {
          type: "html",
          value: '<span style="color:#000000; font-weight:1000;"> Integrations </span>',
          className: "horizontal-bar",
        },
        {
          type: "category",
          label: "CI/CD",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "chaos-engineering/integrations/cicd", } ],
        },
        {
          type: "category",
          label: "Performance Testing Tools",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "chaos-engineering/integrations/performance-testing", } ],
        },
        "chaos-engineering/integrations/google-cloud-build",

        {
          type: "html",
          value: '<span style="color:#000000; font-weight:1000;"> Security </span>',
          className: "horizontal-bar",
        },
        "chaos-engineering/security/index",
        "chaos-engineering/security/namespace-considerations",
        {
          type: "category",
          label: "Security Templates",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "chaos-engineering/security/security-templates", } ],
        },
        {
          type: "html",
          value: '<span style="color:#4B5563; font-weight:600;"> Resources </span>',
          className: "horizontal-bar",
        },
        "chaos-engineering/resources/hce-vs-litmus",
        "chaos-engineering/resources/troubleshooting",
        {
          type: "category",
          label: "API Reference",
          items: [
            "chaos-engineering/resources/api-reference/hce-cli",
            "chaos-engineering/resources/api-reference/hce-onboarding-api",
          ],
        },

      ],
    },
    // Release Notes
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
  aisre: [
    {
      type: "category",
      label: "AI SRE",
      className: "sidebar-aisre",
      link: {
        type: "doc",
        id: "ai-sre",
      },
      customProps: {
        description: "Revolutionize incident management by focusing on proactive issue prevention and accelerated resolution.",
      },
      collapsed: true,
      items: [
        {
          type: "html",
          value: "New to AI SRE?",
          className: "horizontal-bar",
        },
        "ai-sre/get-started/overview",
        {
          type: "html",
          value: "Use AI SRE",
          className: "horizontal-bar",
        },
        {
          type:"category",
          label: "Alerts",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "ai-sre/alerts", } ],
        },
        {
          type:"category",
          label: "Incidents",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "ai-sre/incidents", } ],
        },
        {
          type:"category",
          label: "AI Scribe Agent",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "ai-sre/ai-agent", } ],
        },
        {
          type:"category",
          label: "Oncall",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "ai-sre/oncall", } ],
        },
        {
          type:"category",
          label: "Runbooks",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "ai-sre/runbooks", } ],
        },
        {
          type: "html",
          value: "Troubleshooting & Resources",
          className: "horizontal-bar",
        },
        "ai-sre/resources/whats-supported",
        "ai-sre/resources/ai-sre-best-practices",
        "ai-sre/resources/faq"
      ],
    },
     // Roadmap
     {
      type: "link",
      label: "Roadmap",
      className: "sidebar-roadmap",
      href: "/roadmap/#ai-sre",
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
      items: [ 
      {
        type: "html",
        value: '<span style="color:#000000; font-weight:1000;"> New to CDE? </span>',
        className: "horizontal-bar",
      },
      "cloud-development-environments/overview",
      {
        type: "category",
        label: "Get Started",
        link: {
          type: "generated-index",
        },
        collapsed: true,
        items: [ { type: "autogenerated", dirName: "cloud-development-environments/introduction", } ],
      },
      {
        type: "category",
        label: "Deep Dive into Gitspaces",
        link: {
          type: "generated-index",
        },
        collapsed: true,
        items: [ { type: "autogenerated", dirName: "cloud-development-environments/deep-dive-into-gitspaces", } ],
      },
      {
        type: "html",
        value: '<span style="color:#000000; font-weight:1000;"> Use CDE </span>',
        className: "horizontal-bar",
      },
      {
        type: "category",
        label: "Features of Gitspaces",
        link: {
          type: "generated-index",
        },
        collapsed: true,
        items: [ { type: "autogenerated", dirName: "cloud-development-environments/features-of-gitspaces", } ],
      },
      {
        type: "category",
        label: "Manage Gitspaces",
        link: {
          type: "generated-index",
        },
        collapsed: true,
        items: [ { type: "autogenerated", dirName: "cloud-development-environments/manage-gitspaces", } ], // eslint-disable-line spellcheck/spell-checker
      },
      {
        type: "category",
        label: "Develop in Gitspaces",
        link: {
          type: "generated-index",
        },
        collapsed: true,
        items: [ { type: "autogenerated", dirName: "cloud-development-environments/develop-using-cde", } ],
      },
      {
        type: "category",
        label: "Self Hosted Gitspaces",
        link: {
          type: "generated-index",
        },
        collapsed: true,
        items: [ { type: "autogenerated", dirName: "cloud-development-environments/self-hosted-gitspaces", } ],
      },
      {
        type: "category",
        label: "Git Providers",
        link: {
          type: "generated-index",
        },
        collapsed: true,
        items: [ { type: "autogenerated", dirName: "cloud-development-environments/git-providers", } ],
      },
      {
        type: "category",
        label: "IDEs",
        link: {
          type: "generated-index",
        },
        collapsed: true,
        items: [ { type: "autogenerated", dirName: "cloud-development-environments/ides", } ],
      },
      ] //Close items array
    }, // Cloud Development Environments
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
      href: "/roadmap/#cde",
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
          type: "doc",
          id: "software-engineering-insights/sei-supported-platforms",
          label: "Supported Platforms",
        },
        {
          type: "html",
          value: "SEI (Current)",
          className: "horizontal-bar",
        },
        {
          type: "category",
          label: "SEI 2.0 (Recommended)",
          link: {
            type: "generated-index",
            slug: "/category/sei-recommended",
          },
          items: [
            {
              type: "autogenerated", 
              dirName: "software-engineering-insights/harness-sei",
            },
          ],
        },
        {
          type: "html",
          value: "SEI (Legacy)",
          className: "horizontal-bar",
        },
        {
          type: "category",
          label: "SEI 1.0",
          link: {
            type: "generated-index",
            slug: "/category/sei-current",
          },
          items: [
            {
              type: "autogenerated",
              dirName: "software-engineering-insights/propelo-sei",
            },
          ],
        },
        {
          type: "html",
          value: "Troubleshooting & Resources",
          className: "horizontal-bar",
        },
        {
          type: "category",
          label: "Troubleshooting",
          link: {
            type: "generated-index",
            slug: "/category/sei-troubleshooting",
          },
          items: [
            {
              type: "autogenerated",
              dirName: "software-engineering-insights/troubleshoot-sei",
            },
          ],
        },
        {
          type: "doc",
          id: "software-engineering-insights/sei-support",
          label: "Harness Support",
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
        type: "html",
        value: "Introduction",
        className: "horizontal-bar"
      },
      "self-managed-enterprise-edition/smp-overview",
      "self-managed-enterprise-edition/smp-supported-platforms",
      {
        type: "html",
        value: "Installation",
        className: "horizontal-bar"
      },
      "self-managed-enterprise-edition/smp-basic-configuration",
      {
        type: "category",
        label: "Cloud Providers",
        link: {
          type: "generated-index",
        },
        collapsed: true,
        items: [ { type: "autogenerated", dirName: "self-managed-enterprise-edition/cloud-providers", } ],
      },
      {
        type: "category",
        label: "Install",
        link: {
          type: "generated-index",
        },
        collapsed: true,
        items: [ { type: "autogenerated", dirName: "self-managed-enterprise-edition/install", } ],
      },
      {
        type: "category",
        label: "Advanced Configuration",
        link: {
          type: "generated-index",
        },
        collapsed: true,
        items: [ { type: "autogenerated", dirName: "self-managed-enterprise-edition/advanced-configurations", } ],
      },
      "self-managed-enterprise-edition/smp-fips-overview",
      {
    	  type: "html",
          value: "Troubleshooting & Monitoring",
          className: "horizontal-bar"
        },
        "self-managed-enterprise-edition/back-up-and-restore-helm",
      {
        type: "category",
        label: "Troubleshooting",
        link: {
          type: "generated-index",
        },
        collapsed: true,
        items: [ { type: "autogenerated", dirName: "self-managed-enterprise-edition/troubleshooting", } ],
      },
      {
        type: "category",
        label: "Monitoring",
        link: {
          type: "generated-index",
        },
        collapsed: true,
        items: [ { type: "autogenerated", dirName: "self-managed-enterprise-edition/monitoring", } ],
      },
      "self-managed-enterprise-edition/performance-reports",
      "self-managed-enterprise-edition/support-bundle-utility"
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
