import { CardSections } from "@site/src/components/TutorialCard/TutorialCard";
import { MODULES } from "@site/src/constants";

/* Define the cards - start */

// Docs
export const docsCards: CardSections = [
  {
    name: "New to AI Code Review?",
    description: "",
    list: [
      {
        title: "Overview and key concepts",
        module: MODULES.aicr,
        description:
          "Learn what the review agent evaluates, how criteria work, and what a review produces.",
        link: "/docs/ai-code-review/overview",
      },
      {
        title: "Get started",
        module: MODULES.aicr,
        description:
          "Turn on AI Code Review for a GitHub or Harness Code repository, and verify the first review.",
        link: "/docs/ai-code-review/get-started",
      },
      {
        title: "What is supported",
        module: MODULES.aicr,
        description:
          "Check supported platforms, scopes, result states, and known boundaries.",
        link: "/docs/ai-code-review/whats-supported",
      },
    ],
  },
  {
    name: "Use AI Code Review",
    description: "",
    list: [
      {
        title: "GitHub integration",
        module: MODULES.aicr,
        description:
          "Connect a GitHub repository through a Harness connector and keep the link healthy.",
        link: "/docs/ai-code-review/platforms/github/github-integration",
      },
      {
        title: "Harness Code Repository",
        module: MODULES.aicr,
        description:
          "Enable reviews on a repository that already lives in Harness Code.",
        link: "/docs/ai-code-review/platforms/harness-code-repository",
      },
      {
        title: "Define your first review criteria",
        module: MODULES.aicr,
        description:
          "Tell the agent what to check, and verify the criterion reaches a pull request.",
        link: "/docs/ai-code-review/workflows/define-your-first-review-criteria",
      },
      {
        title: "Scope and inheritance",
        module: MODULES.aicr,
        description:
          "Apply one review standard across many repositories, and know which level wins.",
        link: "/docs/ai-code-review/configure/scope-and-inheritance",
      },
      {
        title: "What Harness creates",
        module: MODULES.aicr,
        description:
          "Every resource onboarding adds to your account, and what offboarding leaves behind.",
        link: "/docs/ai-code-review/configure/what-harness-creates",
      },
    ],
  },
  {
    name: "Troubleshooting & Resources",
    description: "",
    list: [
      {
        title: "API reference",
        module: MODULES.aicr,
        description:
          "Onboarding, settings, review, and overview endpoints with request shapes.",
        link: "/docs/ai-code-review/resources/api-reference",
      },
      {
        title: "Permissions & RBAC",
        module: MODULES.aicr,
        description:
          "Which permissions gate each action, and what the review agent itself can do.",
        link: "/docs/ai-code-review/resources/permissions-and-rbac",
      },
      {
        title: "FAQs",
        module: MODULES.aicr,
        description:
          "Common questions and the failures teams hit most often, in one place.",
        link: "/docs/ai-code-review/resources/faqs",
      },
    ],
  },
];

/* Define the cards - end */
