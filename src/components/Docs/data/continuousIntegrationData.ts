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
      link: "/docs/continuous-integration/get-started/tutorials",
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
        {
          title: "Development guides",
          module: MODULES.ci,
          description:
            "Guides for using Harness CI for popular languages and platforms, including mobile development.",
          link: "/docs/category/development-guides",
        },
        {
          title: "Secure CI",
          module: MODULES.ci,
          description:
            "Security hardening features and practices for Harness CI.",
          link: "/docs/continuous-integration/secure-ci/security-hardening",
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
          link: "/docs/continuous-integration/use-ci/run-tests/test-intelligence/set-up-test-intelligence",
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
            "Plugins perform predefined tasks. Use plugins to incorporate custom scripts, Jira updates, GitHub Actions, Bitrise Integrations, and more into your CI pipelines.",
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
          title: "Build, push, upload, and download artifacts and images",
          module: MODULES.ci,
          description:
            "Build and upload artifacts in CI pipelines.",
          link: "/docs/category/build-push-upload-download",
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
            "Plugins run scripts and perform predefined tasks. You can use existing plugins or write your own custom plugins.",
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
          link: "/docs/category/troubleshoot-ci",
        },
        {
          title: "CI Knowledge Base",
          module: MODULES.ci,
          description:
            "",
          link: "/kb/continuous-integration",
        },
      ],
    },
  ];
  /* Define the cards - end */