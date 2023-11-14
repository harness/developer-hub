import {
  CardItem,
  CardSections,
  docType,
} from "@site/src/components/LandingPage/TutorialCard";
import { MODULES } from "@site/src/constants"

/* Define the cards - start */
// Featured Tutorials
export const featuredTutorials: CardItem[] = [
    {
      title: "Onboard with Terraform Provider",
      module: MODULES.platform,
      /*icon: "img/icon_harness.svg",*/
      description: "Automate resource onboarding using Terraform Provider.",
      newDoc: true,
      type: [docType.Documentation],
      /*time: "10min",*/
      link: "/tutorials/platform/onboard-terraform-provider",
    },
    {
      title: "Install delegate",
      module: MODULES.platform,
      icon: "",
      description: "Install a delegate",
      newDoc: true,
      type: [docType.Documentation],
      time: "",
      link: "/tutorials/platform/install-delegate",
    },
  ];

  // Docs
  export const docsCards: CardSections = [
    {
      name: "Get started",
      description:
        "",
      list: [
        {
          title: "Onboarding guide",
          module: MODULES.platform,
          description:
            "A self-service onboarding guide for Harness Platform.",
          link: "/docs/platform/get-started/onboarding-guide",
        },
        {
          title: "Key concepts",
          module: MODULES.platform,
          description:
            "Key concepts of the Harness Platform.",
          link: "/docs/platform/get-started/key-concepts",
        },
        {
          title: "Delegates",
          module: MODULES.platform,
          description:
            "Explore how to set up and manage delegates.",
          link: "/docs/category/delegates",
        },
        {
          title: "Access control",
          module: MODULES.platform,
          description:
            "Create and manage roles and resource groups, and set up role-based access control.",
          link: "/docs/category/access-control-1",
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
        {
          title: "Terraform Provider",
          module: MODULES.platform,
          description:
            "Automate infrastucture using Terraform Provider.",
          link: "/docs/category/terraform-provider",
        },
      ],
    },
    {
      name: "Popular use cases",
      description:
        "",
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
          link: "/docs/platform/Git-Experience/configure-git-experience-for-harness-entities",
        },
        {
          title: "Policy as Code",
          module: MODULES.platform,
          description:
            "Use OPA policies to enforce governance.",
          link: "/docs/platform/governance/Policy-as-code/harness-governance-quickstart",
        },
      ],
  },
  {
    name: "Quick references and FAQs",
    description: "",
    list: [
      {
        title: "Permissions reference",
        module: MODULES.platform,
        description: "",
        link: "/docs/platform/role-based-access-control/permissions-reference",
      },
      {
        title: "Reference secrets in secrets managers",
          module: MODULES.platform,
          description:
            "",
          link: "/docs/platform/secrets/secrets-management/reference-existing-secret-manager-secrets",
      },
      {
        title: "Git Experience vs Config as Code",
          module: MODULES.platform,
          description:
            "",
          link: "/docs/faqs/git-exp-vs-config-as-code",
      },
    ],
  }
];
/* Define the cards - end */
