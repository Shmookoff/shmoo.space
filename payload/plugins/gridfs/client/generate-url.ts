import { ConstructOperationOpts, GenerateUrl } from "../types";
import { env } from "@/env.mjs";
import { generateFilename } from "../utils/generate-filename";

export interface ConstructGenerateUrlOpts extends ConstructOperationOpts {}

export const constructGenerateUrl =
  ({}: ConstructGenerateUrlOpts): GenerateUrl =>
  ({ collectionConfig, filename }) =>
    `${env.NEXT_PUBLIC_APP_URL}/api/${collectionConfig.slug}/file/${encodeURI(
      generateFilename({ collectionConfig, filename }),
    )}`;
