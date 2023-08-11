import { GlobalConfig } from "payload/types";
import { Global } from "./globals";
import { COLLECTION } from "../collections/collections";

const NavigationMenu: GlobalConfig = {
  slug: Global.NAVIGATION_MENU,
  fields: [
    {
      type: "array",
      name: "items",
      required: true,
      maxRows: 4,
      admin: {
        components: {
          RowLabel: ({ data, index }) => data?.title || `Item ${index}`,
        },
      },
      fields: [
        {
          type: "text",
          name: "title",
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
    },
  ],
};

export default NavigationMenu;
