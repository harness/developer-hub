import {
  CardItem,
  CardSections,
  docType,
} from "@site/src/components/LandingPage/TutorialCard";
import { MODULES } from "@site/src/constants";

/* Define the cards - start */

// Docs
export const docsCards: CardSections = [
  {
    name: "Get started with Harness Platform",
    description: "",
    list: [
      {
        title: "Onboarding guide",
        module: MODULES.platform,
        description: "Get started with Harness Platform.",
        link: "/docs/platform/get-started/onboarding-guide",
      },
      {
        title: "Key concepts",
        module: MODULES.platform,
        description: "Key concepts of the Harness Platform.",
        link: "/docs/platform/get-started/key-concepts",
      },
      {
        title: "Feature development and availability",
        module: MODULES.platform,
        description:
          "Learn about new features, beta features, and upcoming enhancements.",
        link: "/docs/platform/get-started/release-status",
      },
      {
        title: "Terraform Provider",
        module: MODULES.platform,
        description: "Automate infrastructure using Terraform Provider.",
        link: "/docs/category/terraform-provider",
      },
    ],
  },
  {
    name: "Get started with Harness modules",
    description: "",
    list: [
      {
        title: "CE",
        module: MODULES.ce,
        description: "Chaos Engineering onboarding guides",
        link: "/docs/chaos-engineering/getting-started/onboarding/introduction",
      },
      {
        title: "CCM",
        module: MODULES.ccm,
        description: "Cloud Cost Management onboarding guides",
        link: "/docs/category/onboarding-guide-for-ccm",
      },
      {
        title: "CODE",
        module: MODULES.code,
        description: "Code Repository onboarding guide",
        link: "/docs/code-repository/get-started/onboarding-guide",
      },
      {
        title: "CD & GitOps",
        module: MODULES.cd,
        description: "Continuous Delivery onboarding guides",
        link: "/docs/category/cd-onboarding-guide",
      },
      {
        title: "CET",
        module: MODULES.cet,
        description: "Continuous Error Tracking onboarding guide",
        link: "/docs/continuous-error-tracking/get-started/onboarding-guide",
      },
      {
        title: "CI",
        module: MODULES.ci,
        description: "Continuous Integration onboarding guide",
        link: "/docs/continuous-integration/get-started/onboarding-guide",
      },
      {
        title: "FF",
        module: MODULES.ff,
        description: "Feature Flags onboarding guide",
        link: "/docs/feature-flags/get-started/onboarding-guide",
      },
      {
        title: "IaCM",
        module: MODULES.iacm,
        description: "Infrastructure as Code Management overview",
        link: "/docs/infra-as-code-management/get-started/overview",
      },
      {
        title: "IDP",
        module: MODULES.idp,
        description: "Internal Developer Portal onboarding guide",
        link: "/docs/internal-developer-portal/get-started",
      },
      {
        title: "STO",
        module: MODULES.sto,
        description: "Security Testing Orchestration onboarding guide",
        link: "/docs/security-testing-orchestration/get-started/onboarding-guide",
      },
      {
        title: "SRM",
        module: MODULES.srm,
        description: "Service Reliability Management overview",
        link: "/docs/service-reliability-management/get-started/overview",
      },
      {
        title: "SSCA",
        module: MODULES.ssca,
        description: "Software Supply Chain Assurance onboarding guide",
        link: "/docs/software-supply-chain-assurance/get-started/onboarding-guide",
      },
      {
        title: "SEI",
        module: MODULES.sei,
        description: "Software Engineering Insights onboarding guide",
        link: "/docs/software-engineering-insights/get-started/sei-onboarding-guide",
      },
    ],
  },
  {
    name: "Platform feature highlights",
    description: "",
    list: [
      {
        title: "Harness AIDA",
        module: MODULES.platform,
        description:
          "Learn about how AIDA improves your experience on the Harness platform.",
        link: "/docs/category/harness-aida",
      },
      {
        title: "Delegates",
        module: MODULES.platform,
        description: "Explore how to set up and manage delegates.",
        link: "/docs/category/delegates",
      },
      {
        title: "Access control",
        module: MODULES.platform,
        description:
          "Create and manage roles and resource groups, and set up role-based access control.",
        link: "/docs/category/platform-access-control",
      },
      {
        title: "Secrets management",
        module: MODULES.platform,
        description:
          "Create, store, and access secrets using the secrets managers.",
        link: "/docs/category/secrets",
      },
      {
        title: "API",
        module: MODULES.platform,
        description:
          "Access and manage Harness account and resources with APIs.",
        link: "/docs/category/api",
      },
    ],
  },
  {
    name: "Quick references and FAQs",
    description: "",
    list: [
      {
        title: "User provisioning using Microsoft Entra ID (SCIM)",
        module: MODULES.platform,
        description:
          "Provision users and groups in Harness using Microsoft Entra ID (SCIM).",
        link: "/docs/platform/role-based-access-control/provision-users-and-groups-using-azure-ad-scim",
      },
      {
        title: "Git Experience",
        module: MODULES.platform,
        description:
          "Configure Git Experience for pipelines and associated entities.",
        link: "/docs/platform/git-experience/configure-git-experience-for-harness-entities",
      },
      {
        title: "Policy as Code",
        module: MODULES.platform,
        description: "Use OPA policies to enforce governance.",
        link: "/docs/platform/governance/policy-as-code/harness-governance-quickstart",
      },
      {
        title: "Permissions reference",
        module: MODULES.platform,
        description: "",
        link: "/docs/platform/role-based-access-control/permissions-reference",
      },
      {
        title: "Reference secrets in secrets managers",
        module: MODULES.platform,
        description: "",
        link: "/docs/platform/secrets/secrets-management/reference-existing-secret-manager-secrets",
      },
      {
        title: "Git Experience vs Config as Code",
        module: MODULES.platform,
        description: "",
        link: "/docs/faqs/git-exp-vs-config-as-code",
      },
    ],
  },
];
/* Define the cards - end */
