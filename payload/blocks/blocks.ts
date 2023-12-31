import { PAGES_BLOCKS } from "./pages/blocks";

export const BLOCKS = {
  ...PAGES_BLOCKS,
  HEADING_1: "heading_1",
  HEADING_2: "heading_2",
  HEADING_3: "heading_3",
  HEADING_4: "heading_4",
  HEADING_5: "heading_5",
  HEADING_6: "heading_6",
  BLOCKQUOTE: "blockquote",
  LEAD: "lead",
  LARGE: "large",
  SMALL: "small",
  MUTED: "muted",
  PARAGRAPH: "paragraph",
} as const;
