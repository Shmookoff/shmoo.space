import type { CMSLinkOptions } from "@/components/cms-link";
import type { Node } from "../render-rich-text";
import type { Omit_SaveDiscriminatedUnions } from "@/lib";

export type RichTextElementLink = Omit_SaveDiscriminatedUnions<
  CMSLinkOptions,
  "children"
> & {
  type: "link";
  children?: Node[];
};
