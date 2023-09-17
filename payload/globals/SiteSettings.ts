import { type GroupField } from "payload/types";
import { type GlobalConfig, GLOBAL } from "./globals";
import { COLLECTION } from "../collections/collections";
import { SingleProjectPage, SingleTechnologyPage } from "../blocks";
import requestRevalidation from "../revalidate";

const pageMappingEntryFields = [
  {
    type: "relationship",
    name: "parent",
    relationTo: COLLECTION.PAGES,
    required: true,
  },
  {
    type: "blocks",
    name: "singlePage",
    blocks: [SingleProjectPage, SingleTechnologyPage],
    required: true,
  },
] satisfies GroupField["fields"];

const SiteSettings = {
  [GLOBAL.SITE_SETTINGS]: {
    fields: [
      {
        type: "group",
        name: "pageMapping",
        fields: [
          {
            type: "group",
            name: "projects",
            fields: pageMappingEntryFields,
          },
          {
            type: "group",
            name: "technologies",
            fields: pageMappingEntryFields,
          },
        ],
      },
    ],
    hooks: {
      afterChange: [
        () => {
          requestRevalidation({ tag: GLOBAL.SITE_SETTINGS });
        },
      ],
    },
  },
} satisfies GlobalConfig;

export default SiteSettings;
