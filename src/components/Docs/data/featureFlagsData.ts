import {
  CardItem,
  CardSections,
  docType,
} from "../../LandingPage/TutorialCard";

/* Define the cards - start */
// Featured Tutorials
export const featuredTutorials: CardItem[] = [
    {
      title: "Add feature flags to a JavaScript app",
      module: "ff",
      icon: "img/icon_ff.svg",
      description: "Add JavaScript Feature Flags to a TypeScript and React application.",
      newDoc: true,
      type: [docType.Documentation],
      time: "10min",
      link: "/tutorials/feature-flags/typescript-react",
    },
  ];
  
  // Docs
  export const docsCards: CardSections = [
    {
      name: "Get started with the basics",
      description:
        "",
      list: [
        {
          title: "Get started with Feature Flags",
          module: "ff",
          description:
            "Learn the basics of Harness Feature Flags.",
          link: "/docs/category/get-started-with-feature-flags",
        },
        {
          title: "Create, Update, and View Flags",
          module: "ff",
          description:
            "Learn how to create different types of flags, edit them, and enable them.",
          link: "/docs/category/create-update-and-view-flags",
        },
        {
          title: "Use Feature Flag SDKs",
          module: "ff",
          description:
            "Choose the right SDK for your application from our numerous client and server SDKs, and then configure it to monitor your flags.",
          link: "/docs/category/use-feature-flag-sdks",
        },
      ],
    },

    {
      name: "Manage your flags",
      description:
        "",
      list: [
        {
          title: "Manage target users and groups",
          module: "ff",
          description:
            "Control which users or groups see which variation of a flag.",
          link: "/docs/category/manage-target-users-and-groups",
        },
        {
          title: "Add a prerequisite to a flag",
          module: "ff",
          description:
            "Add a flag as dependency to another flag.",
          link: "/docs/feature-flags/add-prerequisites-to-feature-flag",
        },
        {
          title: "Manage flags using Git Experience",
          module: "ff",
          description:
            "Manage flags using a YAML file in your Git repository.",
          link: "/docs/feature-flags/manage-featureflags-in-git-repos",
        },
        {
          title: "Integrate flags with Jira",
          module: "ff",
          description:
            "Link flags to Jira issues so you and your team can easily see the associations, jump to creating a flag from a jira ticket, and see a list of jira tickets linked to a flag.",
          link: "/docs/feature-flags/integrate-feature-flag-with-jira",
        },
        {
          title: "Get data on your flags",
          module: "ff",
          description:
            "View activities and analytics for flags, and track anonymous and monthly active users (MAUs).",
          link: "/docs/category/get-data-on-your-flags",
        },
      ],
    },

    {
      name: "Explore other cool features",
      description:
        "",
      list: [
        {
          title: "Connect flags to monitored services",
          module: "ff",
          description:
            "When you connect Feature Flags to monitored services you can be notified when there are service issues related to flag changes.",
          link: "/docs/feature-flags/connect-monitored-service",
        },
        {
          title: "Use Pipelines with Feature Flags",
          module: "ff",
          description:
            "Use pipelines to combine a flag with other actions like adding Jira issues, creating notifications, and adding approvals.",
          link: "/docs/category/use-pipelines-with-flags",
        },
        {
          title: "Use the Harness Relay Proxy",
          module: "ff",
          description:
            "The relay proxy lets your app connect directly to Feature Flag services without having to make a significant number of outbound connections.",
          link: "/docs/category/use-the-harness-relay-proxy",
        },
        {
          title: "Add policies for a flag",
          module: "ff",
          description:
            "This topic gives you an overview of Harness Policy Engine and includes an example for how to add a policy for a flag.",
          link: "/docs/category/use-pipelines-with-flags",
        },
      ],
    },

  ];
  /* Define the cards - end */