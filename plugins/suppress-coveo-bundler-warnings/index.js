/**
 * @coveo/headless browser bundle uses dynamic require(); Rspack cannot statically
 * analyze it and emits noisy "Critical dependency" warnings. Search still works.
 */
module.exports = function suppressCoveoBundlerWarningsPlugin() {
  return {
    name: 'suppress-coveo-bundler-warnings',
    configureWebpack() {
      return {
        ignoreWarnings: [
          (warning) =>
            typeof warning.message === 'string' &&
            warning.message.includes('Critical dependency') &&
            (warning.module?.resource?.includes('@coveo/headless') ?? false),
        ],
      };
    },
  };
};
