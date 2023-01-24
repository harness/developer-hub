module.exports = function (context) {
  const { siteConfig } = context;
  const { themeConfig } = siteConfig;
  const { utmCookie } = themeConfig || {};

  if (!utmCookie) {
    throw new Error(
      `You need to specify 'utmCookie' object in 'themeConfig' with 'prefix' field in it`
    );
  }

  const { prefix } = utmCookie;

  if (!prefix) {
    throw new Error(
      "You specified the `utmCookie` object in `themeConfig` but the `prefix` field was missing."
    );
  }

  const isProd = process.env.NODE_ENV === "production";

  return {
    name: "utmcookie-plugin",

    injectHtmlTags() {
      if (!isProd) {
        return {};
      }
      return {
        headTags: [
          {
            tagName: "script",
            attributes: {
              // async: true,
              src: "https://code.jquery.com/jquery-3.6.2.slim.min.js",
              integrity: "sha256-E3P3OaTZH+HlEM7f1gdAT3lHAn4nWBZXuYe89DFg2d0=",
              crossorigin: "anonymous",
            },
          },
          {
            tagName: "script",
            attributes: {
              // async: true,
              src: "https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js",
              integrity:
                "sha512-3j3VU6WC5rPQB4Ld1jnLV7Kd5xr+cq9avvhwqzbH/taCRNURoeEpoPBK9pDyeukwSxwRPJ8fDgvYXd6SkaZ2TA==",
              crossorigin: "anonymous",
              referrerpolicy: "no-referrer",
            },
          },
          {
            tagName: "script",
            innerHTML: `
            const urlSearch = window.location.search;
            if (urlSearch) {
              const regExpUTM = /^${prefix}/;
              const searchParams = new URLSearchParams(urlSearch);
              const queryEntries = Array.from(searchParams.entries());
              const utmEntries = queryEntries.filter((item) => regExpUTM.test(item[0]));
              if (utmEntries.length > 0) {
                // remove all utm cookies before setting new ones
                const cookieKeys = Object.keys($.cookie());
                const utmCookieKeys = cookieKeys.filter((key) => regExpUTM.test(key));
                utmCookieKeys.forEach((key) => {
                  $.removeCookie(key, { domain: ".harness.io", path: "/" });
                });
                // set new cookies
                utmEntries.forEach((nvp) => {
                  $.cookie(nvp[0], nvp[1], {
                    domain: ".harness.io",
                    path: "/",
                    maxAge: 86400,
                  });
                });
              }
            }
            `,
          },
        ],
      };
    },
  };
};
