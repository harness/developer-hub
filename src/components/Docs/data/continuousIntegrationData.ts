import {
  CardItem,
  CardSections,
  docType,
} from "../../LandingPage/TutorialCard";

/* Define the cards - start */
// Featured Tutorials
/* export const featuredTutorials: CardItem[] = [
    {
      title: "Get started for free with the fastest CI on the planet",
      module: "ci",
      icon: "img/icon_ci.svg",
      description: "Get started with Harness CI and explore some of the features that make it four times faster than the leading competitor.",
      newDoc: true,
      type: [docType.Documentation],
      time: "5min",
      link: "/tutorials/build-code/fastest-ci",
    },
    {
      title: "Terraform Cloud notification triggers",
      module: "ci",
      icon: "img/icon_ci.svg",
      description: "Terraform Cloud notifications can automatically trigger CI pipelines.",
      newDoc: true,
      type: [docType.Documentation],
      time: "9min",
      link: "/tutorials/build-code/build/tfc-notification",
    },
  ];*/
  
  // Docs
  export const docsCards: CardSections = [
    {
      // name: "Documentation",
      //description:
      //  "",
      list: [
        {
          title: "Release notes",
          module: "ci",
          description:
            "Learn about recent changes to Harness CI.",
          link: "/release-notes/continuous-integration",
        },
        {
          title: "Get started with CI",
          module: "ci",
          description:
            "Learn about the benefits, features, and architecture of Harness CI, as well as basic CI concepts.",
          link: "/docs/category/get-started-with-ci",
        },
        {
          title: "Migrate to Harness CI",
          module: "ci",
          description:
            "Migrate to Harness CI from another CI provider.",
          link: "/docs/category/migrate-to-harness-ci",
        },
        {
          title: "Create CI pipelines",
          module: "ci",
          description:
            "Learn how to build CI pipelines in Harness.",
          link: "/docs/continuous-integration/use-ci/prep-ci-pipeline-components",
        },
        {
          title: "Optimize and enhance CI pipelines",
          module: "ci",
          description:
            "Make your CI pipelines faster, more efficient, and more versatile.",
          link: "/docs/continuous-integration/use-ci/optimize-and-more/optimizing-ci-build-times",
        },
        {
          title: "Tutorials",
          module: "ci",
          description:
            "For hands-on learning, try the Harness CI tutorials.",
          link: "/tutorials/build-code",
        },
        {
          title: "Troubleshooting",
          module: "ci",
          description:
            "Get help with errors and other issues that can arise with Harness CI.",
          link: "/docs/continuous-integration/troubleshoot/troubleshooting-ci",
        },
        {
          title: "Reference: Step settings",
          module: "ci",
          description:
            "Explore settings that you can configure for each Harness CI step type.",
          link: "/docs/category/reference-ci-steps-settings",
        },
        {
          title: "Reference: API docs",
          module: "ci",
          description:
            "Explore Harness' API documentation.",
          link: "https://apidocs.harness.io/",
        },
      ],
    },
  ];
  /* Define the cards - end */