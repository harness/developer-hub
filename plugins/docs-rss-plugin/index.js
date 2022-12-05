const fs = require("fs-extra");
const path = require("path");
// import { LoadContext, Plugin } from "@docusaurus/types";
const docsPluginExports = require("@docusaurus/plugin-content-docs");

const { load: cheerioLoad } = require("cheerio");
const { normalizeUrl, readOutputHTMLFile } = require("@docusaurus/utils");

const { Feed } = require("feed");

const docsPlugin = docsPluginExports.default;

async function docsPluginEnhanced(context, options) {
  const docsPluginInstance = await docsPlugin(context, options);

  const { siteConfig } = context;
  const { themeConfig, url: siteUrl, baseUrl, title, favicon } = siteConfig;
  const { rss } = themeConfig || {};

  if (!rss) {
    throw new Error(
      `You need to specify 'rss' object in 'themeConfig' with 'rssPath' field in it`
    );
  }

  const { rssPath, rssTitle, copyright, rssDescription } = rss;

  if (!rssPath) {
    throw new Error(
      "You specified the `rss` object in `themeConfig` but the `rssPath` field was missing."
    );
  }

  return {
    ...docsPluginInstance,

    /*
    async contentLoaded({ content, actions }) {
      // Create default plugin pages
      await docsPluginInstance.contentLoaded({ content, actions });

      // Create your additional pages
      console.log("...contentLoaded...", content);
      // const {blogPosts, blogTags} = content;
    },
    */

    async postBuild(params) {
      const { outDir, content, siteConfig } = params;

      if (
        !content ||
        !content.loadedVersions ||
        content.loadedVersions.length < 1 ||
        content.loadedVersions[0].docs.length < 1
      ) {
        return null;
      }
      const { routeBasePath } = options;
      const docsBaseUrl = normalizeUrl([siteUrl, baseUrl, routeBasePath]);

      const docs = content.loadedVersions[0].docs;

      const feed = new Feed({
        id: docsBaseUrl,
        title: rssTitle ?? `${title} Release Notes`,
        // updated,
        // language: feedOptions.language ?? locale,
        link: docsBaseUrl,
        description: rssDescription ?? `${siteConfig.title} Release Notes`,
        favicon: favicon
          ? normalizeUrl([siteUrl, baseUrl, favicon])
          : undefined,
        copyright: copyright,
      });

      function toFeedAuthor(author) {
        return { name: author.name, link: author.url, email: author.email };
      }

      await Promise.all(
        docs.map(async (post) => {
          const {
            id,
            // metadata: {
            title: metadataTitle,
            permalink,
            frontMatter: { date, authors = "Harness", tags },
            description,
            // },
          } = post;

          const content = await readOutputHTMLFile(
            permalink.replace(siteConfig.baseUrl, ""),
            outDir,
            siteConfig.trailingSlash
          );
          const $ = cheerioLoad(content);

          const feedItem = {
            title: metadataTitle,
            id,
            link: normalizeUrl([siteUrl, permalink]),
            date: new Date(date),
            description,
            // Atom feed demands the "term", while other feeds use "name"
            category: tags
              ? (Array.isArray(tags) ? tags : []).map((tag) =>
                  tag
                    ? {
                        name: tag,
                        term: tag,
                      }
                    : null
                )
              : null,
            content: $(".theme-doc-markdown").html() || null,
          };

          // json1() method takes the first item of authors array
          // it causes an error when authors array is empty
          const feedItemAuthors = (
            Array.isArray(authors) ? authors : [authors]
          ).map(toFeedAuthor);
          if (feedItemAuthors.length > 0) {
            feedItem.author = feedItemAuthors;
          }

          return feedItem;
        })
      ).then((items) => items.forEach(feed.addItem));

      fs.outputFile(path.join(outDir, rssPath), feed.rss2());
    },
  };
}

module.exports = {
  ...docsPluginExports,
  default: docsPluginEnhanced,
};
