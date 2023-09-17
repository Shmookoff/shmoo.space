"use client";

import { RichTextCustomElement } from "payload/types";
import Button from "./Button";
import Element from "./Element";
import plugin from "./plugin";

const br = {
  name: "br" as const,
  Button: Button,
  Element: Element,
  plugins: [plugin],
} satisfies RichTextCustomElement;

export default br;
