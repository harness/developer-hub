import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';
const sidebars: SidebarsConfig = {
  allcontent: [
    // Documentation Parent
    {
      type: 'category',
      label: 'Documentation',
      className: 'sidebar-all_docs',
      link: {
        type: 'doc',
        id: 'index',
      },
      collapsed: true,
      items: [
        // Platform Landing Page

        {
          type: 'link',
          label: 'Platform',
          className: 'sidebar-platform',
          href: '/docs/platform',
          customProps: {
            description: 'Learn how to manage Harness features that integrate with all modules.',
          },
        },
        // Code Repository Landing Page
        {
          type: 'link',
          label: 'Code Repository',
          className: 'sidebar-cr',
          href: '/docs/code-repository',
          customProps: {
            description:
              'Manage code in Harness, and accelerate development with security at scale. (Beta)',
          },
        },
        // Continuous Integration landing page
        {
          type: 'link',
          label: 'Continuous Integration',
          className: 'sidebar-ci',
          href: '/docs/continuous-integration',
          customProps: {
            description: 'Learn how you can build faster and be more productive.',
          },
        },
        // Artifact Registry landing page
        {
          type: 'link',
          label: 'Artifact Registry ',
          className: 'sidebar-ar',
          href: '/docs/artifact-registry',
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
          type: 'link',
          label: 'Continuous Delivery & GitOps',
          className: 'sidebar-cd',
          href: '/docs/continuous-delivery',
          customProps: {
            description: 'Learn how to make your software releases more efficient and reliable.',
          },
        },
        // Database DevOps Landing Page
        {
          type: 'link',
          href: '/docs/database-devops',
          label: 'Database DevOps',
          className: 'sidebar-dbdevops',

          customProps: {
            description: 'Get started with Harness Database DevOps',
          },
        },
        // Infrastructure as Code Landing Page
        {
          type: 'link',
          href: '/docs/infrastructure-as-code-management',
          label: 'Infrastructure as Code Management',
          className: 'sidebar-iacm',

          customProps: {
            description: 'Get started with Harness Infrastructure as Code Management',
          },
        },
        // Feature Flags Landing Page
        {
          type: 'link',
          href: '/docs/feature-flags',
          label: 'Feature Flags',
          className: 'sidebar-ff',

          customProps: {
            description:
              "Learn how to change your software's functionality without deploying new code.",
          },
        },
        // Feature Management & Experimentation Landing Page
        {
          type: 'link',
          href: '/docs/feature-management-experimentation',
          label: 'Feature Management & Experimentation',
          className: 'sidebar-fme',

          customProps: {
            description: 'Learn how to enable data-driven features and gradual rollouts.',
          },
        },
        // Cloud Cost Management Landing Page
        {
          type: 'link',
          href: '/docs/cloud-cost-management',
          label: 'Cloud Cost Management',
          className: 'sidebar-ccm',

          customProps: {
            description: 'Learn how to manage and optimize cloud costs.',
          },
        },
        // Application and API Security Posture Page
        {
          type: "link",
          href: "/docs/appsec-security-posture",
          label: "Application & API Security Posture",
          className: "sidebar-asp",

          customProps: {
            description: "Learn how Application & API Security Posture gives you complete visibility into your API ecosystem.",
          },
        },
        // Application and API Runtime Protection Page
        {
          type: "link",
          href: "/docs/appsec-runtime-protection",
          label: "Application & API Runtime Protection",
          className: "sidebar-arp",

          customProps: {
            description: "Learn how Application & API Runtime Protection detects and blocks attacks, safeguarding your applications.",
          },
        },
        // Application and API Security Testing Page
        {
          type: "link",
          href: "/docs/appsec-security-testing",
          label: "Application & API Security Testing",
          className: "sidebar-ast",

          customProps: {
            description: "Learn how Application & API Security Testing help you identify issues early and validate API security.",
          },
        },
        // Security Testing Orchestration Landing Page
        {
          type: 'link',
          href: '/docs/security-testing-orchestration',
          label: 'Security Testing Orchestration',
          className: 'sidebar-sto',

          customProps: {
            description: 'Learn how to left shift your security testing.',
          },
        },
        // SCS
        {
          type: 'link',
          href: '/docs/software-supply-chain-assurance',
          label: 'Supply Chain Security',
          className: 'sidebar-ssca',

          customProps: {
            description: 'Learn how to secure your software supply chain.',
          },
        },
        {
          type: 'link',
          href: '/docs/chaos-engineering',
          label: 'Chaos Engineering',
          className: 'sidebar-ce-new',
          customProps: {
            description: 'Learn how to build and validate resilience.',
          },
        },
        // AI SRE Landing Page
        {
          type: 'link',
          href: '/docs/ai-sre',
          label: 'AI SRE',
          className: 'sidebar-aisre',
          customProps: {
            description: 'Get started with Harness AI SRE',
          },
        },
        // SCS

        // Service Reliability Management Page
        {
          type: 'link',
          href: '/docs/service-reliability-management',
          label: 'Service Reliability Management',
          className: 'sidebar-srm',

          customProps: {
            description:
              'Learn how to use real-time insights to improve the reliability of applications and services.',
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
          type: 'link',
          href: '/docs/internal-developer-portal',
          label: 'Internal Developer Portal',
          className: 'sidebar-idp',

          customProps: {
            description: 'Get started with Harness Internal Developer Portal',
          },
        },
        // Cloud Development Environments Landing Page
        {
          type: 'link',
          label: 'Cloud Development Environments',
          className: 'sidebar-cde',
          href: '/docs/cloud-development-environments',

          customProps: {
            description:
              'Accelerate developer experience with secure, scalable and pre-configured development environments',
          },
        },
        // SEI
        {
          type: 'link',
          href: '/docs/software-engineering-insights',
          label: 'Software Engineering Insights',
          className: 'sidebar-sei',

          customProps: {
            description:
              'Learn how data-led insights can remove bottlenecks and improve productivity.',
          },
        },
        // SMP landing page
        {
          type: 'link',
          href: '/docs/self-managed-enterprise-edition',
          label: 'Self-Managed Enterprise Edition',
          className: 'sidebar-smp',
          customProps: {
            description:
              'Learn how to use this end-to-end solution for continuous, self-managed delivery.',
          },
        },
        // Harness Open Source
        {
          type: 'link',
          href: '/docs/open-source',
          label: 'Open Source',
          className: 'sidebar-opensource',
          customProps: {
            description: 'Learn about the latest open source offerings from Harness.',
          },
        },
        // {
        //   type: 'link',
        //   label: 'Application & Api Posture Management',
        //   href: '/docs/application-api-posture-management',
        //   className: 'sidebar-application-api-posture-management',
        //   customProps: {
        //     description: 'Information on how the Harness SaaS is managed.',
        //   },
        // },
        // {
        //   type: 'link',
        //   label: 'Application & Api Security Testing',
        //   href: '/docs/application-api-security-testing',
        //   className: 'sidebar-application-api-security-testing',
        //   customProps: {
        //     description: 'Information on how the Harness SaaS is managed.',
        //   },
        // },
        // {
        //   type: 'link',
        //   label: 'Application & Api Protection',
        //   href: '/docs/application-api-protection',
        //   className: 'sidebar-application-api-protection',
        //   customProps: {
        //     description: 'Information on how the Harness SaaS is managed.',
        //   },
        // },
        {
          type: 'category',
          label: 'FAQs',
          className: 'sidebar-faqs',
          link: {
            type: 'generated-index',
            slug: '/faqs',
          },

          customProps: {
            description: 'Find answers to frequently asked questions.',
          },
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'faqs',
            },
          ],
        },
        {
          type: 'category',
          label: 'Troubleshooting',
          link: {
            type: 'generated-index',
            slug: '/troubleshooting',
          },
          className: 'sidebar-troubleshooting',
          customProps: {
            description:
              'Find details about common error messages, what causes them, and solutions.',
          },
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'troubleshooting',
            },
          ],
        },
        {
          type: 'category',
          label: 'Harness Cloud Operations',
          link: {
            type: 'generated-index',
            slug: '/harness-cloud-operations',
          },
          className: 'sidebar-Cloud_Operations',
          customProps: {
            description: 'Information on how the Harness SaaS is managed.',
          },
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'harness-cloud-operations',
            },
          ],
        },
        // Release Notes
        {
          type: 'link',
          label: 'Release Notes',
          className: 'sidebar-Release_Notes',
          href: '/release-notes',
          customProps: {
            description: 'Learn about recent changes to Harness products.',
          },
        },
        // API Docs
        {
          type: 'link',
          label: 'API Reference',
          className: 'sidebar-API_Reference',
          href: 'https://apidocs.harness.io/',

          customProps: {
            description: 'Harness API Docs.',
          },
        },
      ],
    },
  ],
  //Additional Items in this parent can go here.
  //   individual module page sidebar start
  coderepository: [
    {
      type: 'category',
      label: 'Code Repository',
      className: 'sidebar-cr',
      link: {
        type: 'doc',
        id: 'code-repository',
      },
      customProps: {
        description:
          'Manage code in Harness, and accelerate development with security at scale. (Beta)',
      },
      collapsed: true,
      items: [
        {
          type: "html",
          value: "New to Harness Code?",
          className: "horizontal-bar",
        },
        {
          type: "category",
          label: "Get started with Code",
          link: {
            type: "generated-index",
            slug: "/category/get-started-with-code",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "code-repository/get-started" } ],
        },
        {
          type: "html",
          value: "Use Harness Code",
          className: "horizontal-bar",
        },
        {
          type: "category",
          label: "Manage Repositories",
          link: {
            type: "generated-index",
            slug: "/category/manage-repositories",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "code-repository/config-repos" } ],
        },
        {
          type: "category",
          label: "Collaborate & Develop",
          link: {
            type: "generated-index",
            slug: "/category/collaborate-and-develop",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "code-repository/work-in-repos" } ],
        },
        {
          type: "category",
          label: "Code Repository Integrations",
          link: {
            type: "generated-index",
            slug: "/category/code-repository-integrations",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "code-repository/integrations" } ],
        },
        {
          type: "category",
          label: "Run Pipelines",
          link: {
            type: "generated-index",
            slug: "/category/run-pipelines",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "code-repository/pipelines" } ],
        },
        {
          type: "category",
          label: "Pull Requests",
          link: {
            type: "generated-index",
            slug: "/category/pull-requests",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "code-repository/pull-requests" } ],
        },
        {
          type: "html",
          value: "Troubleshooting & Resources",
          className: "horizontal-bar",
        },
        "code-repository/code-supported",
        "code-repository/get-started/cr-subscription-mgmt",
      ],
    },
    // Release Notes
    {
      type: 'link',
      label: 'Release Notes',
      className: 'sidebar-Release_Notes',
      href: '/release-notes/code-repository',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // Roadmap
    {
      type: 'link',
      label: 'Roadmap',
      className: 'sidebar-roadmap',
      href: '/roadmap/#code',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // API Docs
    {
      type: 'link',
      label: 'API Reference',
      className: 'sidebar-API_Reference',
      href: 'https://apidocs.harness.io/tag/repository/',
      customProps: {
        description: 'Harness API Docs.',
      },
    },
    {
      type: 'link',
      label: 'Certifications & Training',
      className: 'sidebar-university',
      href: '/university/cr',
      customProps: {
        description: 'Get certified and learn in Harness Code Repository from our training programs.',
      },
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

  platform: [
    {
      type: 'category',
      label: 'Platform',
      className: 'sidebar-platform',
      link: {
        type: 'doc',
        id: 'platform',
      },
      customProps: {
        description: 'Learn how to manage Harness features that integrate with all modules.',
      },
      collapsed: true,
      items: [
        {
          type: 'html',
          value: 'New to Harness Platform?',
          className: 'horizontal-bar',
        },
        'platform/platform-whats-supported',
        {
          type: 'category',
          label: 'Get Started',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'platform/get-started' }],
        },
        {
          type: 'html',
          value: 'Use Harness Platform',
          className: 'horizontal-bar',
        },
        {
          type: 'category',
          label: 'Authentication',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'platform/authentication' }],
        },
        {
          type: 'category',
          label: 'Organizations and Projects',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'platform/organizations-and-projects' }],
        },
        {
          type: 'category',
          label: 'Platform Access Control',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'platform/role-based-access-control' }],
        },
        {
          type: 'category',
          label: 'Delegates',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'platform/delegates' }],
        },
        {
          type: 'category',
          label: 'Secrets',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'platform/secrets' }],
        },
        {
          type: 'category',
          label: 'Connectors',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'platform/connectors' }],
        },
        {
          type: 'category',
          label: 'Goverance',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'platform/governance' }],
        },
        {
          type: 'category',
          label: 'Pipelines',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'platform/pipelines' }],
        },
        {
          type: 'category',
          label: 'Variables and Expressions',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'platform/variables-and-expressions' }],
        },
        {
          type: 'category',
          label: 'Notifications and Banners',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'platform/notifications' }],
        },
        {
          type: 'category',
          label: 'Triggers',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'platform/triggers' }],
        },
        {
          type: 'category',
          label: 'Tags',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'platform/tags' }],
        },
        {
          type: 'category',
          label: 'Security',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'platform/security' }],
        },
        {
          type: 'category',
          label: 'Certificates',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'platform/certificates' }],
        },
        {
          type: 'category',
          label: 'Templates',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'platform/templates' }],
        },
        {
          type: 'category',
          label: 'Approvals',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'platform/approvals' }],
        },
        {
          type: 'category',
          label: 'Automation',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'platform/automation' }],
        },
        {
          type: 'category',
          label: 'Git Experience',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'platform/git-experience' }],
        },
        {
          type: 'category',
          label: 'Favorites',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'platform/favorites' }],
        },
        {
          type: 'category',
          label: 'Harness Dashboards',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'platform/dashboards' }],
        },
        {
          type: 'category',
          label: 'Settings',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'platform/settings' }],
        },
        {
          type: 'category',
          label: 'References',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'platform/references' }],
        },
        {
          type: 'category',
          label: 'Service Discovery',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'platform/service-discovery' }],
        },
        'platform/monitored-service',
        'platform/application-map',
        'platform/rate-limits',
        'platform/account-license-limits',
        {
          type: 'html',
          value: 'Use Harness AI',
          className: 'horizontal-bar',
        },
        {
          type: 'category',
          label: 'Harness AI',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'platform/harness-aida' }],
        },
      ],
    },
    // Release Notes
    {
      type: 'link',
      label: 'Release Notes',
      className: 'sidebar-Release_Notes',
      href: '/release-notes/platform',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // Roadmap
    {
      type: 'link',
      label: 'Roadmap',
      className: 'sidebar-roadmap',
      href: '/roadmap/#platform',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // API Docs
    {
      type: 'link',
      label: 'API Reference',
      className: 'sidebar-API_Reference',
      href: 'https://apidocs.harness.io/',
      customProps: {
        description: 'Harness API Docs.',
      },
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
  continuousintegration: [
    {
      type: 'category',
      label: 'Continuous Integration',
      className: 'sidebar-ci',
      link: {
        type: 'doc',
        id: 'continuous-integration',
      },
      customProps: {
        description: 'Get started with Harness Continuous Integration',
      },
      collapsed: true,
      items: [
        {
          type: 'html',
          value: 'New to Harness CI?',
          className: 'horizontal-bar',
        },
        'continuous-integration/get-started/overview',
        'continuous-integration/get-started/key-concepts',
        'continuous-integration/get-started/onboarding-guide',
        {
          type: 'html',
          value: 'Use Harness CI',
          className: 'horizontal-bar',
        },
        {
          type: 'category',
          label: 'Migrate to Harness CI',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'continuous-integration/migration-guides' }],
        },
        {
          type: 'category',
          label: 'Use Harness CI',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'continuous-integration/use-ci' }],
        },
        {
          type: 'category',
          label: 'Secure Harness CI',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'continuous-integration/secure-ci' }],
        },
        {
          type: 'html',
          value: 'Troubleshooting & Resources',
          className: 'horizontal-bar',
        },
        'continuous-integration/ci-supported-platforms',
        'continuous-integration/get-started/ci-subscription-mgmt',
        {
          type: 'category',
          label: 'Troubleshoot Harness CI',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'continuous-integration/troubleshoot-ci' }],
        },
        {
          type: 'category',
          label: 'CI Articles & FAQs',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'continuous-integration/ci-articles-faqs' }],
        },
        {
          type: 'category',
          label: 'Tutorials and Code Samples',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'continuous-integration/development-guides' }],
        },
      ],
    },
    // Release Notes
    {
      type: 'link',
      label: 'Release Notes',
      className: 'sidebar-Release_Notes',
      href: '/release-notes/continuous-integration',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // Roadmap
    {
      type: 'link',
      label: 'Roadmap',
      className: 'sidebar-roadmap',
      href: '/roadmap/#ci',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // API Docs
    {
      type: 'link',
      label: 'API Reference',
      className: 'sidebar-API_Reference',
      href: 'https://apidocs.harness.io/',
      customProps: {
        description: 'Harness API Docs.',
      },
    },
    // University
    {
      type: 'link',
      label: 'Certifications & Training',
      className: 'sidebar-university',
      href: '/university/continuous-integration',
      customProps: {
        description: 'Get certified and learn in Harness Continuous Integration from our training programs.',
      },
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
  artifactregistry: [
    {
      type: 'category',
      label: 'Artifact Registry',
      className: 'sidebar-ar',
      link: {
        type: 'doc',
        id: 'artifact-registry',
      },
      customProps: {
        description: 'Learn how to store artifacts securely.',
      },
      collapsed: true,
      items: [
        {
          type: 'html',
          value: 'New to Artifact Registry?',
          className: 'horizontal-bar',
        },
        'artifact-registry/get-started/overview',
        'artifact-registry/get-started/quickstart',
        {
          type: 'html',
          value: 'Use Artifact Registry',
          className: 'horizontal-bar',
        },
        {
          type: 'category',
          label: 'Manage Registries',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'artifact-registry/manage-registries' }],
        },
        {
          type: 'category',
          label: 'Manage Artifacts',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'artifact-registry/manage-artifacts' }],
        },
        {
          type: 'category',
          label: 'Platform Integrations',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'artifact-registry/platform-integrations' }],
        },
        'artifact-registry/ar-webhooks',
        {
          type: 'html',
          value: 'Troubleshooting & Resources',
          className: 'horizontal-bar',
        },
        'artifact-registry/whats-supported',
        'artifact-registry/ar-best-practices',
        {
          type: 'category',
          label: 'Authorization & Authentication',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'artifact-registry/troubleshooting/authorization' },
          ],
        },
      ],
    },
    // API Docs
    {
      type: 'link',
      label: 'API Reference',
      className: 'sidebar-API_Reference',
      href: 'https://apidocs.harness.io/',
      customProps: {
        description: 'Harness API Docs.',
      },
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
          type: 'html',
          value: 'Integrations',
          className: 'horizontal-bar',
        },
        {
          type: 'category',
          label: 'Integrations',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'ai-test-automation/integrations' }],
        },
        {
          type: 'html',
          value: 'Best Practices & Resources',
          className: 'horizontal-bar',
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
      ],
    },
    // Release Notes
    {
      type: 'link',
      label: 'Release Notes',
      className: 'sidebar-Release_Notes',
      href: '/release-notes/ai-test-automation',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
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
      type: 'category',
      label: 'Continuous Delivery & GitOps',
      className: 'sidebar-cd',
      link: {
        type: 'doc',
        id: 'continuous-delivery',
      },
      customProps: {
        description: 'Learn how to make your software releases more efficient and reliable.',
      },
      collapsed: true,
      items: [
        { type: 'html', value: 'New to Continuous Delivery?', className: 'horizontal-bar' },

        {
          type: 'category',
          label: 'Get Started',
          link: { type: 'generated-index' },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'continuous-delivery/get-started' },
          ],
        },
        {
          type: 'category',
          label: 'CD Onboarding',
          link: { type: 'generated-index' },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'continuous-delivery/cd-onboarding' },
          ],
        },
        'continuous-delivery/cd-integrations',
        { type: 'html', value: 'Use Continuous Delivery', className: 'horizontal-bar' },
        {
          type: 'category',
          label: 'Provision Infrastructure',
          link: { type: 'generated-index' },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'continuous-delivery/cd-infrastructure' },
          ],
        },
        {
          type: 'category',
          label: 'Deploy Services on Different Platforms',
          link: { type: 'generated-index' },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'continuous-delivery/deploy-srv-diff-platforms' },
          ],
        },
        {
          type: 'category',
          label: 'Cross-platform CD Features',
          link: { type: 'generated-index' },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'continuous-delivery/x-platform-cd-features' },
          ],
        },
        {
          type: 'category',
          label: 'Manage deployments',
          link: { type: 'generated-index' },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'continuous-delivery/manage-deployments' },
          ],
        },
        {
          type: 'category',
          label: 'Monitor deployments',
          link: { type: 'generated-index' },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'continuous-delivery/monitor-deployments' },
          ],
        },
        {
          type: 'category',
          label: 'Verify deployments',
          link: { type: 'generated-index' },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'continuous-delivery/verify' },
          ],
        },


        { type: 'html', value: 'Use GitOps', className: 'horizontal-bar' },
        { type: 'autogenerated', dirName: 'continuous-delivery/gitops' },
        { type: 'html', value: 'Troubleshooting & Resources', className: 'horizontal-bar' },        
        'continuous-delivery/toolchain-policy',
        // {
        //   type: 'link',
        //   label: 'Knowledge Base Articles',
        //   href: '/docs/continuous-delivery/kb-articles/articles/'  // Point to the KB section on your site
        // },
        {
          type: 'category',
          label: 'Knowledge Base article',
          link: { type: 'generated-index' },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'continuous-delivery/kb-articles/articles' },
          ],
        },
        {
          type: 'link',
          label: 'Troubleshooting',
          href: '/docs/troubleshooting/troubleshooting-nextgen',  // Point to the KB section on your site
        },
        {
          type: 'link',
          label: 'FAQs',
          href: '/docs/continuous-delivery/kb-articles/faqs',  // Point to the KB section on your site
        },
      ],
    }, // Release Notes
    {
      type: 'link',
      label: 'Release Notes',
      className: 'sidebar-Release_Notes',
      href: '/release-notes/continuous-delivery',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // Roadmap
    {
      type: 'link',
      label: 'Roadmap',
      className: 'sidebar-roadmap',
      href: '/roadmap/#cd',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // API Docs
    {
      type: 'link',
      label: 'API Reference',
      className: 'sidebar-API_Reference',
      href: 'https://apidocs.harness.io/',
      customProps: {
        description: 'Harness API Docs.',
      },
    },
    // University
    {
      type: 'link',
      label: 'Certifications & Training',
      className: 'sidebar-university',
      href: '/university/continuous-delivery',
      customProps: {
        description: 'Get certified and learn in Harness Continuous Delivery and GitOps from our training programs.',
      },
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
  infrastructureascodemanagement: [
    {
      type: 'category',
      label: 'Infrastructure as Code Management',
      className: 'sidebar-iacm',
      link: {
        type: 'doc',
        id: 'infrastructure-as-code-management',
      },
      customProps: {
        description: 'Get started with Harness Infrastructure as Code Management',
      },
      collapsed: true,
      items: [
        {
          type: 'html',
          value: 'New to IaCM?',
          className: 'horizontal-bar',
        },
        'infra-as-code-management/get-started/overview',
        'infra-as-code-management/get-started/get-started',
        {
          type: 'html',
          value: 'Use IaCM',
          className: 'horizontal-bar',
        },
        {
          type: 'category',
          label: 'Workspaces',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'infra-as-code-management/workspaces' }],
        },
        {
          type: 'category',
          label: 'Pipelines',
          link: {
            type: 'generated-index',
            slug: '/category/iacm-pipelines',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'infra-as-code-management/pipelines' }],
        },
        {
          type: 'category',
          label: 'CLI Commands',
          link: {
            type: 'generated-index',
            slug: '/category/iacm-cli-commands',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'infra-as-code-management/cli-commands' }],
        },
        {
          type: 'category',
          label: 'Registry',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'infra-as-code-management/registry',
            },
          ],
        },
        {
          type: 'category',
          label: 'Policy & Governance',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'infra-as-code-management/policies-governance' },
          ],
        },
        {
          type: 'category',
          label: 'Manage Projects',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'infra-as-code-management/manage-projects' }],
        },
        {
          type: 'category',
          label: 'Remote Backends',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'infra-as-code-management/remote-backends' }],
        },
        {
          type: 'category',
          label: 'Reports & Insights',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'infra-as-code-management/reports-insights' }],
        },
        {
          type: 'html',
          value: 'Troubleshooting & Resources',
          className: 'horizontal-bar',
        },
        'infra-as-code-management/whats-supported',
        'infra-as-code-management/iacm-best-practices',
        'infra-as-code-management/iacm-security',
        'infra-as-code-management/faq',
      ],
    },
    // Release Notes
    {
      type: 'link',
      label: 'Release Notes',
      className: 'sidebar-Release_Notes',
      href: '/release-notes/infrastructure-as-code-management',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // Roadmap
    {
      type: 'link',
      label: 'Roadmap',
      className: 'sidebar-roadmap',
      href: '/roadmap/#iacm',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // API Docs
    {
      type: 'link',
      label: 'API Reference',
      className: 'sidebar-API_Reference',
      href: 'https://apidocs.harness.io/',
      customProps: {
        description: 'Harness API Docs.',
      },
    },
    // University
    {
      type: "link",
      label: "Certifications & Training",
      className: "sidebar-university",
      href: '/university/iacm',
      customProps: {
        description: 'Get certified and learn in Harness Infrastructure as Code Management from our training programs.',
      },
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
  featureflags: [
    // Feature Flags Landing Page
    {
      type: 'category',
      label: 'Feature Flags',
      className: 'sidebar-ff',
      link: {
        type: 'doc',
        id: 'feature-flags',
      },
      customProps: {
        description:
          "Learn how to change your software's functionality without deploying new code.",
      },
      collapsed: true,
      items: [
          {
            type: "html",
            value: "New to Feature Flags?",
            className: "horizontal-bar",
          },
          "feature-flags/ff-supported-platforms",
          {
            type: "category",
            label: "Get Started",
            link: {
              type: "generated-index",
            },
            collapsed: true,
            items: [ { type: "autogenerated", dirName: "feature-flags/get-started", } ],
          },
          {
            type: "html",
            value: "Use Feature Flags",
            className: "horizontal-bar",
          },
          {
            type: "category",
            label: "Use FF",
            link: {
              type: "generated-index",
            },
            collapsed: true,
            items: [ { type: "autogenerated", dirName: "feature-flags/use-ff", } ],
          },
          {
            type: "category",
            label: "Secure FF",
            link: {
              type: "generated-index",
            },
            collapsed: true,
            items: [ { type: "autogenerated", dirName: "feature-flags/secure-ff", } ],
          },
          {
            type: "category",
            label: "Subscriptions in FF",
            link: {
              type: "generated-index",
            },
            collapsed: true,
            items: [ { type: "autogenerated", dirName: "feature-flags/subscribe-ff", } ],
          },
          {
            type: "html",
            value: "Troubleshooting & Resources",
            className: "horizontal-bar",
          },
          {
            type: "category",
            label: "Troubleshoot FF",
            link: {
              type: "generated-index",
            },
            collapsed: true,
            items: [ { type: "autogenerated", dirName: "feature-flags/troubleshoot-ff", } ],
          },
          "feature-flags/harness-feature-flag-faqs",
          "feature-flags/smp-ff-roadmap",
        ]},
    // Release Notes
    {
      type: 'link',
      label: 'Release Notes',
      className: 'sidebar-Release_Notes',
      href: '/release-notes/feature-flags',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // Roadmap
    {
      type: 'link',
      label: 'Roadmap',
      className: 'sidebar-roadmap',
      href: '/roadmap/#ff',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // API Docs
    {
      type: 'link',
      label: 'API Reference',
      className: 'sidebar-API_Reference',
      href: 'https://apidocs.harness.io/',
      customProps: {
        description: 'Harness API Docs.',
      },
    },
    // University
    {
      type: "link",
      label: "Certifications & Training",
      className: "sidebar-university",
      href: '/university/feature-flags',
      customProps: {
        description: 'Get certified and learn in Harness Feature Flags from our training programs.',
      },
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
  featuremanagementexperimentation: [
    // Feature Management & Experimentation
    {
      type: 'category',
      label: 'Feature Management & Experimentation',
      className: 'sidebar-fme',
      link: {
        type: 'doc',
        id: 'feature-management-experimentation',
      },
      customProps: {
        description: 'Learn how to enable data-driven features and gradual rollouts.',
      },
      collapsed: true,
      items: [
        {
          type: 'html',
          value: 'New to FME?',
          className: 'horizontal-bar',
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
          type: 'category',
          label: 'Getting started',
          link: {
            type: 'generated-index',
            slug: 'feature-management-experimentation/getting-started',
          },
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'feature-management-experimentation/10-getting-started',
            },
          ],
        },
        {
          type: 'category',
          label: 'SDKs and Customer-Deployed Components',
          link: {
            type: 'doc',
            id: 'feature-management-experimentation/sdks-and-infrastructure/index',
          },
          collapsed: true,
          items: [
            'feature-management-experimentation/sdks-and-infrastructure/versioning-policy',
            'feature-management-experimentation/sdks-and-infrastructure/validate-sdk-setup',
            {
              type: 'category',
              label: 'Client-side SDKs',
              link: {
                type: 'doc',
                id: 'feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/index',
              },
              items: require('./docs/feature-management-experimentation/20-sdks-and-infrastructure/client-side-sdks/sidebar.js'),
            },
            {
              type: 'category',
              label: 'Client-side SDK Suites',
              link: {
                type: 'doc',
                id: 'feature-management-experimentation/sdks-and-infrastructure/client-side-suites/index',
              },
              items: require('./docs/feature-management-experimentation/20-sdks-and-infrastructure/client-side-suites/sidebar.js'),
            },
            {
              type: 'category',
              label: 'Client-side Agents',
              link: {
                type: 'doc',
                id: 'feature-management-experimentation/sdks-and-infrastructure/client-side-agents/index',
              },
              items: require('./docs/feature-management-experimentation/20-sdks-and-infrastructure/client-side-agents/sidebar.js'),
            },
            {
              type: 'category',
              label: 'Server-side SDKs',
              link: {
                type: 'doc',
                id: 'feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/index',
              },
              items: require('./docs/feature-management-experimentation/20-sdks-and-infrastructure/server-side-sdks/sidebar.js'),
            },
            {
              type: 'category',
              label: 'Customer-deployed Components',
              link: {
                type: 'doc',
                id: 'feature-management-experimentation/sdks-and-infrastructure/optional-infra/index',
              },
              items: require('./docs/feature-management-experimentation/20-sdks-and-infrastructure/optional-infra/sidebar.js'),
            },
            {
              type: 'category',
              label: 'Examples',
              link: {
                type: 'doc',
                id: 'feature-management-experimentation/sdks-and-infrastructure/examples/index',
              },
              items: require('./docs/feature-management-experimentation/20-sdks-and-infrastructure/examples/sidebar.js'),
            },
            'feature-management-experimentation/sdks-and-infrastructure/troubleshooting',
          ],
        },
        {
          type: 'html',
          value: 'Use FME',
          className: 'horizontal-bar',
        },
        {
          type: 'category',
          label: 'Feature Management',
          link: {
            type: 'doc',
            id: 'feature-management-experimentation/feature-management/index',
          },
          collapsed: false,
          items: [
            {
              type: 'category',
              label: 'Manage Feature Flags',
              link: {
                type: 'generated-index',
                title: 'Manage Feature Flags',
                description: 'Guides to managing feature flags in Harness FME.',
              },
              collapsed: true,
              items: [
                'feature-management-experimentation/feature-management/manage-flags/using-essential-scheduling',
                'feature-management-experimentation/feature-management/manage-flags/set-the-alert-baseline-treatment',
                'feature-management-experimentation/feature-management/manage-flags/use-the-kill-switch',
                'feature-management-experimentation/feature-management/manage-flags/reallocate-traffic',
                'feature-management-experimentation/feature-management/manage-flags/using-flag-sets-to-boost-sdk-performance',
                'feature-management-experimentation/feature-management/manage-flags/targeting-an-account',
                'feature-management-experimentation/feature-management/manage-flags/viewing-user-treatments',
                'feature-management-experimentation/feature-management/manage-flags/maintaining-consistent-treatments',
              ],
            },
            {
              type: 'category',
              label: 'Monitoring & Analysis',
              link: {
                type: 'generated-index',
                title: 'Monitoring & Analysis',
                description: 'Monitoring tools and analytics for your feature flags.',
              },
              collapsed: true,
              items: [
                'feature-management-experimentation/feature-management/monitoring-analysis/customer-dashboard',
                'feature-management-experimentation/feature-management/monitoring-analysis/impressions',
                'feature-management-experimentation/feature-management/monitoring-analysis/live-tail',
                'feature-management-experimentation/feature-management/monitoring-analysis/export-data',
              ],
            },
            {
              type: 'category',
              label: 'Setup',
              link: {
                type: 'generated-index',
                title: 'Setup',
                description: 'Set up your feature flags and experiments.',
              },
              collapsed: true,
              items: [
                'feature-management-experimentation/feature-management/setup/create-a-feature-flag',
                'feature-management-experimentation/feature-management/setup/create-a-rollout-plan',
                'feature-management-experimentation/feature-management/setup/define-feature-flag-treatments-and-targeting',
                'feature-management-experimentation/feature-management/setup/edit-treatments',
                'feature-management-experimentation/feature-management/setup/dynamic-configurations',
                'feature-management-experimentation/feature-management/setup/default-treatment',
                'feature-management-experimentation/feature-management/setup/control-treatment',
                'feature-management-experimentation/feature-management/setup/fallback-treatment',
              ],
            },
            {
              type: 'category',
              label: 'Targeting',
              link: {
                type: 'generated-index',
                title: 'Targeting',
                description: 'Target your users precisely with segments and custom attributes.',
              },
              collapsed: true,
              items: [
                'feature-management-experimentation/feature-management/targeting/segments',
                'feature-management-experimentation/feature-management/targeting/target-segments',
                'feature-management-experimentation/feature-management/targeting/limiting-exposure',
                'feature-management-experimentation/feature-management/targeting/target-with-custom-attributes',
                'feature-management-experimentation/feature-management/targeting/target-with-dependencies',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Release Monitoring',
          link: {
            type: 'generated-index',
            slug: 'feature-management-experimentation/release-monitoring',
          },
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'feature-management-experimentation/50-release-monitoring',
            },
          ],
        },
        {
          type: 'category',
          label: 'Experimentation',
          link: {
            type: 'generated-index',
            slug: 'feature-management-experimentation/experimentation',
          },
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'feature-management-experimentation/60-experimentation',
            },
          ],
        },
        {
          type: 'category',
          label: 'Release Agent',
          link: {
            type: 'doc',
            id: 'feature-management-experimentation/release-agent/index',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'feature-management-experimentation/release-agent' },
          ],
        },
        {
          type: 'html',
          value: 'Management & Administration',
          className: 'horizontal-bar',
        },
        {
          type: 'category',
          label: 'Team settings',
          link: {
            type: 'doc',
            id: 'feature-management-experimentation/team-and-project-settings/index',
          },
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'feature-management-experimentation/team-and-project-settings',
            },
          ],
        },
        {
          type: 'category',
          label: 'Account settings',
          link: {
            type: 'generated-index',
            slug: 'feature-management-experimentation/account-settings',
          },
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'feature-management-experimentation/70-management-and-administration',
            },
          ],
        },
        {
          type: 'category',
          label: 'Integrations',
          link: {
            type: 'doc',
            id: 'feature-management-experimentation/integrations/index',
          },
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'feature-management-experimentation/80-integrations',
            },
          ],
        },
        {
          type: 'category',
          label: 'API',
          link: {
            type: 'doc',
            id: 'feature-management-experimentation/api/index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'feature-management-experimentation/api' }],
        },
        {
          type: 'html',
          value: 'Troubleshooting & Resources',
          className: 'horizontal-bar',
        },
        {
          type: 'category',
          label: 'Split to Harness Migration',
          /*link: {
            type: 'doc',
            id: 'feature-management-experimentation/split-to-harness/index',
          },*/
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'feature-management-experimentation/split-to-harness' }],
        },
        'feature-management-experimentation/fme-support',
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
      type: 'link',
      label: 'Release Notes',
      className: 'sidebar-Release_Notes',
      href: '/release-notes/feature-management-experimentation/',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // Roadmap
    {
      type: 'link',
      label: 'Roadmap',
      className: 'sidebar-roadmap',
      href: '/roadmap/#fme',
      customProps: {
        description: 'Learn about upcoming changes to Harness products.',
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
      type: 'link',
      label: 'API Reference',
      className: 'sidebar-API_Reference',
      href: 'https://docs.split.io/reference/',
      customProps: {
        description: 'Harness API Docs.',
      },
    },
    // University
    {
      type: "link",
      label: "Certifications & Training",
      className: "sidebar-university",
      href: 'https://arcade.split.io/login',
      customProps: {
        description: 'Get certified and learn in Harness Feature Management and Experimentation from our training programs.',
      },
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
      items: [ 
      {
        type: "html",
        value: 'New to Database DevOps?',
        className: "horizontal-bar",
      },
      "database-devops/overview",
      "database-devops/dbdevops-supported-platforms",
      {
        type: "category",
        label: "Get Started with Database DevOps",
        link: {
          type: "generated-index",
          slug:"/category/get-started-with-database-devops"
        },
        collapsed: true,
        items: [ { type: "autogenerated", dirName: "database-devops/get-started", } ],
      },
      {
        type: "html",
        value: 'Use DB DevOps',
        className: "horizontal-bar",
      },
      {
        type: "category",
        label: "Use Database DevOps",
        link: {
          type: "generated-index",
          slug:"/category/use-db-devops"
        },
        collapsed: true,
        items: [ { type: "autogenerated", dirName: "database-devops/use-database-devops", } ],
      }, 
      {
        type: "category",
        label: "Concepts of Database DevOps",
        link: {
          type: "generated-index",
          slug:"/category/concepts-of-database-devops"
        },
        collapsed: true,
        items: [ { type: "autogenerated", dirName: "database-devops/concepts", } ],
      },
      {
        type: "category",
        label: "Features of Database DevOps",
        link: {
          type: "generated-index",
          slug:"/category/features-of-database-devops"
        },
        collapsed: true,
        items: [ { type: "autogenerated", dirName: "database-devops/features", } ],
      },
      {
        type: "html",
        value: 'Troubleshooting & Resources',
        className: "horizontal-bar",
      },
      {
        type: "category",
        label: "Troubleshooting Guide",
        link: {
          type: "generated-index",
          slug:"/category/troubleshooting-guide"
        },
        collapsed: true,
        items: [ { type: "autogenerated", dirName: "database-devops/troubleshooting", } ],
      }, 
      ],
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
    // University
    {
      type: "link",
      label: "Certifications & Training",
      className: "sidebar-university",
      href: '/university/database-devops',
      customProps: {
        description: 'Get certified and learn in Harness Database DevOps from our training programs.',
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
      type: 'category',
      label: 'Cloud Cost Management',
      className: 'sidebar-ccm',
      link: {
        type: 'doc',
        id: 'cloud-cost-management',
      },
      customProps: {
        description: 'Learn how to manage and optimize cloud costs.',
      },
      collapsed: true,
      items: [
        {
          type: 'html',
          value: 'New to CCM?',
          className: 'horizontal-bar',
        },
        'cloud-cost-management/get-started/overview',
        'cloud-cost-management/get-started/get-started',
        'cloud-cost-management/get-started/onboarding-guide/external-data-ingestion',
        {
          type: 'html',
          value: 'Use CCM',
          className: 'horizontal-bar',
        },
        'cloud-cost-management/get-started/key-concepts',
        {
          type: 'html',
          value: '<span style="color:#4B5563; font-weight:600;"> Cost Reporting </span>',
          className: 'horizontal-bar',
        },
        {
          type: 'category',
          label: 'Perspectives',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'cloud-cost-management/3-use-ccm-cost-reporting/1-ccm-perspectives',
            },
          ],
        },
        {
          type: 'category',
          label: 'Cost Categories',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'cloud-cost-management/3-use-ccm-cost-reporting/2-ccm-cost-categories',
            },
          ],
        },
        {
          type: 'category',
          label: 'BI Dashboards',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'cloud-cost-management/3-use-ccm-cost-reporting/6-use-ccm-dashboards',
            },
          ],
        },
        {
          type: 'html',
          value: '<span style="color:#4B5563; font-weight:600;">Cost Optimization </span>',
          className: 'horizontal-bar',
        },
        {
          type: 'category',
          label: 'AutoStopping Rules',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName:
                'cloud-cost-management/4-use-ccm-cost-optimization/1-optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules',
            },
          ],
        },
        {
          type: 'category',
          label: 'Recommendations',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'cloud-cost-management/4-use-ccm-cost-optimization/1-ccm-recommendations',
            },
          ],
        },
        {
          type: 'category',
          label: 'Commitment Orchestrator',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'cloud-cost-management/4-use-ccm-cost-optimization/commitment-orch-docs',
            },
          ],
        },
        {
          type: 'category',
          label: 'Cluster Orchestrator for AWS EKS clusters (Beta)',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'cloud-cost-management/4-use-ccm-cost-optimization/cluster-orchestrator',
            },
          ],
        },
        {
          type: 'html',
          value: '<span style="color:#4B5563; font-weight:600;"> Cost Governance </span>',
          className: 'horizontal-bar',
        },
        {
          type: 'category',
          label: 'Budgets',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'cloud-cost-management/5-use-ccm-cost-governance/ccm-budgets',
            },
          ],
        },
        {
          type: 'category',
          label: 'Asset Governance',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'cloud-cost-management/5-use-ccm-cost-governance/asset-governance',
            },
          ],
        },
        {
          type: 'category',
          label: 'Anomalies',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'cloud-cost-management/3-use-ccm-cost-reporting/anomaly-detection',
            },
          ],
        },
        {
          type: 'html',
          value: 'Troubleshooting & Resources',
          className: 'horizontal-bar',
        },
        'cloud-cost-management/whats-supported',
        'cloud-cost-management/feature-permissions',
        'cloud-cost-management/oidc-auth',
        'cloud-cost-management/product-behaviour',
        {
          type: 'category',
          label: 'Self-Managed Enterprise Edition',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'cloud-cost-management/get-started/ccm-smp' }],
        },
        {
          type: 'category',
          label: 'Access Control',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'cloud-cost-management/access-control' }],
        },
        {
          type: 'category',
          label: 'CCM Architecture Diagrams',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'cloud-cost-management/architecture-diagrams' },
          ],
        },
        'cloud-cost-management/ccm-auditing',
        {
          type: 'category',
          label: 'AutoStopping Guides',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'cloud-cost-management/4-use-ccm-cost-optimization/autostopping-guides',
            },
          ],
        },
        {
          type: 'category',
          label: 'CCM tutorials',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'cloud-cost-management/ccm-tutorials' },
          ],
        },
        'cloud-cost-management/faq',
      ],
    },
    // Release Notes
    {
      type: 'link',
      label: 'Release Notes',
      className: 'sidebar-Release_Notes',
      href: '/release-notes/cloud-cost-management',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    // Release Notes
    },
    // Roadmap
    {
      type: 'link',
      label: 'Roadmap',
      className: 'sidebar-roadmap',
      href: '/roadmap/#ccm',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // API Docs
    {
      type: 'link',
      label: 'API Reference',
      className: 'sidebar-API_Reference',
      href: 'https://apidocs.harness.io/',
      customProps: {
        description: 'Harness API Docs.',
      },
    },
    // University
    {
      type: "link",
      label: "Certifications & Training",
      className: "sidebar-university",
      href: '/university/cloud-cost-management',
      customProps: {
        description: 'Get certified and learn in Harness Cloud Cost Management from our training programs.',
      },
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
  securitytestingorchestration: [
    {
      type: 'category',
      label: 'Security Testing Orchestration',
      className: 'sidebar-sto',
      link: {
        type: 'doc',
        id: 'security-testing-orchestration',
      },
      customProps: {
        description: 'Learn how to left shift your security testing.',
      },
      collapsed: true,
      items: [
        {
          type: "html",
          value: "New to STO?",
          className: "horizontal-bar",
        },
        {
          type: 'category',
          label: 'What`s Supported',
          link: {
            type: 'generated-index',
            slug: '/category/sto-whats-supported',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'security-testing-orchestration/whats-supported' },
          ],
        },
        {
          type: 'category',
          label: 'Get Started with STO',
          link: {
            type: 'generated-index',
            slug: '/category/get-started-with-sto',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'security-testing-orchestration/get-started' },
          ],
        },
        {
          type: "html",
          value: "Use STO",
          className: "horizontal-bar",
        },
        {
          type: 'category',
          label: 'Set up Scans',
          link: {
            type: 'generated-index',
            slug: '/category/set-up-sto-scans',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'security-testing-orchestration/set-up-scans' },
          ],
        },
        {
          type: 'category',
          label: 'Scanner Configuration',
          link: {
            type: 'generated-index',
            slug: '/category/sto-scanner-configuration',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'security-testing-orchestration/sto-techref-category' },
          ],
        },
        {
          type: 'category',
          label: 'Custom Scanning and Ingestion',
          link: {
            type: 'generated-index',
            slug: '/category/sto-custom-scanning-and-ingestion',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'security-testing-orchestration/custom-scanning' },
          ],
        },
        {
          type: 'category',
          label: 'Security Issues',
          link: {
            type: 'generated-index',
            slug: '/category/sto-security-issues',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'security-testing-orchestration/view-security-test-results' },
          ],
        },
        {
          type: 'category',
          label: 'Enforce Policies for Governance',
          link: {
            type: 'generated-index',
            slug: '/category/enforce-sto-policies-for-governance',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'security-testing-orchestration/policies' },
          ],
        },
        {
          type: 'category',
          label: 'Remediate Issues',
          link: {
            type: 'generated-index',
            slug: '/category/sto-remediate-issues',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'security-testing-orchestration/remediations' },
          ],
        },
        'security-testing-orchestration/jira-integrations',
        {
          type: 'category',
          label: 'Exempt Issues',
          link: {
            type: 'generated-index',
            slug: '/category/sto-exempt-issues',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'security-testing-orchestration/exemptions' },
          ],
        },
        {
          type: 'category',
          label: 'Set Notifications',
          link: {
            type: 'generated-index',
            slug: '/category/sto-set-notifications',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'security-testing-orchestration/notifications' },
          ],
        },
        {
          type: "html",
          value: "Troubleshooting & Resources",
          className: "horizontal-bar",
        },
        {
          type: 'category',
          label: 'Dashboards and Reports',
          link: {
            type: 'generated-index',
            slug: '/category/sto-dashboards-and-reports',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'security-testing-orchestration/dashboards' }],
        },
        'security-testing-orchestration/rbac',
        'security-testing-orchestration/faqs',
        {
          type: 'category',
          label: 'STO use cases',
          link: {
            type: 'generated-index',
            slug: '/category/sto-use-cases',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'security-testing-orchestration/use-sto' },
          ]
        },
      ],
    }, // Release Notes
    {
      type: 'link',
      label: 'Release Notes',
      className: 'sidebar-Release_Notes',
      href: '/release-notes/security-testing-orchestration',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // Roadmap
    {
      type: 'link',
      label: 'Roadmap',
      className: 'sidebar-roadmap',
      href: '/roadmap/#sto',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // API Docs
    {
      type: 'link',
      label: 'API Reference',
      className: 'sidebar-API_Reference',
      href: 'https://apidocs.harness.io/',
      customProps: {
        description: 'Harness API Docs.',
      },
    },
    // University
    {
      type: "link",
      label: "Certifications & Training",
      className: "sidebar-university",
      href: '/university/sto',
      customProps: {
        description: 'Get certified and learn in Harness Security Testing Orchestration from our training programs.',
      },
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
  softwaresupplychainassurance: [
    {
      type: 'category',
      label: 'Supply Chain Security',
      className: 'sidebar-ssca',
      link: {
        type: 'doc',
        id: 'software-supply-chain-assurance',
      },
      customProps: {
        description: 'Learn how to secure your software supply chain.',
      },
      collapsed: true,
      items: [
        {
          type: "html",
          value: "New to SCS?",
          className: "horizontal-bar",
        },
         "software-supply-chain-assurance/get-started/overview",
         "software-supply-chain-assurance/get-started/key-concepts",
         "software-supply-chain-assurance/get-started/get-started",
         
      {
        type: "html",
        value: 'Use SCS',
        className: "horizontal-bar",
      },
      {
      type: "category",
      label: "Artifact Security",
      link: {
        type: "generated-index",
        slug: "/category/artifact-security",
      },
      collapsed: true,
      items: [ { type: "autogenerated", dirName: "software-supply-chain-assurance/artifact-security", } ],
    },
      {
      type: "category",
      label: "Open Source Management",
      link: {
        type: "generated-index",
        slug:"/category/open-source-management",
      },
      collapsed: true,
      items: [ { type: "autogenerated", dirName: "software-supply-chain-assurance/open-source-management", } ],
    },
    {
      type: "category",
      label: "Risk and Compliance",
      link: {
        type: "generated-index",
        slug:"/category/risk-and-compliance",
      },
      collapsed: true,
      items: [ { type: "autogenerated", dirName: "software-supply-chain-assurance/manage-risk-and-compliance", } ],
    },
    {
      type: "category",
      label: "Dashboards & Reports",
      link: {
        type: "generated-index",
        slug:"/category/dashboards-and-reports",
      },
      collapsed: true,
      items: [ { type: "autogenerated", dirName: "software-supply-chain-assurance/dashboards-and-reports", } ],
    },
    {
      type: "html",
      value: "Troubleshooting & Resources",
      className: "horizontal-bar",
    },
    "software-supply-chain-assurance/ssca-supported",
    "software-supply-chain-assurance/faq",
     
    {
      type: "category",
      label: "How to Guides",
      link: {
        type: "generated-index",
        slug: "category/how-to-guides"
      },
      collapsed: true,
      items: [ { type: "autogenerated", dirName: "software-supply-chain-assurance/how-to-guides", } ],
    },
     
    {
      type: "category",
      label: "Settings",
      link: {
        type: "generated-index",
        slug: "category/settings-1"
      },
      collapsed: true,
      items: [ { type: "autogenerated", dirName: "software-supply-chain-assurance/settings", } ],
    },
      ],
    }, // Release Notes
    {
      type: 'link',
      label: 'Release Notes',
      className: 'sidebar-Release_Notes',
      href: '/release-notes/software-supply-chain-assurance',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // Roadmap
    {
      type: 'link',
      label: 'Roadmap',
      className: 'sidebar-roadmap',
      href: '/roadmap/#ssca',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // API Docs
    {
      type: 'link',
      label: 'API Reference',
      className: 'sidebar-API_Reference',
      href: 'https://apidocs.harness.io/',
      customProps: {
        description: 'Harness API Docs.',
      },
    },
    // University
    {
      type: "link",
      label: "Certifications & Training",
      className: "sidebar-university",
      href: '/university/scs',
      customProps: {
        description: 'Get certified and learn in Harness Software Supply Chain Assurance from our training programs.',
      },
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
  // Chaos Engineering docs
  chaosengineering: [
    {
      type: 'category',
      label: 'Chaos Engineering',
      className: 'sidebar-ce',
      link: {
        type: 'doc',
        id: 'chaos-engineering',
      },
      customProps: {
        description: 'Learn how to build and validate resilience.',
      },
      collapsed: true,
      items: [
        {
          type: 'html',
          value: 'New to Chaos Engineering?',
          className: 'horizontal-bar',
        },
        'chaos-engineering/overview',
        'chaos-engineering/whats-supported',
        'chaos-engineering/on-premise-vs-saas',
        'chaos-engineering/key-concepts',
        'chaos-engineering/quickstart',
        {
          type: 'html',
          value: 'Use Chaos Engineering',
          className: 'horizontal-bar',
        },
        // {
        //   type: "category",
        //   label: "Chaos Experiments",
        //   link: {
        //     type: "generated-index",
        //   },
        //   collapsed: true,
        //   items: [ { type: "autogenerated", dirName: "chaos-engineering/guides/chaos-experiments", } ],
        // },
        "chaos-engineering/guides/experiments",
        "chaos-engineering/guides/chaoshub",
        "chaos-engineering/guides/application-maps",
        "chaos-engineering/guides/service-discovery",
        "chaos-engineering/guides/gamedays",
        "chaos-engineering/guides/image-registry",
        {
          type: 'category',
          label: 'Chaos Dashboard',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'chaos-engineering/guides/dashboards' }],
        },
        {
          type: 'category',
          label: 'Governance',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'chaos-engineering/guides/governance' }],
        },
        {
          type: 'category',
          label: 'Infrastructure',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'chaos-engineering/guides/infrastructures' }],
        },
        {
          type: 'category',
          label: 'Probes',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'chaos-engineering/guides/probes' }],
        },
        {
          type: 'category',
          label: 'Actions',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'chaos-engineering/guides/actions' }],
        },
        'chaos-engineering/guides/templates',
        {
          type: 'category',
          label: 'On-premises (SMP)',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'chaos-engineering/guides/on-premises-smp' }],
        },
        {
          type: 'category',
          label: 'AI',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'chaos-engineering/guides/ai' }],
        },
        'chaos-engineering/guides/gke-autopilot',
        'chaos-engineering/guides/license-consumption',
        {
          type: 'html',
          value: 'Faults',
          className: 'horizontal-bar',
        },
        'chaos-engineering/faults/chaos-faults',
        {
          type: 'category',
          label: 'Chaos Fault Categories',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          className: 'sidebar-hidden',
          items: [{ type: 'autogenerated', dirName: 'chaos-engineering/faults/chaos-faults' }],
        },
        {
          type: 'category',
          label: 'BYOC',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'chaos-engineering/faults/byoc' }],
        },
        {
          type: 'category',
          label: 'Custom Faults',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'chaos-engineering/faults/custom-faults' }],
        },
        {
          type: 'html',
          value: 'Integrations',
          className: 'horizontal-bar',
        },
        {
          type: 'category',
          label: 'CI/CD',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'chaos-engineering/integrations/cicd' }],
        },
        {
          type: 'category',
          label: 'Performance Testing Tools',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'chaos-engineering/integrations/performance-testing',
            },
          ],
        },
        'chaos-engineering/integrations/google-cloud-build',

        {
          type: 'html',
          value: 'Security',
          className: 'horizontal-bar',
        },
        'chaos-engineering/security/index',
        'chaos-engineering/security/namespace-considerations',
        {
          type: 'category',
          label: 'Security Templates',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'chaos-engineering/security/security-templates' },
          ],
        },
        {
          type: 'html',
          value:
            '<span style="color:#4B5563; font-weight:600;"> Troubleshooting & Resources </span>',
          className: 'horizontal-bar',
        },
        'chaos-engineering/resources/hce-vs-litmus',
        'chaos-engineering/resources/troubleshooting',
        'chaos-engineering/resources/faqs',
        {
          type: 'category',
          label: 'Training and Certification',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'chaos-engineering/resources/training' }],
        },
        {
          type: 'category',
          label: 'API Reference',
          items: [
            'chaos-engineering/resources/api-reference/hce-cli',
            'chaos-engineering/resources/api-reference/hce-onboarding-api',
          ],
        },
      ],
    },
    // Release Notes
    {
      type: 'link',
      label: 'Release Notes',
      className: 'sidebar-Release_Notes',
      href: '/release-notes/chaos-engineering',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // Roadmap
    {
      type: 'link',
      label: 'Roadmap',
      className: 'sidebar-roadmap',
      href: '/roadmap/#ce',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // API Docs
    {
      type: 'link',
      label: 'API Reference',
      className: 'sidebar-API_Reference',
      href: 'https://apidocs.harness.io/chaos.html',
      customProps: {
        description: 'Harness API Docs.',
      },
    },
    // University
    {
      type: "link",
      label: "Certifications & Training",
      className: "sidebar-university",
      href: '/university/chaos-engineering',
      customProps: {
        description: 'Get certified and learn in Harness Chaos Engineering from our training programs.',
      },
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
  aisre: [
    {
      type: 'category',
      label: 'AI SRE',
      className: 'sidebar-aisre',
      link: {
        type: 'doc',
        id: 'ai-sre',
      },
      customProps: {
        description:
          'Revolutionize incident management by focusing on proactive issue prevention and accelerated resolution.',
      },
      collapsed: true,
      items: [
        {
          type: 'html',
          value: 'New to AI SRE?',
          className: 'horizontal-bar',
        },
        'ai-sre/get-started/overview',
        {
          type: 'html',
          value: 'Use AI SRE',
          className: 'horizontal-bar',
        },
        {
          type: 'category',
          label: 'Alerts',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'ai-sre/alerts' }],
        },
        {
          type: 'category',
          label: 'Incidents',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'ai-sre/incidents' }],
        },
        {
          type: 'category',
          label: 'AI Scribe Agent',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'ai-sre/ai-agent' }],
        },
        {
          type: 'category',
          label: 'Oncall',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'ai-sre/oncall' }],
        },
        {
          type: 'category',
          label: 'Runbooks',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'ai-sre/runbooks' }],
        },
        {
          type: 'html',
          value: 'Troubleshooting & Resources',
          className: 'horizontal-bar',
        },
        'ai-sre/resources/whats-supported',
        'ai-sre/resources/ai-sre-best-practices',
        'ai-sre/resources/faq',
      ],
    },
    // Roadmap
    {
      type: 'link',
      label: 'Roadmap',
      className: 'sidebar-roadmap',
      href: '/roadmap/#ai-sre',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // API Docs
    {
      type: 'link',
      label: 'API Reference',
      className: 'sidebar-API_Reference',
      href: 'https://apidocs.harness.io/chaos.html',
      customProps: {
        description: 'Harness API Docs.',
      },
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
  servicereliabilitymanagement: [
    // Service Reliability Management Page
    {
      type: 'category',
      label: 'Service Reliability Management',
      className: 'sidebar-srm',
      link: {
        type: 'doc',
        id: 'service-reliability-management',
      },
      customProps: {
        description:
          'Learn how to use real-time insights to improve the reliability of applications and services.',
      },
      collapsed: true,
      items: [
        {
          type: "html",
          value: "New to SRM?",
          className: "horizontal-bar",
        },
        "service-reliability-management/srm-whats-supported",
        {
          type:"category",
          label: "Get Started",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "service-reliability-management/get-started", } ],
        },
        {
          type: "html",
          value: "Use SRM",
          className: "horizontal-bar",
        },
        {
          type:"category",
          label: "SLO Types",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "service-reliability-management/slo", } ],
        },
        {
          type:"category",
          label: "Manage SLO",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "service-reliability-management/manage-slo", } ],
        },
        {
          type:"category",
          label: "Monitored Services",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "service-reliability-management/monitored-service", } ],
        },
        {
          type:"category",
          label: "SRM Notifications",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "service-reliability-management/notifications", } ],
        },
        "service-reliability-management/slo-driven-deployment-governance",        
        {
          type:"category",
          label: "Change Impact Analysis",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "service-reliability-management/change-impact-analysis", } ],
        },
        {
          type:"category",
          label: "SRM Dashboards",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "service-reliability-management/srm-dashboard", } ],
        },
        {
          type: "html",
          value: "Troubleshooting & Resources",
          className: "horizontal-bar",
        },
        "service-reliability-management/srm-roles-and-permissions",
        "service-reliability-management/service-reliability-management-faqs",
      ],
    }, // Release Notes
    {
      type: 'link',
      label: 'Release Notes',
      className: 'sidebar-Release_Notes',
      href: '/release-notes/service-reliability-management',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // API Docs
    {
      type: 'link',
      label: 'API Reference',
      className: 'sidebar-API_Reference',
      href: 'https://apidocs.harness.io/',
      customProps: {
        description: 'Harness API Docs.',
      },
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
  continuouserrortracking: [
    // Continuous Error Tracking landing page
    {
      type: 'category',
      label: 'Continuous Error Tracking',
      className: 'sidebar-cet',
      link: {
        type: 'doc',
        id: 'continuous-error-tracking',
      },
      customProps: {
        description: 'Learn how you can identify, triage, and resolve errors in applications.',
      },
      collapsed: true,
      items: [
        {
          type: 'autogenerated',
          dirName: 'continuous-error-tracking',
        },
      ],
    }, // Release Notes
    {
      type: 'link',
      label: 'Release Notes',
      className: 'sidebar-Release_Notes',
      href: '/release-notes/continuous-error-tracking',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // API Docs
    {
      type: 'link',
      label: 'API Reference',
      className: 'sidebar-API_Reference',
      href: 'https://apidocs.harness.io/',
      customProps: {
        description: 'Harness API Docs.',
      },
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
  internaldeveloperportal: [
    {
      type: 'category',
      label: 'Internal Developer Portal',
      className: 'sidebar-idp',
      link: {
        type: 'doc',
        id: 'internal-developer-portal',
      },
      customProps: {
        description: 'Get started with Harness Internal Developer Portal',
      },
      collapsed: true,
      items: [
        {
          type: 'html',
          value: '<span style="color:#6B7280; font-weight:1000;"> New to IDP? </span>',
          className: 'horizontal-bar',
        },
        'internal-developer-portal/whats-supported',
        'internal-developer-portal/overview',
        {
          type: 'category',
          label: 'Harness IDP 2.0 Overview',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'internal-developer-portal/idp-2o-overview' }],
        },
        {
          type: 'category',
          label: 'Get Started',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'internal-developer-portal/get-started' }],
        },
        'internal-developer-portal/harness-vs-backstage',
        {
          type: 'html',
          value: '<span style="color:#6B7280; font-weight:1000;"> Use IDP </span>',
          className: 'horizontal-bar',
        },
        {
          type: 'category',
          label: 'Software Catalog',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'internal-developer-portal/catalog' }],
        },
        {
          type: 'category',
          label: 'Self Service Workflows',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'internal-developer-portal/flows' }],
        },
        {
          type: 'category',
          label: 'Environment Management',
          className: 'sidebar-item-new',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'internal-developer-portal/environment-management' },
          ],
        },
        {
          type: 'category',
          label: 'TechDocs',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'internal-developer-portal/techdocs' }],
        },
        {
          type: 'category',
          label: 'Scorecards',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'internal-developer-portal/scorecards' }],
        },
        {
          type: 'category',
          label: 'Plugins',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'internal-developer-portal/plugins' }],
        },
        {
          type: 'category',
          label: 'Git Experience',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'internal-developer-portal/git-experience' }],
        },
        {
          type: 'html',
          value: '<span style="color:#6B7280; font-weight:1000;"> Admin & Customization </span>',
          className: 'horizontal-bar',
        },
        {
          type: 'category',
          label: 'RBAC',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'internal-developer-portal/rbac' }],
        },
        {
          type: 'category',
          label: 'Layout & Appearance',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'internal-developer-portal/layout-and-appearance' },
          ],
        },
        {
          type: 'category',
          label: 'Platform Dashboards',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'internal-developer-portal/dashboard' }],
        },
        {
          type: 'category',
          label: 'Governance',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'internal-developer-portal/governance' }],
        },
        {
          type: 'html',
          value: '<span style="color:#6B7280; font-weight:1000;"> Working with APIs </span>',
          className: 'horizontal-bar',
        },
        {
          type: 'category',
          label: 'API References',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'internal-developer-portal/api-refernces' }],
        },
        {
          type: 'html',
          value:
            '<span style="font-weight:1000; color:#6B7280;"> Troubleshooting & Resources </span>',
          className: 'horizontal-bar',
        },
        {
          type: "category",
          label: "Self Managed Platform",
          link: {
            type: "generated-index",
            description: "Documentation for integrating and using Harness Internal Developer Portal with Self Managed Platform"
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "internal-developer-portal/smp", } ],
        },
        {
          type: 'category',
          label: 'Troubleshoot & FAQs',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'internal-developer-portal/troubleshooting' }],
        },
        {
          type: 'category',
          label: 'Knowledge Base',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'internal-developer-portal/kb-idp' }],
        },
        {
          type: 'category',
          label: 'IDP Tutorials',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'internal-developer-portal/tutorials' }],
        },
        {
          type: 'category',
          label: 'Adoption Guide',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'internal-developer-portal/adoption' }],
        },
      ],
    }, // Release Notes
    {
      type: 'link',
      label: 'Release Notes',
      className: 'sidebar-Release_Notes',
      href: '/release-notes/internal-developer-portal',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // Roadmap
    {
      type: 'link',
      label: 'Roadmap',
      className: 'sidebar-roadmap',
      href: '/roadmap/#idp',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // API Docs
    {
      type: 'link',
      label: 'API Reference',
      className: 'sidebar-API_Reference',
      href: 'https://apidocs.harness.io/',
      customProps: {
        description: 'Harness API Docs.',
      },
    },
    // University
    {
      type: "link",
      label: "Certifications & Training",
      className: "sidebar-university",
      href: '/university/idp',
      customProps: {
        description: 'Get certified and learn in Harness Internal Developer Portal from our training programs.',
      },
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
  clouddevelopmentenvironment: [
    {
      type: 'category',
      label: 'Cloud Development Environments',
      className: 'sidebar-cde',
      link: {
        type: 'doc',
        id: 'cloud-development-environments',
      },
      customProps: {
        description:
          'Accelerate developer experience with secure, scalable and pre-configured development environments',
      },
      collapsed: true,
      items: [
        {
          type: 'html',
          value: 'New to CDE?',
          className: 'horizontal-bar',
        },
        'cloud-development-environments/overview',
        {
          type: 'category',
          label: 'Get Started',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'cloud-development-environments/introduction' },
          ],
        },
        {
          type: 'category',
          label: 'Deep Dive into Gitspaces',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'cloud-development-environments/deep-dive-into-gitspaces',
            },
          ],
        },
        {
          type: 'html',
          value: 'Use CDE',
          className: 'horizontal-bar',
        },
        {
          type: 'category',
          label: 'Manage Gitspaces',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'cloud-development-environments/manage-gitspaces' },
          ], // eslint-disable-line spellcheck/spell-checker
        },
        {
          type: 'category',
          label: 'Develop in Gitspaces',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'cloud-development-environments/develop-using-cde' },
          ],
        },
        {
          type: 'category',
          label: 'Features of Gitspaces',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'cloud-development-environments/features-of-gitspaces',
            },
          ],
        },
        {
          type: 'category',
          label: 'Git Providers',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'cloud-development-environments/git-providers' },
          ],
        },
        {
          type: 'category',
          label: 'IDEs',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'cloud-development-environments/ides' }],
        },
        {
          type: 'html',
          value: 'Configure CDE',
          className: 'horizontal-bar',
        },
        {
          type: 'category',
          label: 'Self Hosted Gitspaces',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'cloud-development-environments/self-hosted-gitspaces',
            },
          ],
        },
        'cloud-development-environments/rbac',
        'cloud-development-environments/admin-settings',
      ], //Close items array
    }, // Cloud Development Environments
    {
      type: 'link',
      label: 'Release Notes',
      className: 'sidebar-Release_Notes',
      href: '/release-notes/cloud-development-environments',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // Roadmap
    {
      type: 'link',
      label: 'Roadmap',
      className: 'sidebar-roadmap',
      href: '/roadmap/#cde',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // API Docs
    {
      type: 'link',
      label: 'API Reference',
      className: 'sidebar-API_Reference',
      href: 'https://apidocs.harness.io/',
      customProps: {
        description: 'Harness API Docs.',
      },
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
  softwareengineeringinsights: [
    {
      type: 'category',
      label: 'Software Engineering Insights',
      className: 'sidebar-sei',
      link: {
        type: 'doc',
        id: 'software-engineering-insights',
      },
      customProps: {
        description: 'Learn how data-led insights can remove bottlenecks and improve productivity.',
      },
      collapsed: true,
      items: [
        {
          type: "html",
          value: "New to Harness SEI?",
          className: "horizontal-bar",
        },
        'software-engineering-insights/harness-sei/sei-overview',
        'software-engineering-insights/harness-sei/get-started/sei-key-concepts',
        'software-engineering-insights/harness-sei/transition',
        {
          type: 'html',
          value: 'Use SEI 2.0',
          className: 'horizontal-bar',
        },
        {
          type: 'category',
          label: 'SEI 2.0 (Recommended)',
          link: {
            type: 'generated-index',
            slug: '/category/sei-recommended',
          },
          items: [
            {
              type: 'category',
              label: 'Get started with SEI 2.0',
              items: [
                { type: 'autogenerated', dirName: 'software-engineering-insights/harness-sei/get-started' },
              ],
            },
            {
              type: 'category',
              label: 'Set up SEI 2.0',
              items: [
                { type: 'autogenerated', dirName: 'software-engineering-insights/harness-sei/setup-sei' },
              ],
            },
            {
              type: 'category',
              label: 'Manage SEI 2.0',
              items: [
                { type: 'autogenerated', dirName: 'software-engineering-insights/harness-sei/manage' },
              ],
            },
            {
              type: 'category',
              label: 'Analytics and Reporting',
              items: [
                { type: 'autogenerated', dirName: 'software-engineering-insights/harness-sei/analytics-and-reporting' },
              ],
            },
            {
              type: 'category',
              label: 'API',
              items: [
                { type: 'autogenerated', dirName: 'software-engineering-insights/harness-sei/api' },
              ],
            },
          ],
        },
        {
          type: 'html',
          value: 'Use SEI 1.0',
          className: 'horizontal-bar',
        },
        {
          type: 'category',
          label: 'SEI 1.0 (Legacy)',
          link: {
            type: 'generated-index',
            slug: '/category/sei-current',
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'software-engineering-insights/propelo-sei',
            },
          ],
        },
        {
          type: 'html',
          value: 'Troubleshooting & Resources',
          className: 'horizontal-bar',
        },
        'software-engineering-insights/sei-supported-platforms',
        {
          type: 'category',
          label: 'Troubleshooting',
          link: {
            type: 'generated-index',
            slug: '/category/sei-troubleshooting',
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'software-engineering-insights/troubleshoot-sei',
            },
          ],
        },
        {
          type: 'doc',
          id: 'software-engineering-insights/sei-support',
          label: 'Harness Support',
        },
      ],
    }, // Release Notes
    {
      type: 'link',
      label: 'Release Notes',
      className: 'sidebar-Release_Notes',
      href: '/release-notes/software-engineering-insights',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // Roadmap
    {
      type: 'link',
      label: 'Roadmap',
      className: 'sidebar-roadmap',
      href: '/roadmap/#sei',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // API Docs
    {
      type: 'link',
      label: 'API Reference',
      className: 'sidebar-API_Reference',
      href: 'https://apidocs.harness.io/',
      customProps: {
        description: 'Harness API Docs.',
      },
    },
    // University
    {
      type: "link",
      label: "Certifications & Training",
      className: "sidebar-university",
      href: '/university/sei',
      customProps: {
        description: 'Get certified and learn in Harness Software Engineering Insights from our training programs.',
      },
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
  selfmanagedenterpriseedition: [
    {
      type: 'category',
      label: 'Self-Managed Enterprise Edition',
      className: 'sidebar-smp',
      link: {
        type: 'doc',
        id: 'self-managed-enterprise-edition',
      },
      customProps: {
        description:
          'Learn how to use this end-to-end solution for continuous, self-managed delivery.',
      },
      collapsed: true,
      items: [
        {
          type: 'html',
          value: 'New to Self-Managed Enterprise Edition?',
          className: 'horizontal-bar',
        },
        'self-managed-enterprise-edition/smp-overview',
        'self-managed-enterprise-edition/smp-supported-platforms',
        {
          type: 'html',
          value: 'Use Self-Managed Enterprise Edition',
          className: 'horizontal-bar',
        },
        'self-managed-enterprise-edition/smp-basic-configuration',
        {
          type: 'category',
          label: 'Cloud Providers',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'self-managed-enterprise-edition/cloud-providers' },
          ],
        },
        {
          type: 'category',
          label: 'Install',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'self-managed-enterprise-edition/install' }],
        },
        {
          type: 'category',
          label: 'Advanced Configuration',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'self-managed-enterprise-edition/advanced-configurations',
            },
          ],
        },
        'self-managed-enterprise-edition/smp-fips-overview',
        {
          type: 'html',
          value: 'Troubleshooting & Resources',
          className: 'horizontal-bar',
        },
        'self-managed-enterprise-edition/back-up-and-restore-helm',
        {
          type: 'category',
          label: 'Troubleshooting',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'self-managed-enterprise-edition/troubleshooting' },
          ],
        },
        {
          type: 'category',
          label: 'Monitoring',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'self-managed-enterprise-edition/monitoring' }],
        },
        'self-managed-enterprise-edition/performance-reports',
        'self-managed-enterprise-edition/support-bundle-utility',
      ],
    }, // Release Notes
    {
      type: 'link',
      label: 'Release Notes',
      className: 'sidebar-Release_Notes',
      href: '/release-notes/self-managed-enterprise-edition',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // API Docs
    {
      type: 'link',
      label: 'API Reference',
      className: 'sidebar-API_Reference',
      href: 'https://apidocs.harness.io/',
      customProps: {
        description: 'Harness API Docs.',
      },
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
  opensource: [
    {
      type: 'category',
      label: 'Open Source',
      className: 'sidebar-opensource',
      link: {
        type: 'doc',
        id: 'open-source',
      },
      customProps: {
        description: 'Learn about the latest open source offerings from Harness.',
      },
      collapsed: true,
      items: [
        {
          type: "html",
          value: "New to Harness Open Source?",
          className: "horizontal-bar",
        },
        'open-source/installation/quick-start',
        'open-source/installation/settings',
        {
          type: "html",
          value: "Use Harness Open Source",
          className: "horizontal-bar",
        },
        {
          type: "category",
          label: "Manage Repositories",
          link: {
            type: "generated-index",
            slug: "/category/repositories-1",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "open-source/repositories" } ],
        },
        {
          type: "category",
          label: "Gitspaces",
          link: {
            type: "generated-index",
            slug: "/category/gitspaces",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "open-source/gitspaces" } ],
        },
        {
          type: "category",
          label: "Pipelines",
          link: {
            type: "generated-index",
            slug: "/category/pipelines-1",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "open-source/pipelines" } ],
        },
        {
          type: "category",
          label: "Registries",
          link: {
            type: "generated-index",
            slug: "/category/registries",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "open-source/registries" } ],
        },
        {
          type: "category",
          label: "Administration",
          link: {
            type: "generated-index",
            slug: "/category/administration-1",
          },
          collapsed: true,
          items: [ { type: "autogenerated", dirName: "open-source/administration" } ],
        },
        {
          type: "html",
          value: "Troubleshooting & Resources",
          className: "horizontal-bar",
        },
        "open-source/support",
        "open-source/faq",
      ],
    },
    // Release Notes
    {
      type: 'link',
      label: 'Release Notes',
      className: 'sidebar-Release_Notes',
      href: '/release-notes/code-repository',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // Roadmap
    {
      type: 'link',
      label: 'Roadmap',
      className: 'sidebar-roadmap',
      href: '/roadmap/#code',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // API Docs
    {
      type: 'link',
      label: 'API Reference',
      className: 'sidebar-API_Reference',
      href: 'https://apidocs.harness.io/tag/repository/',
      customProps: {
        description: 'Harness API Docs.',
      },
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
  // applicationapiposturemanagement: [
  //   {
  //     type: 'category',
  //     label: 'Application & Api Posture Management ',
  //     className: 'sidebar-application-api-posture-management',
  //     link: {
  //       type: 'doc',
  //       id: 'application-api-posture-management',
  //     },
  //     customProps: {
  //       description:
  //         'Learn about the latest Application & Api Posture Management  offerings from Harness.',
  //     },
  //     collapsed: true,
  //     items: [{ type: 'autogenerated', dirName: 'application-api-posture-management' }],
  //   },
  //   // Release Notes
  //   {
  //     type: 'link',
  //     label: 'Release Notes',
  //     className: 'sidebar-Release_Notes',
  //     href: '/release-notes/code-repository',
  //     customProps: {
  //       description: 'Learn about recent changes to Harness products.',
  //     },
  //   },
  //   // Roadmap
  //   {
  //     type: 'link',
  //     label: 'Roadmap',
  //     className: 'sidebar-roadmap',
  //     href: '/roadmap/#code',
  //     customProps: {
  //       description: 'Learn about recent changes to Harness products.',
  //     },
  //   },
  //   // API Docs
  //   {
  //     type: 'link',
  //     label: 'API Reference',
  //     className: 'sidebar-API_Reference',
  //     href: 'https://apidocs.harness.io/tag/repository/',
  //     customProps: {
  //       description: 'Harness API Docs.',
  //     },
  //   },
  //   // All Docs
  //   {
  //     type: 'link',
  //     label: 'Show All Docs',
  //     className: 'sidebar-all_docs',
  //     href: '/docs',
  //     customProps: {
  //       description: 'All Docs.',
  //     },
  //   },
  // ],

  // applicationApiSecurityTesting: [
  //   {
  //     type: 'category',
  //     label: 'Application & Api Security Testing',
  //     className: 'sidebar-application-api-security-testing',
  //     link: {
  //       type: 'doc',
  //       id: 'application-api-security-testing',
  //     },
  //     customProps: {
  //       description:
  //         'Learn about the latest Application & Api Security Testing offerings from Harness.',
  //     },
  //     collapsed: true,
  //     items: [{ type: 'autogenerated', dirName: 'application-api-security-testing' }],
  //   },
  //   // Release Notes
  //   {
  //     type: 'link',
  //     label: 'Release Notes',
  //     className: 'sidebar-Release_Notes',
  //     href: '/release-notes/code-repository',
  //     customProps: {
  //       description: 'Learn about recent changes to Harness products.',
  //     },
  //   },
  //   // Roadmap
  //   {
  //     type: 'link',
  //     label: 'Roadmap',
  //     className: 'sidebar-roadmap',
  //     href: '/roadmap/#code',
  //     customProps: {
  //       description: 'Learn about recent changes to Harness products.',
  //     },
  //   },
  //   // API Docs
  //   {
  //     type: 'link',
  //     label: 'API Reference',
  //     className: 'sidebar-API_Reference',
  //     href: 'https://apidocs.harness.io/tag/repository/',
  //     customProps: {
  //       description: 'Harness API Docs.',
  //     },
  //   },
  //   // All Docs
  //   {
  //     type: 'link',
  //     label: 'Show All Docs',
  //     className: 'sidebar-all_docs',
  //     href: '/docs',
  //     customProps: {
  //       description: 'All Docs.',
  //     },
  //   },
  // ],
  // applicationApiProtection: [
  //   {
  //     type: 'category',
  //     label: 'Application & Api Protection',
  //     className: 'sidebar-application-api-protection',
  //     link: {
  //       type: 'doc',
  //       id: 'application-api-protection',
  //     },
  //     customProps: {
  //       description: 'Learn about the latest Application & Api Protection offerings from Harness.',
  //     },
  //     collapsed: true,
  //     items: [{ type: 'autogenerated', dirName: 'application-api-protection' }],
  //   },
  //   // Release Notes
  //   {
  //     type: 'link',
  //     label: 'Release Notes',
  //     className: 'sidebar-Release_Notes',
  //     href: '/release-notes/code-repository',
  //     customProps: {
  //       description: 'Learn about recent changes to Harness products.',
  //     },
  //   },
  //   // Roadmap
  //   {
  //     type: 'link',
  //     label: 'Roadmap',
  //     className: 'sidebar-roadmap',
  //     href: '/roadmap/#code',
  //     customProps: {
  //       description: 'Learn about recent changes to Harness products.',
  //     },
  //   },
  //   // API Docs
  //   {
  //     type: 'link',
  //     label: 'API Reference',
  //     className: 'sidebar-API_Reference',
  //     href: 'https://apidocs.harness.io/tag/repository/',
  //     customProps: {
  //       description: 'Harness API Docs.',
  //     },
  //   },
  //   // All Docs
  //   {
  //     type: 'link',
  //     label: 'Show All Docs',
  //     className: 'sidebar-all_docs',
  //     href: '/docs',
  //     customProps: {
  //       description: 'All Docs.',
  //     },
  //   },
  // ],
};

export default sidebars;
