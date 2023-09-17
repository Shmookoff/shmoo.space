import merge from "deepmerge";
import type { RichTextField } from "payload/types";
import elements from "./elements";
import leaves from "./leaves";

const richText = (overrides?: Partial<RichTextField>) =>
  merge<RichTextField>(
    {
      type: "richText",
      admin: {
        elements,
        leaves,
      },
    },
    overrides || {},
    {
      arrayMerge(target, source, options) {
        return source;
      },
    }
  );

export default richText;
