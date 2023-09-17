import { COLLECTION, type CollectionConfig } from "./collections";

const Users = {
  [COLLECTION.USERS]: {
    auth: true,
    admin: {
      useAsTitle: "email",
      enableRichTextLink: false,
    },
    fields: [
      // Email added by default
      // Add more fields as needed
    ],
  },
} satisfies CollectionConfig;

export default Users;
