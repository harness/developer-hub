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
      name: "Get started",
      description:
        "",
      list: [
        {
          title: "Get started with CI",
          module: "ci",
          description:
            "Learn about the benefits, features, and architecture of Harness CI, as well as basic CI concepts.",
          link: "/docs/category/get-started-with-ci",
        },
        {
          title: "Pipeline creation overview",
          module: "ci",
          description:
            "Learn about creating Harness CI pipelines.",
          link: "/docs/continuous-integration/use-ci/prep-ci-pipeline-components",
        },
        {
          title: "Migrate to Harness CI",
          module: "ci",
          description:
            "Migrate to Harness CI from another CI provider.",
          link: "/docs/category/migrate-to-harness-ci",
        },
      ],
    },

    {
      name: "Feature highlights",
      description:
        "",
      list: [
        {
          title: "Harness Cloud",
          module: "ci",
          description:
            "Run builds at scale on VMs that are preconfigured with tools, packages, and settings commonly used in CI pipelines.",
          link: "/docs/continuous-integration/ci-quickstarts/hosted-builds-on-virtual-machines-quickstart",
        },
        {
          title: "Test Intelligence",
          module: "ci",
          description:
            "Improve test times by running only those unit tests that are required to confirm the quality of the code changes that triggered the pipeline.",
          link: "/docs/continuous-integration/ci-quickstarts/test-intelligence-concepts",
        },
        {
          title: "Cache Intelligence",
          module: "ci",
          description:
            "With Cache Intelligence, Harness automatically caches and restores common dependencies.",
          link: "/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence",
        },
        {
          title: "Background steps",
          module: "ci",
          description:
            "Use Background steps to manage long-running service dependencies.",
          link: "/docs/continuous-integration/ci-technical-reference/background-step-settings",
        },
        {
          title: "Plugins",
          module: "ci",
          description:
            "Plugins perform predefined tasks. Use plugins to incorporate Jira updates, GitHub Actions, Bitrise Integrations, and more into your CI pipelines.",
          link: "/docs/continuous-integration/use-ci/use-drone-plugins/explore-ci-plugins",
        },
        {
          title: "Optimization strategies",
          module: "ci",
          description:
            "Make your CI pipelines faster, more efficient, and more versatile.",
          link: "/docs/continuous-integration/use-ci/optimize-and-more/optimizing-ci-build-times",
        },
      ],
    },

    {
      name: "Create pipelines",
      description:
        "",
      list: [
        {
          title: "Set up build infrastructure",
          module: "ci",
          description:
            "",
          link: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me",
        },
        {
          title: "Build and upload artifacts",
          module: "ci",
          description:
            "Build and upload artifacts in CI pipelines.",
          link: "/docs/category/build-and-upload-artifacts",
        },
        {
          title: "Run tests",
          module: "ci",
          description:
            "Run tests in CI pipelines.",
          link: "/docs/category/run-tests",
        },
        {
          title: "Dependencies and caching",
          module: "ci",
          description:
            "Manage dependencies, share data, and use caching in CI pipelines",
          link: "/docs/continuous-integration/use-ci/manage-dependencies/dependency-mgmt-strategies",
        },
        {
          title: "Plugins",
          module: "ci",
          description:
            "Plugins perform predefined tasks. Use plugins to incorporate Jira updates, GitHub Actions, Bitrise Integrations, and more into your CI pipelines.",
          link: "/docs/continuous-integration/use-ci/use-drone-plugins/explore-ci-plugins",
        },
        {
          title: "Optimization strategies",
          module: "ci",
          description:
            "Make your CI pipelines faster, more efficient, and more versatile.",
          link: "/docs/continuous-integration/use-ci/optimize-and-more/optimizing-ci-build-times",
        },
      ],
    },

    {
      name: "Help and FAQs",
      description:
        "",
      list: [
        {
          title: "Troubleshoot CI",
          module: "ci",
          description:
            "",
          link: "/docs/continuous-integration/troubleshoot/troubleshooting-ci",
        },
        {
          title: "CI FAQs",
          module: "ci",
          description:
            "",
          link: "/docs/frequently-asked-questions/harness-faqs/continuous-integration-ci-faqs",
        },
      ],
    },
  ];
  /* Define the cards - end */