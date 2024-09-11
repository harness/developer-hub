const fs = require("fs-extra");
const path = require("path");
const docsPluginExports = require("@docusaurus/plugin-content-docs");
const docsPlugin = docsPluginExports.default;

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
      "You specified the `redirectExport` object in `themeConfig` but the `destPath` field was missing."
    );
  }

  return {
    ...docsPluginInstance,
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
      const outPutPath = path.join(outDir, destPath);

      //Will need to change the filename variable when we change the file
      const clientRedirectNetlifyPath = path.resolve(
        __dirname,
        "../../archive/redirects/client-redirect-netlify-format-aug-23-2023.txt"
      );

      const exists = fs.existsSync(outPutPath);
      // const exists2 = fs.existsSync(clientRedirectNetlifyPath);
      // console.log("client reditect path ",  clientRedirectNetlifyPath);

      // fs.readFile(clientRedirectNetlifyPath, "utf8", (err, data) => {
      //   if (err) {
      //     console.log(err.message);
      //   } else {
      //     console.log(data);
      //   }
      // });
      // console.log(new Date(), "fileExists?...", outPutPath, exists);
      let strRedirects = "";
      const docs = content.loadedVersions[0].docs;

      docs.map((post) => {
        const {
          // id: metadataId,
          // metadata: {
          // title: metadataTitle,
          permalink,
          frontMatter,
          // description,
          // lastUpdatedAt,
          source,
          // },
        } = post;
        const {
          //  id,
          title,
          //  data,
          redirect_from,
        } = frontMatter;

        // const dispId = id || metadataId;
        // const dispTitle = title || metadataTitle;
        // const dispDate = data || lastUpdatedAt || "";

        if (redirect_from) {
          if (Array.isArray(redirect_from)) {
            redirect_from.forEach((al) => {
              strRedirects += `# MD Path : ${source} \r\n${al} ${permalink}\r\n\r\n`;
            });
          } else {
            strRedirects += `# MD Path : ${source} \r\n${redirect_from} ${permalink}\r\n\r\n`;
          }
        }

        return title;
      });

      //Historic and User Generated Redirects, appeneding to _server-redirects
      if (!exists) {
        const serverRedirectsPath = path.resolve(
          __dirname,
          "../../_server-redirects"
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
            "\r\n# client-redirect-netlify-format-aug-23-2023.txt appeneded from Archives: \r\n\r\n"
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
