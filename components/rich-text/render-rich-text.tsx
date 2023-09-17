import React, { Fragment } from "react";
import escapeHTML from "escape-html";
import { Text } from "slate";
import {
  Blockquote,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  ListItem,
  OrderedList,
  Paragraph,
  Strikethrough,
  Underline,
  UnorderedList,
} from "@/components/ui/complementary/typography";
import CMSLink from "../cms-link";
import type { RichTextElementName } from "@/payload/fields/richText/elements";
import type { RichTextLeafName } from "@/payload/fields/richText/leaves";
import type { RichTextElementLink } from "./elements/link";

export type Node = (
  | {
      type: Exclude<RichTextElementName, "link">;
      children: Content;
    }
  | RichTextElementLink
) & { [L in RichTextLeafName]?: boolean };

export type Content = Node[] | undefined;

export type CustomRenderers = {
  [N in RichTextElementName as N extends undefined ? "paragraph" : N]?: (args: {
    node: Node;
    Serialize: SerializeFunction;
    index: number;
  }) => JSX.Element;
};

type SerializeFunction = React.FC<{
  content: Content;
  customRenderers?: CustomRenderers;
}>;

export const RenderRichText: SerializeFunction = ({
  content,
  customRenderers,
}) => {
  return (
    <Fragment>
      {content?.map((node, i) => {
        if (Text.isText(node)) {
          let text = (
            <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />
          );

          if (node.bold) {
            text = <Bold key={i}>{text}</Bold>;
          }

          if (node.italic) {
            text = <Italic key={i}>{text}</Italic>;
          }

          if (node.underline) {
            text = <Underline key={i}>{text}</Underline>;
          }

          if (node.strikethrough) {
            text = <Strikethrough key={i}>{text}</Strikethrough>;
          }

          return <Fragment key={i}>{text}</Fragment>;
        }

        if (!node) {
          return null;
        }

        const renderer = node.type
          ? customRenderers?.[node.type]
          : customRenderers?.["paragraph"];

        if (renderer) {
          return renderer({
            node,
            Serialize: RenderRichText,
            index: i,
          });
        }

        switch (node.type) {
          case "br":
            return <br key={i} />;
          case "h1":
            return (
              <Heading1 key={i}>
                <RenderRichText
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </Heading1>
            );
          case "h2":
            return (
              <Heading2 key={i}>
                <RenderRichText
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </Heading2>
            );
          case "h3":
            return (
              <Heading3 key={i}>
                <RenderRichText
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </Heading3>
            );
          case "h4":
            return (
              <Heading4 key={i}>
                <RenderRichText
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </Heading4>
            );
          case "h5":
            return (
              <Heading5 key={i}>
                <RenderRichText
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </Heading5>
            );
          case "h6":
            return (
              <Heading6 key={i}>
                <RenderRichText
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </Heading6>
            );
          case "blockquote":
            return (
              <Blockquote key={i}>
                <RenderRichText
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </Blockquote>
            );
          case "ul":
            return (
              <UnorderedList key={i}>
                <RenderRichText
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </UnorderedList>
            );
          case "ol":
            return (
              <OrderedList key={i}>
                <RenderRichText
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </OrderedList>
            );
          case "li":
            return (
              <ListItem key={i}>
                <RenderRichText
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </ListItem>
            );
          case "link":
            const { children, ...rest } = node;
            return (
              <CMSLink key={i} {...rest}>
                <RenderRichText
                  content={children}
                  customRenderers={customRenderers}
                />
              </CMSLink>
            );
          default:
            return (
              <Paragraph key={i}>
                <RenderRichText
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </Paragraph>
            );
        }
      })}
    </Fragment>
  );
};
