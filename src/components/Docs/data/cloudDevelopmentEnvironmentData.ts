import {
  CardSections
} from "@site/src/components/TutorialCard/TutorialCard";
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
          title: "Harness Hosted Gitspaces",
          module: MODULES.cde,
          description: "Detailed guide to get started with Harness Hosted Gitspaces.",
          link: "/docs/cloud-development-environments/introduction/quickstart-guide",
        },
        {
          title: "Self Hosted Gitspaces",
          module: MODULES.cde,
          description: "Detailed guide to get started with Self Hosted Gitspaces. ",
          link: "/docs/cloud-development-environments/introduction/self-hosted",
        }
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
        {
          title: "Self Hosted Gitspaces Architecture",
          module: MODULES.cde,
          description: "Understand the different components and underlying architecture of Self Hosted Gitspaces.",
          link: "/docs/cloud-development-environments/deep-dive-into-gitspaces/self-hosted-architecture",
        },
      ],
    },
    {
      name: "Features of Gitspaces",
      description: "",
      list: [
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
      ],
    },
    {
      name: "Managing Gitspaces",
      description: "",
      list: [
        {
          title: "Create a Gitspace",
          module: MODULES.cde,
          description: "Learn how to create a new Gitspace.",
          link: "/docs/cloud-development-environments/manage-gitspaces/create-gitspaces",
        },
        {
          title: "Delete a Gitspace",
          module: MODULES.cde,
          description: "Learn how to delete an existing Gitspace.",
          link: "/docs/cloud-development-environments/manage-gitspaces/delete-gitspaces",
        },
        {
          title: "Start/Stop a Gitspace",
          module: MODULES.cde,
          description: "Learn how to start/stop an existing Gitspace.",
          link: "/docs/cloud-development-environments/manage-gitspaces/existing-gitspaces",
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
          title: "Dev Container Features",
          module: MODULES.cde,
          description: "Learn more about configuring Dev Container Features for your Gitspace.",
          link: "/docs/cloud-development-environments/develop-using-cde/port-forwarding",
        },
        {
          title: "Port Forwarding",
          module: MODULES.cde,
          description: "Learn more about how to forward ports in your Gitspaces.",
          link: "/docs/cloud-development-environments/develop-using-cde/port-forwarding",
        },
        {
          title: "Pre-Installed Extensions",
          module: MODULES.cde,
          description: "Learn more about how you can setup pre-installed extensions for your Gitspaces.",
          link: "/docs/cloud-development-environments/develop-using-cde/extensions",
        }
      ],
    },
  ];