import { TypeWithID } from "payload/dist/globals/config/types";
import { FileData, FileSize } from "payload/dist/uploads/types";
import { CollectionAfterDeleteHook } from "payload/types";
import { ConstructHookOpts } from "../types";
import { deleteRelatedFiles } from "../utils/delete-related-files";

interface ConstructAfterDeleteHookOpts extends ConstructHookOpts {}

export const constructAfterDeleteHook =
  ({
    collectionConfig,
    client,
  }: ConstructAfterDeleteHookOpts): CollectionAfterDeleteHook<
    (FileSize | FileData) & TypeWithID
  > =>
  async ({ req, doc }) => {
    try {
      await deleteRelatedFiles(doc, client, collectionConfig);
    } catch (err: unknown) {
      req.payload.logger.error(
        `There was an error while deleting files corresponding to the ${collectionConfig.labels?.singular} with ID ${doc.id}:`,
      );
      req.payload.logger.error(err);
    }
  };
