import {
  CardItem,
  CardSections,
  docType,
} from "@site/src/components/LandingPage/TutorialCard";
import { MODULES } from "@site/src/constants"

/* Define the cards - start */

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
          title: "Harness CI Cloud",
          module: MODULES.ci,
          description:
            "Run builds at scale on VMs that are preconfigured with tools, packages, and settings commonly used in CI pipelines.",
          link: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure",
        },
        {
          title: "Harness CI Intelligence",
          module: MODULES.ci,
          description:
            "Leverage a suite of smart features that optimize your builds, including Test Intelligence and Cache Intelligence.",
          link: "/docs/continuous-integration/get-started/harness-ci-intelligence",
        },
        {
          title: "Plugins",
          module: MODULES.ci,
          description:
            "Plugins perform predefined tasks. Use plugins to incorporate custom scripts, Jira updates, GitHub Actions, Bitrise Workflow Steps, and more into your CI pipelines.",
          link: "/docs/continuous-integration/use-ci/use-drone-plugins/explore-ci-plugins",
        },
      ],
    },

    {
      name: "Create pipelines",
      description:
        "",
      list: [
        {
          title: "Pipeline creation overview",
          module: MODULES.ci,
          description:
            "Learn about creating Harness CI pipelines.",
          link: "/docs/continuous-integration/use-ci/prep-ci-pipeline-components",
        },
        {
          title: "Build infrastructure",
          module: MODULES.ci,
          description:
            "Configure build farms for your CI pipelines.",
          link: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me",
        },
        {
          title: "Artifacts and images",
          module: MODULES.ci,
          description:
            "Create, store, and use artifacts and images in CI pipelines.",
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