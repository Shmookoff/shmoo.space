import { COLLECTION } from "@/payload/collections/collections";
import type { Block } from "payload/types";

import * as TypographyBlocks from "@/payload/blocks/typography";
import { BLOCKS } from "../blocks";

const About = {
  slug: BLOCKS.ABOUT,
  fields: [
    {
      type: "group",
      name: "generalInfo",
      fields: [
        {
          type: "upload",
          name: "avatar",
          relationTo: COLLECTION.MEDIA,
          required: true,
          filterOptions: {
            mimeType: { contains: "image" },
          },
        },
        {
          type: "blocks",
          name: "content",
          blocks: Object.values(TypographyBlocks),
          required: true,
        },
      ],
    },
    {
      type: "richText",
      name: "content",
      required: true,
    },
  ],
} satisfies Block;

export default About;
