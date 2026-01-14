import {
  CardSections
} from "@site/src/components/TutorialCard/TutorialCard";
import { MODULES } from "@site/src/constants";

/* Define the cards - start */

// Docs
export const docsCards: CardSections = [
  {
    name: "Get started",
    description:
      "",
    list: [
      {
        title: "Definitions",
        module: MODULES.qwietai,
        description:
          "Understand essential terminology of Qwiet AI",
        link: "https://docs.shiftleft.io/sast/getting-started/definitions",
      },
      /*
      {
        title: "Get Started with Security Posture",
        module: MODULES.asp,
        description:
          "Understand the components of Security Posture and how they work together.",
        link: "https://docs.traceable.ai/docs/api-catalog",
      },
      */
      {
        title: "Prerequisites",
        module: MODULES.qwietai,
        description:
          "Set up access and requirements to start using Qwiet AI effectively.",
        link: "https://docs.shiftleft.io/sast/getting-started/prerequisites",
      },
      {
        title: "QuickStart",
        module: MODULES.qwietai,
        description:
          "Run your first scan and identify risks in minutes.",
        link: "https://docs.shiftleft.io/sast/getting-started/quickstart",
      },


    ],
  },
  {
    name: "Overview",
    description:
      "",
    list: [
      {
        title: "Code Property Graph",
        module: MODULES.qwietai,
        description:
          "Analyze code semantics, data flow, and dependencies using a unified graph model.",
        link: "https://docs.shiftleft.io/core-concepts/code-property-graph",
      },
      {
        title: "AI/ML",
        module: MODULES.qwietai,
        description:
          "Leverage AI-driven analysis to uncover deep, contextual security risks.",
        link: "https://docs.shiftleft.io/sast/ml-findings",
      },
      {
        title: "Integrations",
        module: MODULES.qwietai,
        description:
          "Integrate Qwiet AI with CI/CD pipelines and developer tools seamlessly.",
        link: "https://docs.shiftleft.io/sast/getting-started/workflows",
      },
      {
        title: "AutoFix",
        module: MODULES.qwietai,
        description:
          "Automatically generates AI-driven code fix suggestions for SAST findings to speed up vulnerability remediation.",
        link: "https://docs.shiftleft.io/sast/autofix",
      },
    ],
    },
  {
    name: "Artifacts & Secrets Scanning",
    description:
      "",
    list: [
      {
        title: "Intelligent SCA",
        module: MODULES.qwietai,
        description:
          "Detect vulnerable and risky open-source dependencies with contextual insights.",
        link: "https://docs.shiftleft.io/sast/analyzing-applications/oss-vulnerabilities",
      },
      {
        title: "Containers",
        module: MODULES.qwietai,
        description:
          "Analyze container images to identify vulnerable packages and insecure layers.",
        link: "https://docs.shiftleft.io/sast/analyzing-applications/containers",
      },
      {
        title: "Secrets",
        module: MODULES.qwietai,
        description:
          "Detect hardcoded secrets and credentials across your codebase automatically.",
        link: "https://docs.shiftleft.io/sast/analyzing-applications/secrets",
      },
      {
        title: "Policies",
        module: MODULES.qwietai,
        description:
          "Define and customize security rules to tailor context-aware vulnerability detection.",
        link: "https://docs.shiftleft.io/sast/policies/about-policies",
      }
    ],
  },
  {
    name: "CLI",
    description:
      "",
    list: [
      {
        title: "Installation",
        module: MODULES.qwietai,
        description:
          "Run SAST and SCA scans from the command line to detect code and dependency risks.",
        link: "https://docs.shiftleft.io/cli/install",
      },
      {
        title: "Reference",
        module: MODULES.qwietai,
        description:
          "View Qwiet AI CLI commands and usage details.",
        link: "https://docs.shiftleft.io/cli/reference/overview",
      }
    ],
  },

];