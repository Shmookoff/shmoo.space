import merge from "deepmerge";
import type { RichTextField } from "payload/dist/fields/config/types";
import elements from "./elements";
import leaves from "./leaves";

const richText = (overrides: Partial<RichTextField>) =>
  merge<RichTextField>(
    {
      name: "richText",
      type: "richText",
      required: true,
      admin: {
        elements,
        leaves,
      },
    },
    overrides || {}
  );

export default richText;
