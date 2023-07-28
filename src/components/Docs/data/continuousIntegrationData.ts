import {
  CardItem,
  CardSections,
  docType,
} from "@site/src/components/LandingPage/TutorialCard";
import { MODULES } from "@site/src/constants"

/* Define the cards - start */
export const featuredTutorials: CardItem[] = []
/* Uncomment if you want to show the Featured Tutorials section -->
// Featured Tutorials
export const featuredTutorials: CardItem[] = [
    {
      title: "Get started for free with the fastest CI on the planet",
      module: MODULES.ci,
      icon: "img/icon_ci.svg",
      description: "Get started with Harness CI and explore some of the features that make it four times faster than the leading competitor.",
      newDoc: true,
      type: [docType.Documentation],
      time: "5min",
      link: "/tutorials/build-code/fastest-ci",
    },
    {
      title: "Terraform Cloud notification triggers",
      module: MODULES.ci,
      icon: "img/icon_ci.svg",
      description: "Terraform Cloud notifications can automatically trigger CI pipelines.",
      newDoc: true,
      type: [docType.Documentation],
      time: "9min",
      link: "/tutorials/build-code/tfc-notification",
    },
  ];
  */
  
  // Docs
  export const docsCards: CardSections = [
    {
      name: "Get started",
      description:
        "",
      list: [
        {
          title: "CI Tutorials",
          module: MODULES.ci,
          description:
            "Dive in with these hands-on tutorials.",
          link: "/tutorials/ci-pipelines",
        },
        {
          title: "Get started with CI",
          module: MODULES.ci,
          description:
            "Learn about the benefits, features, and architecture of Harness CI, as well as basic CI concepts.",
          link: "/docs/category/get-started-with-ci",
        },
        {
          title: "Pipeline creation overview",
          module: MODULES.ci,
          description:
            "Learn about creating Harness CI pipelines.",
          link: "/docs/continuous-integration/use-ci/prep-ci-pipeline-components",
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
          module: MODULES.ci,
          description:
            "Run builds at scale on VMs that are preconfigured with tools, packages, and settings commonly used in CI pipelines.",
          link: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure",
        },
        {
          title: "Test Intelligence",
          module: MODULES.ci,
          description:
            "Improve test times by running only those unit tests that are required to confirm the quality of the code changes that triggered the pipeline.",
          link: "/docs/continuous-integration/use-ci/set-up-test-intelligence",
        },
        {
          title: "Cache Intelligence",
          module: MODULES.ci,
          description:
            "With Cache Intelligence, Harness automatically caches and restores common dependencies.",
          link: "/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence",
        },
        {
          title: "Background steps",
          module: MODULES.ci,
          description:
            "Use Background steps to manage long-running service dependencies.",
          link: "/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings",
        },
        {
          title: "Plugins",
          module: MODULES.ci,
          description:
            "Plugins perform predefined tasks. Use plugins to incorporate Jira updates, GitHub Actions, Bitrise Integrations, and more into your CI pipelines.",
          link: "/docs/continuous-integration/use-ci/use-drone-plugins/explore-ci-plugins",
        },
        {
          title: "Optimization strategies",
          module: MODULES.ci,
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
          module: MODULES.ci,
          description:
            "Configure build farms for your CI pipelines.",
          link: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me",
        },
        {
          title: "Build and upload artifacts",
          module: MODULES.ci,
          description:
            "Build and upload artifacts in CI pipelines.",
          link: "/docs/category/build-and-upload-artifacts",
        },
        {
          title: "Run tests",
          module: MODULES.ci,
          description:
            "Run tests in CI pipelines.",
          link: "/docs/category/run-tests",
        },
        {
          title: "Dependencies and caching",
          module: MODULES.ci,
          description:
            "Manage dependencies, share data, and use caching in CI pipelines",
          link: "/docs/continuous-integration/use-ci/manage-dependencies/dependency-mgmt-strategies",
        },
        {
          title: "Plugins",
          module: MODULES.ci,
          description:
            "Plugins perform predefined tasks. Use plugins to incorporate Jira updates, GitHub Actions, Bitrise Integrations, and more into your CI pipelines.",
          link: "/docs/continuous-integration/use-ci/use-drone-plugins/explore-ci-plugins",
        },
        {
          title: "Optimization strategies",
          module: MODULES.ci,
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
          title: "Migrate to Harness CI",
          module: MODULES.ci,
          description:
            "",
          link: "/docs/category/migrate-to-harness-ci",
        },
        {
          title: "Troubleshoot CI",
          module: MODULES.ci,
          description:
            "",
          link: "/docs/continuous-integration/troubleshoot-ci/troubleshooting-ci",
        },
        {
          title: "CI FAQs",
          module: MODULES.ci,
          description:
            "",
          link: "/docs/frequently-asked-questions/harness-faqs/continuous-integration-ci-faqs",
        },
      ],
    },
  ];
  /* Define the cards - end */