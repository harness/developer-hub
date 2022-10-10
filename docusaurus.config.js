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
  projectName: "developer-hub", // Usually your repo name.

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
          path: "tutorials",
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/harness/developer-hub/tree/main", // /tree/main/packages/create-docusaurus/templates/shared/
          exclude: ["**/docs-shared-components/**"],
          routeBasePath: "/", //CHANGE HERE
        },
        blog: {
          showReadingTime: true,
          editUrl: "https://github.com/harness/developer-hub/tree/main", // /tree/main/packages/create-docusaurus/templates/shared/
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-Z62TFF68Z3",
          anonymizeIP: true,
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
            position: "right",
            type: "dropdown",
            label: "Tutorials",
            items: [
              {
                // type: "doc",
                to: "build-code",
                label: "Continuous Integration",
                // docId: "build-code",
                // activeBasePath: "to",
              },
              {
                // type: "doc",
                label: "Continuous Delivery",
                to: "deploy-services",
              },
              {
                // type: "doc",
                label: "Feature Flags",
                to: "manage-feature-flags",
                // activeBaseRegex: "/manage-feature-flags",
              },
              {
                // type: "doc",
                label: "Cloud Cost Management",
                to: "/category/optimize-cloud-costs",
              },
              {
                // type: "doc",
                label: "Service Reliability Management",
                to: "/category/manage-slos",
              },
              {
                // type: "doc",
                label: "Security Test Orchestration",
                to: "/category/orchestrate-security-tests",
              },
              {
                // type: "doc",
                label: "Chaos Engineering",
                to: "/category/run-chaos-experiments",
              },
            ],
          },
          {
            position: "right",
            type: "dropdown",
            label: "Resources",
            items: [
              {
                label: "Harness Community",
                href: "https://community.harness.io",
              },
              {
                label: "Harness Community Slack",
                href: "https://join.slack.com/t/harnesscommunity/shared_invite/zt-y4hdqh7p-RVuEQyIl5Hcx4Ck8VCvzBw",
              },
            ],
          },
          {
            position: "right",
            label: "Sign Up For Harness",
            href: "https://app.harness.io/auth/#/signup/&?utm_source=website&utm_medium=harness-developer-hub&utm_campaign=plt-plg&utm_content=get-started",
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
                to: "/intro",
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
                href: "https://app.harness.io/auth/#/signup/&?utm_source=website&utm_medium=harness-developer-hub&utm_campaign=plt-plg&utm_content=get-started",
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
      colorMode: {
        defaultMode: "light",
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      announcementBar: {
        id: "support_us",
        content:
          'DLP is still a beta version, any suggestions please send email to <a href="mailto:ravi.lachhman@harness.io">ravi.lachhman@harness.io</a>',
        backgroundColor: "#FF5310",
        textColor: "#ffffff",
        isCloseable: true,
      },
    }),
  plugins: ["docusaurus-plugin-sass"],
};

module.exports = config;
