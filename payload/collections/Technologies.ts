import { CollectionConfig } from "payload/types";
import { COLLECTION } from "./collections";

const Technologies = {
  slug: COLLECTION.TECHNOLOGIES,
  fields: [
    {
      type: "text",
      name: "title",
      required: true,
      unique: true,
    },
    {
      type: "relationship",
      name: "projects",
      relationTo: COLLECTION.PROJECTS,
      required: true,
    },
  ],
  admin: { useAsTitle: "title" },
} satisfies CollectionConfig;

export default Technologies;
