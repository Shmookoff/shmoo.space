import type { TypeWithID } from "payload/dist/collections/config/types";
import type { FileData, FileSize } from "payload/dist/uploads/types";
import type { CollectionConfig } from "payload/types";
import type { Client } from "../types";

export const deleteRelatedFiles = async (
  originalDoc: (FileSize | FileData) & TypeWithID,
  client: Client,
  collectionConfig: CollectionConfig,
) => {
  const filesToDelete: string[] = [];

  if (originalDoc.filename) {
    filesToDelete.push(originalDoc.filename);
  }

  if ("sizes" in originalDoc) {
    filesToDelete.push(
      ...Object.values(originalDoc.sizes)
        .map((resizedFileData) => resizedFileData.filename)
        .filter(<T>(v: T): v is NonNullable<T> => Boolean(v)),
    );
  }

  const deletionPromises = filesToDelete.map(async (filename) => {
    if (filename) {
      await client.delete({
        collectionConfig,
        doc: originalDoc,
        filename,
      });
    }
  });

  await Promise.all(deletionPromises);
};
