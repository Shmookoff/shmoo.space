import { CollectionConfig } from "payload/types";
import { COLLECTION } from "./collections";
const Users = {
  slug: COLLECTION.USERS,
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
} satisfies CollectionConfig;

export default Users;
