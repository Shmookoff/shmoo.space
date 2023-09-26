import { COLLECTION, type CollectionConfig } from "./collections";
import { slug } from "../fields";
import {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload/types";
import { Technology } from "../payload-types";
import { revalidator } from "../revalidate";
import { Payload } from "payload/dist/payload";

const Technologies = {
  [COLLECTION.TECHNOLOGIES]: {
    fields: [
      {
        type: "text",
        name: "title" as const,
        required: true,
        unique: true,
      },
      { ...slug("title"), name: "slug" as const, unique: true },
      {
        type: "upload",
        name: "icon" as const,
        relationTo: COLLECTION.TECHNOLOGY_ICONS,
        required: true,
      },
    ],
    admin: { useAsTitle: "title" },
    hooks: {
      afterChange: [
        ({ operation, doc, previousDoc, req }) => {
          revalidator.revalidateCollection("technologies");

          if (operation === "update") {
            revalidator.revalidateCollection("technologies", {
              field: "slug",
              value: previousDoc.slug,
            });
            revalidator.revalidateCollection("projects");
            req.payload
              .find({
                collection: "projects",
                where: { technologies: { equals: doc.id } },
              })
              .then((res) =>
                res.docs.forEach((project) =>
                  revalidator.revalidateCollection("projects", {
                    field: "slug",
                    value: project.slug,
                  }),
                ),
              );
          }
        },
      ] as CollectionAfterChangeHook<Technology>[],
      afterDelete: [
        ({ doc, req }) => {
          revalidator.revalidateCollection("technologies");
          revalidator.revalidateCollection("technologies", {
            field: "slug",
            value: doc.slug,
          });
          revalidator.revalidateCollection("projects");
          const payload: Payload = req.payload;
          payload
            .find({
              collection: "projects",
              where: { technologies: { equals: doc.id } },
            })
            .then((res) =>
              res.docs.forEach((project) =>
                revalidator.revalidateCollection("projects", {
                  field: "slug",
                  value: project.slug,
                }),
              ),
            );
        },
      ] as CollectionAfterDeleteHook<Technology>[],
    },
  },
} satisfies CollectionConfig;

export const TechnologyIcons = {
  [COLLECTION.TECHNOLOGY_ICONS]: {
    fields: [],
    upload: {
      staticURL: "/media/technology-icons",
      staticDir: "../public/media/technology-icons",
      mimeTypes: ["image/svg+xml"],
    },
    admin: { enableRichTextLink: false },
  },
} satisfies CollectionConfig;

export default Technologies;
