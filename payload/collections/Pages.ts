import { CollectionConfig } from "payload/types";
import { COLLECTION } from "./collections";
import { About } from "../blocks";

const Pages = {
  slug: COLLECTION.PAGES,
  fields: [
    {
      type: "text",
      name: "title",
      required: true,
      unique: true,
    },
    {
      type: "text",
      name: "location",
      required: true,
      unique: true,
    },
    {
      type: "blocks",
      name: "content",
      blocks: [About],
      required: true,
    },
  ],
  admin: { useAsTitle: "title" },
} satisfies CollectionConfig;

export default Pages;
