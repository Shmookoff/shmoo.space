import { FieldHook } from "payload/types";
import type { Config } from "@/payload/payload-types";
import _ from "lodash";

type Collections = Config["collections"];

type Collection = {
  [CollectionSlug in keyof Collections]: Collections[CollectionSlug] extends {
    slug: string;
  }
    ? Collections[CollectionSlug]
    : never;
}[keyof Collections];

type C1 = keyof {
  [Slug in keyof Collections as Collections[Slug] extends { slug: string }
    ? Slug
    : never]: Slug;
};

type LinkField = {
  [Key in keyof Collection]: Key extends string ? Key : never;
}[keyof Collection];

type R = Collection[LinkField];

type asdasd = Collection[{
  [Key in keyof Collection]: Key extends string ? Key : never;
}[keyof Collection]] extends string
  ? true
  : false;

type adsfadsf = keyof {
  [K in keyof Collection as Collection[K] extends string ? K : never]: K;
};
// Collection[keyof {
//     [K in keyof Collection as Collection[K] extends string ? K : never]: K;
//   }]

export const setSlug =
  (linkField: string): FieldHook =>
  ({ value, data, originalDoc }) =>
    value ||
    _.kebabCase(data?.[linkField]) ||
    _.kebabCase(originalDoc?.[linkField]);
