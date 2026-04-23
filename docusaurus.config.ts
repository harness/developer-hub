import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { themes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { repoPathToCanonical } from './client-modules/repoPathToCanonical.js';

const BASE_URL = process.env.BASE_URL || '/';

const docsDir = path.join(__dirname, 'docs');

/** Normalize redirect `from` paths so `/docs/foo/` and `/docs/foo` dedupe (same on-disk index.html). */
function normalizeRedirectFromPath(u: string): string {
  const pathOnly = (u.startsWith('/') ? u : `/${u}`).split('#')[0].split('?')[0];
  const noTrail = pathOnly.replace(/\/+$/, '');
  return noTrail || '/';
}

type RedirectFromAccumulator = { docPath: string; dedupedFrom: string[] };

/**
 * Single traversal: one read + matter parse per doc file. Collects all doc URL variants for
 * `redirect_from` validation and defers redirect map assembly until the full existing-doc set is known.
 */
function scanDocsForPathsAndRedirects(): {
  existingDocPaths: Set<string>;
  redirectEntries: RedirectFromAccumulator[];
} {
  const existingDocPaths = new Set<string>();
  const redirectEntries: RedirectFromAccumulator[] = [];

  function walk(dir: string, relativePrefix: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const rel = relativePrefix ? `${relativePrefix}/${e.name}` : e.name;
      if (e.isDirectory()) {
        walk(path.join(dir, e.name), rel);
      } else if (e.isFile() && /\.(md|mdx)$/i.test(e.name)) {
        const filePath = path.join(dir, e.name);
        const raw = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(raw);
        const docId = rel.replace(/\.(md|mdx)$/i, '');
        const slug = data?.slug;
        const pathId = typeof slug === 'string' ? slug.replace(/^\//, '') : docId;
        const docPath = `/docs/${pathId}`;
        existingDocPaths.add(docPath);
        existingDocPaths.add(docPath.replace(/\/$/, '') || '/');
        if (!docPath.endsWith('/')) existingDocPaths.add(docPath + '/');
        if (/\/index$/i.test(docPath)) {
          const withoutIndex = docPath.replace(/\/index$/i, '');
          existingDocPaths.add(withoutIndex);
          existingDocPaths.add(withoutIndex + '/');
        }

        const redirectFrom = data?.redirect_from;
        if (redirectFrom) {
          const list = Array.isArray(redirectFrom) ? redirectFrom : [redirectFrom];
          const normalized = list
            .filter((u): u is string => typeof u === 'string')
            .map((u) => {
              const pathOnly = (u.startsWith('/') ? u : `/${u}`).split('#')[0].split('?')[0];
              return normalizeRedirectFromPath(pathOnly || '/');
            });
          const seenPath = new Set<string>();
          const deduped = normalized.filter((p) => {
            const key = (p || '/').replace(/\/$/, '') || '/';
            if (seenPath.has(key)) return false;
            seenPath.add(key);
            return true;
          });
          redirectEntries.push({ docPath, dedupedFrom: deduped });
        }
      }
    }
  }
  walk(docsDir, '');
  return { existingDocPaths, redirectEntries };
}

function docPathIsExistingDoc(canonicalPath: string): boolean {
  const n = normalizeRedirectFromPath(canonicalPath);
  if (existingDocPathsSet.has(n)) return true;
  if (n !== '/' && existingDocPathsSet.has(`${n}/`)) return true;
  return false;
}

/** Build a map from doc path (/docs/...) to redirect_from pathnames so plugin-client-redirects creates redirect pages and the broken link checker sees those URLs as valid. Excludes any redirect_from that matches an existing doc path (avoids "redirect plugin is not supposed to override existing files"). */
function buildRedirectFromMap(
  existingDocPaths: Set<string>,
  redirectEntries: RedirectFromAccumulator[],
): Map<string, string[]> {
  const rawMap = new Map<string, string[]>();
  for (const { docPath, dedupedFrom: deduped } of redirectEntries) {
    const fromPaths = deduped.filter(
      (p) =>
        p &&
        p !== docPath &&
        !existingDocPaths.has(p) &&
        !existingDocPaths.has(p.replace(/\/$/, '') || '/') &&
        !existingDocPaths.has(p.endsWith('/') ? p : p + '/'),
    );
    const existing = rawMap.get(docPath) ?? [];
    rawMap.set(docPath, [...new Set([...existing, ...fromPaths])]);
  }
  // Dedupe "from" across docs: each pathname can only redirect to one destination (first doc wins).
  const assignedFrom = new Map<string, string>();
  for (const [docPath, fromList] of rawMap) {
    for (const fromPath of fromList) {
      if (!assignedFrom.has(fromPath)) assignedFrom.set(fromPath, docPath);
    }
  }
  const map = new Map<string, string[]>();
  for (const [docPath, fromList] of rawMap) {
    const owned = fromList.filter((fromPath) => assignedFrom.get(fromPath) === docPath);
    if (owned.length) map.set(docPath, owned);
  }
  return map;
}

const { existingDocPaths: existingDocPathsSet, redirectEntries } = scanDocsForPathsAndRedirects();
const redirectFromMap = buildRedirectFromMap(existingDocPathsSet, redirectEntries);

function hideIndexFromSidebarItems(items) {
  const result = items.filter((item) => {
    return !(item.type === 'doc' && item.id === 'index');
  });
  return result;
}

function hideContentDocsFromSidebarItems(items: unknown[]): unknown[] {
  return items
    .map((item: { type?: string; id?: string; items?: unknown[] }) => {
      if (item.type === 'category' && Array.isArray(item.items)) {
        return { ...item, items: hideContentDocsFromSidebarItems(item.items) };
      }
      return item;
    })
    .filter((item: { type?: string; id?: string; items?: unknown[] }) => {
      if (item.type === 'doc' && typeof item.id === 'string' && item.id.includes('/content/')) {
        return false;
      }
      // Remove categories that end up with no items (e.g. platform/automation/cli/content/example when content docs are hidden)
      if (item.type === 'category' && Array.isArray(item.items) && item.items.length === 0) {
        return false;
      }
      return true;
    });
}

const config: Config = {
  title: 'Harness Developer Hub',
  tagline:
    'Learn intelligent software delivery skills at your own pace and in one place. Step-by-step tutorials, videos, and reference docs to help you create and deliver software.',
  url: 'https://developer.harness.io',
  baseUrl: BASE_URL,
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'ignore',
  favicon: 'img/hdh_fav_icon_grey.ico',
  customFields: {
    SEGMENT_API_KEY: process.env.SEGMENT_API_KEY,
    HARNESS_GENERIC_READ_ONLY_KEY: process.env.HARNESS_GENERIC_READ_ONLY_KEY,
    /** Separate Kapa Website Widget integration: enable only FME doc sources in app.kapa.ai */
    KAPA_FME_WEBSITE_ID: process.env.KAPA_FME_WEBSITE_ID ?? '',
  },
  scripts: [
    /* Navbar Ask AI — keep in sync with `static/fme-kapa-embed.html` (FME iframe) except FME-only fields. */
    {
      src: 'https://widget.kapa.ai/kapa-widget.bundle.js',
      async: true,
      'data-website-id': 'db287d54-3525-4674-9d83-a0cbe35024d2',
      'data-source-group-ids-include': '0ead6082-00af-41e8-959a-b003b116c599',
      'data-project-name': 'Harness',
      'data-project-color': '#1D1D1B',
      'data-search-mode-enabled': 'false',
      'data-search-mode-default': 'false',
      'data-modal-open-on-command-k': 'true',
      'data-modal-override-open-selector-ask-ai': '.navbar__search_kapa',
      'data-button-hide': 'true',
      'data-project-logo': 'https://developer.harness.io/img/icon_harness.svg',
      'data-mcp-enabled': 'true',
      'data-mcp-server-url': 'https://hdh.mcp.kapa.ai',
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
        // Top row: Ask AI left, then Search, then action buttons
        {
          type: 'custom-kapa-search',
          position: 'right',
        },
        {
          type: 'custom-coveo-search',
          position: 'right',
        },
        {
          label: 'Contact us',
          position: 'right',
          href: 'https://www.harness.io/company/contact-sales',
        },
        {
          type: 'custom-auth-buttons',
          position: 'right',
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
              label: 'Glossary',
              to: '/glossary',
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
      additionalLanguages: ['yaml', 'json', 'bash', 'python', 'git', 'java', 'powershell', 'dart'],
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
        // content/ included so those docs are built and indexable by search; hidden from sidebar via sidebarItemsGenerator
        exclude: ['**/shared/**', '**/static/**'],
        routeBasePath: 'docs', //CHANGE HERE
        showLastUpdateTime: true,
        async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
          const sidebarItems = await defaultSidebarItemsGenerator(args);
          return hideContentDocsFromSidebarItems(sidebarItems);
        },
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

    // Redirect content/ doc URLs to their parent DMS page + hash (so links/search land on the right tab)
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: '/docs/infra-as-code-management/content/get-started/opentofu-quickstart',
            to: '/docs/infra-as-code-management/get-started#opentofu',
          },
          {
            from: '/docs/infra-as-code-management/content/get-started/terraform-quickstart',
            to: '/docs/infra-as-code-management/get-started#terraform',
          },
          {
            from: '/docs/infra-as-code-management/content/get-started/terragrunt-quickstart',
            to: '/docs/infra-as-code-management/get-started#terragrunt',
          },
        ],
        // Register redirect_from frontmatter URLs and canonical→repo redirects. Only return redirect_from when existingPath has no trailing slash so the plugin doesn't create duplicate "from" entries (same from → to vs to/).
        createRedirects(existingPath) {
          const pathNorm = existingPath.replace(/\/$/, '') || '/';
          const fromContent =
            !existingPath.endsWith('/')
              ? (redirectFromMap.get(pathNorm) ?? redirectFromMap.get(existingPath))
              : undefined;
          const combined: string[] = [...(fromContent ?? [])];

          const canonical = repoPathToCanonical(pathNorm);
          if (canonical && canonical !== pathNorm && !docPathIsExistingDoc(canonical)) {
            combined.push(canonical);
          }

          const seen = new Set<string>();
          const out: string[] = [];
          for (const rawFrom of combined) {
            const n = normalizeRedirectFromPath(rawFrom);
            if (n === pathNorm) continue;
            if (docPathIsExistingDoc(n)) continue;
            if (seen.has(n)) continue;
            seen.add(n);
            out.push(n);
          }
          return out.length ? out : undefined;
        },
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
    path.join(__dirname, '/client-modules/dmsContentRedirect'),
    // path.join(__dirname, '/client-modules/chatbot'),
  ],
  headTags: [
    // Queue `Kapa('open', …)` until `kapa-widget.bundle.js` finishes loading — same pattern as
    // https://docs.kapa.ai/integrations/website-widget/javascript-api/preinitialize
    {
      tagName: 'script',
      attributes: {},
      innerHTML:
        '(function(){var k=window.Kapa;if(!k){var i=function(){i.c(arguments);};i.q=[];i.c=function(a){i.q.push(a);};window.Kapa=i;}})();',
    },
    // Pre-establish connections to Kapa endpoints so the TCP/TLS handshake is
    // already done by the time the widget loads.
    { tagName: 'link', attributes: { rel: 'preconnect', href: 'https://widget.kapa.ai' } },
    { tagName: 'link', attributes: { rel: 'preconnect', href: 'https://api.kapa.ai' } },
    { tagName: 'link', attributes: { rel: 'dns-prefetch', href: 'https://widget.kapa.ai' } },
    { tagName: 'link', attributes: { rel: 'dns-prefetch', href: 'https://api.kapa.ai' } },
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
