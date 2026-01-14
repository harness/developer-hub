import path from 'path';
import { themes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const BASE_URL = process.env.BASE_URL || '/';
function hideIndexFromSidebarItems(items) {
  const result = items.filter((item) => {
    return !(item.type === 'doc' && item.id === 'index');
  });
  return result;
}

const config: Config = {
  title: 'Harness Developer Hub',
  tagline:
    'Learn intelligent software delivery skills at your own pace and in once place. Step-by-step tutorials, videos, and reference docs to help you create and deliver software.',
  url: 'https://developer.harness.io',
  baseUrl: BASE_URL,
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'ignore',
  favicon: 'img/hdh_fav_icon_grey.ico',
  customFields: {
    SEGMENT_API_KEY: process.env.SEGMENT_API_KEY,
    HARNESS_GENERIC_READ_ONLY_KEY: process.env.HARNESS_GENERIC_READ_ONLY_KEY,
  },
  scripts: [
    {
      src: 'https://widget.kapa.ai/kapa-widget.bundle.js',
      async: true,
      'data-website-id': 'db287d54-3525-4674-9d83-a0cbe35024d2',
      'data-project-name': 'Harness',
      'data-project-color': '#1D1D1B',
      'data-search-mode-enabled': 'false',
      'data-search-mode-default': 'false',
      'data-modal-open-on-command-k': 'true',
      'data-modal-override-open-selector-ask-ai': '.navbar__search_kapa',
      'data-button-hide': 'true',
      'data-project-logo': 'https://developer.harness.io/img/icon_harness.svg',
      'data-modal-disclaimer':
        'This AI assistant answers Harness questions using your [documentation](https://developer.harness.io/docs/), [API reference](https://apidocs.harness.io/) and [YouTube playlist](https://www.youtube.com/@harnesscommunity/playlists).',
      'data-modal-example-questions':
        'How do I update Harness delegate?,Can I save my filter settings?',
    },
  ],
  markdown: {
    //Mermaid Diagram Functionality
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
      onBrokenMarkdownImages: 'warn',
    },
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

  future: {
    v4: true,
    experimental_faster: true,
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        sitemap: {
          // changefreq: 'weekly',
          // priority: 0.5,
          // ignorePatterns: [
          // ],
          // filename: 'sitemap.xml',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'), // we could also use scss here
        },
        googleTagManager: {
          containerId: 'GTM-MJB7HPB',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
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
        // Top row: only search and action buttons
        {
          type: 'custom-coveo-search',
          position: 'right',
        },
        {
          type: 'custom-kapa-search',
          position: 'right',
        },
        {
          label: 'Contact us',
          position: 'right',
          href: 'https://www.harness.io/company/contact-sales',
        },
        {
          position: 'right',
          html: '<span class="tool" hover-tooltip="Sign into the Harness Platform (app.harness.io)" tooltip-position="bottom"><button class="button button--nav">Sign in</button></span>',
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
              label: 'Feature Management & Experimentation',
              to: 'https://www.harness.io/products/feature-management-experimentation',
            },
            {
              label: 'Cloud Cost Management',
              to: 'https://harness.io/products/cloud-cost',
            },
            {
              label: 'API & Application Discovery',
              to: 'https://developer.harness.io/docs/appsec-discovery',
            },
            {
              label: 'Application & API Runtime Protection',
              to: 'https://developer.harness.io/docs/appsec-runtime-protection',
            },
            {
              label: 'Application & API Security Testing',
              to: 'https://developer.harness.io/docs/appsec-security-testing',
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
              label: 'SAST and SCA',
              to: 'https://www.harness.io/products/software-supply-chain-assurance',
            },
            {
              label: 'Chaos Engineering',
              to: 'https://harness.io/products/chaos-engineering',
            },
            {
              label: 'AI SRE',
              to: 'https://harness.io/products/ai-sre',
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
            {
              label: 'AI Test Automation',
              to: 'https://www.harness.io/products/ai-test-automation',
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
              to: 'https://join-community-slack.harness.io/',
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
              label: 'Feature Flags GA Timeline',
              to: '/release-notes/feature-flags-ga-timeline',
            },
            {
              label: 'University',
              to: '/university',
            },
            {
              label: 'Instructor-Led Training',
              to: '/university?ilt',
            },
            {
              label: 'Partners',
              to: 'https://www.harness.io/partners',
            },
            {
              label: 'Style Guide',
              to: '/docs/hdh/style-guide',
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
              to: 'https://harness-privacy.relyance.ai/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Harness Inc.`,
    },
    prism: {
      theme: themes.github,
      darkTheme: themes.vsDark,
      additionalLanguages: ['yaml', 'json', 'bash', 'python', 'git', 'java', 'powershell'],
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
  } satisfies Preset.ThemeConfig,
  plugins: [
    'docusaurus-plugin-sass',
    [
      path.resolve(__dirname, './plugins/docs-rss-plugin'),
      {
        id: 'release-notes',
        path: 'release-notes',
        routeBasePath: 'release-notes',
        exclude: ['**/shared/**', '**/static/**', '**/content/**'],
        sidebarPath: require.resolve('./sidebars-release-notes.js'),
        editUrl: 'https://github.com/harness/developer-hub/tree/main',
        async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
          const sidebarItems = await defaultSidebarItemsGenerator(args);
          const sidebarItemsWithoutIndex = hideIndexFromSidebarItems(sidebarItems);
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
        showLastUpdateTime: true,
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
        exclude: ['**/shared/**', '**/static/**', '**/content/**'],
        routeBasePath: 'docs', //CHANGE HERE
        showLastUpdateTime: true,
        remarkPlugins: [
          [
            remarkMath,
            {
              strict: false,
            },
          ],
        ],
        rehypePlugins: [
          [
            rehypeKatex,
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
        showLastUpdateTime: true,
      },
    ],

    path.join(__dirname, '/plugins/utmcookie-plugin'),
    path.join(__dirname, '/plugins/focusOnAnchor-plugin'),
    path.join(__dirname, '/plugins/feedback-plugin'),
    path.join(__dirname, '/plugins/feature-flags-rss-plugin'),
  ],
  clientModules: [
    path.join(__dirname, '/client-modules/searchBar'),
    path.join(__dirname, '/client-modules/iframeEmbed'),
    // path.join(__dirname, '/client-modules/chatbot'),
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
};

export default config;
