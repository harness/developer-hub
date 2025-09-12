// src/pages/Home/components/categories.data.ts
export type ModuleLink = {
    name: string;
    href: string;
    /** Optional explicit icon path (relative to site static dir, e.g. "img/icon-ci.svg") */
    icon?: string;
    /** Module slug used for fallback icon: img/icon-{module}.svg */
    module: string;
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
        { name: "Continuous Delivery & GitOps", href: "/docs/continuous-delivery", module: "cd" },
        { name: "Continuous Integration", href: "/docs/continuous-integration", module: "ci" },
        { name: "Internal Developer Portal", href: "/docs/internal-developer-portal", module: "idp" },
        { name: "Infrastructure as Code Management", href: "/docs/infrastructure-as-code-management", module: "iacm" },
        { name: "Database DevOps", href: "/docs/database-devops", module: "dbd", badge: "NEW" },
        { name: "Artifact Registry", href: "/docs/artifact-registry", module: "ar", badge: "NEW" },
        { name: "Cloud Development Environments", href: "/docs/cloud-development-environments", module: "cde", badge: "NEW" },
      ],
    },
    {
      title: "AI for Testing & Resilience",
      blurb: "Raise confidence with intelligent quality gates.",
      items: [
        { name: "Feature Management & Experimentation", href: "/docs/feature-management-experimentation", module: "fme" },
        { name: "Chaos Engineering", href: "/docs/chaos-engineering", module: "ce" },
        { name: "AI Test Automation", href: "/docs/ai-test-automation", module: "aita", badge: "NEW" },
        { name: "AI SRE", href: "/docs/ai-sre", module: "aisre", badge: "NEW" },
      ],
    },
    {
      title: "AI for Security & Compliance",
      blurb: "Protect apps from design to runtime.",
      items: [
        { name: "Security Testing Orchestration", href: "/docs/security-testing-orchestration", module: "sto" },
        { name: "Application & API Posture Management", href: "https://www.traceable.ai/application-discovery-and-risk-assessment", module: "adra" },
        { name: "Application & API Security Testing", href: "https://www.traceable.ai/application-security-testing", module: "ast" },
        { name: "Supply Chain Security", href: "/docs/software-supply-chain-assurance", module: "ssca" },
        { name: "Application & API Protection", href: "https://www.traceable.ai/application-runtime-protection", module: "arp" },
      ],
    },
    {
      title: "AI for Cost & Optimization",
      blurb: "Optimize spend and developer time.",
      items: [
        { name: "Cloud Cost Management", href: "/docs/cloud-cost-management", module: "ccm" },
        { name: "Software Engineering Insights", href: "/docs/software-engineering-insights", module: "sei" },
      ],
    },
  ];