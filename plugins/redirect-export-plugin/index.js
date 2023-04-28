const fs = require("fs-extra");
const path = require("path");

// (context, options)
async function redirectExportPlugin(context) {
  const { siteConfig } = context;
  const { themeConfig } = siteConfig; // , url: siteUrl, baseUrl, title, favicon
  const { redirectExport } = themeConfig || {};

  if (!redirectExport) {
    throw new Error(
      `You need to specify 'redirectExport' object in 'themeConfig' with 'destPath' field in it`
    );
  }

  const { destPath } = redirectExport; // sourcePath,

  if (!destPath) {
    throw new Error(
      "You specified the `redirectExport` object in `themeConfig` but the `destPath` field was missing."
    );
  }

  return {
    async postBuild(params) {
      const { outDir } = params; // , content, siteConfig

      if (!outDir) {
        return null;
      }

      const clientRedirects = require("../../client-redirects");
      const { redirects } = clientRedirects;
      let strRedirects = "";
      if (redirects && Array.isArray(redirects) && redirects.length > 0) {
        redirects.forEach((redi) => {
          const { from, to } = redi;
          if (from && to) {
            strRedirects += `${from} ${to}\r\n`;
          }
        });
      }

      fs.outputFile(path.join(outDir, destPath), strRedirects);
    },
  };
}

module.exports = {
  default: redirectExportPlugin,
};
