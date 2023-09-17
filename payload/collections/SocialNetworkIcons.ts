import { COLLECTION, type CollectionConfig } from "./collections";

const SocialNetworkIcons = {
  [COLLECTION.SOCIAL_NETWORK_ICONS]: {
    fields: [],
    upload: {
      staticURL: "/media/social-network-icons",
      staticDir: "../public/media/social-network-icons",
      mimeTypes: ["image/svg+xml"],
    },
    admin: { enableRichTextLink: false },
  },
} satisfies CollectionConfig;

export default SocialNetworkIcons;
