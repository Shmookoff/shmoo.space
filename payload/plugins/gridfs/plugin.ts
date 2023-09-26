import { Config } from "payload/config";
import { PluginOptions } from "./types";
import {
  constructBeforeChangeHook,
  constructAfterDeleteHook,
  constructAfterReadHook,
} from "./hooks";
import { constructClient } from "./client";
import { constructFileEndpoint } from "./endpoints";

export const gridfs =
  ({ clientOpts }: PluginOptions) =>
  (config: Config) => {
    const client = constructClient(clientOpts);
    config.collections = (config.collections || []).map((collectionConfig) => {
      if (!collectionConfig.upload) return collectionConfig;

      collectionConfig.upload = {
        ...(typeof collectionConfig.upload === "object"
          ? collectionConfig.upload
          : {}),
        disableLocalStorage: true,
        adminThumbnail: ({ doc }) =>
          client.generateUrl({
            collectionConfig,
            filename: doc.filename as string,
          }),
      };

      collectionConfig.hooks = {
        ...collectionConfig.hooks,
        beforeChange: [
          ...(collectionConfig.hooks?.beforeChange || []),
          constructBeforeChangeHook({ collectionConfig, client }),
        ],
        afterDelete: [
          ...(collectionConfig.hooks?.afterDelete || []),
          constructAfterDeleteHook({ collectionConfig, client }),
        ],
        afterRead: [
          ...(collectionConfig.hooks?.afterRead || []),
          constructAfterReadHook({ collectionConfig, client }),
        ],
      };

      collectionConfig.endpoints = collectionConfig.endpoints || [];
      if (!clientOpts.customOperations?.constructGenerateUrl)
        collectionConfig.endpoints.push(
          constructFileEndpoint({ path: "file", collectionConfig }),
        );

      return collectionConfig;
    });
    config.admin = { ...config.admin, webpack: client.extendWebpackConfig };
    return config;
  };
