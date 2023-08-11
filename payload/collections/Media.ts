import { CollectionConfig } from "payload/types";
import { COLLECTION } from "./collections";

const Media = {
  slug: COLLECTION.MEDIA,
  fields: [
    {
      type: "text",
      name: "alt",
      required: true,
    },
  ],
  upload: {
    staticURL: "/media/media",
    staticDir: "../public/media/media",
  },
} satisfies CollectionConfig;

export default Media;
