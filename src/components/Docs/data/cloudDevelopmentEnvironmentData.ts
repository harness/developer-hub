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
      name: "Overview",
      description: "",
      list: [
        {
          title: "Overview",
          module: MODULES.cde,
          description:
            "Learn how Harness enhances developer experience with pre-configured cloud development environments.",
          link: "/docs/cloud-development-environments/overview",
        },
      ],
    },
    {
      name: "Get Started",
      description: "",
      list: [
        {
          title: "What's Supported",
          module: MODULES.cde,
          description:
            "Learn more about the providers supported by Harness Gitspaces.",
          link: "/docs/cloud-development-environments/introduction/whats-supported",
        },
        {
          title: "Quickstart Guide",
          module: MODULES.cde,
          description: "Get started by setting up and configuring your Gitspaces.",
          link: "/docs/cloud-development-environments/introduction/quickstart-guide",
        },
        {
          title: "Quickstart Tutorial",
          module: MODULES.cde,
          description: "Get started by setting up and configuring your Gitspaces with a sample demo app. ",
          link: "/docs/cloud-development-environments/introduction/quickstart-tutorial",
        },
        {
          title: "Beta Plan Usage",
          module: MODULES.cde,
          description: "Learn more about the Harness Gitspaces Beta Plan.",
          link: "/docs/cloud-development-environments/introduction/beta-usage",
        },
      ],
    },
    {
      name: "Deep Dive into Gitspaces",
      description: "",
      list: [
        {
          title: "Gitspace Configuration",
          module: MODULES.cde,
          description:
            "Learn more about the underlying configuration of a Gitspace. ",
          link: "/docs/cloud-development-environments/deep-dive-into-gitspaces/gitspace-configuration",
        },
        {
          title: "Gitspace Lifecycle",
          module: MODULES.cde,
          description: "Understand the different stages in the life of a Gitspace.",
          link: "/docs/cloud-development-environments/deep-dive-into-gitspaces/lifecycle-of-gitspaces",
        },
      ],
    },
    {
      name: "Features of Gitspaces",
      description: "",
      list: [
        {
          title: "Authentication",
          module: MODULES.cde,
          description:
            "Learn how to configure a Git provider for authentication.",
          link: "/docs/cloud-development-environments/features-of-gitspaces/authentication",
        },
        {
          title: "Private Docker Images",
          module: MODULES.cde,
          description: "Learn more about how you can pull and use private docker images for your Gitspaces.",
          link: "/docs/cloud-development-environments/features-of-gitspaces/private-docker-images"
        },
        {
          title: "Secure Connect",
          module: MODULES.cde,
          description: "Learn more about how you use the secure connect integration to connect Harness to your privately-owned, on-prem assets.",
          link: "/docs/cloud-development-environments/features-of-gitspaces/secure-connect"
        },
        {
          title: "Auto-Stopping",
          module: MODULES.cde,
          description:
            "Learn more about why Harness auto-stops inactive Gitspaces. ",
          link: "/docs/cloud-development-environments/features-of-gitspaces/auto-stopping",
        },
        {
          title: "Tracking Changes",
          module: MODULES.cde,
          description: "Learn how to track all Gitspace changes from Harness UI.",
          link: "/docs/cloud-development-environments/features-of-gitspaces/tracking-changes",
        },
      
      ],
    },
    {
      name: "Developing in Gitspaces",
      description: "",
      list: [
        {
          title: "Source Control",
          module: MODULES.cde,
          description: "Learn how to execute various Git functions directly in your Gitspace.",
          link: "/docs/cloud-development-environments/develop-using-cde/source-control",
        },
        {
          title: "Port Forwarding",
          module: MODULES.cde,
          description: "Learn more about how to forward ports in your Gitspaces.",
          link: "/docs/cloud-development-environments/develop-using-cde/port-forwarding",
        },
        {
          title: "Environment Variables",
          module: MODULES.cde,
          description:
            "Learn how to define environment variables for your development.",
          link: "/docs/cloud-development-environments/develop-using-cde/env-variables",
        },
        {
          title: "runArgs Configuration",
          module: MODULES.cde,
          description:
            "Get started with using the runArgs property to configure your Gitspace.",
          link: "/docs/cloud-development-environments/develop-using-cde/run-args",
        },
        {
          title: "User Configuration",
          module: MODULES.cde,
          description: "Learn more about how you can configure containerUser and remoteUser in your Gitspace.",
          link: "/docs/cloud-development-environments/develop-using-cde/container-remote-user",
        },
        {
          title: "Pre-Installed Extensions",
          module: MODULES.cde,
          description: "Learn more about how you can setup pre-installed extensions for your Gitspaces.",
          link: "/docs/cloud-development-environments/develop-using-cde/extensions",
        }
      ],
    },
    {
      name: "IDEs",
      description: "",
      list: [
        {
          title: "VS Code Browser",
          module: MODULES.cde,
          description:
            "Connect to your Gitspaces within VS Code Browser",
          link: "/docs/cloud-development-environments/ide's/vs-code-browser",
        },
        {
          title: "VS Code Desktop",
          module: MODULES.cde,
          description: "Connect to your Gitspaces within VS Code Desktop",
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
    }
  ];