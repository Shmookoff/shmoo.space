import type {
  CollectionFieldsConfigsBySlugExtended,
  Collections,
  Globals,
} from "@/lib";

export type CollectionCacheableFields<
  CollectionSlug extends keyof Collections,
> =
  | keyof {
      [FieldSlug in keyof CollectionFieldsConfigsBySlugExtended<CollectionSlug> as CollectionFieldsConfigsBySlugExtended<CollectionSlug>[FieldSlug] extends
        | {
            unique: true;
          }
        | { type: "relationship" }
        ? FieldSlug
        : never]: Collections[CollectionSlug][FieldSlug];
    }
  | "id";

export type GenerateCollectionCacheTagFuncArgs = <
  CollectionSlug extends keyof Collections,
  FieldSlug extends CollectionCacheableFields<CollectionSlug>,
>(
  slug: CollectionSlug,
  opts?: {
    field: FieldSlug;
    value: Collections[CollectionSlug][FieldSlug] extends
      | Collections[keyof Collections][]
      | string[]
      ? string
      : Collections[CollectionSlug][FieldSlug];
  },
) => any;

export const generateCollectionCacheTag: GenerateCollectionCacheTagFuncArgs = (
  slug,
  opts?,
) => {
  if (opts) return `col.${slug}.${String(opts.field)}=[${opts.value}]`;
  return slug;
};

export type GenerateGlobalCacheTagFuncArgs = <GlobalSlug extends keyof Globals>(
  slug: GlobalSlug,
) => any;

export const generateGlobalCacheTag: GenerateGlobalCacheTagFuncArgs = (slug) =>
  `glob.${slug}`;
