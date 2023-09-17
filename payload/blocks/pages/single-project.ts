import type { Block } from "payload/types";
import { PAGES_BLOCKS } from "./blocks";

const SingleProjectPage = {
  slug: PAGES_BLOCKS.SINGLE_PROJECT,
  fields: [{ type: "text", name: "title" }],
} satisfies Block;

export default SingleProjectPage;
