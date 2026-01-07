import { CardSections } from "@site/src/components/TutorialCard/TutorialCard";
import { MODULES } from "@site/src/constants";

// Docs
export const docsCards: CardSections = [
  {
    name: "Get started with Release Orchestration",
    description: "",
    list: [
      {
        title: "Overview",
        module: MODULES.rm,
        description:
          "Learn about release orchestration and how it helps manage complex software releases.",
        link: "/docs/release-orchestration/overview/what-is-release-orchestration",
      },
      {
        title: "Key concepts",
        module: MODULES.rm,
        description: "Learn the key concepts and terminology used in release orchestration.",
        link: "/docs/release-orchestration/overview/key-concepts",
      },
      {
        title: "Applications",
        module: MODULES.rm,
        description: "Common use cases and scenarios for release orchestration.",
        link: "/docs/release-orchestration/overview/use-cases",
      },
    ],
  },
  {
    name: "Key features",
    description: "",
    list: [
      {
        title: "Processes",
        module: MODULES.rm,
        description: "Learn about processes and how they model release workflows.",
        link: "/docs/release-orchestration/processes/overview",
      },
      {
        title: "Releases",
        module: MODULES.rm,
        description: "Learn about releases and how they are executed using a process.",
        link: "/docs/release-orchestration/releases/overview",
      },
      {
        title: "Release Calendar",
        module: MODULES.rm,
        description: "Visualize and manage release schedules with the release calendar.",
        link: "/docs/release-orchestration/releases/modeling-releases#release-calendar",
      },
      {
        title: "Execution",
        module: MODULES.rm,
        description: "Learn about release execution and how releases run across phases and activities.",
        link: "/docs/release-orchestration/execution/overview",
      },
    ],
  },
];

