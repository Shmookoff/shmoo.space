import type { RichTextElement } from "payload/dist/fields/config/types";

import br from "./br";

const elements: RichTextElement[] = [
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
];

export default elements;
