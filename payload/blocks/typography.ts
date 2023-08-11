import { Block } from "payload/types";
import { BLOCKS } from "./blocks";
import _ from "@/lib/utils/lodash_mixins";

const constructTextBlock = <SlugT extends string>(slug: SlugT) =>
  ({
    slug: slug,
    fields: [
      {
        type: "text",
        name: "text",
        required: true,
      },
    ],
    labels: { plural: `${_.startCase(slug)}'s`, singular: _.startCase(slug) },
    interfaceName: `${_.pascalCase(slug)}Block`,
  } satisfies Block);

export const Heading1 = constructTextBlock(BLOCKS.HEADING_1);
export const Heading2 = constructTextBlock(BLOCKS.HEADING_2);
export const Heading3 = constructTextBlock(BLOCKS.HEADING_3);
export const Heading4 = constructTextBlock(BLOCKS.HEADING_4);
export const Heading5 = constructTextBlock(BLOCKS.HEADING_5);
export const Heading6 = constructTextBlock(BLOCKS.HEADING_6);
export const Blockquote = constructTextBlock(BLOCKS.BLOCKQUOTE);
export const Lead = constructTextBlock(BLOCKS.LEAD);
export const Large = constructTextBlock(BLOCKS.LARGE);
export const Small = constructTextBlock(BLOCKS.SMALL);
export const Muted = constructTextBlock(BLOCKS.MUTED);
export const Paragraph = constructTextBlock(BLOCKS.PARAGRAPH);
