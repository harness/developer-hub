// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

// const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const path = require("path");
const clientRedirects = require("./client-redirects");

const BASE_URL = process.env.BASE_URL || "/";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Harness Developer Hub",
  tagline:
    "Learn intelligent software delivery at your own pace. Step-by-step tutorials, videos, and reference docs to help you deliver customer happiness.",
  url: "https://developer.harness.io",
  baseUrl: BASE_URL,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/hdh_fav_icon_grey.ico",

  //Mermaid Diagram Functionality
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],

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
        sitemap: {
          // changefreq: 'weekly',
          // priority: 0.5,
          ignorePatterns: [
            "/docs/infra-as-code-management",
            "/docs/infra-as-code-management/**",
          ],
          // filename: 'sitemap.xml',
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"), // we could also use scss here
        },
        gtag: {
          trackingID: "G-46758J5H8P",
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
          /*{
            position: "left",
            html: `<img src='${BASE_URL}img/icon_beta.svg' alt='BETA' width='39' height='19' />`,
            href: "#",
          },*/
          {
            position: "right",
            type: "dropdown",
            label: "Tutorials",
            to: "tutorials",
            items: [
              {
                // type: "doc",
                label: "All Tutorials",
                to: "tutorials",
              },
              {
                // type: "doc",
                label: "Set up CI Pipelines",
                to: "tutorials/ci-pipelines",
                // docId: "ci-pipelines",
                // activeBasePath: "to",
              },
              {
                // type: "doc",
                label: "Set up CD Pipelines",
                to: "tutorials/cd-pipelines",
              },
              {
                // type: "doc",
                label: "Manage Feature Flags",
                to: "tutorials/feature-flags",
                // activeBaseRegex: "/feature-flags",
              },
              {
                // type: "doc",
                label: "Manage Cloud Costs",
                to: "tutorials/cloud-costs",
              },
              {
                // type: "doc",
                label: "Manage Service Reliability",
                to: "tutorials/service-reliability",
              },
              {
                // type: "doc",
                label: "Orchestrate Security Tests",
                to: "tutorials/security-tests",
              },
              {
                // type: "doc",
                label: "Run Chaos Experiments",
                to: "tutorials/chaos-experiments",
              },
              {
                // type: "doc",
                label: "Track Errors",
                to: "tutorials/error-tracking",
              },
              {
                // type: "doc",
                label: "Manage Developer Portal",
                to: "tutorials/internal-developer-portal",
              },
              {
                // type: "doc",
                label: "Administer Harness Platform",
                to: "tutorials/platform",
              },
              {
                // type: "doc",
                label: "Administer Harness Self-Managed Enterprise Edition",
                to: "tutorials/self-managed-enterprise-edition",
              },
            ],
          },
          {
            position: "right",
            type: "dropdown",
            label: "Documentation",
            to: "docs",
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
                label: "Continuous Error Tracking",
                to: "docs/continuous-error-tracking",
              },
              {
                label: "Internal Developer Portal",
                to: "docs/internal-developer-portal",
              },
              {
                label: "Platform",
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
                label: "Release Notes",
                href: "/release-notes/whats-new",
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
                to: "https://apidocs.harness.io/",
              },
            ],
          },
          {
            label: "Certifications",
            position: "right",
            type: "dropdown",
            to: "certifications",
            items: [
              {
                label: "All Certifications",
                to: "certifications",
              },
              {
                label: "Continuous Delivery & GitOps",
                to: "certifications/continuous-delivery",
              },
              {
                label: "Continuous Integration",
                to: "certifications/continuous-integration",
              },
              {
                label: "Cloud Cost Management",
                to: "certifications/cloud-cost-management",
              },
              {
                label: "Feature Flags",
                to: "certifications/feature-flags",
              },
              {
                label: "Instructions",
                to: "certifications/instructions",
              },
            ],
          },
          {
            position: "right",
            to: "kb",
            label: "Knowledge Base",
          },
          {
            position: "right",
            to: "community",
            label: "Community",
          },
          //{
          //  position: "right",
          //  to: "https://join.slack.com/t/harnesscommunity/shared_invite/zt-1h2cy1up2-Bf3MQQvKTf~YkVcsnkJ5pw",
          //  label: "Join Slack",
          //},
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
            // label: "Sign up",
            html: '<button class="button button--cta">Sign up</button>',
            href: "https://app.harness.io/auth/#/signup/&?utm_source=website&utm_medium=harness-developer-hub&utm_campaign=plt-plg&utm_content=get-started",
          },
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
                to: "https://harness.io/products/platform",
              },
              {
                label: "Continuous Integration",
                to: "https://harness.io/products/continuous-integration",
              },
              {
                label: "Continuous Delivery & GitOps",
                to: "https://harness.io/products/continuous-delivery",
              },
              {
                label: "Feature Flags",
                to: "https://harness.io/products/feature-flags",
              },
              {
                label: "Cloud Cost Management",
                to: "https://harness.io/products/cloud-cost",
              },
              {
                label: "Service Reliability Management",
                to: "https://harness.io/products/service-reliability-management",
              },
              {
                label: "Security Testing Orchestration",
                to: "https://harness.io/products/security-testing-orchestration",
              },
              {
                label: "Chaos Engineering",
                to: "https://harness.io/products/chaos-engineering",
              },
              {
                label: "Continuous Error Tracking",
                to: "https://www.harness.io/products/continuous-error-tracking",
              },
            ],
          },
          {
            title: "Resources",
            items: [
              {
                label: "Sign up",
                to: "https://app.harness.io/auth/#/signup/&?utm_source=website&utm_medium=harness-developer-hub&utm_campaign=plt-plg&utm_content=get-started",
              },
              {
                label: "Slack",
                to: "https://join.slack.com/t/harnesscommunity/shared_invite/zt-1h2cy1up2-Bf3MQQvKTf~YkVcsnkJ5pw",
              },
              {
                label: "API Reference",
                to: "https://apidocs.harness.io/",
              },
              {
                label: "Open Source",
                to: "https://www.harness.io/open-source",
              },
              {
                label: "YouTube",
                to: "https://www.youtube.com/c/Harnessio",
              },
              {
                label: "Developer Hub GitHub",
                to: "https://github.com/harness/developer-hub",
              },
              {
                label: "Release Notes",
                href: "/release-notes/whats-new",
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
                to: "https://harness.io/legal/privacy",
              },
              {
                label: "Accessibility",
                to: "legal/accessibility",
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
      colorMode: {
        defaultMode: "light",
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      /*
      announcementBar: {
        id: "support_us",
        content:
          "Welcome to Harness Developer Hub. Help us improve by providing feedback.",
        backgroundColor: "#000000",
        textColor: "#ffffff",
        isCloseable: true,
      },
      */
      announcementBar: {
        id: "announcementBar_cd_announcement",
        content:
          "<i class='fa-solid fa-circle-exclamation' style='color: #CF2318; margin-right: 4px;'></i><span style='color: #CF2318;'>FirstGen Harness CD will be EOL on 12/30/2023 and EOS on 3/30/2024.</span> Learn more in our <a href='/docs/continuous-delivery/get-started/upgrading/upgrade-nextgen-cd/' target='_self'>Upgrade Guide</a>. Contact  <a href='https://support.harness.io' target='_self'>Harness Support</a> with questions or concerns.",
        backgroundColor: "#FFF5ED",
        textColor: "#000000",
        isCloseable: true,
      },
      announcementBarByPath: {
        // list all pathnames in Regular expressions format
        pathRegExp: [
          // paths for md-doc pages
          "^/docs/first-gen/continuous-delivery.*",
          "^/docs/first-gen/first-gen-quickstarts.*",
          // paths for category pages
          "^/docs/category/quickstarts.*",
          "^/docs/category/continuous-delivery.*",
          "^/docs/category/continuous-delivery-overview.*",
          "^/docs/category/general-deployment-features.*",
          "^/docs/category/deployment-strategies-and-integrations.*",
          "^/docs/category/aws-.*",
          "^/docs/category/general-aws-.*",
          "^/docs/category/azure-.*",
          "^/docs/category/cicd-artifact-build-and-deploy-pipelines.*",
          "^/docs/category/google-cloud.*",
          "^/docs/category/native-helm-deployments.*",
          "^/docs/category/iis-net-deployments.*",
          "^/docs/category/kubernetes-deployments.*",
          "^/docs/category/tanzu-application-service-formerly-pivotal.*",
          "^/docs/category/terraform-1.*",
          "^/docs/category/terragrunt.*",
          "^/docs/category/traditional-deployments-ssh.*",
          "^/docs/category/custom-deployments.*",
          "^/docs/category/continuous-verification-1.*",
          "^/docs/category/model-your-cd-pipeline.*",
          "^/docs/category/harness-git-based-how-tos.*",
        ],
      },
      hotjar: {
        siteId: 3194971,
      },
      oneTrust: {
        dataDomainScript: "59633b83-e34c-443c-a807-63232ce145e5",
      },
      utmCookie: {
        prefix: "utm_",
      },
      munity: {
        clientId: "b866f690584d8345",
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
      /* externalizing the redirects
      {
        redirects: [
          {
            from: "/release-notes",
            to: "/release-notes/whats-new",
          },
          {
            from: "/docs",
            to: "/docs/category/documentation",
          },
        ],
      },
      */
      clientRedirects,
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
      "@docusaurus/plugin-content-docs",
      {
        id: "certifications",
        path: "certifications",
        routeBasePath: "certifications",
        exclude: ["**/shared/**", "**/static/**"],
        sidebarPath: require.resolve("./sidebars-certifications.js"),
        editUrl: "https://github.com/harness/developer-hub/tree/main",
        // ... other options
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "kb",
        path: "kb",
        routeBasePath: "kb",
        exclude: ["**/shared/**", "**/static/**"],
        sidebarPath: require.resolve("./sidebars-kb.js"),
        editUrl: "https://github.com/harness/developer-hub/tree/main",
        // ... other options
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "community",
        path: "community",
        routeBasePath: "community",
        exclude: ["**/shared/**", "**/static/**"],
        sidebarPath: require.resolve("./sidebars-community.js"),
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
    path.join(__dirname, "/plugins/utmcookie-plugin"),
    path.join(__dirname, "/plugins/munity-plugin"),
  ],
  clientModules: [require.resolve("./client-modules/DetailsFromDocs")],
};

module.exports = config;
