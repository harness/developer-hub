const crypto = require('crypto');
const fs = require('fs-extra');
const path = require('path');
const { posixPath } = require('@docusaurus/utils');
const docsPluginExports = require('@docusaurus/plugin-content-docs');
const docsPlugin = docsPluginExports.default;

/**
 * Netlify deploy (and static HTML output) cannot use paths containing `#` or `?`.
 * HDH-519 registers each `redirect_from` as a real route for SPA/local parity; without
 * normalization, fragment/query literals in YAML would become output filenames and break deploy.
 * Frontmatter may keep fragments for author clarity — only routing and `_redirects` use this.
 */
function normalizeLegacyRedirectPath(raw) {
  let p = raw.trim();
  if (!p) {
    return '';
  }
  p = p.split('#')[0].split('?')[0].trim();
  if (!p) {
    return '';
  }
  if (!p.startsWith('/')) {
    p = `/${p}`;
  }
  p = p.replace(/\/+$/, '') || '/';
  return p;
}

/** Flatten redirect_from (handles YAML typos like nested arrays or empty list items). */
function legacyRedirectPaths(redirectFrom) {
  if (redirectFrom == null) {
    return [];
  }
  const top = Array.isArray(redirectFrom) ? redirectFrom : [redirectFrom];
  const out = [];
  for (const item of top) {
    if (typeof item === 'string') {
      const t = normalizeLegacyRedirectPath(item);
      if (t) {
        out.push(t);
      }
    } else if (Array.isArray(item)) {
      for (const sub of item) {
        if (typeof sub === 'string') {
          const t = normalizeLegacyRedirectPath(sub);
          if (t) {
            out.push(t);
          }
        }
      }
    }
  }
  return out;
}

async function docsPluginEnhanced(context, options) {
  const docsPluginInstance = await docsPlugin(context, options);

  const { siteConfig } = context;
  const { themeConfig } = siteConfig; // , title, favicon, url: siteUrl, baseUrl
  const { redirectExport } = themeConfig || {};

  if (!redirectExport) {
    throw new Error(
      `You need to specify 'redirectExport' object in 'themeConfig' with 'destPath' field in it`
    );
  }

  const { destPath } = redirectExport; // sourcePath,

  if (!destPath) {
    throw new Error(
      'You specified the `redirectExport` object in `themeConfig` but the `destPath` field was missing.'
    );
  }

  const originalContentLoaded = docsPluginInstance.contentLoaded;

  return {
    ...docsPluginInstance,
    async contentLoaded(params) {
      if (typeof originalContentLoaded === 'function') {
        await originalContentLoaded(params);
      }

      const { content, actions } = params;
      if (!content?.loadedVersions?.length) {
        return;
      }

      const redirectComponent = path.join(
        context.siteDir,
        'src/components/DocPermalinkRedirect.tsx'
      );

      /** Same redirect_from on multiple docs would collide if prop JSON reused path+component hash */
      const registeredRedirectFrom = new Set();

      const permalinkSet = new Set();
      for (const version of content.loadedVersions) {
        for (const doc of version.docs) {
          if (typeof doc.permalink === 'string' && doc.permalink) {
            permalinkSet.add(doc.permalink);
          }
        }
      }

      for (const version of content.loadedVersions) {
        for (const doc of version.docs) {
          const target = doc.permalink;
          if (typeof target !== 'string' || !target) {
            continue;
          }
          const sources = legacyRedirectPaths(doc.frontMatter?.redirect_from);
          for (const fromPath of sources) {
            if (
              fromPath === target ||
              registeredRedirectFrom.has(fromPath) ||
              permalinkSet.has(fromPath)
            ) {
              continue;
            }
            registeredRedirectFrom.add(fromPath);
            const propName = `legacy-redirect-${crypto.createHash('sha256').update(`${fromPath}\0${target}`).digest('hex')}.json`;
            const propsFsPath = await actions.createData(propName, JSON.stringify({ to: target }));
            const __props = `@generated/${posixPath(
              path.relative(context.generatedFilesDir, propsFsPath)
            )}`;
            actions.addRoute({
              path: fromPath,
              component: redirectComponent,
              exact: true,
              modules: { __props },
            });
          }
        }
      }
    },
    async postBuild(params) {
      const { outDir, content } = params; //, siteConfig

      if (
        !content ||
        !content.loadedVersions ||
        content.loadedVersions.length < 1 ||
        content.loadedVersions[0].docs.length < 1
      ) {
        return null;
      }

      const docs = content.loadedVersions[0].docs;

      const outPutPath = path.join(outDir, destPath);

      //Will need to change the filename variable when we change the file
      const clientRedirectNetlifyPath = path.resolve(
        __dirname,
        '../../archive/redirects/client-redirect-netlify-format-aug-23-2023.txt'
      );

      const exists = fs.existsSync(outPutPath);
      let strRedirects = '';
      docs.map((post) => {
        const { permalink, frontMatter, source } = post;
        const { title, redirect_from } = frontMatter;

        const htmlFilePath = path.join(outDir, permalink, 'index.html');
      
        if (fs.existsSync(htmlFilePath)) {
          let htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
          const canonicalTag = `<link rel="canonical" href="${
            frontMatter.canonical_url || "https://developer.harness.io"+permalink
          }" />`;
          htmlContent = htmlContent.replace(
            /<\/head>/i,
            `  ${canonicalTag}\n</head>`
          );

          fs.writeFileSync(htmlFilePath, htmlContent, 'utf-8');
        }

        const redirectPaths = legacyRedirectPaths(redirect_from);
        redirectPaths.forEach((al) => {
          strRedirects += `# MD Path : ${source} \r\n${al} ${permalink}\r\n\r\n`;
        });

        return title;
      });

      //Historic and User Generated Redirects, appeneding to _server-redirects
      if (!exists) {
        const serverRedirectsPath = path.resolve(
          __dirname,
          '../../_server-redirects'
        );
        fs.copySync(serverRedirectsPath, outPutPath);
        fs.appendFileSync(outPutPath, strRedirects);
        // if we need to append on the first line
        // fs.appendFileSync(
        //   outPutPath,
        //   "\r\n# client-redirect-netlify-format-aug-23-2023.txt appeneded from Archives \r\n\r\n"
        // );
        //Historic Client Re-riects
        fs.readFile(clientRedirectNetlifyPath, function (err, data) {
          if (err) throw err;
          fs.appendFileSync(
            outPutPath,
            '\r\n# client-redirect-netlify-format-aug-23-2023.txt appeneded from Archives: \r\n\r\n'
          );
          fs.appendFileSync(outPutPath, data, function (err) {
            if (err) throw err;
          });
        });
      } else {
        fs.appendFileSync(outPutPath, strRedirects);
      }
    },
  };
}

module.exports = {
  ...docsPluginExports,
  default: docsPluginEnhanced,
};
