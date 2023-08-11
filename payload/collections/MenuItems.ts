import { CollectionConfig } from "payload/types";
import { COLLECTION } from "./collections";

const MenuItems = {
  slug: COLLECTION.MENU_ITEMS,
  fields: [
    {
      type: "text",
      name: "title",
      required: true,
      unique: true,
    },
    {
      type: "number",
      name: "position",
      required: true,
      unique: true,
    },
    {
      type: "textarea",
      name: "description",
      required: true,
    },
    {
      type: "relationship",
      name: "page",
      relationTo: COLLECTION.PAGES,
      required: true,
    },
  ],
  admin: { useAsTitle: "title" },
  defaultSort: "position",
} satisfies CollectionConfig;

export default MenuItems;
