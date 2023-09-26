// https://github.com/payloadcms/plugin-cloud-storage/blob/3d5858ca6d45d73c22e9bb97c2b443758d93400b/src/utilities/getIncomingFiles.ts

import type { FileData, FileSize } from "payload/dist/uploads/types";
import type { PayloadRequest } from "payload/types";
import type { File } from "../types";

export const getIncomingFiles = ({
  data,
  req,
}: {
  data: Partial<FileSize | FileData>;
  req: PayloadRequest;
}): File[] => {
  const file = req.files?.file;

  const files: File[] = [];

  if (!(file && data.filename && data.mimeType)) return files;

  files.push({
    filename: data.filename,
    mimeType: data.mimeType,
    buffer: file.data,
    tempFilePath: file.tempFilePath,
    filesize: file.size,
  });

  if (!("sizes" in data)) return files;

  Object.entries(data.sizes || {}).forEach(([key, resizedFileData]) => {
    if (!(req.payloadUploadSizes?.[key] && data.mimeType)) return;
    files.push({
      filename: `${resizedFileData.filename}`,
      mimeType: data.mimeType,
      buffer: req.payloadUploadSizes[key],
      filesize: req.payloadUploadSizes[key].length,
    });
  });

  return files;
};
