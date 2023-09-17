import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload/types";
import { COLLECTION, type CollectionConfig } from "./collections";
import { AboutPage, ProjectsPage, TechnologiesPage } from "../blocks";
import { Page } from "../payload-types";
import { revalidator } from "../revalidate";

const Pages = {
  [COLLECTION.PAGES]: {
    fields: [
      {
        type: "text",
        name: "title" as const,
        required: true,
        unique: true,
      },
      {
        type: "text",
        name: "location" as const,
        required: true,
        unique: true,
      },
      {
        type: "blocks",
        name: "content" as const,
        blocks: [AboutPage, ProjectsPage, TechnologiesPage],
        required: true,
      },
    ],
    admin: { useAsTitle: "title" },
    hooks: {
      afterChange: [
        ({ operation, previousDoc, doc }) => {
          if (operation === "update")
            if (previousDoc.location !== doc.location) {
              revalidator.revalidateCollection("pages");
              revalidator.revalidateGlobal("siteIdentity");
              revalidator.revalidateGlobal("siteSettings");
            } else
              revalidator.revalidateCollection("pages", {
                field: "location",
                value: previousDoc.location,
              });
          else if (operation === "create")
            revalidator.revalidateCollection("pages");
        },
      ] as CollectionAfterChangeHook<Page>[],
      afterDelete: [
        () => {
          revalidator.revalidateCollection("pages");
        },
      ] as CollectionAfterDeleteHook<Page>[],
    },
  },
} satisfies CollectionConfig;

export default Pages;
