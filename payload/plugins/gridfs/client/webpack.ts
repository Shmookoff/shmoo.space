import { Configuration as WebpackConfig } from "webpack";

export const extendWebpackConfig = (config: WebpackConfig): WebpackConfig => ({
  ...config,
  resolve: {
    ...config.resolve,
    fallback: {
      ...config.resolve?.fallback,
      fs: false,
    },
  },
});
