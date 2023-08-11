import { CollectionConfig } from "payload/types";
import { COLLECTION } from "./collections";

const SocialNetworkIcons = {
  slug: COLLECTION.SOCIAL_NETWORK_ICONS,
  fields: [],
  upload: {
    staticURL: "/media/social-network-icons",
    staticDir: "../public/media/social-network-icons",
    mimeTypes: ["image/svg+xml"],
  },
} satisfies CollectionConfig;

export default SocialNetworkIcons;
