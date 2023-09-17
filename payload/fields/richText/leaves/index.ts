import type {
  RichTextCustomLeaf,
  RichTextLeaf,
} from "payload/dist/fields/config/types";

const leaves = [
  "bold",
  "italic",
  "underline",
  "code",
  "strikethrough",
] satisfies RichTextLeaf[];

export type RichTextLeafName = keyof {
  [L in (typeof leaves)[number] as L extends RichTextCustomLeaf
    ? L["name"]
    : L]: L;
};

export default leaves;
