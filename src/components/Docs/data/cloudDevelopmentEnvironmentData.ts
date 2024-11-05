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
      name: "Get Started",
      description: "",
      list: [
        {
          title: "Overview",
          module: MODULES.cde,
          description:
            "Understand the basics of a Gitspace",
          link: "/docs/cloud-development-environments/introduction/overview",
        },
        {
          title: "Getting Started with CDE",
          module: MODULES.cde,
          description: "Get Started with Harness CDE (Gitspaces)",
          link: "/docs/cloud-development-environments/introduction/getting-started-with-cde",
        },
      ],
    },
    {
      name: "Deep Dive into Gitspaces",
      description: "",
      list: [
        {
          title: "Technical Deep-Dive",
          module: MODULES.cde,
          description:
            "How does Harness CDE operate at a high level?",
          link: "/docs/cloud-development-environments/deep-dive-into-gitspaces/technical-deep-dive",
        },
        {
          title: "Lifecycle of Gitspaces",
          module: MODULES.cde,
          description: "Learn more about the different states and actions of a Gitspace ",
          link: "/docs/cloud-development-environments/deep-dive-into-gitspaces/lifecycle-of-gitspaces",
        },
      ],
    },
    {
      name: "Features of Gitspaces",
      description: "",
      list: [
        {
          title: "Auto-Stopping",
          module: MODULES.cde,
          description:
            "Auto-Stopping of Gitspaces",
          link: "/docs/cloud-development-environments/features-of-gitspaces/auto-stopping",
        },
        {
          title: "Tracking Changes",
          module: MODULES.cde,
          description: "Tracking Changes in Gitspaces",
          link: "/docs/cloud-development-environments/features-of-gitspaces/tracking-changes",
        },
      ],
    },
    {
      name: "IDEs / Editors",
      description: "",
      list: [
        {
          title: "VS Code Browser",
          module: MODULES.cde,
          description:
            "Connect to your Gitspaces within your VS Code Browser",
          link: "/docs/cloud-development-environments/ide's/vs-code-browser",
        },
        {
          title: "VS Code Desktop",
          module: MODULES.cde,
          description: "Connect to your Gitspaces within your VS Code Desktop",
          link: "/docs/cloud-development-environments/ide's/vs-code-desktop",
        },
      ],
    },
    {
      name: "Managing Gitspaces",
      description: "",
      list: [
        {
          title: "Create a Gitspace",
          module: MODULES.cde,
          description: "Learn how to create a new Gitspace",
          link: "/docs/cloud-development-environments/manage-gitspaces/create-gitspaces",
        },
        {
          title: "Delete a Gitspace",
          module: MODULES.cde,
          description: "Learn how to delete an existing Gitspace",
          link: "/docs/cloud-development-environments/manage-gitspaces/delete-gitspaces",
        },
        {
          title: "Start/Stop a Gitspace",
          module: MODULES.cde,
          description: "Learn how to start/stop an existing Gitspace",
          link: "/docs/cloud-development-environments/manage-gitspaces/existing-gitspaces",
        },
      ],
    },
    {
      name: "Develop using Gitspaces",
      description: "",
      list: [
        {
          title: "Source Control",
          module: MODULES.cde,
          description: "Using Source Control in your Gitpaces",
          link: "/docs/cloud-development-environments/develop-using-cde/source-control",
        },
        {
          title: "Pull Request",
          module: MODULES.cde,
          description: "Raising a Pull Request Using Gitspaces",
          link: "/docs/cloud-development-environments/develop-using-cde/pull-request",
        },
        {
          title: "Port Forward",
          module: MODULES.cde,
          description: "Port Forwarding in CDE",
          link: "/docs/cloud-development-environments/develop-using-cde/forward-ports",
        },
      ],
    }
  ];