// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const { themes } = require('prism-react-renderer');
const path = require('path');

const BASE_URL = process.env.BASE_URL || '/';
function hideIndexFromSidebarItems(items) {
  const result = items.filter((item) => {
    return !(item.type === 'doc' && item.id === 'index');
  });
  return result;
}

// /** @type {import('@docusaurus/types').Config} */
async function config() {
  return {
    title: 'Harness Developer Hub',
    tagline:
      'Learn intelligent software delivery at your own pace. Guides, videos, and reference docs to help you deliver customer happiness.',
    url: 'https://developer.harness.io',
    baseUrl: BASE_URL,
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    onBrokenAnchors: 'ignore',
    favicon: 'img/hdh_fav_icon_grey.ico',
    customFields: {
      SEGMENT_API_KEY: process.env.SEGMENT_API_KEY,
      HARNESS_GENERIC_READ_ONLY_KEY: process.env.HARNESS_GENERIC_READ_ONLY_KEY,
    },

    //Mermaid Diagram Functionality
    markdown: {
      mermaid: true,
    },
    themes: ['@docusaurus/theme-mermaid'],

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'harness', // Usually your GitHub org/user name.
    projectName: 'developer-hub', // Usually your repo name.

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
      defaultLocale: 'en',
      locales: ['en'],
    },

    presets: [
      [
        'classic',
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          // docs: {
          //   path: "docs",
          //   sidebarPath: require.resolve("./sidebars.js"),
          //   editUrl: "https://github.com/harness/developer-hub/tree/main",
          //   // include: ["tutorials/**/*.{md, mdx}", "docs/**/*.{md, mdx}"],
          //   exclude: ["**/shared/**", "**/static/**"],
          //   routeBasePath: "docs", //CHANGE HERE
          // },
          docs: false,
          sitemap: {
            // changefreq: 'weekly',
            // priority: 0.5,
            ignorePatterns: [
              '/docs/database-devops',
              '/docs/database-devops/**',
            ],
            // filename: 'sitemap.xml',
          },
          theme: {
            customCss: require.resolve('./src/css/custom.css'), // we could also use scss here
          },
          googleTagManager: {
            containerId: 'GTM-MJB7HPB',
          },
        }),
      ],
    ],

    // themes: ["@docusaurus/theme-search-algolia"],
    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        metadata: [
          {
            name: 'og:image',
            content: 'https://developer.harness.io/img/hdh-social-card.png',
          },
        ],
        //src: "/img/logo_dlp.svg",
        navbar: {
          title: 'Harness Developer Hub',
          logo: {
            alt: 'Harness Developer Hub',
            src: '/img/logo_dlp.svg',
          },
          items: [
            /*{
              position: "left",
              html: `<img src='${BASE_URL}img/icon_beta.svg' alt='BETA' width='39' height='19' />`,
              href: "#",
            },*/
            {
              position: 'right',
              type: 'dropdown',
              label: 'Documentation',
              to: 'docs',
              items: [
                {
                  label: 'Platform',
                  to: 'docs/platform',
                },
                {
                  label: 'Cloud Development Environments',
                  to: 'docs/cloud-development-environment',
                },
                {
                  label: 'Code Repository',
                  to: 'docs/code-repository',
                },
                {
                  label: 'Continuous Integration',
                  to: 'docs/continuous-integration',
                },
                {
                  label: 'Continuous Delivery & GitOps',
                  to: 'docs/continuous-delivery',
                },
                {
                  label: 'Infrastructure as Code Management',
                  to: 'docs/infrastructure-as-code-management',
                },
                {
                  label: 'Feature Flags',
                  to: 'docs/feature-flags',
                },
                {
                  label: 'Cloud Cost Management',
                  to: 'docs/cloud-cost-management',
                },
                {
                  label: 'Security Testing Orchestration',
                  to: 'docs/security-testing-orchestration',
                },
                {
                  label: 'Supply Chain Security',
                  to: 'docs/software-supply-chain-assurance',
                },
                {
                  label: 'Chaos Engineering',
                  to: 'docs/chaos-engineering',
                },
                {
                  label: 'Service Reliability Management',
                  to: 'docs/service-reliability-management',
                },
                {
                  label: 'Internal Developer Portal',
                  to: 'docs/internal-developer-portal',
                },
                {
                  label: 'Software Engineering Insights',
                  to: 'docs/software-engineering-insights',
                },
                {
                  label: 'Self-Managed Enterprise Edition',
                  to: 'docs/self-managed-enterprise-edition',
                },
                {
                  label: 'Open Source',
                  href: 'docs/open-source',
                },
                {
                  label: 'FirstGen',
                  to: 'docs/first-gen',
                },
                {
                  label: 'FAQs',
                  to: 'docs/faqs',
                },
                {
                  label: 'Troubleshooting',
                  to: 'docs/troubleshooting',
                },
                {
                  label: 'Harness Cloud Operations',
                  to: 'docs/harness-cloud-operations',
                },
                {
                  label: 'Release Notes',
                  href: '/release-notes',
                },
                {
                  label: 'API Reference',
                  to: 'https://apidocs.harness.io/',
                },
              ],
            },
            {
              label: 'University',
              position: 'right',
              type: 'dropdown',
              to: 'university',
              items: [
                {
                  label: 'Learn Harness from Experts',
                  to: 'university',
                },
                {
                  label: 'Continuous Integration',
                  to: 'university/continuous-integration',
                },
                {
                  label: 'Continuous Delivery & GitOps',
                  to: 'university/continuous-delivery',
                },
                {
                  label: 'Feature Flags',
                  to: 'university/feature-flags',
                },
                {
                  label: 'Cloud Cost Management',
                  to: 'university/cloud-cost-management',
                },
                {
                  label: 'Security Testing Orchestration',
                  to: 'university/sto',
                },
                {
                  label: 'Software Engineering Insights',
                  to: 'university/sei',
                },
                {
                  label: 'Chaos Engineering',
                  to: 'university/chaos-engineering',
                },
                {
                  label: 'Internal Developer Portal',
                  to: 'university/idp',
                },
                {
                  label: 'Infrastructure as Code Management',
                  to: 'university/iacm',
                },
                {
                  label: 'Virtual Instructor-Led Calendar',
                  to: 'https://university-registration.harness.io/calendar',
                },
                {
                  label: 'Hands-on Instructions',
                  to: 'university/instructions',
                },
                {
                  label: 'FAQs',
                  to: 'university/faqs',
                },
              ],
            },

            {
              label: 'Knowledge Base',
              position: 'right',
              type: 'dropdown',
              to: 'kb',
              items: [
                {
                  to: 'kb',
                  label: 'Knowledge Base',
                },
                {
                  to: 'kb/reference-architectures',
                  label: 'Reference Architectures',
                },
                {
                  to: 'community',
                  label: 'Community',
                },
              ],
            },
            {
              label: 'Roadmap',
              position: 'right',
              href: '/roadmap',
            },
            {
              type: 'custom-coveo-search',
              position: 'right',
            },

            {
              position: 'right',
              html: '<span class="tool" hover-tooltip="Sign into the Harness Platform (app.harness.io)" tooltip-position="bottom"><button class="button  button--nav">Sign in</button></span>',
              href: 'https://app.harness.io/auth/#/signin/?utm_source=website&utm_medium=harness-developer-hub&utm_campaign=plt-plg&utm_content=sign-in',
            },
            {
              position: 'right',
              html: '<span  class="tool" hover-tooltip="Sign up for the Harness Platform (app.harness.io)" tooltip-position="bottom"><button class=" button button--cta">Sign up</button></span>',
              href: 'https://app.harness.io/auth/#/signup/&?utm_source=website&utm_medium=harness-developer-hub&utm_campaign=plt-plg&utm_content=get-started',
            },
          ],
        },
        footer: {
          // style: "dark",
          links: [
            {
              title: 'Harness Software Delivery Platform',
              items: [
                {
                  label: 'Overview',
                  to: 'https://harness.io/products/platform',
                },
                {
                  label: 'Code Repository',
                  to: 'https://www.harness.io/products/code-repository',
                },
                {
                  label: 'Continuous Integration',
                  to: 'https://harness.io/products/continuous-integration',
                },
                {
                  label: 'Continuous Delivery & GitOps',
                  to: 'https://harness.io/products/continuous-delivery',
                },
                {
                  label: 'Infrastructure as Code Management',
                  to: 'https://www.harness.io/products/infrastructure-as-code-management',
                },
                {
                  label: 'Feature Flags',
                  to: 'https://harness.io/products/feature-flags',
                },
                {
                  label: 'Cloud Cost Management',
                  to: 'https://harness.io/products/cloud-cost',
                },
                {
                  label: 'Security Testing Orchestration',
                  to: 'https://harness.io/products/security-testing-orchestration',
                },
                {
                  label: 'Supply Chain Security',
                  to: 'https://www.harness.io/products/software-supply-chain-assurance',
                },
                {
                  label: 'Chaos Engineering',
                  to: 'https://harness.io/products/chaos-engineering',
                },
                {
                  label: 'Service Reliability Management',
                  to: 'https://harness.io/products/service-reliability-management',
                },
                {
                  label: 'Internal Developer Portal',
                  to: 'https://www.harness.io/products/internal-developer-portal',
                },
                {
                  label: 'Software Engineering Insights',
                  to: 'https://www.harness.io/products/software-engineering-insights',
                },
              ],
            },
            {
              title: 'Resources',
              items: [
                {
                  label: 'Sign up',
                  to: 'https://app.harness.io/auth/#/signup/&?utm_source=website&utm_medium=harness-developer-hub&utm_campaign=plt-plg&utm_content=get-started',
                },
                {
                  label: 'Slack',
                  to: 'https://join.slack.com/t/harnesscommunity/shared_invite/zt-2frobs97n-HwsLuNvfb6A7dEf_HKspHA',
                },
                {
                  label: 'API Reference',
                  to: 'https://apidocs.harness.io/',
                },
                {
                  label: 'YouTube',
                  to: 'https://www.youtube.com/c/Harnessio',
                },
                {
                  label: 'Developer Hub GitHub',
                  to: 'https://github.com/harness/developer-hub',
                },
                {
                  label: 'Release Notes',
                  href: '/release-notes',
                },
                {
                  label: 'Roadmap',
                  href: '/roadmap',
                },
                {
                  label: 'Feature Requests',
                  to: 'https://ideas.harness.io',
                },
                {
                  label: 'Instructor-Led Training',
                  to: '/university?ilt',
                },
                {
                  label: 'Partners',
                  to: 'https://partnertraining.harness.io/',
                },
              ],
            },
            {
              title: 'Legal',
              items: [
                {
                  label: 'Terms of Use',
                  to: 'legal/terms-of-use',
                },
                {
                  label: 'Privacy Policy',
                  to: 'https://harness.io/legal/privacy',
                },
                {
                  label: 'Accessibility',
                  to: 'legal/accessibility',
                },
                {
                  html: "<a href='javascript:void(0)' class='footer__link-item' onclick='window.OneTrust && window.OneTrust.ToggleInfoDisplay()'>Cookie Management</a>",
                  // href: "javascript: alert(33)",
                },
                {
                  label: 'Do not sell or share my personal information',
                  to: 'https://preferences.harness.io/form/opt_out?locationCode=NP-P3&privacyRequestPolicyId=2efa55cb-13a6-49c8-bab1-1a8f7efd00b7',
                },
              ],
            },
          ],
          copyright: `Copyright © ${new Date().getFullYear()} Harness Inc.`,
        },
        prism: {
          theme: themes.github,
          darkTheme: themes.vsDark,
          additionalLanguages: ['yaml', 'json', 'bash', 'python', 'git'],
        },
        colorMode: {
          defaultMode: 'light',
          // disableSwitch: true,
          respectPrefersColorScheme: false,
        },
        docs: {
          sidebar: {
            hideable: true,
            autoCollapseCategories: true,
          },
        },
        announcementBar: {
          id: 'announcementBar_cd_announcement',
          content:
            "<i class='fa-solid fa-circle-exclamation' style='color: #CF2318; margin-right: 4px;'></i><span style='color: #CF2318;'>FirstGen Harness CD will be EOL on 12/30/2023 and EOS on 3/30/2024.</span> Learn more in our <a href='/docs/continuous-delivery/get-started/upgrading/upgrade-nextgen-cd/' target='_self'>Upgrade Guide</a>. Contact  <a href='https://support.harness.io' target='_self'>Harness Support</a> with questions or concerns.",
          backgroundColor: '#FFF5ED',
          textColor: '#000000',
          isCloseable: true,
        },
        announcementBarByPath: {
          // list all pathnames in Regular expressions format
          pathRegExp: [
            // paths for md-doc pages / global patterns
            '^/docs/first-gen/continuous-delivery.*',
            '^/docs/first-gen/first-gen-quickstarts.*',
            '-fg.*',
            'fg-.*',
            'firstgen-.*',
            'first-gen.*',
            '-firstgen.*',
          ],
        },
        utmCookie: {
          prefix: 'utm_',
        },
        rss: {
          rssPath: 'release-notes/rss.xml',
          rssTitle: 'Harness Release Notes',
          copyright: 'Harness Inc.',
          rssDescription: 'Harness Release Notes',
        },
        redirectExport: {
          destPath: '_redirects',
        },
      }),
    plugins: [
      [
        path.resolve(__dirname, './plugins/docs-rss-plugin'),
        {
          id: 'release-notes',
          path: 'release-notes',
          routeBasePath: 'release-notes',
          exclude: ['**/shared/**', '**/static/**'],
          sidebarPath: require.resolve('./sidebars-release-notes.js'),
          editUrl: 'https://github.com/harness/developer-hub/tree/main',
          async sidebarItemsGenerator({
            defaultSidebarItemsGenerator,
            ...args
          }) {
            const sidebarItems = await defaultSidebarItemsGenerator(args);
            const sidebarItemsWithoutIndex =
              hideIndexFromSidebarItems(sidebarItems);
            return sidebarItemsWithoutIndex;
          },
        },
      ],
      // redirect plugin start
      [
        path.resolve(__dirname, './plugins/docsEnhanced-plugin'),

        {
          id: 'university',
          path: 'university',
          routeBasePath: 'university',
          exclude: ['**/shared/**', '**/static/**'],
          sidebarPath: require.resolve('./sidebars-university.js'),
          editUrl: 'https://github.com/harness/developer-hub/tree/main',
          // ... other options
        },
      ],
      [
        path.resolve(__dirname, './plugins/docsEnhanced-plugin'),

        {
          id: 'community',
          path: 'community',
          routeBasePath: 'community',
          exclude: ['**/shared/**', '**/static/**'],
          sidebarPath: require.resolve('./sidebars-community.js'),
          editUrl: 'https://github.com/harness/developer-hub/tree/main',
          // ... other options
        },
      ],
      [
        path.resolve(__dirname, './plugins/docsEnhanced-plugin'),
        {
          id: 'kb',
          path: 'kb',
          routeBasePath: 'kb',
          exclude: ['**/shared/**', '**/static/**'],
          sidebarPath: require.resolve('./sidebars-kb.js'),
          editUrl: 'https://github.com/harness/developer-hub/tree/main',
          // ... other options
        },
      ],

      [
        path.resolve(__dirname, './plugins/docsEnhanced-plugin'),
        {
          id: 'docs1',
          path: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/harness/developer-hub/tree/main', // /tree/main/packages/create-docusaurus/templates/shared/
          // include: ["tutorials/**/*.{md, mdx}", "docs/**/*.{md, mdx}"],
          exclude: ['**/shared/**', '**/static/**'],
          routeBasePath: 'docs', //CHANGE HERE
          remarkPlugins: [
            [
              (await import('remark-math')).default,
              {
                strict: false,
              },
            ],
          ],
          rehypePlugins: [
            [
              (await import('rehype-katex')).default,
              {
                strict: false,
              },
            ],
          ],
        },
      ],

      [
        path.resolve(__dirname, './plugins/docsEnhanced-plugin'),
        {
          id: 'roadmap',
          path: 'roadmap',
          sidebarPath: false,
          editUrl: 'https://github.com/harness/developer-hub/tree/main', // /tree/main/packages/create-docusaurus/templates/shared/
          // include: ["tutorials/**/*.{md, mdx}", "docs/**/*.{md, mdx}"],
          exclude: ['**/shared/**', '**/static/**'],
          routeBasePath: 'roadmap', //CHANGE HERE
        },
      ],

      'docusaurus-plugin-sass',
      path.join(__dirname, '/plugins/utmcookie-plugin'),
      path.join(__dirname, '/plugins/feedback-plugin'),
      path.join(__dirname, '/plugins/focusOnAnchor-plugin'),
    ],
    clientModules: [
      path.join(__dirname, '/client_module/searchBar'),
      path.join(__dirname, '/client_module/iframeEmbed'),
      path.join(__dirname, '/client_module/chatbot'),
    ],
    stylesheets: [
      {
        href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
        type: 'text/css',
        integrity:
          'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
        crossorigin: 'anonymous',
      },
    ],
  };
}

module.exports = config;