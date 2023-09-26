import { CollectionConfig } from "payload/types";

export const generateFilename = ({
  collectionConfig,
  filename,
}: {
  collectionConfig: CollectionConfig;
  filename: string;
}) => `${collectionConfig.slug}-${filename}`;
