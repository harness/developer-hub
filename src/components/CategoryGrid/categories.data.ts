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

export type CatItem = {
  name: string;
  href: string;
  module?: string;
  icon?: string;
  iconLight?: string;
  iconDark?: string;
  description?: string;
  badge?: string;
};

export type SubGroup = {
  subgroupTitle: string;
  items: CatItem[];
};

export type Category = {
  title: string;
  blurb?: string;
  items?: ModuleLink[];
  subgroups?: SubGroup[];
};

export const categories: Category[] = [
  {
    title: "Delivery",
    blurb: "",
    items: [
      {
        name: "Continuous Delivery",
        href: "/docs/continuous-delivery",
        module: "cd",
        iconLight: "img/home/deployment.svg",
        iconDark: "img/home/deployment.svg",
        description: "Deploy to any environment using pipelines or GitOps workflows."
      },
      {
        name: "Continuous Integration",
        href: "/docs/continuous-integration",
        module: "ci",
        iconLight: "img/home/build.svg",
        iconDark: "img/home/build.svg",
        description: "Build, test, and publish code with scalable CI pipelines."
      },
      {
        name: "Feature Management & Experimentation",
        href: "/docs/feature-management-experimentation",
        module: "ff",
        iconLight: "img/home/feature.svg",
        iconDark: "img/home/feature.svg",
        description: "Roll out features safely with flags and progressive delivery."
      },
      {
        name: "Database DevOps",
        href: "/docs/database-devops",
        module: "db-devops",
        iconLight: "img/home/database.svg",
        iconDark: "img/home/database.svg",
        description: "Automate schema migrations within your delivery pipeline."
      },
      {
        name: "Infrastructure as Code Management",
        href: "/docs/infrastructure-as-code-management",
        module: "iacm",
        iconLight: "img/home/infrastructure.svg",
        iconDark: "img/home/infrastructure.svg",
        description: "Provision infrastructure as code with drift detection."
      },
      {
        name: "Artifact Registry",
        href: "/docs/artifact-registry",
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
        name: "Resilience Testing",
        href: "/docs/resilience-testing",
        module: "rt",
        iconLight: "img/home/resilience-test.svg",
        iconDark: "img/home/resilience-test.svg",
        description: "Run chaos experiments to uncover weaknesses before outages."
      },
      {
        name: "AI Test Automation",
        href: "/docs/ai-test-automation",
        module: "aita",
        iconLight: "img/home/ui-test.svg",
        iconDark: "img/home/ui-test.svg",
        description: "Generate and run browser and end-to-end tests with AI."
      },
    ],
  },
  {
    title: "Security",
    blurb: "",
    subgroups: [
      {
        subgroupTitle: "Application Security Testing",
        items: [
          { name: "Security Testing Orchestration", href: "/docs/security-testing-orchestration", module: "armory", iconLight: "img/home/security-test.svg", iconDark: "img/home/security-test.svg", description: "Scan and remediate vulnerabilities across your pipeline." },
          { name: "Supply Chain Security", href: "/docs/software-supply-chain-assurance", module: "ssca", iconLight: "img/home/supply-chain.svg", iconDark: "img/home/supply-chain.svg", description: "Secure your software supply chain end to end." },
          { name: "SAST & SCA", href: "/docs/sast-and-sca", module: "sto", iconLight: "img/home/qwiet.svg", iconDark: "img/home/qwiet.svg", description: "Scan code and dependencies for vulnerabilities." },
        ]
      },
      {
        subgroupTitle: "Web Application & API Protection",
        items: [
          { name: "Application & API Security Testing", href: "/docs/appsec-security-testing", module: "ast", iconLight: "img/home/app-sec.svg", iconDark: "img/home/app-sec.svg", description: "Identify issues early and validate API security." },
          { name: "Application & API Runtime Protection", href: "/docs/appsec-runtime-protection", module: "ast", iconLight: "img/home/runtime.svg", iconDark: "img/home/runtime.svg", description: "Detect and block threats to your apps and APIs at runtime." },
          { name: "Application & API Discovery", href: "/docs/appsec-discovery", module: "asp", iconLight: "img/home/app-discovery.svg", iconDark: "img/home/app-discovery.svg", description: "Complete visibility into your API ecosystem." },
        ]
      },
      {
        subgroupTitle: "AI Security",
        items: [
          { name: "AI Security", href: "/docs/ai-security", module: "aisec", iconLight: "img/home/ai-security.svg", iconDark: "img/home/ai-security.svg", description: "Discover AI assets, monitor threats, and test AI endpoints." },
        ]
      }
    ]
  },
  {
    title: "Operations",
    blurb: "",
    items: [
      {
        name: "Internal Developer Portal",
        href: "/docs/internal-developer-portal",
        module: "idp",
        iconLight: "img/home/portal.svg",
        iconDark: "img/home/portal.svg",
        description: "Give developers a self-service portal for services and workflows."
      },
      {
        name: "Cloud & AI Cost Management",
        href: "/docs/cloud-cost-management",
        module: "ccm",
        iconLight: "img/home/cloud-cost.svg",
        iconDark: "img/home/cloud-cost.svg",
        description: "Gain visibility into cloud spend and reduce waste with AI."
      },
      {
        name: "AI SRE",
        href: "/docs/ai-sre",
        module: "inc",
        iconLight: "img/home/incident.svg",
        iconDark: "img/home/incident.svg",
        description: "Detect incidents and automate root cause analysis to cut MTTR."
      },
      {
        name: "AI DLC Insights",
        href: "/docs/ai-dlc-insights",
        module: "aidi",
        iconLight: "img/home/engineering-insights-classic.svg",
        iconDark: "img/home/engineering-insights-classic.svg",
        description: "Measure AI adoption, optimize token spend, and prove engineering impact."
      },
    ],
  },
];