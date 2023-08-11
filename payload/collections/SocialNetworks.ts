import { CollectionConfig } from "payload/types";
import { COLLECTION } from "./collections";

const SocialNetworks = {
  slug: COLLECTION.SOCIAL_NETWORKS,
  fields: [
    {
      type: "text",
      name: "title",
      required: true,
      unique: true,
    },
    {
      type: "upload",
      name: "icon",
      relationTo: COLLECTION.SOCIAL_NETWORK_ICONS,
      required: true,
      unique: true,
    },
  ],
  admin: { useAsTitle: "title" },
} satisfies CollectionConfig;

export default SocialNetworks;
