import { type GlobalConfig as PayloadGlobalConfig } from "payload/types";

export type GlobalConfig = {
  [K in keyof typeof GLOBAL]: {
    [K1 in (typeof GLOBAL)[K]]: Omit<PayloadGlobalConfig, "slug">;
  };
}[keyof typeof GLOBAL];

export const GLOBAL = {
  SITE_IDENTITY: "siteIdentity",
  SITE_SETTINGS: "siteSettings",
} as const;
