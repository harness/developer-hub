module.exports = function (context) {
  const { siteConfig } = context;
  const { themeConfig } = siteConfig;
  const { munity } = themeConfig || {};

  if (!munity) {
    throw new Error(
      `You need to specify 'munity' object in 'themeConfig' with 'clientId' field in it`
    );
  }

  const { clientId } = munity;

  if (!clientId) {
    throw new Error(
      "You specified the `munity` object in `themeConfig` but the `clientId` field was missing."
    );
  }

  const isProd = process.env.NODE_ENV === "production";

  return {
    name: "munity-plugin",

    injectHtmlTags() {
      if (!isProd) {
        return {};
      }
      return {
        headTags: [
          {
            tagName: "script",
            attributes: {
              // async: false,
              src: `https://client-registry.mutinycdn.com/personalize/client/${clientId}.js`,
              charset: "utf-8",
              "data-cfasync": "false",
            },
          },
          {
            tagName: "script",
            innerHTML: `
            (function(){var a=window.mutiny=window.mutiny||{};if(!window.mutiny.client){a.client={_queue:{}};var b=["identify","trackConversion"];var c=[].concat(b,["defaultOptOut","optOut","optIn"]);var d=function factory(c){return function(){for(var d=arguments.length,e=new Array(d),f=0;f<d;f++){e[f]=arguments[f]}a.client._queue[c]=a.client._queue[c]||[];if(b.includes(c)){return new Promise(function(b,d){a.client._queue[c].push({args:e,resolve:b,reject:d});setTimeout(d,500)})}else{a.client._queue[c].push({args:e})}}};c.forEach(function(b){a.client[b]=d(b)})}})();
            `,
          },
        ],
      };
    },
  };
};
