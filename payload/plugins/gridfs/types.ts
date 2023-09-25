import type { TypeWithID } from "payload/dist/collections/config/types";
import type { FileData, FileSize } from "payload/dist/uploads/types";
import type { CollectionConfig } from "payload/types";
import type { Configuration as WebpackConfig } from "webpack";
import type { GridFSBucket } from "mongodb";
import type { ConstructGenerateUrlOpts } from "./client/generate-url";

export interface File {
  buffer: Buffer;
  filename: string;
  filesize: number;
  mimeType: string;
  tempFilePath?: string;
}

type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>;
};

export type UploadCollectionNoSizes = Partial<NoUndefinedField<FileSize>> & {
  url?: string;
};
type UploadCollectionWithSizes = Omit<FileData, "tempFilePath" | "sizes"> & {
  sizes: { [size: string]: UploadCollectionNoSizes };
};

export type UploadCollection = (
  | UploadCollectionNoSizes
  | UploadCollectionWithSizes
) &
  TypeWithID;

export type Upload = (args: {
  collectionConfig: CollectionConfig;
  data: Partial<FileSize | FileData>;
  file: File;
}) => Promise<void> | void;

export type Delete = (args: {
  collectionConfig: CollectionConfig;
  doc: (FileSize | FileData) & TypeWithID;
  filename: string;
}) => Promise<void> | void;

export type GenerateUrl = (args: {
  collectionConfig: CollectionConfig;
  filename: string;
}) => string;

export interface ConstructHookOpts {
  collectionConfig: CollectionConfig;
  client: Client;
}

export interface Client {
  readonly bucketName: string;
  upload: Upload;
  delete: Delete;
  generateUrl: GenerateUrl;
  extendWebpackConfig: (config: WebpackConfig) => WebpackConfig;
}

export interface ClientOptions {
  bucketName: string;
  customOperations?: {
    constructGenerateUrl?: (opts: ConstructGenerateUrlOpts) => GenerateUrl;
  };
}

export interface PluginOptions {
  clientOpts: ClientOptions;
}

export interface ConstructOperationOpts {
  getBucket: () => GridFSBucket;
  bucketName: string;
}
