import {
    CardItem,
    CardSections,
    docType,
  } from "@site/src/components/LandingPage/TutorialCard";
  import { MODULES } from "@site/src/constants"
  
  /* Define the cards - start */

    // Docs
    export const docsCards: CardSections = [
        {
          name: "Get started",
          description:
            "",
          list: [
            {
              title: "SCS onboarding guide",
              module: MODULES.ssca,
              description:
                "Start using Harness SCS.",
              link: "/docs/supply-chain-security/get-started/onboarding-guide",
            },
            {
              title: "SCS overview",
              module: MODULES.ssca,
              description:
                "Learn how the Harness Supply Chain Security module addresses software supply chain security challenges.",
              link: "/docs/supply-chain-security/get-started/overview",
            },
            {
              title: "SCS key concepts",
              module: MODULES.ssca,
              description:
                "Learn key concepts for SCS, such as SBOM, SLSA, remediation, prevention, and policy enforcement.",
              link: "/docs/supply-chain-security/get-started/key-concepts",
            },

          ],
        },

        {
          name: "Secure your supply chain",
          description:
            "",
          list: [
            {
              title: "Generate SBOM",
              module: MODULES.ssca,
              description:
                "Generate, manage, and analyze SBOM for software artifacts.",
              link: "/docs/supply-chain-security/sbom/generate-sbom",
            },
            {
                title: "Enforce SBOM policies",
                module: MODULES.ssca,
                description:
                  "Verify SBOM attestations and scan for software supply chain security policy violations.",
                link: "/docs/category/enforce-sbom-policies",
            },
            {
                title: "Comply with SLSA",
                module: MODULES.ssca,
                description:
                  "Generate, manage, and verify SLSA Provenance.",
                link: "/docs/category/comply-with-slsa",
            },
          ],
        },

        ];
    /* Define the cards - end */