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
import util from "util";

export type Node = {
  type: string;
  value?: {
    url: string;
    alt: string;
  };
  children?: Node[];
  url?: string;
  [key: string]: unknown;
  newTab?: boolean;
};

export type CustomRenderers = {
  [key: string]: (args: {
    node: Node;
    Serialize: SerializeFunction;
    index: number;
  }) => JSX.Element;
};

type SerializeFunction = React.FC<{
  content?: Node[];
  customRenderers?: CustomRenderers;
}>;

const isText = (value: any): boolean =>
  typeof value === "object" && value !== null && typeof value.text === "string";

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

        if (
          customRenderers &&
          customRenderers[node.type] &&
          typeof customRenderers[node.type] === "function"
        ) {
          return customRenderers[node.type]({
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
          case "quote":
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
            console.log(util.inspect({ node }, false, null, true));

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
