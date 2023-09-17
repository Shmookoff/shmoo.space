import {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload/types";
import { COLLECTION, type CollectionConfig } from "./collections";
import _ from "lodash";
import { richText, slug } from "../fields";
import elements from "../fields/richText/elements";
import { Project, Technology } from "../payload-types";
import { revalidator } from "../revalidate";

const Projects = {
  [COLLECTION.PROJECTS]: {
    fields: [
      {
        type: "text",
        name: "title" as const,
        required: true,
        unique: true,
      },
      { ...slug("title"), name: "slug" as const, unique: true },
      {
        type: "textarea",
        name: "excerpt" as const,
        required: true,
      },
      {
        type: "array",
        name: "links" as const,
        fields: [
          {
            type: "select",
            name: "type",
            options: ["git", "homepage", "other"],
            required: true,
          },
          {
            type: "text",
            name: "value",
            required: true,
          },
        ],
      },
      {
        ...richText({
          required: true,
          admin: {
            elements: elements.filter(
              (element) => !(["h1", "h2"] as typeof elements).includes(element),
            ),
          },
        }),
        name: "description" as const,
      },
      {
        type: "relationship",
        name: "technologies" as const,
        relationTo: COLLECTION.TECHNOLOGIES,
        hasMany: true,
        required: true,
      },
      {
        type: "array",
        name: "gallery" as const,
        fields: [
          {
            type: "upload",
            name: "image",
            relationTo: COLLECTION.PROJECT_LEAD_IMAGES,
            required: true,
          },
        ],
        defaultValue: [],
      },
    ],
    admin: { useAsTitle: "title" },
    hooks: {
      afterChange: [
        ({ operation, previousDoc, doc }) => {
          // TODO request projects revalidation only if content visible on projects page changes
          revalidator.revalidateCollection("projects");

          if (operation === "update") {
            revalidator.revalidateCollection("projects", {
              field: "slug",
              value: previousDoc.slug,
            });

            new Set([
              ...(previousDoc.technologies as Technology[]).map(
                (technology) => technology.id,
              ),
              ...(doc.technologies as Technology[]).map(
                (technology) => technology.id,
              ),
            ]).forEach((id) =>
              revalidator.revalidateCollection("projects", {
                field: "technologies",
                value: id,
              }),
            );
          }
        },
      ] as CollectionAfterChangeHook<Project>[],
      afterDelete: [
        ({ doc }) => {
          revalidator.revalidateCollection("projects");
          revalidator.revalidateCollection("projects", {
            field: "slug",
            value: doc.slug,
          });
          (doc.technologies as Technology[]).forEach((technology) =>
            revalidator.revalidateCollection("projects", {
              field: "technologies",
              value: technology.id,
            }),
          );
        },
      ] as CollectionAfterDeleteHook<Project>[],
    },
  },
} satisfies CollectionConfig;

export const ProjectLeadImages = {
  [COLLECTION.PROJECT_LEAD_IMAGES]: {
    fields: [],
    upload: {
      staticURL: "/media/project-lead-images",
      staticDir: "../public/media/project-lead-images",
      mimeTypes: ["image/*"],
    },
    admin: { enableRichTextLink: false },
  },
} satisfies CollectionConfig;

export default Projects;
