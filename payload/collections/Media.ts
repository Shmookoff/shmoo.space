import { COLLECTION, type CollectionConfig } from "./collections";

// TODO: Figure out how to revalidate documents linked to a Media by any method (inside a block for example)

const Media = {
  [COLLECTION.MEDIA]: {
    fields: [
      {
        type: "text",
        name: "alt" as const,
        required: true,
      },
    ],
    upload: {
      staticURL: "/media/media",
      staticDir: "../public/media/media",
    },
  },
} satisfies CollectionConfig;

export default Media;
