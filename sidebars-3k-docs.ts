import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';
const sidebars: SidebarsConfig = {
  allcontent: [
    // Documentation Parent
    {
      type: 'category',
      label: 'Documentation 3.0',
      className: 'sidebar-all_docs',
      link: {
        type: 'doc',
        id: 'index',
      },
      collapsed: true,
      items: [
        {
          type: 'link',
          label: 'Harness AI',
          className: 'sidebar-ai',
          href: '/3k-docs/ai',
          customProps: {
            description: 'Learn how to use Harness AI to create pipelines, troubleshoot failures, and integrate with your IDE.',
          },
        },
        // Platform Landing Page
        {
          type: 'link',
          label: 'Harness Platform',
          className: 'sidebar-platform',
          href: '/3k-docs/platform',
          customProps: {
            description: 'Learn how to manage Harness features that integrate with all modules.',
          },
        },
        // Code Repository Landing Page
        {
          type: 'link',
          label: 'Code Repository',
          className: 'sidebar-cr',
          href: '/3k-docs/code-repository',
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
          href: '/3k-docs/continuous-integration',
          customProps: {
            description: 'Learn how you can build faster and be more productive.',
          },
        },
        // Artifact Registry landing page
        {
          type: 'link',
          label: 'Artifact Registry',
          className: 'sidebar-ar',
          href: '/3k-docs/artifact-registry',
          customProps: {
            description: 'Store your artifacts natively with Harness.',
          },
        },
        // AI Test Automation landing page
        {
          type: 'link',
          label: 'AI Test Automation',
          className: 'sidebar-ata',
          href: '/3k-docs/ai-test-automation',
          customProps: {
            description: 'Store your AI Test Automation natively with Harness.',
          },
        },
        // Continuous Delivery Landing Page
        {
          type: 'link',
          label: 'Continuous Delivery',
          className: 'sidebar-cd',
          href: '/3k-docs/continuous-delivery',
          customProps: {
            description: 'Learn how to make your software releases more efficient and reliable.',
          },
        },
        // Release Orchestration Landing Page
        {
          type: 'link',
          href: '/3k-docs/release-orchestration',
          label: 'Release Orchestration',
          className: 'sidebar-rm',

          customProps: {
            description:
              'Learn how to orchestrate and manage complex software releases across multiple services and teams.',
          },
        },
        // Database DevOps Landing Page
        {
          type: 'link',
          href: '/3k-docs/database-devops',
          label: 'Database DevOps',
          className: 'sidebar-dbdevops',

          customProps: {
            description: 'Get started with Harness Database DevOps',
          },
        },
        // Infrastructure as Code Landing Page
        {
          type: 'link',
          href: '/3k-docs/infrastructure-as-code-management',
          label: 'Infrastructure as Code Management',
          className: 'sidebar-iacm',

          customProps: {
            description: 'Get started with Harness Infrastructure as Code Management',
          },
        },
        // Feature Management & Experimentation Landing Page
        {
          type: 'link',
          href: '/3k-docs/feature-management-experimentation',
          label: 'Feature Management & Experimentation',
          className: 'sidebar-fme',

          customProps: {
            description: 'Learn how to enable data-driven features and gradual rollouts.',
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
        // Cloud Cost Management Landing Page
        {
          type: 'link',
          href: '/3k-docs/cloud-cost-management',
          label: 'Cloud & AI Cost Management',
          className: 'sidebar-ccm',

          customProps: {
            description: 'Learn how to manage and optimize cloud costs.',
          },
        },
        // AI Security Landing Page
        {
          type: 'link',
          href: '/3k-docs/ai-security',
          label: 'AI Security',
          className: 'sidebar-aisec',

          customProps: {
            description: 'Secure the lifecycle of AI-native applications.'
          },
        },
        // API and Application Discovery Page
        {
          type: "link",
          href: "/docs/appsec-discovery",
          label: "API & Application Discovery",
          className: "sidebar-adra",

          customProps: {
            description: "Learn how API & Application Discovery gives you complete visibility into your API ecosystem.",
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
          href: '/3k-docs/security-testing-orchestration',
          label: 'Security Tests',
          className: 'sidebar-sto',

          customProps: {
            description: 'Learn how to left shift your security testing.',
          },
        },
        // SCS
        {
          type: 'link',
          href: '/3k-docs/software-supply-chain-assurance',
          label: 'Supply Chain Security',
          className: 'sidebar-ssca',

          customProps: {
            description: 'Learn how to secure your software supply chain.',
          },
        },
        {
          type: 'link',
          href: '/3k-docs/sast-and-sca',
          label: 'SAST and SCA',
          className: 'sidebar-qwietai',

          customProps: {
            description: 'Secure code and dependencies with AI-powered static analysis.',
          },
        },
        {
          type: 'link',
          href: '/3k-docs/resilience-testing',
          label: 'Resilience Testing',
          className: 'sidebar-rt',
          customProps: {
            description: 'Test system resilience with Chaos, Load, and DR Testing.',
          },
        },
        //{
        //  type: 'link',
        //  href: '/3k-docs/chaos-engineering',
        //  label: 'Chaos Engineering',
        //  className: 'sidebar-ce-new',
        //  customProps: {
        //    description: 'Learn how to build and validate resilience.',
        //  },
        //},
        // AI SRE Landing Page
        {
          type: 'link',
          href: '/3k-docs/ai-sre',
          label: 'AI SRE',
          className: 'sidebar-aisre',
          customProps: {
            description: 'Get started with Harness AI SRE',
          },
        },
        // IDP
        {
          type: 'link',
          href: '/3k-docs/internal-developer-portal',
          label: 'Internal Developer Portal',
          className: 'sidebar-idp',

          customProps: {
            description: 'Get started with Harness Internal Developer Portal',
          },
        },
        // SEI
        {
          type: 'link',
          href: '/3k-docs/ai-dlc-insights',
          label: 'AI DLC Insights',
          className: 'sidebar-aidi',
          customProps: {
            description:
              'Learn how data-led insights can remove bottlenecks and improve productivity.',
          },
        },
        // Harness Solutions Factory Landing Page
        {
          type: 'link',
          href: '/3k-docs/harness-solutions-factory',
          label: 'Harness Solutions Factory',
          className: 'sidebar-hsf',

          customProps: {
            description: 'Get started with Harness Solutions Factory',
          },
        },
        // {
        //   type: 'link',
        //   label: 'Application & Api Posture Management',
        //   href: '/3k-docs/application-api-posture-management',
        //   className: 'sidebar-application-api-posture-management',
        //   customProps: {
        //     description: 'Information on how the Harness SaaS is managed.',
        //   },
        // },
        // {
        //   type: 'link',
        //   label: 'Application & Api Security Testing',
        //   href: '/3k-docs/application-api-security-testing',
        //   className: 'sidebar-application-api-security-testing',
        //   customProps: {
        //     description: 'Information on how the Harness SaaS is managed.',
        //   },
        // },
        // {
        //   type: 'link',
        //   label: 'Application & Api Protection',
        //   href: '/3k-docs/application-api-protection',
        //   className: 'sidebar-application-api-protection',
        //   customProps: {
        //     description: 'Information on how the Harness SaaS is managed.',
        //   },
        // },
        // Glossary
      ],
    },
  ],
  //Additional Items in this parent can go here.
  //   individual module page sidebar start
  
  ai: [
    {
      type: 'category',
      label: 'Harness AI',
      className: 'sidebar-ai',
      link: {
        type: 'doc',
        id: 'ai',
      },
      customProps: {
        description: '.',
      },
      collapsed: true,
      items: [
        {
          type: 'html',
          value: 'New to Harness AI?',
          className: 'horizontal-bar',
        },
        {
          type: 'category',
          label: 'Getting Started',
          link: {
            type: 'doc',
            id: 'ai/overview',
          },
          items: [
            'ai/effective-prompting-ai',
            'ai/harness-create-with-ai',
          ],
        },
        {
          type: 'html',
          value: 'Use Harness AI',
          className: 'horizontal-bar',
        },
        {
          type: 'category',
          label: 'AI Agents',
          collapsed: true,
          items: [
            'ai/harness-agents',
            'ai/create-agent',
            'ai/devops-agent',
            'ai/release-agent',
            'ai/support-agent',
            'ai/code-agent',
            'ai/security-agent',
            'ai/productivity-agent',
          ],
        },
        {
          type: 'category',
          label: 'Use Cases',
          collapsed: true,
          items: [
            'ai/harness-ai-chat-guide',
            'ai/ci-agent',
            'ai/ccm-agent',
            'ai/sto-agent',
          ],
        },
        {
          type: 'category',
          label: 'IDE & Integrations',
          collapsed: true,
          items: [
            'ai/harness-mcp-server',
            'ai/vscode-extension',
            'ai/cursor-plugin',
            'ai/harness-skills',
            'ai/anthropic-harness-connector',
            'ai/harness-gemini-extension',
          ],
        },
        {
          type: 'html',
          value: 'Personalization',
          className: 'horizontal-bar',
        },
        'ai/memory-chat-history',
        'ai/rules',
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
    },
  ],
  coderepository: [
    {
      type: 'category',
      label: 'Repositories',
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
          type: "link",
          label: "API Reference",
          href: "/api-reference?module=code-repository",
          className: "horizontal-bar",
        },
        {
          type: "html",
          value: "New to Harness Code?",
          className: "horizontal-bar",
        },
        "code-repository/get-started/overview",
        "code-repository/get-started/onboarding-guide",
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
          items: [{ type: "autogenerated", dirName: "code-repository/config-repos" }],
        },
        {
          type: "category",
          label: "Collaborate & Develop",
          link: {
            type: "generated-index",
            slug: "/category/collaborate-and-develop",
          },
          collapsed: true,
          items: [{ type: "autogenerated", dirName: "code-repository/work-in-repos" }],
        },
        {
          type: "category",
          label: "Code Repository Integrations",
          link: {
            type: "generated-index",
            slug: "/category/code-repository-integrations",
          },
          collapsed: true,
          items: [{ type: "autogenerated", dirName: "code-repository/integrations" }],
        },
        {
          type: "category",
          label: "Run Pipelines",
          link: {
            type: "generated-index",
            slug: "/category/run-pipelines",
          },
          collapsed: true,
          items: [{ type: "autogenerated", dirName: "code-repository/pipelines" }],
        },
        {
          type: "category",
          label: "Pull Requests",
          link: {
            type: "generated-index",
            slug: "/category/pull-requests",
          },
          collapsed: true,
          items: [{ type: "autogenerated", dirName: "code-repository/pull-requests" }],
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
    {
      type: 'link',
      label: 'Harness Solutions Factory',
      className: 'sidebar-hsf',
      href: '/3k-docs/harness-solutions-factory',
      customProps: {
        description: 'Learn how to deploy and manage your resources with Harness Solutions Factory.',
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
          value: 'In Harness 3.0',
          className: 'horizontal-bar',
        },
        {
          type: 'category',
          label: 'Getting Started',
          link: {
            type: 'doc',
            id: 'platform/getting-started/index',
          },
          items: [
            'platform/getting-started/compatibility',
            'platform/getting-started/migration',
          ],
        },
        {
          type: 'category',
          label: 'Navigation',
          link: {
            type: 'doc',
            id: 'platform/getting-started/navigation/index',
          },
          collapsed: true,
          items: [
            'platform/getting-started/navigation/scope',
            'platform/getting-started/navigation/settings',
            'platform/getting-started/navigation/assistant',
            'platform/getting-started/navigation/delegate',
          ]
        },
        {
          type: 'category',
          label: 'Pipelines',
          link: {
            type: 'doc',
            id: 'platform/getting-started/pipelines/index',
          },
          collapsed: true,
          items: [
            'platform/getting-started/pipelines/stages',
            'platform/getting-started/pipelines/steps',
            'platform/getting-started/pipelines/services',
            'platform/getting-started/pipelines/infrastructure',
            'platform/getting-started/pipelines/inputs',
            'platform/getting-started/pipelines/expressions',
            'platform/getting-started/pipelines/advanced',
          ]
        },
        {
          type: 'category',
          label: 'Steps',
          link: {
            type: 'doc',
            id: 'platform/getting-started/steps/index',
          },
          collapsed: true,
          items: [
            'platform/getting-started/steps/ci',
            'platform/getting-started/steps/kubernetes',
            'platform/getting-started/steps/cloud',
            'platform/getting-started/steps/iacm',
            'platform/getting-started/steps/integrations',
            'platform/getting-started/steps/templates',
          ]
        },
        {
          type: 'category',
          label: 'Agents',
          link: {
            type: 'doc',
            id: 'platform/getting-started/agents/index',
          },
          collapsed: true,
          items: [
            'platform/getting-started/agents/code-quality',
            'platform/getting-started/agents/security',
            'platform/getting-started/agents/developer-productivity',
            'platform/getting-started/agents/custom',
          ]
        },
        {
          type: 'category',
          label: 'Connectors',
          link: {
            type: 'doc',
            id: 'platform/getting-started/connectors/index',
          },
          collapsed: true,
          items: [
            'platform/getting-started/connectors/types',
            'platform/getting-started/connectors/manage',
            'platform/getting-started/connectors/configure',
            'platform/getting-started/connectors/troubleshooting',
          ]
        },
        {
          type: 'category',
          label: 'Secrets',
          link: {
            type: 'doc',
            id: 'platform/getting-started/secrets/index',
          },
          collapsed: true,
          items: [
            'platform/getting-started/secrets/types',
            'platform/getting-started/secrets/manage',
            'platform/getting-started/secrets/configure',
            'platform/getting-started/secrets/troubleshooting',
          ]
        },
        {
          type: 'category',
          label: 'Dashboards',
          link: {
            type: 'doc',
            id: 'platform/getting-started/dashboards/index',
          },
          collapsed: true,
          items: [
            'platform/getting-started/dashboards/hql',
          ]
        },
        {
          type: 'html',
          value: 'New to Harness 3.0?',
          className: 'horizontal-bar',
        },
        'platform/get-started/key-concepts',
        'platform/get-started/onboarding-guide',
        'platform/platform-whats-supported',
        {
          type: 'html',
          value: 'Harness Platform Resources',
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
          label: 'Organizations & Projects',
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
          items: [
            {
              type: 'category',
              label: 'Delegate (Closed Beta)',
              link: {
                type: 'generated-index',
                title: 'Delegate (Closed Beta)',
                description: 'Learn about the new Harness Delegate - our next-generation delegate for local development',
              },
              collapsed: true,
              className: 'sidebar-item-new-green',
              items: [{ type: 'autogenerated', dirName: 'platform/delegates-v2' }],
            },
          ],
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
          label: 'Governance',
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
          label: 'Variables & Expressions',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'platform/variables-and-expressions' }],
        },
        {
          type: 'category',
          label: 'Notifications & Banners',
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
          items: [
            {
              type: 'category',
              label: 'CLI',
              link: {
                type: 'generated-index',
                title: 'Harness CLI',
              },
              collapsed: true,
              items: [{ type: 'autogenerated', dirName: 'platform/automation/cli' }],
            },
            {
              type: 'category',
              label: 'API',
              link: {
                type: 'generated-index',
                title: 'Harness REST API',
              },
              collapsed: true,
              items: [{ type: 'autogenerated', dirName: 'platform/automation/api' }],
            },
            {
              type: 'category',
              label: 'Terraform Provider',
              link: {
                type: 'generated-index',
                title: 'Harness Terraform Provider',
              },
              collapsed: true,
              items: [{ type: 'autogenerated', dirName: 'platform/automation/terraform' }],
            },
          ],
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
            type: 'doc',
            id: 'platform/service-discovery/service-discovery',
          },
          collapsed: true,
          items: [
            'platform/service-discovery/customize-agent',
            'platform/service-discovery/user-defined-service-account',
          ],
        },
        'platform/monitored-service',
        'platform/application-map',
        'platform/rate-limits',
        'platform/account-license-limits',
        'platform/customize-harness-ui',
        {
          type: 'html',
          value: 'Troubleshooting',
          className: 'horizontal-bar',
        },
        {
          type: 'category',
          label: 'Subscriptions & Licenses',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'platform/subscriptions-licenses' }],
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
      label: 'Builds',
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
      label: 'Artifacts',
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
          label: 'Dependency Firewall',
          link: {
            type: 'doc',
            id: 'artifact-registry/dependency-firewall/overview',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'artifact-registry/dependency-firewall' }],
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
        {
          type: 'category',
          label: 'Artifact Registry CLI',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'artifact-registry/artifact-registry-cli' }],
        },
        'artifact-registry/build-plugins/overview',
        'artifact-registry/metadate-registry',
        {
          type: 'html',
          value: 'Troubleshooting & Resources',
          className: 'horizontal-bar',
        },
        {
          type: 'category',
          label: 'Tutorials',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'artifact-registry/tutorials' }],
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
    // Release Notes
    {
      type: 'link',
      label: 'Release Notes',
      className: 'sidebar-Release_Notes',
      href: '/release-notes/artifact-registry',
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
        'ai-test-automation/get-started/intent-driven',
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
        {
          type: 'category',
          label: 'How to Guides',
          link: {
            type: 'generated-index',
            slug: "category/ait-how-to-guides"
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'ai-test-automation/guides' }],
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
      label: 'Deployments',
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
        'continuous-delivery/overview',
        'continuous-delivery/getting-started',
        'continuous-delivery/cd-integrations',
        { type: 'html', value: 'Use Continuous Delivery', className: 'horizontal-bar' },
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
          label: 'Provision Infrastructure',
          link: { type: 'generated-index' },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'continuous-delivery/cd-infrastructure' },
          ],
        },
        {
          type: 'category',
          label: 'CD Building Blocks',
          link: { type: 'generated-index' },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'continuous-delivery/x-platform-cd-features' },
          ],
        },
        {
          type: 'category',
          label: 'Manage Deployments',
          link: { type: 'generated-index' },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'continuous-delivery/manage-deployments' },
          ],
        },
        {
          type: 'category',
          label: 'Monitor Deployments',
          link: { type: 'generated-index' },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'continuous-delivery/monitor-deployments' },
          ],
        },
        {
          type: 'category',
          label: 'Verify Deployments',
          link: { type: 'generated-index' },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'continuous-delivery/verify' },
          ],
        },


        { type: 'html', value: 'Use GitOps', className: 'horizontal-bar' },
        { type: 'autogenerated', dirName: 'continuous-delivery/gitops' },
        { type: 'html', value: 'Troubleshooting & Resources', className: 'horizontal-bar' },
        'continuous-delivery/cd-best-practices',
        {
          type: 'category',
          label: 'Resources',
          link: { type: 'generated-index' },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'continuous-delivery/cd-onboarding' },
          ],
        },
        {
          type: 'category',
          label: 'Tutorials',
          link: {
            type: 'generated-index',
            title: 'Tutorials',
            description: 'Welcome to Harness Continuous Delivery! Here you will find tutorials and guides to help you do your first deployment using Harness and begin your CD journey with Harness.',
            slug: '/continuous-delivery/tutorials'
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'continuous-delivery/get-started/tutorials' },
          ],
        },
        'continuous-delivery/toolchain-policy',
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
      label: 'Infrastructure',
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
          type: 'link',
          label: 'API Reference',
          href: '/api-reference?module=infra-as-code-management',
          className: 'horizontal-bar',
        },
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
          label: 'Pipelines',
          link: {
            type: 'generated-index',
            slug: '/category/iacm-pipelines',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'infra-as-code-management/pipelines' }],
        },
        {
          type: 'html',
          value: 'Provisioning',
          className: 'secondary-horizontal-bar',
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
          label: 'Configuration Management',
          link: {
            type: 'doc',
            id: 'infra-as-code-management/configuration-management/ansible/overview',
          },
          collapsed: true,
          items: [
            {
              type: 'category',
              label: 'Ansible',
              link: {
                type: 'doc',
                id: 'infra-as-code-management/configuration-management/ansible/overview',
              },
              collapsed: true,
              items: [
                'infra-as-code-management/configuration-management/ansible/overview',
                'infra-as-code-management/configuration-management/ansible/get-started',
                {
                  type: 'category',
                  label: 'Inventories',
                  link: {
                    type: 'doc',
                    id: 'infra-as-code-management/configuration-management/ansible/inventories',
                  },
                  collapsed: true,
                  items: [
                    'infra-as-code-management/configuration-management/ansible/inventories',
                    'infra-as-code-management/configuration-management/ansible/hosts',
                  ],
                },
                {
                  type: 'category',
                  label: 'Playbooks',
                  link: {
                    type: 'doc',
                    id: 'infra-as-code-management/configuration-management/ansible/playbooks',
                  },
                  collapsed: true,
                  items: [
                    'infra-as-code-management/configuration-management/ansible/playbooks',
                    'infra-as-code-management/configuration-management/ansible/manage-dependencies',
                    'infra-as-code-management/configuration-management/ansible/authenticate-private-collections',
                  ],
                },
                {
                  type: 'category',
                  label: 'Examples & Use Cases',
                  collapsed: true,
                  items: [
                    'infra-as-code-management/configuration-management/ansible/example-use-cases',
                    'infra-as-code-management/configuration-management/ansible/variable-files',
                  ],
                },
                'infra-as-code-management/configuration-management/ansible/opa-policies',
                {
                  type: 'category',
                  label: 'Runtime',
                  collapsed: true,
                  items: [
                    'infra-as-code-management/configuration-management/ansible/managing-large-outputs',
                    'infra-as-code-management/configuration-management/ansible/output-variables-for-ansible',
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'html',
          value: 'Registry',
          className: 'secondary-horizontal-bar',
        },
        {
          type: 'category',
          label: 'Module Registry',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            'infra-as-code-management/registry/module-registry/module-registry-overview',
            'infra-as-code-management/registry/module-registry/module-registry',
            {
              type: 'doc',
              id: 'infra-as-code-management/registry/module-registry/module-registry-artifacts',
              className: 'sidebar-item-beta',
            },
            'infra-as-code-management/registry/module-registry/module-registry-testing',
            'infra-as-code-management/registry/module-registry/module-version-lifecycle-management',
          ],
        },
        "infra-as-code-management/registry/provider-registry",
        {
          type: 'html',
          value: 'Configuration',
          className: 'secondary-horizontal-bar',
        },
        {
          type: 'category',
          label: 'Connectors & Variables',
          className: 'sidebar-item-new',
          link: {
            type: 'generated-index',
            slug: '/category/iacm-connectors-variables',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'infra-as-code-management/configuration/connectors-and-variables' }],
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
          type: 'category',
          label: 'Platform Integrations',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'infra-as-code-management/platform-integrations' }],
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
    {
      type: 'link',
      label: 'Harness Solutions Factory',
      className: 'sidebar-hsf',
      href: '/3k-docs/harness-solutions-factory',
      customProps: {
        description: 'Learn how to deploy and manage your resources with Harness Solutions Factory.',
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
        {
          type: 'category',
          label: 'Getting Started',
          link: {
            type: 'generated-index',
            slug: 'feature-management-experimentation/getting-started',
          },
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'feature-management-experimentation/getting-started',
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
              items: require('./docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/sidebar.js'),
            },
            {
              type: 'category',
              label: 'Client-side SDK Suites',
              link: {
                type: 'doc',
                id: 'feature-management-experimentation/sdks-and-infrastructure/client-side-suites/index',
              },
              items: require('./docs/feature-management-experimentation/sdks-and-infrastructure/client-side-suites/sidebar.js'),
            },
            {
              type: 'category',
              label: 'Client-side Agents',
              link: {
                type: 'doc',
                id: 'feature-management-experimentation/sdks-and-infrastructure/client-side-agents/index',
              },
              items: require('./docs/feature-management-experimentation/sdks-and-infrastructure/client-side-agents/sidebar.js'),
            },
            {
              type: 'category',
              label: 'Server-side SDKs',
              link: {
                type: 'doc',
                id: 'feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/index',
              },
              items: require('./docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/sidebar.js'),
            },
            {
              type: 'category',
              label: 'Customer-deployed Components',
              link: {
                type: 'doc',
                id: 'feature-management-experimentation/sdks-and-infrastructure/optional-infra/index',
              },
              items: require('./docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/sidebar.js'),
            },
            {
              type: 'category',
              label: 'OpenFeature Providers',
              className: 'sidebar-item-new',
              link: {
                type: 'doc',
                id: 'feature-management-experimentation/sdks-and-infrastructure/openfeature/index',
              },
              items: require('./docs/feature-management-experimentation/sdks-and-infrastructure/openfeature/sidebar.js'),
            },
            {
              type: 'category',
              label: 'Examples',
              link: {
                type: 'doc',
                id: 'feature-management-experimentation/sdks-and-infrastructure/examples/index',
              },
              items: require('./docs/feature-management-experimentation/sdks-and-infrastructure/examples/sidebar.js'),
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
          collapsed: true,
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
                {
                  type: 'doc',
                  id: 'feature-management-experimentation/feature-management/manage-flags/archive-a-feature-flag',
                  className: 'sidebar-item-new',
                },
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
                {
                  type: 'autogenerated',
                  dirName: 'feature-management-experimentation/feature-management/setup',
                },
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
              dirName: 'feature-management-experimentation/release-monitoring',
            },
          ],
        },
        {
          type: 'category',
          label: 'Cloud Experimentation',
          link: {
            type: 'generated-index',
            slug: 'feature-management-experimentation/experimentation',
          },
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'feature-management-experimentation/experimentation',
            },
          ],
        },
        {
          type: 'category',
          label: 'Warehouse Native Experimentation',
          className: 'sidebar-item-new',
          link: {
            type: 'doc',
            id: 'feature-management-experimentation/warehouse-native/index',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'feature-management-experimentation/warehouse-native' },
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
        'feature-management-experimentation/api-keys',
        {
          type: 'category',
          label: 'Audit Logs',
          link: {
            type: 'doc',
            id: 'feature-management-experimentation/audit-logs/index',
          },
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'feature-management-experimentation/audit-logs',
            },
          ],
        },
        {
          type: 'category',
          label: 'Automated Feature Flag Cleanup',
          className: 'sidebar-item-beta',
          link: {
            type: 'doc',
            id: 'feature-management-experimentation/templates/index',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'feature-management-experimentation/templates' },
          ],
        },
        'feature-management-experimentation/environments',
        'feature-management-experimentation/groups',
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
              dirName: 'feature-management-experimentation/integrations',
            },
          ],
        },
        'feature-management-experimentation/my-work',
        'feature-management-experimentation/owners',
        {
          type: 'category',
          label: 'Permissions',
          link: {
            type: 'doc',
            id: 'feature-management-experimentation/permissions/index',
          },
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'feature-management-experimentation/permissions',
            },
          ],
        },
        {
          type: 'category',
          label: 'Pipelines',
          className: 'sidebar-item-new',
          link: {
            type: 'doc',
            id: 'feature-management-experimentation/pipelines/index',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'feature-management-experimentation/pipelines' },
          ],
        },
        {
          type: 'category',
          label: 'Policies',
          className: 'sidebar-item-new',
          link: {
            type: 'doc',
            id: 'feature-management-experimentation/policies/index',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'feature-management-experimentation/policies' },
          ],
        },
        'feature-management-experimentation/projects',
        'feature-management-experimentation/tags',
        'feature-management-experimentation/traffic-types',
        'feature-management-experimentation/users',
        'feature-management-experimentation/account-usage',
        {
          type: 'category',
          label: 'Admin Best Practices',
          link: {
            type: 'doc',
            id: 'feature-management-experimentation/admin-best-practices/index',
          },
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'feature-management-experimentation/admin-best-practices',
            },
          ],
        },
        {
          type: 'category',
          label: 'API Best Practices',
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
      href: '/university/feature-management-experimentation/',
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
      label: "Databases",
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
          label: "Get Started",
          link: {
            type: "generated-index",
            slug: "/category/get-started-with-database-devops"
          },
          collapsed: true,
          items: [{ type: "autogenerated", dirName: "database-devops/get-started", }],
        },
        {
          type: "html",
          value: 'Use DB DevOps',
          className: "horizontal-bar",
        },
        {
          type: "category",
          label: "Build with Database DevOps",
          link: {
            type: "generated-index",
            slug: "/category/use-db-devops"
          },
          collapsed: true,
          items: [{ type: "autogenerated", dirName: "database-devops/use-database-devops", }],
        },
        {
          type: "category",
          label: "Key Concepts",
          link: {
            type: "generated-index",
            slug: "/category/concepts-of-database-devops"
          },
          collapsed: true,
          items: [{ type: "autogenerated", dirName: "database-devops/concepts", }],
        },
        {
          type: "category",
          label: "Advance Features",
          link: {
            type: "generated-index",
            slug: "/category/features-of-database-devops"
          },
          collapsed: true,
          items: [{ type: "autogenerated", dirName: "database-devops/features", }],
        },
        {
          type: "category",
          label: "GitOps Setup",
          link: {
            type: "generated-index",
            slug: "/category/gitops-setup"
          },
          collapsed: true,
          items: [{ type: "autogenerated", dirName: "database-devops/gitops", }],

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
            slug: "/category/troubleshooting-guide"
          },
          collapsed: true,
          items: [{ type: "autogenerated", dirName: "database-devops/troubleshooting", }],
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
      label: 'Cloud & AI Cost Management',
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
          value: 'Cost Reporting',
          className: 'secondary-horizontal-bar',
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
          value: 'Cost Optimization',
          className: 'secondary-horizontal-bar',
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
          value: 'Cost Governance',
          className: 'secondary-horizontal-bar',
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
        {
          type: 'html',
          value: 'Knowledge Base & Reference Architecture',
          className: 'horizontal-bar',
        },
        {
          type: 'category',
          label: 'Best Practices',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'cloud-cost-management/kb-reference-architecture/best-practices' },
          ],
        },
        {
          type: 'category',
          label: 'Onboarding',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'cloud-cost-management/kb-reference-architecture/onboarding' },
          ],
        },
        {
          type: 'category',
          label: 'Patterns',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'cloud-cost-management/kb-reference-architecture/patterns' },
          ],
        },
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
        "security-testing-orchestration/overview",
        "security-testing-orchestration/get-started",
        {
          type: 'category',
          label: 'Key Concepts',
          link: {
            type: 'generated-index',
            slug: '/category/key-concepts',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'security-testing-orchestration/key-concepts' },
          ],
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
        // {
        //   type: 'category',
        //   label: 'Get Started with STO',
        //   link: {
        //     type: 'generated-index',
        //     slug: '/category/get-started-with-sto',
        //   },
        //   collapsed: true,
        //   items: [
        //     { type: 'autogenerated', dirName: 'security-testing-orchestration/get-started' },
        //   ],
        // },
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
          label: 'Harness Security Scanners',
          link: {
            type: 'generated-index',
            slug: '/category/harness-security-scanners',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'security-testing-orchestration/harness-security-scanners' },
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
          label: 'Risk and Priortization',
          link: {
            type: 'generated-index',
            slug: '/category/risk-and-priortization',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'security-testing-orchestration/risk-and-priortization' },
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
          label: 'AppSec Chatbot',
          link: {
            type: 'generated-index',
            slug: '/category/sto-chatbot',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'security-testing-orchestration/sto-chatbot' },
          ],
        },
        {
          type: 'category',
          label: 'Severity Override',
          link: {
            type: 'generated-index',
            slug: '/category/severity-override',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'security-testing-orchestration/severity-override' },
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
          type: 'category',
          label: 'Dashboards and Reports',
          link: {
            type: 'generated-index',
            slug: '/category/sto-dashboards-and-reports',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'security-testing-orchestration/dashboards' }],
        },
        {
          type: "html",
          value: "Troubleshooting & Resources",
          className: "horizontal-bar",
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
          items: [{ type: "autogenerated", dirName: "software-supply-chain-assurance/artifact-security", }],
        },
        {
          type: "category",
          label: "Open Source Management",
          link: {
            type: "generated-index",
            slug: "/category/open-source-management",
          },
          collapsed: true,
          items: [{ type: "autogenerated", dirName: "software-supply-chain-assurance/open-source-management", }],
        },
        {
          type: "category",
          label: "Risk and Compliance",
          link: {
            type: "generated-index",
            slug: "/category/risk-and-compliance",
          },
          collapsed: true,
          items: [{ type: "autogenerated", dirName: "software-supply-chain-assurance/manage-risk-and-compliance", }],
        },
        {
          type: "category",
          label: "AppSec Chatbot",
          link: {
            type: "generated-index",
            slug: "/category/scs-chatbot",
          },
          collapsed: true,
          items: [{ type: "autogenerated", dirName: "software-supply-chain-assurance/scs-chatbot", }],
        },
        {
          type: "category",
          label: "Dashboards & Reports",
          link: {
            type: "generated-index",
            slug: "/category/dashboards-and-reports",
          },
          collapsed: true,
          items: [{ type: "autogenerated", dirName: "software-supply-chain-assurance/dashboards-and-reports", }],
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
          items: [{ type: "autogenerated", dirName: "software-supply-chain-assurance/how-to-guides", }],
        },

        {
          type: "category",
          label: "Settings",
          link: {
            type: "generated-index",
            slug: "category/settings-1"
          },
          collapsed: true,
          items: [{ type: "autogenerated", dirName: "software-supply-chain-assurance/settings", }],
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
  // Resilience Testing docs
  resiliencetesting: [
    {
      type: 'category',
      label: 'Resilience Testing',
      className: 'sidebar-rt',
      link: {
        type: 'doc',
        id: 'resilience-testing',
      },
      customProps: {
        description: 'Test system resilience with Chaos, Load, and DR Testing.',
      },
      collapsed: true,
      items: [
        {
          type: 'html',
          value: 'New to Resilience Testing?',
          className: 'horizontal-bar',
        },
        'resilience-testing/overview',
        'resilience-testing/key-concepts',
        'resilience-testing/architecture',
        {
          type: 'html',
          value: 'Chaos Testing',
          className: 'horizontal-bar',
        },
        "resilience-testing/chaos-testing/get-started",
        {
          type: 'category',
          label: 'Infrastructure',
          link: {
            type: 'doc',
            id: 'resilience-testing/chaos-testing/infrastructure/infrastructures',
          },
          collapsed: true,
          items: [
            'resilience-testing/chaos-testing/infrastructure/upgrade-infra',
            {
              type: 'category',
              label: 'Infrastructure Types',
              link: {
                type: 'generated-index',
              },
              collapsed: true,
              items: [{ type: 'autogenerated', dirName: 'resilience-testing/chaos-testing/infrastructure/types' }],
            },
          ],
        },
        "resilience-testing/chaos-testing/experiments",
        "resilience-testing/chaos-testing/faults",
        {
          type: 'category',
          label: 'Probes',
          link: {
            type: 'doc',
            id: 'resilience-testing/chaos-testing/probes',
          },
          collapsed: true,
          items: [
            {
              type: 'doc',
              id: 'resilience-testing/chaos-testing/probes',
              label: 'Overview',
            },
            'resilience-testing/chaos-testing/probes/http-probe',
            'resilience-testing/chaos-testing/probes/command-probe',
            'resilience-testing/chaos-testing/probes/k8s-probe',
            'resilience-testing/chaos-testing/probes/container-probe',
            'resilience-testing/chaos-testing/probes/apm-probes',
            'resilience-testing/chaos-testing/probes/probe-templates',
            {
              type: 'category',
              label: 'Probe Template Library',
              link: {
                type: 'generated-index',
              },
              collapsed: true,
              className: 'sidebar-hidden',
              items: [{ type: 'autogenerated', dirName: 'resilience-testing/chaos-testing/probes/probe-templates' }],
            },
          ],
        },
        {
          type: 'category',
          label: 'Actions',
          link: {
            type: 'doc',
            id: 'resilience-testing/chaos-testing/actions/index',
          },
          collapsed: true,
          items: [
            'resilience-testing/chaos-testing/actions/delay-action',
            'resilience-testing/chaos-testing/actions/custom-script-action',
            'resilience-testing/chaos-testing/actions/container-action',
          ],
        },
        {
          type: 'category',
          label: 'Action Templates',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          className: 'sidebar-hidden',
          items: [{ type: 'autogenerated', dirName: 'resilience-testing/chaos-testing/actions/action-templates' }],
        },
        "resilience-testing/chaos-testing/templates",
        "resilience-testing/chaos-testing/chaoshub",
        "resilience-testing/chaos-testing/gke-autopilot",
        {
          type: 'html',
          value: 'Load Testing',
          className: 'horizontal-bar sidebar-item-new',
        },
        "resilience-testing/load-testing/get-started",
        {
          type: "category",
          label: "Create a Load Test",
          link: {
            type: 'doc',
            id: 'resilience-testing/load-testing/create-load-test/locust',
          },
          collapsed: true,
          items: [
            "resilience-testing/load-testing/create-load-test/locust",
            "resilience-testing/load-testing/create-load-test/k6",
            "resilience-testing/load-testing/create-load-test/jmeter",
          ],
        },
        "resilience-testing/load-testing/analyze-results",
        {
          type: 'html',
          value: 'Disaster Recovery Testing',
          className: 'horizontal-bar sidebar-item-new',
        },
        "resilience-testing/dr-testing/get-started",
        "resilience-testing/dr-testing/concepts",
        "resilience-testing/dr-testing/pipeline-stage-reference",
        {
          type: 'html',
          value: 'Shared Capabilities',
          className: 'horizontal-bar',
        },
        "resilience-testing/chaos-testing/application-maps",
        "resilience-testing/chaos-testing/service-discovery",
        "resilience-testing/chaos-testing/image-registry",
        {
          type: 'doc',
          id: 'resilience-testing/chaos-testing/dashboards/custom-dashboards',
          label: 'Dashboards',
        },
        {
          type: 'category',
          label: 'Governance',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'resilience-testing/chaos-testing/governance' }],
        },
        {
          type: 'category',
          label: 'AI',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'resilience-testing/chaos-testing/ai' }],
        },
        {
          type: 'doc',
          id: 'resilience-testing/platform-features/terraform-onboarding',
          label: 'Terraform Onboarding',
        },
        {
          type: 'category',
          label: 'Integrations',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            {
              type: 'category',
              label: 'CI/CD',
              link: {
                type: 'generated-index',
              },
              collapsed: true,
              items: [{ type: 'autogenerated', dirName: 'resilience-testing/chaos-testing/integrations/cicd' }],
            },
            {
              type: 'category',
              label: 'Performance Testing',
              link: {
                type: 'generated-index',
              },
              collapsed: true,
              items: [{ type: 'autogenerated', dirName: 'resilience-testing/chaos-testing/integrations/performance-testing' }],
            },
            'resilience-testing/chaos-testing/integrations/google-cloud-build',
          ],
        },
        'resilience-testing/chaos-testing/license-consumption',
        {
          type: 'category',
          label: 'On-premises (SMP)',
          link: {
            type: 'doc',
            id: 'resilience-testing/chaos-testing/on-premises-smp/index',
          },
          collapsed: true,
          items: [
            'resilience-testing/chaos-testing/on-premises-smp/connect-infrastructure',
          ],
        },
        {
          type: 'html',
          value: 'Security',
          className: 'horizontal-bar',
        },
        'resilience-testing/security/index',
        {
          type: 'category',
          label: 'Security Templates',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            { type: 'autogenerated', dirName: 'resilience-testing/security/security-templates' },
          ],
        },
        {
          type: 'html',
          value: 'Troubleshooting & Resources',
          className: 'horizontal-bar',
        },
        'resilience-testing/whats-supported',
        'resilience-testing/resources/hce-vs-litmus',
        'resilience-testing/resources/troubleshooting',
        'resilience-testing/resources/faqs',
        {
          type: 'category',
          label: 'Training and Certification',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'resilience-testing/resources/training' }],
        },
        {
          type: 'category',
          label: 'API Reference',
          items: [
            'resilience-testing/resources/api-reference/hce-cli',
            'resilience-testing/resources/api-reference/hce-onboarding-api',
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
        description: 'Learn about recent changes to Chaos Testing features.',
      },
    },
    // Roadmap
    {
      type: 'link',
      label: 'Roadmap',
      className: 'sidebar-roadmap',
      href: '/roadmap/#resilience-testing',
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
  aisre: [
    {
      type: 'category',
      label: 'Incidents',
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
          value: 'AI SRE for Incident Responders',
          className: 'horizontal-bar',
        },
        'ai-sre/get-started/onboarding-guide-users',
        {
          type: 'category',
          label: 'Use AI Agents',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            'ai-sre/ai-agent/ai-agent',
            'ai-sre/ai-agent/rca-change-agent',
          ],
        },
        'ai-sre/get-started/slack-commands',
        'ai-sre/users/create-incidents',
        {
          type: 'category',
          label: 'Respond to Active Incidents',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'ai-sre/users/manage-incidents' }],
        },
        {
          type: 'category',
          label: 'Handle On-Call',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'ai-sre/users/handle-oncall' }],
        },
        {
          type: 'html',
          value: 'AI SRE for Administrators',
          className: 'horizontal-bar',
        },
        'ai-sre/get-started/onboarding/overview',
        {
          type: 'category',
          label: 'Set Up Incident Management',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'ai-sre/incidents' }],
        },
        {
          type: 'category',
          label: 'Set Up Alert Management',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'ai-sre/alerts' }],
        },
        {
          type: 'category',
          label: 'Set Up Runbook Management',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'ai-sre/runbooks' }],
        },
        {
          type: 'category',
          label: 'Set Up Integration Management',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'ai-sre/integrations' }],
        },
        {
          type: 'category',
          label: 'Set Up On-Call Management',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'ai-sre/oncall' }],
        },
        {
          type: 'category',
          label: 'Set Up Change Management',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'ai-sre/change' }],
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
          value: 'New to IDP?',
          className: 'horizontal-bar',
        },
        'internal-developer-portal/overview',
        'internal-developer-portal/whats-supported',
        'internal-developer-portal/get-started',
        {
          type: 'html',
          value: 'Use IDP',
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
          value: 'Admin & Customization',
          className: 'secondary-horizontal-bar',
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
          label: 'Custom Entity Kinds',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'internal-developer-portal/custom-kinds' }],
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
          value: 'Working with APIs',
          className: 'secondary-horizontal-bar',
        },
        {
          type: 'category',
          label: 'API References',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'internal-developer-portal/api-references' }],
        },
        {
          type: 'html',
          value: 'Troubleshooting & Resources',
          className: 'horizontal-bar',
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
        'internal-developer-portal/harness-vs-backstage',
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
  ],
  aidlcinsights: [
  {
    type: 'category',
    label: 'AI DLC Insights',
    className: 'sidebar-aidi',
    link: {
      type: 'doc',
      id: 'ai-dlc-insights',
    },
    customProps: {
      description:
        'Track AI adoption, optimize spend efficiency, and measure delivery impact across your engineering organization.',
    },
    collapsed: true,
    items: [
      // ------------------------------------------------------------------
      // New to AI DLC Insights?
      // ------------------------------------------------------------------
      {
        type: 'html',
        value: 'New to AI DLC Insights?',
        className: 'horizontal-bar',
      },
      'ai-dlc-insights/overview',
      'ai-dlc-insights/key-concepts',
      {
        type: 'category',
        label: 'Get Started',
        items: [
          {
            type: 'autogenerated',
            dirName: 'ai-dlc-insights/get-started',
          },
        ],
      },

      // ------------------------------------------------------------------
      // Use AI DLC Insights
      // ------------------------------------------------------------------
      {
        type: 'html',
        value: 'Use AI DLC Insights',
        className: 'horizontal-bar',
      },
      {
        type: 'category',
        label: 'Setup',
        link: {
          type: 'doc',
          id: 'ai-dlc-insights/setup/index',
        },
        items: [
          {
            type: 'autogenerated',
            dirName: 'ai-dlc-insights/setup',
          },
        ],
      },
      {
        type: 'category',
        label: 'View Insights',
        link: {
          type: 'doc',
          id: 'ai-dlc-insights/insights/index',
        },
        items: [
          {
            type: 'doc',
            id: 'ai-dlc-insights/insights/ai-engineering',
            label: 'AI Engineering',
            className: 'sidebar-item-beta',
          },
          {
            type: 'doc',
            id: 'ai-dlc-insights/insights/security',
            label: 'Security Insights',
            className: 'sidebar-item-beta',
          },
          {
            type: 'doc',
            id: 'ai-dlc-insights/insights/efficiency',
            label: 'Efficiency Insights',
          },
          {
            type: 'doc',
            id: 'ai-dlc-insights/insights/productivity',
            label: 'Productivity Insights',
          },
          {
            type: 'doc',
            id: 'ai-dlc-insights/insights/business-alignment',
            label: 'Business Alignment Insights',
          },
          {
            type: 'doc',
            id: 'ai-dlc-insights/insights/export',
            label: 'Export Metrics',
          },
        ],
      },
      {
        type: 'category',
        label: 'Studio',
        className: 'sidebar-item-beta',
        link: {
          type: 'doc',
          id: 'ai-dlc-insights/canvas/index',
        },
        items: [
          {
            type: 'autogenerated',
            dirName: 'ai-dlc-insights/canvas',
          },
        ],
      },
      {
        type: 'category',
        label: 'API',
        items: [
          {
            type: 'autogenerated',
            dirName: 'ai-dlc-insights/api',
          },
        ],
      },

      // ------------------------------------------------------------------
      // Management & Administration
      // ------------------------------------------------------------------
      {
        type: 'html',
        value: 'Management & Administration',
        className: 'horizontal-bar',
      },
      {
        type: 'autogenerated',
        dirName: 'ai-dlc-insights/manage',
      },

      // ------------------------------------------------------------------
      // Troubleshooting & Resources
      // ------------------------------------------------------------------
      {
        type: 'html',
        value: 'Troubleshooting & Resources',
        className: 'horizontal-bar',
      },
      'ai-dlc-insights/troubleshooting',
    ],
  },

  // Release Notes
  {
    type: 'link',
    label: 'Release Notes',
    className: 'sidebar-Release_Notes',
    href: '/release-notes/ai-dlc-insights',
    customProps: {
      description: 'Learn about recent changes to Harness products.',
    },
  },

  // Roadmap
  {
    type: 'link',
    label: 'Roadmap',
    className: 'sidebar-roadmap',
    href: '/roadmap/#aidi',
    customProps: {
      description: 'Learn about upcoming product capabilities.',
    },
  },

  // API Reference
  {
    type: 'link',
    label: 'API Reference',
    className: 'sidebar-API_Reference',
    href: 'https://apidocs.harness.io/',
    customProps: {
      description: 'Harness API documentation.',
    },
  },

  // Certifications & Training
  {
    type: 'link',
    label: 'Certifications & Training',
    className: 'sidebar-university',
    href: '/university/sei',
    customProps: {
      description:
        'Get certified and learn AI DLC Insights with Harness University.',
    },
  },

  // All Docs
  {
    type: 'link',
    label: 'Show All Docs',
    className: 'sidebar-all_docs',
    href: '/docs',
    customProps: {
      description: 'Browse all Harness documentation.',
    },
  },
  ],
  harnesssolutionsfactory: [
    {
      type: 'category',
      label: 'Harness Solutions Factory',
      className: 'sidebar-hsf',
      link: {
        type: 'doc',
        id: 'harness-solutions-factory',
      },
      customProps: {
        description: 'Get started with Harness Solutions Factory',
      },
      collapsed: true,
      items: [
        {
          type: "html",
          value: "New to HSF?",
          className: "horizontal-bar",
        },
        'harness-solutions-factory/new-to-hsf/overview',
        'harness-solutions-factory/new-to-hsf/get-started',
        'harness-solutions-factory/new-to-hsf/hsf2-x',
        'harness-solutions-factory/new-to-hsf/hsf-upgrade',
        {
          type: 'html',
          value: 'Use HSF',
          className: 'horizontal-bar',
        },
        'harness-solutions-factory/use-hsf/created-resources',
        'harness-solutions-factory/use-hsf/workflows',
        'harness-solutions-factory/use-hsf/mini-factory-and-factory-floor',
        'harness-solutions-factory/use-hsf/hsf-hub',
        {
          type: 'category',
          label: 'HSF Plugins',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'harness-solutions-factory/plugins' }],
        },
        {
          type: 'category',
          label: 'Custom Harness Template Library',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'harness-solutions-factory/custom-harness-template-library' }],
        },
        {
          type: 'html',
          value: 'Troubleshooting & Resources',
          className: 'horizontal-bar',
        },
        {
          type: 'category',
          label: 'Configurations',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'harness-solutions-factory/configurations' }],
        },
        {
          type: 'category',
          label: 'Best Practices',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'harness-solutions-factory/best-practices' }],
        },
        {
          type: 'category',
          label: 'Hands On Labs',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'harness-solutions-factory/hands-on-labs' }],
        },
        'harness-solutions-factory/faq',
      ],
    },
    // Release Notes
    {
      type: 'link',
      label: 'Release Notes',
      className: 'sidebar-Release_Notes',
      href: '/release-notes/harness-solutions-factory',
      customProps: {
        description: 'Learn about recent changes to Harness products.',
      },
    },
    // Roadmap
    {
      type: 'link',
      label: 'Roadmap',
      className: 'sidebar-roadmap',
      href: '/roadmap/',
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
  releasemanagement: [
    {
      type: 'category',
      label: 'Release Orchestration',
      className: 'sidebar-rm',
      link: {
        type: 'doc',
        id: 'release-management',
      },
      customProps: {
        description:
          'Learn how to orchestrate and manage complex software releases across multiple services and teams.',
      },
      collapsed: true,
      items: [
        {
          type: 'html',
          value: 'New to Release Orchestration?',
          className: 'horizontal-bar',
        },
        'release-management/overview/getting-started',
        'release-management/overview/key-concepts',
        'release-management/overview/use-cases',
        {
          type: 'html',
          value: 'Use Release Orchestration',
          className: 'horizontal-bar',
        },
        {
          type: 'category',
          label: 'Processes',
          link: {
            type: 'generated-index',
            slug: '/category/release-orchestration-processes',
          },
          collapsed: true,
          // Keep Activities and Phases at the root of Release Orchestration (not nested under Processes)
          items: [
            'release-management/processes/overview',
            'release-management/processes/process-modeling',
            'release-management/processes/ai-based-process-creation',
          ],
        },
        {
          type: 'category',
          label: 'Phases',
          link: {
            type: 'generated-index',
            slug: '/category/release-orchestration-phases',
          },
          collapsed: true,
          items: [{ type: 'autogenerated', dirName: 'release-management/phases' }],
        },
        {
          type: 'category',
          label: 'Activities',
          link: {
            type: 'generated-index',
            slug: '/category/release-orchestration-activities',
          },
          collapsed: true,
          items: [
            'release-management/activities/activities-overview',
            'release-management/activities/activity-store',
            {
              type: 'category',
              label: 'Activity types',
              collapsed: true,
              items: [
                'release-management/activities/activity-types/automated-activities',
                'release-management/activities/activity-types/manual-activities',
                'release-management/activities/activity-types/subprocess-activities',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Releases',
          link: {
            type: 'generated-index',
            slug: '/category/release-orchestration-releases',
          },
          collapsed: true,
          items: [
            'release-management/releases/overview',
            'release-management/releases/modeling-releases',
            'release-management/releases/adhoc-releases',
          ],
        },
        {
          type: 'category',
          label: 'Inputs and Variables',
          link: {
            type: 'generated-index',
            slug: '/category/release-orchestration-inputs-variables',
          },
          collapsed: true,
          items: [
            'release-management/inputs-and-variables/overview',
            'release-management/inputs-and-variables/input-store',
            {
              type: 'category',
              label: 'Variables',
              collapsed: true,
              items: [
                'release-management/inputs-and-variables/variable-mapping',
                'release-management/inputs-and-variables/default-values-and-overrides',
                {
                  type: 'category',
                  label: 'Variable types',
                  collapsed: true,
                  items: [
                    'release-management/inputs-and-variables/variable-types/global-variables',
                    'release-management/inputs-and-variables/variable-types/phase-variables',
                    'release-management/inputs-and-variables/variable-types/activity-variables',
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Execution',
          link: {
            type: 'generated-index',
            slug: '/category/release-orchestration-execution',
          },
          collapsed: true,
          items: [
            'release-management/execution/executing-a-release',
            'release-management/execution/error-handling',
          ],
        },
        {
          type: 'category',
          label: 'Collaboration and Approvals',
          link: {
            type: 'generated-index',
            slug: '/category/release-orchestration-collaboration',
          },
          collapsed: true,
          // Keep only "Capturing Sign-off" in this section
          items: ['release-management/collaboration-and-approvals/manual-approvals'],
        },
        {
          type: 'html',
          value: 'Examples and Walkthroughs',
          className: 'horizontal-bar',
        },
        {
          type: 'category',
          label: 'Examples and Walkthroughs',
          link: {
            type: 'generated-index',
            slug: '/category/release-orchestration-examples',
          },
          collapsed: true,
          items: [
            'release-management/examples-and-walkthroughs/end-to-end-release-walkthrough',
            'release-management/examples-and-walkthroughs/multi-service-release-example',
          ],
        },
      ],
    },
  ],
};

export default sidebars;