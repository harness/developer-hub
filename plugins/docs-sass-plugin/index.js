export default function (context, options) {
  return {
    name: 'docusaurus-sass-plugin',
    configureWebpack(_, isServer, utils) {
      const { getStyleLoaders } = utils;
      return {
        module: {
          rules: [
            {
              test: /\.s[ca]ss$/,
              oneOf: [
                {
                  test: /\.module\.s[ca]ss$/,
                  use: [
                    ...getStyleLoaders(isServer, {
                      modules: {
                        localIdentName: `[local]_[hash:base64:4]`,
                        exportOnlyLocals: isServer,
                      },
                      importLoaders: 2,
                      sourceMap: false,
                    }),
                    {
                      loader: require.resolve('sass-loader'),
                      options: options || {},
                    },
                  ],
                },
                {
                  use: [
                    ...getStyleLoaders(isServer),
                    {
                      loader: require.resolve('sass-loader'),
                      options: options || {},
                    },
                  ],
                },
              ],
            },
          ],
        },
      };
    },
  };
}
