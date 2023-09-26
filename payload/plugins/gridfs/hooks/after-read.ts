import { CollectionAfterReadHook } from "payload/types";
import { ConstructHookOpts, UploadCollection } from "../types";

interface ConstructAfterReadHookOpts extends ConstructHookOpts {}

export const constructAfterReadHook =
  ({
    client,
    collectionConfig,
  }: ConstructAfterReadHookOpts): CollectionAfterReadHook<UploadCollection> =>
  ({ doc }) => {
    if ("sizes" in doc) {
      Object.entries(doc.sizes).map(([size, data]) => {
        if (data.filename)
          doc.sizes[size].url = client.generateUrl({
            collectionConfig,
            filename: data.filename,
          });
      });
    } else {
      if (doc.filename)
        doc.url = client.generateUrl({
          collectionConfig,
          filename: doc.filename,
        });
    }

    return doc;
  };
