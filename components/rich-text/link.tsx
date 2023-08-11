import { FC } from "react";
import { Config } from "@/payload/payload-types";
import type { Node } from "./render-rich-text";

type Collections = Config["collections"];

type LinkOptions = (
  | {
      linkType: "internal";
      doc: {
        [Slug in keyof Collections]: {
          value: Collections[Slug];
          relationTo: Slug;
        };
      }[keyof Collections];
    }
  | {
      linkType: "custom";
      url: string;
    }
) & { newTab?: boolean; children: Node[] };

export const Link: FC<LinkOptions> = (options) => {
  if (options.linkType === "internal") {
    options.doc.relationTo === "pages";
  }
  return <></>;
};
