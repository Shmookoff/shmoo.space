import path from "path";
import { buildConfig } from "payload/config";
import collectionsConfigs from "./collections";
import globalsConfigs from "./globals";

export default buildConfig({
  collections: Object.entries(collectionsConfigs).map(
    ([slug, collectionConfig]) => ({
      slug,
      ...collectionConfig,
    }),
  ),
  globals: Object.entries(globalsConfigs).map(([slug, globalConfig]) => ({
    slug,
    ...globalConfig,
  })),
  typescript: {
    outputFile: path.resolve(__dirname, "./payload-types.ts"),
  },
});
