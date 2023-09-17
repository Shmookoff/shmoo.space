import type { Block } from "payload/types";
import { PAGES_BLOCKS } from "./blocks";

const ProjectsPage = {
  slug: PAGES_BLOCKS.PROJECTS,
  fields: [],
  interfaceName: "ProjectsBlock",
} satisfies Block;

export default ProjectsPage;
