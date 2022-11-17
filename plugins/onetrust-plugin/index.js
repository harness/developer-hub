module.exports = function (context) {
  const { siteConfig } = context;
  const { themeConfig } = siteConfig;
  const { oneTrust } = themeConfig || {};

  if (!oneTrust) {
    throw new Error(
      `You need to specify 'oneTrust' object in 'themeConfig' with 'dataDomainScript' field in it`
    );
  }

  const { dataDomainScript } = oneTrust;

  if (!dataDomainScript) {
    throw new Error(
      "You specified the `oneTrust` object in `themeConfig` but the `dataDomainScript` field was missing."
    );
  }

  const isProd = process.env.NODE_ENV === "production";

  return {
    name: "oneTrust",

    injectHtmlTags() {
      if (!isProd) {
        return {};
      }
      return {
        headTags: [
          {
            tagName: "script",
            attributes: {
              async: true,
              src: "https://cdn.cookielaw.org/scripttemplates/otSDKStub.js",
              type: "text/javascript",
              charset: "UTF-8",
              ["data-domain-script"]: dataDomainScript,
            },
          },
          {
            tagName: "script",
            innerHTML: `function OptanonWrapper() { }`,
          },
        ],
      };
    },
  };
};
