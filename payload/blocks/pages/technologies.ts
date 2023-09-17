import type { Block } from "payload/types";
import { PAGES_BLOCKS } from "./blocks";

const TechnologiesPage = {
  slug: PAGES_BLOCKS.TECHNOLOGIES,
  fields: [],
  interfaceName: "TechnologiesBlock",
} satisfies Block;

export default TechnologiesPage;
