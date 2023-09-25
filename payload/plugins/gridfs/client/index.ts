import mongoose from "mongoose";
import { constructUpload } from "./upload";
import { constructDelete } from "./delete";
import { Client, ClientOptions } from "../types";
import { constructGenerateUrl } from "./generate-url";
import { extendWebpackConfig } from "./webpack";

export const constructClient = ({
  bucketName,
  customOperations,
}: ClientOptions): Client => {
  const getBucket = () =>
    new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName });

  return {
    bucketName,
    upload: constructUpload({ getBucket, bucketName }),
    delete: constructDelete({ getBucket, bucketName }),
    generateUrl:
      customOperations?.constructGenerateUrl?.call(
        {},
        { bucketName, getBucket },
      ) || constructGenerateUrl({ getBucket, bucketName }),
    extendWebpackConfig,
  };
};
