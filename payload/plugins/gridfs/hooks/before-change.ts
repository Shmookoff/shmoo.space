import type { TypeWithID } from "payload/dist/collections/config/types";
import type { FileData, FileSize } from "payload/dist/uploads/types";
import type { CollectionBeforeChangeHook } from "payload/types";
import type { ConstructHookOpts } from "../types";
import { deleteRelatedFiles } from "../utils/delete-related-files";
import { getIncomingFiles } from "../utils/get-incoming-files";

interface ConstructBeforeChangeHookOpts extends ConstructHookOpts {}

export const constructBeforeChangeHook =
  ({
    collectionConfig,
    client,
  }: ConstructBeforeChangeHookOpts): CollectionBeforeChangeHook<
    (FileSize | FileData) & TypeWithID
  > =>
  async ({ req, data, originalDoc }) => {
    try {
      const files = getIncomingFiles({ req, data });

      if (!files.length) return;

      // If there is an original doc,
      // And we have new files,
      // We need to delete the old files before uploading new
      if (originalDoc)
        await deleteRelatedFiles(originalDoc, client, collectionConfig);

      const promises = files.map(async (file) => {
        await client.upload({ collectionConfig, data, file });
      });

      await Promise.all(promises);
    } catch (err: unknown) {
      req.payload.logger.error(
        `There was an error while uploading files corresponding to the collection ${collectionConfig.slug} with filename ${data.filename}:`,
      );
      req.payload.logger.error(err);
    }
    return data;
  };
