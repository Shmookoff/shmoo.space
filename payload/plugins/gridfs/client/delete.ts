import path from "path";
import { ConstructOperationOpts, Delete } from "../types";

interface ConstructDeleteOpts extends ConstructOperationOpts {}

export const constructDelete =
  ({ getBucket }: ConstructDeleteOpts): Delete =>
  async ({ filename, collectionConfig }) => {
    const bucket = getBucket();
    const files = await bucket
      .find({ filename: path.posix.join(collectionConfig.slug, filename) })
      .toArray();
    const file = files.at(0);
    if (file) await bucket.delete(file._id);
  };
