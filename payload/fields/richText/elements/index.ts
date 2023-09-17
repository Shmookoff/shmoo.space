import type {
  RichTextCustomElement,
  RichTextElement as _RichTextElement,
} from "payload/dist/fields/config/types";

import br from "./br";

const elements = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "blockquote",
  "link",
  br,
  "ul",
  "ol",
] satisfies _RichTextElement[];

type Element = (typeof elements)[number];

type RenderableElement = "ul" extends Element
  ? Element | "li"
  : "ol" extends Element
  ? Element | "li"
  : Element;

export type RichTextElementName =
  | keyof {
      [E in RenderableElement as E extends RichTextCustomElement
        ? E["name"]
        : E]: E;
    }
  | undefined;

export default elements;
