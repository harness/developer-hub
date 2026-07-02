// src/pages/Home/components/categories.data.ts
export type ModuleLink = {
  name: string;
  href: string;
  /** Light-mode icon path (relative to site static dir, e.g. "img/home/deployment.svg") */
  iconLight?: string;
  /** Dark-mode icon path — falls back to iconLight when omitted */
  iconDark?: string;
  /** Legacy single icon path — used when iconLight/iconDark are not set */
  icon?: string;
  /** Module slug used as last-resort fallback icon: img/icon-{module}.svg */
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
    title: "Delivery",
    blurb: "",
    items: [
      {
        name: "Deployments",
        href: "/3k-docs/continuous-delivery",
        module: "cd",
        iconLight: "img/home/deployment.svg",
        iconDark: "img/home/deployment.svg",
        description: "Deploy to any environment using pipelines or GitOps workflows."
      },
      {
        name: "Builds",
        href: "/3k-docs/continuous-integration",
        module: "ci",
        iconLight: "img/home/build.svg",
        iconDark: "img/home/build.svg",
        description: "Build, test, and publish code with scalable CI pipelines."
      },
      {
        name: "Feature Releases",
        href: "/3k-docs/feature-management-experimentation",
        module: "ff",
        iconLight: "img/home/feature.svg",
        iconDark: "img/home/feature.svg",
        description: "Roll out features safely with flags and progressive delivery."
      },
      {
        name: "Databases",
        href: "/3k-docs/database-devops",
        module: "db-devops",
        iconLight: "img/home/database.svg",
        iconDark: "img/home/database.svg",
        description: "Automate schema migrations within your delivery pipeline."
      },
      {
        name: "Infrastructure",
        href: "/3k-docs/infrastructure-as-code-management",
        module: "iacm",
        iconLight: "img/home/infrastructure.svg",
        iconDark: "img/home/infrastructure.svg",
        description: "Provision infrastructure as code with drift detection."
      },
      {
        name: "Artifacts",
        href: "/3k-docs/artifact-registry",
        module: "ar",
        iconLight: "img/home/artifact.svg",
        iconDark: "img/home/artifact.svg",
        description: "Store and serve artifacts and images with access control."
      },
    ],
  },
  {
    title: "Quality",
    blurb: "",
    items: [
      {
        name: "Resilience Tests",
        href: "/3k-docs/resilience-testing",
        module: "rt",
        iconLight: "img/home/resilience-test.svg",
        iconDark: "img/home/resilience-test.svg",
        description: "Run chaos experiments to uncover weaknesses before outages."
      },
      {
        name: "UI Tests",
        href: "/3k-docs/ai-test-automation",
        module: "aita",
        iconLight: "img/home/ui-test.svg",
        iconDark: "img/home/ui-test.svg",
        description: "Generate and run browser and end-to-end tests with AI."
      },
      {
        name: "AI Evals",
        href: "/3k-docs/ai-test-automation",
        module: "aida",
        iconLight: "img/home/ai-code.svg",
        iconDark: "img/home/ai-code.svg",
        description: "Evaluate the quality, accuracy, and safety of your AI apps."
      },
      {
        name: "AI Code Review",
        href: "/3k-docs/ai-test-automation",
        module: "aida",
        iconLight: "img/home/ai-code.svg",
        iconDark: "img/home/ai-code.svg",
        description: "Review code with AI to catch issues before merge."
      },
    ],
  },
  {
    title: "Security",
    blurb: "",
    items: [
      {
        name: "Security Tests",
        href: "/3k-docs/security-testing-orchestration",
        module: "armory",
        iconLight: "img/home/security-test.svg",
        iconDark: "img/home/security-test.svg",
        description: "Scan and remediate vulnerabilities across your pipeline."
      },
      {
        name: "Runtime Protection",
        href: "/3k-docs/appsec-runtime-protection",
        module: "ast",
        iconLight: "img/home/runtime.svg",
        iconDark: "img/home/runtime.svg",
        description: "Detect and block threats to your apps and APIs at runtime."
      },
      {
        name: "AI Security",
        href: "/3k-docs/ai-security",
        module: "aisec",
        iconLight: "img/home/shield.svg",
        iconDark: "img/home/shield.svg",
        description: "Discover AI assets, monitor threats, and test AI endpoints."
      },
    ],
  },
  {
    title: "Operations",
    blurb: "",
    items: [
      {
        name: "Developer Portal",
        href: "/3k-docs/internal-developer-portal",
        module: "idp",
        iconLight: "img/home/portal.svg",
        iconDark: "img/home/portal.svg",
        description: "Give developers a self-service portal for services and workflows."
      },
      {
        name: "Cloud Costs",
        href: "/3k-docs/cloud-cost-management",
        module: "ccm",
        iconLight: "img/home/cloud-cost.svg",
        iconDark: "img/home/cloud-cost.svg",
        description: "Gain visibility into cloud spend and reduce waste with AI."
      },
      {
        name: "Incidents",
        href: "/3k-docs/ai-sre",
        module: "inc",
        iconLight: "img/home/incident.svg",
        iconDark: "img/home/incident.svg",
        description: "Detect incidents and automate root cause analysis to cut MTTR."
      },
      {
        name: "Engineering Insights",
        href: "/3k-docs/software-engineering-insights/harness-sei/sei-overview",
        module: "sei",
        iconLight: "img/home/engineering-insights-classic.svg",
        iconDark: "img/home/engineering-insights-classic.svg",
        description: "Measure AI adoption, optimize token spend, and prove engineering impact."
      },
      {
        name: "Engineering Insights Classic",
        href: "/3k-docs/software-engineering-insights/propelo-sei/get-started/overview",
        module: "sei",
        iconLight: "img/home/engineering-insights-classic.svg",
        iconDark: "img/home/engineering-insights-classic.svg",
        description: "Measure productivity, track DORA metrics, and surface bottlenecks."
      },
    ],
  },
];