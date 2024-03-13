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
              title: "SSCA onboarding guide",
              module: MODULES.ssca,
              description:
                "Start using Harness SSCA.",
              link: "/docs/software-supply-chain-assurance/get-started/onboarding-guide",
            },
            {
              title: "SSCA overview",
              module: MODULES.ssca,
              description:
                "Learn how the Harness Software Supply Chain Assurance module addresses software supply chain security challenges.",
              link: "/docs/software-supply-chain-assurance/get-started/overview",
            },
            {
              title: "SSCA key concepts",
              module: MODULES.ssca,
              description:
                "Learn key concepts for SSCA, such as SBOM, SLSA, remediation, prevention, and policy enforcement.",
              link: "/docs/software-supply-chain-assurance/get-started/key-concepts",
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
              link: "/docs/software-supply-chain-assurance/sbom/generate-sbom",
            },
            {
                title: "Enforce SSCA policies",
                module: MODULES.ssca,
                description:
                  "Verify SBOM attestations and scan for software supply chain security policy violations.",
                link: "/docs/category/enforce-ssca-policies",
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