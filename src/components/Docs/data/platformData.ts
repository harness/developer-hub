import {
  CardSections
} from "@site/src/components/TutorialCard/TutorialCard";
import { MODULES } from "@site/src/constants";

/* Define the cards - start */

// Docs
export const docsCards: CardSections = [
  {
    name: "Get started with Harness Platform",
    description: "",
    list: [
      {
        title: "Overview",
        module: MODULES.platform,
        description:
          "A conceptual reference to the core building blocks of Harness Platform- accounts, RBAC, delegates, connectors, pipelines, secrets, and governance.",
        link: "/docs/platform/get-started/overview",
      },
      {
        title: "Onboarding guide",
        module: MODULES.platform,
        description: "Set up your Harness account, create organizations and projects, manage users and shared resources, and explore which module to use next.",
        link: "/docs/platform/get-started/onboarding-guide",
      },
      {
        title: "What's supported",
        module: MODULES.platform,
        description: "A reference of all supported technologies, platforms, browsers, integrations, and feature availability across the Harness Platform.",
        link: "/docs/platform/platform-whats-supported",
      },
    ],
  },
  {
    name: "Get started with Harness modules",
    description: "",
    list: [
      {
        title: "Code Repository",
        module: MODULES.code,
        description: "Host, review, and collaborate on code with built-in Git support and native pipeline integrations.",
        link: "/docs/code-repository/get-started/onboarding-guide",
      },
      {
        title: "Continuous Delivery & GitOps",
        module: MODULES.cd,
        description: "Deploy applications to any environment reliably using automated pipelines or Git-driven workflows.",
        link: "/docs/continuous-delivery/cd-onboarding/new-user/onboarding-path",
      },
      {
        title: "Release Orchestration",
        module: MODULES.rm,
        description: "Coordinate and automate multi-service releases across teams, environments, and approval gates.",
        link: "/docs/release-orchestration",
      },
      {
        title: "Continuous Integration",
        module: MODULES.ci,
        description: "Build, test, and push code automatically with fast, scalable CI pipelines.",
        link: "/docs/continuous-integration/get-started/onboarding-guide",
      },
      {
        title: "Internal Developer Portal",
        module: MODULES.idp,
        description: "Give platform engineers and developers a self-service portal to discover and manage services, run workflows, and track software quality.",
        link: "/docs/internal-developer-portal/get-started",
      },
      {
        title: "Infrastructure as Code Management",
        module: MODULES.iacm,
        description: "Define, provision, and manage infrastructure with cost estimation, drift detection, and policy enforcement.",
        link: "/docs/infra-as-code-management/get-started/overview",
      },
      {
        title: "Database DevOps",
        module: MODULES.dbdevops,
        description: "Automate database schema changes and deployments as part of your software delivery pipeline.",
        link: "/docs/database-devops/overview",
      },
      {
        title: "Artifact Registry",
        module: MODULES.ar,
        description: "Store, manage, and serve build artifacts and container images with built-in access control.",
        link: "/docs/artifact-registry/get-started/overview",
      },
      // Cloud Development Environments hidden from navigation (HDH-542)
      // {
      //   title: "Cloud Development Environments",
      //   module: MODULES.cde,
      //   description: "Spin up pre-configured, cloud-hosted dev environments so developers can start coding in minutes.",
      //   link: "/docs/cloud-development-environments/overview",
      // },
      {
        title: "Feature Management & Experimentation",
        module: MODULES.fme,
        description: "Run A/B tests and feature experiments to make data-driven product decisions.",
        link: "/docs/feature-management-experimentation/getting-started/overview",
      },
      {
        title: "Feature Flags",
        module: MODULES.ff,
        description: "Safely roll out features to specific users or environments without redeploying code.",
        link: "/docs/feature-flags/get-started/onboarding-guide",
      },
      {
        title: "Resilience Testing",
        module: MODULES.rt,
        description: "Run controlled experiments to uncover weaknesses in your systems before they cause real outages.",
        link: "/docs/chaos-engineering/quickstart",
      },
      {
        title: "AI Test Automation",
        module: MODULES.ata,
        description: "Generate, execute, and maintain tests automatically using AI to improve coverage and reduce manual effort.",
        link: "/docs/ai-test-automation/get-started/overview",
      },
      {
        title: "AI Site Reliability Engineering",
        module: MODULES.srm,
        description: "Use AI to detect incidents, automate root cause analysis, and reduce MTTR across services.",
        link: "/docs/ai-sre/get-started/overview",
      },
      {
        title: "API & Application Discovery",
        module: MODULES.asp,
        description: "Automatically discover and catalog APIs and applications across your environments.",
        link: "/docs/appsec-discovery",
      },
      {
        title: "Application & API Runtime Protection",
        module: MODULES.arp,
        description: "Detect and block threats targeting your applications and APIs at runtime.",
        link: "/docs/appsec-runtime-protection",
      },
      {
        title: "Application & API Security Testing",
        module: MODULES.ast,
        description: "Scan applications and APIs for vulnerabilities during development and CI.",
        link: "/docs/appsec-security-testing",
      },
      {
        title: "Security Testing Orchestration",
        module: MODULES.sto,
        description: "Aggregate and act on security scan results across your entire software delivery pipeline.",
        link: "/docs/security-testing-orchestration/get-started",
      },
      {
        title: "Supply Chain Security",
        module: MODULES.ssca,
        description: "Generate SBOMs, enforce SLSA compliance, and secure your software supply chain end to end.",
        link: "/docs/software-supply-chain-assurance/get-started/",
      },
      {
        title: "SAST & SCA",
        module: MODULES.ssca,
        description: "Identify code vulnerabilities and open-source dependency risks early in your development workflow.",
        link: "/docs/sast-and-sca",
      },
      {
        title: "Cloud Cost Management",
        module: MODULES.ccm,
        description: "Gain visibility into cloud spend, set budgets, and reduce waste with AI-powered cost recommendations.",
        link: "/docs/category/get-started",
      },
      {
        title: "Software Engineering Insights",
        module: MODULES.sei,
        description: "Measure developer productivity, track DORA metrics, and identify bottlenecks across your engineering org.",
        link: "/docs/software-engineering-insights/propelo-sei/get-started/sei-onboarding-guide",
      },  
    ],
  },
  {
    name: "Platform feature highlights",
    description: "",
    list: [
      {
        title: "Access control",
        module: MODULES.platform,
        description:
          "Control who can do what, and where, using roles, resource groups, and principals.",
        link: "/docs/category/platform-access-control",
      },
      {
        title: "Delegates",
        module: MODULES.platform,
        description: "Securely execute tasks in your environment using Harness delegates.",
        link: "/docs/category/delegates",
      },
      {
        title: "Pipelines",
        module: MODULES.platform,
        description: "Build end-to-end automation workflows using stages, steps, and triggers across any Harness module.",
        link: "/docs/category/pipelines",
      },
      {
        title: "Secrets management",
        module: MODULES.platform,
        description:
          "Securely store and reference API keys, passwords, and tokens.",
        link: "/docs/category/secrets",
      },
      {
        title: "Policy as Code",
        module: MODULES.platform,
        description: "Write OPA policies to automatically enforce governance rules across pipelines, connectors, and resources.",
        link: "/docs/platform/governance/policy-as-code/harness-governance-quickstart",
      },
      {
        title: "Git Experience",
        module: MODULES.platform,
        description:
          "Store and manage your Harness pipelines and entities directly in your Git repositories.",
        link: "/docs/platform/git-experience/configure-git-experience-for-harness-entities",
      },
      {
        title: "API",
        module: MODULES.platform,
        description: "Automate and integrate with Harness using the REST API and SDKs.",
        link: "/docs/category/api",
      },
    ],
  },
  {
    name: "FAQs and troubleshooting",
    description: "",
    list: [
      {
        title: "FAQs",
        module: MODULES.platform,
        description: "Answers to the most frequently asked questions about Harness Platform features and configuration.",
        link: "/docs/platform/harness-platform-faqs",
      },
      {
        title: "Troubleshooting",
        module: MODULES.platform,
        description:
          "Find solutions to common issues with delegates, pipelines, connectors, authentication, and more.",
        link: "/docs/category/articles",
      },
    ],
  },
];
/* Define the cards - end */
