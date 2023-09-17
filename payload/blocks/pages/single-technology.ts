import type { Block } from "payload/types";
import { PAGES_BLOCKS } from "./blocks";

const SingleTechnologyPage = {
  slug: PAGES_BLOCKS.SINGLE_TECHNOLOGY,
  fields: [{ type: "text", name: "title" }],
} satisfies Block;

export default SingleTechnologyPage;
