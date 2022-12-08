// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

// const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const path = require("path");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Harness Developer Hub",
  tagline:
    "Learn intelligent software delivery at your own pace. Step-by-step tutorials, videos, and reference docs to help you deliver customer happiness.",
  url: "https://developer.harness.io",
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
          path: "docs",
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/harness/developer-hub/tree/main", // /tree/main/packages/create-docusaurus/templates/shared/
          // include: ["tutorials/**/*.{md, mdx}", "docs/**/*.{md, mdx}"],
          exclude: ["**/shared/**", "**/static/**"],
          routeBasePath: "docs", //CHANGE HERE
        },
        // blog: {
        //   //   showReadingTime: true,
        //   editUrl: "https://github.com/harness/developer-hub/tree/main",
        //   blogTitle: "Release Notes",
        //   blogDescription: "Harness Platform Release Notes",
        //   postsPerPage: "ALL",
        //   blogSidebarTitle: "All Release Notes",
        //   blogSidebarCount: "ALL",
        //   feedOptions: {
        //     type: "all",
        //     copyright: `Copyright © ${new Date().getFullYear()} Harness, Inc.`,
        //   },
        //   // URL route for the blog section of your site.
        //   // *DO NOT* include a trailing slash.
        //   routeBasePath: "release-notes",
        //   // Path to data on filesystem relative to site dir.
        //   path: "release-notes",
        //   include: ["**/*.{md,mdx}"],
        //   exclude: ["**/shared/**", "**/static/**"],
        // },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "GTM-MJB7HPB", //, GTM-MJB7HPB is Prod - GTM-W895FNP is Pre-Prod
          anonymizeIP: false,
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
          src: "img/logo_dlp.svg",
        },
        items: [
          {
            position: "left",
            // label: "img",
            html: "<img src='/img/icon_beta.svg' alt='BETA' width='39' height='19' />",
            href: "#",
          },
          {
            // type: "search",
            // position: "right",
            // className: "searchBar",
            // use customized coveo search on sidebar
            type: "custom-coveo-search",
            position: "right",
          },
          {
            position: "right",
            type: "dropdown",
            label: "Tutorials",
            items: [
              {
                // type: "doc",
                label: "All Tutorials",
                to: "tutorials/get-started",
              },
              {
                // type: "doc",
                label: "Build & Test Code",
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
              {
                // type: "doc",
                label: "Administer Harness Platform",
                to: "tutorials/platform",
              },
            ],
          },
          {
            position: "right",
            type: "dropdown",
            label: "Documentation",
            items: [
              {
                label: "Get Started",
                to: "docs/getting-started",
              },
              {
                label: "Continuous Integration",
                to: "docs/continuous-integration",
              },
              {
                label: "Continuous Delivery & GitOps",
                to: "docs/continuous-delivery",
              },
              {
                label: "Feature Flags",
                to: "docs/feature-flags",
              },
              {
                label: "Cloud Cost Management",
                to: "docs/cloud-cost-management",
              },
              {
                label: "Service Reliability Management",
                to: "docs/service-reliability-management",
              },
              {
                label: "Security Testing Orchestration",
                to: "docs/security-testing-orchestration",
              },
              {
                label: "Chaos Engineering",
                to: "docs/chaos-engineering",
              },
              {
                label: "Harness Platform",
                to: "docs/platform",
              },
              {
                label: "Self-Managed Enterprise Edition",
                to: "docs/self-managed-enterprise-edition",
              },
              {
                label: "Harness FirstGen",
                to: "docs/first-gen",
              },
              {
                label: "FAQs",
                to: "docs/frequently-asked-questions",
              },
              {
                label: "Troubleshooting",
                to: "docs/troubleshooting",
              },
              {
                label: "API Reference",
                href: "https://apidocs.harness.io/",
              },
            ],
          },
          {
            // to: "release-notes",
            label: "Release Notes",
            position: "right",
            type: "dropdown",
            items: [
              {
                label: "What's New",
                to: "release-notes/whats-new",
              },
              {
                label: "Early Access",
                to: "release-notes/early-access",
              },
              {
                label: "Continuous Integration",
                to: "release-notes/continuous-integration",
              },
              {
                label: "Continuous Delivery",
                to: "release-notes/continuous-delivery",
              },
              {
                label: "Feature Flags",
                to: "release-notes/feature-flags",
              },
              {
                label: "Cloud Cost Management",
                to: "release-notes/cloud-cost-management",
              },
              {
                label: "Service Reliability Management",
                to: "release-notes/service-reliability-management",
              },
              {
                label: "Security Testing Orchestration",
                to: "release-notes/security-testing-orchestration",
              },
              {
                label: "Chaos Engineering",
                to: "release-notes/chaos-engineering",
              },
              {
                label: "Harness Platform",
                to: "release-notes/platform",
              },
              {
                label: "Self-Managed Enterprise Edition",
                to: "release-notes/self-managed-ee",
              },
              {
                label: "Harness FirstGen",
                to: "release-notes/first-gen",
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
                label: "Continuous Delivery & GitOps",
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
                label: "Open Source",
                href: "https://harness-community.github.io/",
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
                to: "legal/terms-of-use",
              },
              {
                label: "Privacy Policy",
                href: "https://harness.io/legal/privacy",
              },
              {
                html: "<a href='javascript:void(0)' class='footer__link-item' onclick='window.OneTrust && window.OneTrust.ToggleInfoDisplay()'>Cookie Management</a>",
                // href: "javascript: alert(33)",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Harness Inc.`,
      },
      prism: {
        theme: darkCodeTheme, // lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      /*
      algolia: {
        // The application ID provided by Algolia
        appId: "HPP2NHSWS8",

        // Public API key: it is safe to commit it
        apiKey: "26d5fe04a4fb8f356e8f9f79882544c5",

        indexName: "dlp-docs",

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        // externalUrlRegex: "developer\\.harness\\.io",

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: "search",

        //... other Algolia params
      },
      */
      colorMode: {
        defaultMode: "light",
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      announcementBar: {
        id: "support_us",
        content:
          "Harness Developer Hub is in BETA. Help us improve by providing feedback.",
        backgroundColor: "#000000",
        textColor: "#ffffff",
        isCloseable: true,
      },
      hotjar: {
        siteId: 3194971,
      },
      oneTrust: {
        dataDomainScript: "59633b83-e34c-443c-a807-63232ce145e5",
      },
      rss: {
        rssPath: "release-notes/rss.xml",
        rssTitle: "Harness Release Notes",
        copyright: "Harness Inc.",
        rssDescription: "Harness Release Notes",
      },
    }),
  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        // fromExtensions: ['html', 'htm'], // /myPage.html -> /myPage
        // toExtensions: ['exe', 'zip'], // /myAsset -> /myAsset.zip (if latter exists)
        redirects: [
          {
            from: "/release-notes",
            to: "/release-notes/whats-new",
          },
          /* // Redirect from multiple old paths to the new path
          {
            to: '/docs/newDoc2',
            from: ['/docs/oldDocFrom2019', '/docs/legacyDocFrom2016'],
          }, */
        ],
        /*
        createRedirects(existingPath) {
          if (existingPath.includes('/community')) {
            // Redirect from /docs/team/X to /community/X and /docs/support/X to /community/X
            return [
              existingPath.replace('/community', '/docs/team'),
              existingPath.replace('/community', '/docs/support'),
            ];
          }
          return undefined; // Return a falsy value: no redirect created
        },
        */
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "tutorials",
        path: "tutorials",
        routeBasePath: "tutorials",
        exclude: ["**/shared/**", "**/static/**"],
        sidebarPath: require.resolve("./sidebars-tutorials.js"),
        editUrl: "https://github.com/harness/developer-hub/tree/main",
        // ... other options
      },
    ],
    [
      path.resolve(__dirname, "./plugins/docs-rss-plugin"),
      {
        id: "release-notes",
        path: "release-notes",
        routeBasePath: "release-notes",
        exclude: ["**/shared/**", "**/static/**"],
        sidebarPath: require.resolve("./sidebars-release-notes.js"),
        editUrl: "https://github.com/harness/developer-hub/tree/main",
      },
    ],
    "docusaurus-plugin-sass",
    path.join(__dirname, "/plugins/hotjar-plugin"),
    path.join(__dirname, "/plugins/onetrust-plugin"),
  ],
};

module.exports = config;
