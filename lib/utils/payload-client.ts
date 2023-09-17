import collectionsConfigs from "@/payload/collections";
import globalsConfigs from "@/payload/globals";
import type { Config } from "@/payload/payload-types";
import getPayloadClient from "@/payload/payloadClient";
import type { Options as FindOptions } from "payload/dist/collections/operations/local/find";
import type { Options as FindGlobalOptions } from "payload/dist/globals/operations/local/findOne";
import type { PaginatedDocs } from "payload/dist/mongoose/types";
import {
  CollectionCacheableFields,
  generateCollectionCacheTag,
  generateGlobalCacheTag,
} from "./generate-cache-tag";
import { unstable_cache } from "next/cache";

type UniqueFieldsWhere<CollectionSlug extends keyof typeof collectionsConfigs> =
  { [K in CollectionCacheableFields<CollectionSlug>]?: { equals: any } };

type CollectionFindCacheOptionsRequestOptions<
  CollectionSlug extends keyof typeof collectionsConfigs,
> = Omit<FindOptions<CollectionSlug>, "collection" | "where"> & {
  where?: UniqueFieldsWhere<CollectionSlug>;
};

type CollectionFindCacheOptions<
  CollectionSlug extends keyof typeof collectionsConfigs,
  Options extends CollectionFindCacheOptionsRequestOptions<CollectionSlug>,
> =
  | { disableCache: true }
  | ({
      disableCache?: false;
      additionalTags?: string[];
    } & (Options["where"] extends UniqueFieldsWhere<CollectionSlug>
      ? { byField: keyof Options["where"] }
      : {}));

type PayloadCollectionsClient<
  CollectionSlugs extends
    keyof typeof collectionsConfigs = keyof typeof collectionsConfigs,
> = {
  -readonly [CollectionSlug in CollectionSlugs]: {
    find: <
      Options extends CollectionFindCacheOptionsRequestOptions<CollectionSlug>,
    >(
      opts?: Options,
      ...args: Options["where"] extends UniqueFieldsWhere<CollectionSlug>
        ? [CollectionFindCacheOptions<CollectionSlug, Options>]
        : [CollectionFindCacheOptions<CollectionSlug, Options>?]
    ) => Promise<PaginatedDocs<Config["collections"][CollectionSlug]>>;
  };
};

type GlobalFindCacheOptions = {
  disableCache?: boolean;
  additionalTags?: string[];
};

type PayloadGlobalsClient<
  GlobalSlugs extends keyof typeof globalsConfigs = keyof typeof globalsConfigs,
> = {
  -readonly [CollectionSlug in GlobalSlugs]: {
    find: (
      opts?: Omit<FindGlobalOptions<CollectionSlug>, "slug">,
      cacheOpts?: GlobalFindCacheOptions,
    ) => Promise<Config["globals"][CollectionSlug]>;
  };
};

const payloadClient = {
  collections: (
    Object.keys(collectionsConfigs) as (keyof typeof collectionsConfigs)[]
  ).reduce(
    <CollectionSlug extends keyof typeof collectionsConfigs>(
      acc: PayloadCollectionsClient<CollectionSlug>,
      v: CollectionSlug,
    ) => {
      acc[v] = {
        async find(opts, ...args) {
          const [cacheOpts] = args;
          const payload = await getPayloadClient();

          if (cacheOpts?.disableCache)
            return payload.find({
              ...opts,
              collection: v,
            } as FindOptions<CollectionSlug>);

          const tag =
            cacheOpts && "byField" in cacheOpts && opts?.where
              ? generateCollectionCacheTag(v, {
                  field:
                    cacheOpts.byField as CollectionCacheableFields<CollectionSlug>,
                  value: opts.where[cacheOpts.byField]?.equals,
                })
              : generateCollectionCacheTag(v);

          const tags = [tag];
          if (cacheOpts?.additionalTags) tags.push(...cacheOpts.additionalTags);

          return await unstable_cache(
            () =>
              payload.find({
                ...opts,
                collection: v,
              } as FindOptions<CollectionSlug>),
            [tag],
            { tags },
          )();
        },
      };
      return acc;
    },
    {} as PayloadCollectionsClient,
  ),
  globals: (
    Object.keys(globalsConfigs) as (keyof typeof globalsConfigs)[]
  ).reduce(
    <GlobalSlug extends keyof typeof globalsConfigs>(
      acc: PayloadGlobalsClient<GlobalSlug>,
      v: GlobalSlug,
    ) => {
      acc[v] = {
        async find(opts, cacheOpts) {
          const payload = await getPayloadClient();

          if (cacheOpts?.disableCache)
            return payload.findGlobal({ ...opts, slug: v });

          const tag = generateGlobalCacheTag(v);
          const tags = [tag];
          if (cacheOpts?.additionalTags) tags.push(cacheOpts.additionalTags);

          return await unstable_cache(
            () => payload.findGlobal({ ...opts, slug: v }),
            [tag],
            { tags },
          )();
        },
      };
      return acc;
    },
    {} as PayloadGlobalsClient,
  ),
};

export default payloadClient;
