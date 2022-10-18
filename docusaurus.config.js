// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Harness Developer Hub",
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
          path: ".",
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/harness/developer-hub/tree/main", // /tree/main/packages/create-docusaurus/templates/shared/
          include: ["tutorials/**", "docs/**"],
          exclude: ["**/shared/**", "**/static"],
          routeBasePath: "/", //CHANGE HERE
        },
        // blog: {
        //   showReadingTime: true,
        //   editUrl: "https://github.com/harness/developer-hub/tree/main", // /tree/main/packages/create-docusaurus/templates/shared/
        // },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "GTM-MJB7HPB",
          anonymizeIP: true,
        },
        googleAnalytics: {
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
        title: "Harness Developer Hub",
        logo: {
          alt: "Harness Developer Hub",
          src: "img/logo.svg",
        },
        items: [
          {
            position: "left",
            // label: "img",
            html: "<img src='/img/icon_beta.svg' width='39' height='19' style='margin-top: 8px;' />",
            href: "#",
          },
          {
            position: "right",
            type: "dropdown",
            label: "Tutorials",
            items: [
              {
                // type: "doc",
                label: "Build Code",
                to: "tutorials/build-code",
                // docId: "build-code",
                // activeBasePath: "to",
              },
              {
                // type: "doc",
                label: "Deploy Services",
                to: "tutorials/deploy-services",
              },
              {
                // type: "doc",
                label: "Manage Feature Flags",
                to: "tutorials/manage-feature-flags",
                // activeBaseRegex: "/manage-feature-flags",
              },
              {
                // type: "doc",
                label: "Manage Cloud Costs",
                to: "tutorials/manage-cloud-costs",
              },
              {
                // type: "doc",
                label: "Manage Service Reliability",
                to: "tutorials/manage-service-reliability",
              },
              {
                // type: "doc",
                label: "Orchestrate Security Tests",
                to: "tutorials/orchestrate-security-tests",
              },
              {
                // type: "doc",
                label: "Run Chaos Experiments",
                to: "tutorials/run-chaos-experiments",
              },
            ],
          },
          {
            position: "right",
            type: "dropdown",
            label: "Documentation",
            items: [
              {
                label: "Continuous Integration",
                to: "docs/continuous-integration",
              },
              {
                label: "Continuous Delivery",
                href: "https://docs.harness.io/category/pfzgb4tg05-howto-cd",
              },
              {
                label: "Feature Flags",
                href: "https://docs.harness.io/category/vjolt35atg-feature-flags",
              },
              {
                label: "Cloud Cost Management",
                href: "https://docs.harness.io/category/exgoemqhji-ccm",
              },
              {
                label: "Service Reliability Management",
                href: "https://docs.harness.io/category/ko19u4brsv-howtos-service-reliability-management",
              },
              {
                label: "Security Testing Orchestration",
                href: "https://docs.harness.io/category/txlccquh5c-sto-category",
              },
              {
                label: "Chaos Engineering",
                to: "docs/chaos-engineering",
              },
              {
                label: "API Reference",
                href: "https://apidocs.harness.io/",
              },
            ],
          },
          {
            position: "right",
            href: "https://join.slack.com/t/harnesscommunity/shared_invite/zt-y4hdqh7p-RVuEQyIl5Hcx4Ck8VCvzBw",
            label: "Join Slack",
          },
          {
            position: "right",
            // label: "Sign up",
            html: '<button class="button button--cta">Sign up</button>',
            href: "https://app.harness.io/auth/#/signup/&?utm_source=website&utm_medium=harness-developer-hub&utm_campaign=plt-plg&utm_content=get-started",
          },
          /**
          {
            href: "https://github.com/harness/developer-hub",
            label: "Developer Hub GitHub",
            position: "right",
          },
          */
        ],
      },
      footer: {
        // style: "dark",
        links: [
          {
            title: "Harness Software Delivery Platform",
            items: [
              {
                label: "Overview",
                href: "https://harness.io/products/platform",
              },
              {
                label: "Continuous Integration",
                href: "https://harness.io/products/continuous-integration",
              },
              {
                label: "Continuous Delivery",
                href: "https://harness.io/products/continuous-delivery",
              },
              {
                label: "Feature Flags",
                href: "https://harness.io/products/feature-flags",
              },
              {
                label: "Cloud Cost Management",
                href: "https://harness.io/products/cloud-cost",
              },
              {
                label: "Service Reliability Management",
                href: "https://harness.io/products/service-reliability-management",
              },
              {
                label: "Security Testing Orchestration",
                href: "https://harness.io/products/security-testing-orchestration",
              },
              {
                label: "Chaos Engineering",
                href: "https://harness.io/products/chaos-engineering",
              },
            ],
          },
          {
            title: "Resources",
            items: [
              {
                label: "Sign up",
                href: "https://app.harness.io/auth/#/signup/&?utm_source=website&utm_medium=harness-developer-hub&utm_campaign=plt-plg&utm_content=get-started",
              },
              {
                label: "Slack",
                href: "https://join.slack.com/t/harnesscommunity/shared_invite/zt-y4hdqh7p-RVuEQyIl5Hcx4Ck8VCvzBw",
              },
              {
                label: "API Reference",
                href: "https://apidocs.harness.io/",
              },
              {
                label: "Forum",
                href: "https://community.harness.io",
              },
              {
                label: "University",
                href: "https://university.harness.io",
              },
              {
                label: "YouTube",
                href: "https://www.youtube.com/c/Harnessio",
              },
              {
                label: "Developer Hub GitHub",
                href: "https://github.com/harness/developer-hub",
              },
            ],
          },
          {
            title: "Legal",
            items: [
              {
                label: "Terms of Use",
                to: "docs/legal/terms-of-use",
              },
              {
                label: "Privacy Policy",
                href: "https://harness.io/legal/privacy",
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
          "Harness Developer Hub is in BETA. Submit the feedback form for any suggestions.</a>",
        backgroundColor: "#FF5310",
        textColor: "#ffffff",
        isCloseable: true,
      },
    }),
  plugins: ["docusaurus-plugin-sass"],
};

module.exports = config;
