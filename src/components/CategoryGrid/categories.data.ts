// src/pages/Home/components/categories.data.ts
export type ModuleLink = {
  name: string;
  href: string;
  /** Optional explicit icon path (relative to site static dir, e.g. "img/icon-ci.svg") */
  icon?: string;
  /** Module slug used for fallback icon: img/icon-{module}.svg */
  module: string;
  description?: string;
  badge?: 'NEW' | 'EA' | 'GA';
};

export type Category = {
  title: string;
  blurb?: string;
  items: ModuleLink[];
};

export const categories: Category[] = [
  {
    title: "AI for DevOps & Automation",
    blurb: "Ship faster with modern delivery pipelines.",
    items: [
      {
        name: "Continuous Delivery & GitOps",
        href: "/docs/continuous-delivery",
        module: "cd",
        description: "Automate deployments with GitOps workflows."
      },
      {
        name: "Continuous Integration",
        href: "/docs/continuous-integration",
        module: "ci",
        description: "Build and test code at scale."
      },
      {
        name: "Internal Developer Portal",
        href: "/docs/internal-developer-portal",
        module: "idp",
        description: "Enable self-service golden paths."
      },
      {
        name: "Infrastructure as Code Management",
        href: "/docs/infrastructure-as-code-management",
        module: "iacm",
        description: "Safely manage OpenTofu/Terraform infrastructure."
      },
      {
        name: "Database DevOps",
        href: "/docs/database-devops",
        module: "db-devops",
        badge: "NEW",
        description: "Version and deploy DB schema changes."
      },
      {
        name: "Artifact Registry",
        href: "/docs/artifact-registry",
        module: "ar",
        badge: "NEW",
        description: "Host, proxy, and distribute artifacts."
      },
      {
        name: "Cloud Development Environments",
        href: "/docs/cloud-development-environments",
        module: "cde",
        badge: "NEW",
        description: "Spin up ephemeral cloud dev spaces."
      },
    ],
  },
  {
    title: "AI for Testing & Resilience",
    blurb: "Raise confidence with intelligent quality gates.",
    items: [
      {
        name: "Feature Management & Experimentation",
        href: "/docs/feature-management-experimentation",
        module: "fme",
        description: "Control rollouts and run experiments."
      },
      {
        name: "Chaos Engineering",
        href: "/docs/chaos-engineering",
        module: "ce",
        description: "Inject faults to test resilience."
      },
      {
        name: "AI Test Automation",
        href: "/docs/ai-test-automation",
        module: "aita",
        badge: "NEW",
        description: "Expand coverage with AI-driven tests."
      },
      {
        name: "AI SRE",
        href: "/docs/ai-sre",
        module: "aisre",
        badge: "NEW",
        description: "Resolve incidents with AI assistance."
      },
    ],
  },
  {
    title: "AI for Security & Compliance",
    blurb: "Protect apps from design to runtime.",
    items: [
      {
        name: "Application & API Security Posture",
        href: "/docs/appsec-security-posture",
        module: "asp",
        description: "Discover App/APIs and assess risks."
      },
      {
        name: "Application & API Runtime Protection",
        href: "/docs/appsec-runtime-protection",
        module: "arp",
        description: "Protect App/APIs and block attacks."
      },
      {
        name: "Application & API Security Testing",
        href: "/docs/appsec-security-testing",
        module: "ast",
        description: "Run security tests and detect issues."
      },
      {
        name: "Security Testing Orchestration",
        href: "/docs/security-testing-orchestration",
        module: "sto",
        description: "Automate security scans in pipelines."
      },
      {
        name: "Supply Chain Security",
        href: "/docs/software-supply-chain-assurance",
        module: "ssca",
        description: "Secure dependencies and build integrity."
      },
    ],
  },
  {
    title: "AI for Cost & Optimization",
    blurb: "Optimize spend and developer time.",
    items: [
      {
        name: "Cloud Cost Management",
        href: "/docs/cloud-cost-management",
        module: "ccm",
        description: "Monitor and optimize cloud spend."
      },
      {
        name: "Software Engineering Insights",
        href: "/docs/software-engineering-insights",
        module: "sei",
        description: "Track productivity and bottlenecks."
      },
    ],
  },
];