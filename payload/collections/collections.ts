import { CollectionConfig as PayloadCollectionConfig } from "payload/types";

export type CollectionConfig = {
  [K in keyof typeof COLLECTION]: {
    [K1 in (typeof COLLECTION)[K]]: Omit<PayloadCollectionConfig, "slug">;
  };
}[keyof typeof COLLECTION];

export const COLLECTION = {
  USERS: "users",
  PROJECTS: "projects",
  PROJECT_LEAD_IMAGES: "projectLeadImages",
  TECHNOLOGIES: "technologies",
  TECHNOLOGY_ICONS: "technologyIcons",
  PAGES: "pages",
  SOCIAL_NETWORKS: "socialNetworks",
  SOCIAL_NETWORK_ICONS: "socialNetworkIcons",
  MEDIA: "media",
} as const;
