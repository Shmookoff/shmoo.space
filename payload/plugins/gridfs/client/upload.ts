import { ConstructOperationOpts, Upload } from "../types";
import { Readable } from "stream";
import fs from "fs";
import { generateFilename } from "../utils/generate-filename";

interface ConstructUploadOpts extends ConstructOperationOpts {}

export const constructUpload =
  ({ getBucket }: ConstructUploadOpts): Upload =>
  ({ file, collectionConfig }) =>
    new Promise((resolve) => {
      const uploadStream = getBucket().openUploadStream(
        generateFilename({ collectionConfig, filename: file.filename }),
      );

      const fileStream = file.tempFilePath
        ? fs.createReadStream(file.tempFilePath)
        : Readable.from(file.buffer);

      fileStream.pipe(uploadStream);
      uploadStream.on("close", resolve);
    });
