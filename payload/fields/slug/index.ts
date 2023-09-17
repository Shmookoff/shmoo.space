import type { TextField } from "payload/types";
import SlugField from "./Field";
import merge from "deepmerge";
import { setSlug } from "./hooks";

const slug = (linkField: string, overrides?: Partial<TextField>) =>
  merge<TextField>(
    {
      type: "text",
      name: "slug",
      required: true,
      unique: true,
      admin: {
        components: {
          Field: SlugField,
        },
      },
      hooks: {
        beforeChange: [setSlug(linkField)],
      },
    },
    overrides || {},
  );

export default slug;
