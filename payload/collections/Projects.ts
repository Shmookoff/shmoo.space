import { CollectionConfig } from "payload/types";
import { COLLECTION } from "./collections";

const Projects = {
  slug: COLLECTION.PROJECTS,
  fields: [
    {
      type: "text",
      name: "title",
      required: true,
      unique: true,
    },
    {
      type: "relationship",
      name: "technologies",
      relationTo: COLLECTION.TECHNOLOGIES,
      required: true,
    },
  ],
  admin: { useAsTitle: "title" },
} satisfies CollectionConfig;

export default Projects;
