import path from "path";
import { buildConfig } from "payload/config";
import collectionsConfigs from "./collections";
import globalsConfigs from "./globals";
import { gridfs } from "./plugins/gridfs";
import { env } from "@/env.mjs";
import { generateFilename } from "./plugins/gridfs/utils/generate-filename";

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
  plugins: [
    gridfs({
      clientOpts: {
        bucketName: "uploads",
        customOperations: {
          constructGenerateUrl:
            ({ bucketName }) =>
            ({ collectionConfig, filename }) =>
              `${env.NEXT_PUBLIC_APP_URL}/api/uploads/${bucketName}/${encodeURI(
                generateFilename({ collectionConfig, filename }),
              )}`,
        },
      },
    }),
  ],
});
