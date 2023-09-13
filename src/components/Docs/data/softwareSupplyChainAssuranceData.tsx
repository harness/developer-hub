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
        title: "Generate SBOM and enforce policies",
        module: MODULES.ssca,
        icon: "img/icon_ssca.svg",
        description: "Use SSCA module steps to generate SBOM and enforce policies in Harness pipelines.",
        newDoc: true,
        type: [docType.Documentation],
        time: "15min",
        link: "/tutorials/secure-supply-chain/generate-sbom",
      },
      {
        title: "Generate and verify SLSA provenance",
        module: MODULES.ssca,
        icon: "img/icon_ssca.svg",
        description: "Use SSCA module steps to generate and verify SLSA provenance in Harness pipelines.",
        newDoc: true,
        type: [docType.Documentation],
        time: "15min",
        link: "/tutorials/secure-supply-chain/generate-slsa",
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
              title: "SSCA tutorials",
              module: MODULES.ssca,
              description:
                "Dive in with these tutorials.",
              link: "/docs/software-supply-chain-assurance/get-started/tutorials",
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
          name: "SBOM",
          description:
            "",
          list: [
            {
              title: "tile1",
              module: MODULES.ssca,
              description:
                "desc.",
              link: "/docs/software-supply-chain-assurance/get-started/overview",
            },
            {
                title: "tile1",
                module: MODULES.ssca,
                description:
                  "desc.",
                link: "/docs/software-supply-chain-assurance/get-started/overview",
            },
            {
                title: "tile1",
                module: MODULES.ssca,
                description:
                  "desc.",
                link: "/docs/software-supply-chain-assurance/get-started/overview",
            },
          ],
        },

        {
          name: "Policies",
          description:
            "",
          list: [
            {
                title: "tile1",
                module: MODULES.ssca,
                description:
                  "desc.",
                link: "/docs/software-supply-chain-assurance/get-started/overview",
            },
            {
                title: "tile1",
                module: MODULES.ssca,
                description:
                  "desc.",
                link: "/docs/software-supply-chain-assurance/get-started/overview",
            },
            {
                title: "tile1",
                module: MODULES.ssca,
                description:
                  "desc.",
                link: "/docs/software-supply-chain-assurance/get-started/overview",
            },
          ],
        },

        {
          name: "SLSA",
          description:
            "",
          list: [
            {
                title: "tile1",
                module: MODULES.ssca,
                description:
                  "desc.",
                link: "/docs/software-supply-chain-assurance/get-started/overview",
            },
            {
                title: "tile1",
                module: MODULES.ssca,
                description:
                  "desc.",
                link: "/docs/software-supply-chain-assurance/get-started/overview",
            },
            {
                title: "tile1",
                module: MODULES.ssca,
                description:
                  "desc.",
                link: "/docs/software-supply-chain-assurance/get-started/overview",
            },
          ],
        },

        ];
    /* Define the cards - end */