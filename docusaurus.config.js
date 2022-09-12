// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Harness Developer Hub (Beta)",
  tagline:
    "Learn intelligent software delivery skills at your own pace and in once place. Step-by-step tutorials, videos, and reference docs to help you create and deliver software.",
  url: "https://harness-developer.netlify.app",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "harness", // Usually your GitHub org/user name.
  projectName: "learning-hub", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/harness/developer-hub/tree/main", // /tree/main/packages/create-docusaurus/templates/shared/
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/harness/developer-hub/tree/main", // /tree/main/packages/create-docusaurus/templates/shared/
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  // themes: ["@docusaurus/theme-search-algolia"],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Harness Developer Hub (Beta)",
        logo: {
          alt: "Harness Developer Hub (Beta)",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Tutorial",
          },
          // { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/harness/developer-hub",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Tutorial",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Harness University",
                href: "https://university.harness.io",
              },
              {
                label: "Harness Docs",
                href: "https://docs.harness.io",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/harness",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                // to: "/blog",
                href: "https://harness.io/blog",
              },
              {
                label: "Try for Free",
                href: "https://app.harness.io/auth/#/signup?utm_source=Website&utm_medium=harness-docs&utm_campaign=harness-docs-free-account-cta-main-navigation&utm_content=free-account",
              },
              {
                label: "GitHub",
                href: "https://github.com/harness/developer-hub",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Harness Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      algolia: {
        // The application ID provided by Algolia
        appId: "J3B54BEN74",

        // Public API key: it is safe to commit it
        apiKey: "cc3d33ec999dab9f29859d20b9186408",

        indexName: "dlp-docs",

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: "harness-developer\\.netlify\\.app",

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: "search",

        //... other Algolia params
      },
    }),
  plugins: ["docusaurus-plugin-sass"],
};

module.exports = config;
