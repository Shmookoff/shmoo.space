import { Config } from "@/payload/payload-types";
import collectionsConfigs from "@/payload/collections";

export type Omit_SaveDiscriminatedUnions<T, K extends keyof T> = T extends any
  ? Pick<T, Exclude<keyof T, K>>
  : never;

export type ExactEntries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export type Collections = Config["collections"];
export type Globals = Config["globals"];
export type CollectionsConfigs = typeof collectionsConfigs;

export type CollectionFieldsConfigsBySlug<
  CollectionSlug extends keyof CollectionsConfigs,
> = {
  [Field in CollectionsConfigs[CollectionSlug]["fields"][number] as Field extends never
    ? never
    : Field["name"]]: Field;
};

export type CollectionFieldsConfigsBySlugExtended<
  CollectionSlug extends keyof Collections,
> = {
  [Field in keyof Collections[CollectionSlug]]: Field extends keyof CollectionFieldsConfigsBySlug<CollectionSlug>
    ? CollectionFieldsConfigsBySlug<CollectionSlug>[Field]
    : undefined;
};
