import * as Pages from "../pages";
import * as Blocks from "@/payload/blocks";

const pagesBlockToComponent = {
  [Blocks.AboutPage.slug]: Pages.AboutPage,
  [Blocks.ProjectsPage.slug]: Pages.ProjectsPage,
  [Blocks.SingleProjectPage.slug]: Pages.SingleProjectPage,
  [Blocks.TechnologiesPage.slug]: Pages.TechnologiesPage,
  [Blocks.SingleTechnologyPage.slug]: Pages.SingleTechnologyPage,
} as const;

export default pagesBlockToComponent;
