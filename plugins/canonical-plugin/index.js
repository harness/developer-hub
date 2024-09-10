const fs = require('fs-extra');
const path = require('path');
const docsPluginExports = require('@docusaurus/plugin-content-docs');

const docsPlugin = docsPluginExports.default;

async function docsPluginEnhanced(context, options) {
  const docsPluginInstance = await docsPlugin(context, options);

  return {
    ...docsPluginInstance,
    async postBuild(params) {
      const { outDir, content } = params;

      if (
        !content ||
        !content.loadedVersions ||
        content.loadedVersions.length < 1 ||
        content.loadedVersions[0].docs.length < 1
      ) {
        return null;
      }

      const docs = content.loadedVersions[0].docs;

      docs.map((post) => {
        const { id, frontMatter, permalink } = post;

        if (
          id ==
            'chaos-engineering/chaos-faults/cloud-foundry/cf-app-network-latency' &&
          frontMatter.canonical
        ) {
          const htmlFilePath = path.join(outDir, permalink, 'index.html');
          // console.log(htmlFilePath);
          if (fs.existsSync(htmlFilePath)) {
            let htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');

            const canonicalTagRegex =
              /<link\s+data-rh="true"\s+rel="canonical"\s+href="([^"]+)"/;

            htmlContent = htmlContent.replace(
              canonicalTagRegex,
              `<link data-rh="true" rel="canonical" href="${frontMatter.canonical}" />`
            );

            fs.writeFileSync(htmlFilePath, htmlContent, 'utf-8');
          }
        }
      });
    },
  };
}

module.exports = {
  ...docsPluginExports,
  default: docsPluginEnhanced,
};
