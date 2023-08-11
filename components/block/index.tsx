import { FC } from "react";
import * as Typography from "../ui/complementary/typography";
import * as Blocks from "@/payload/blocks";

const blockToComponent = {
  [Blocks.Heading1.slug]: Typography.Heading1,
  [Blocks.Heading2.slug]: Typography.Heading2,
  [Blocks.Heading3.slug]: Typography.Heading3,
  [Blocks.Heading4.slug]: Typography.Heading4,
  [Blocks.Heading5.slug]: Typography.Heading5,
  [Blocks.Heading6.slug]: Typography.Heading6,
  [Blocks.Blockquote.slug]: Typography.Blockquote,
  [Blocks.Lead.slug]: Typography.Lead,
  [Blocks.Large.slug]: Typography.Large,
  [Blocks.Small.slug]: Typography.Small,
  [Blocks.Muted.slug]: Typography.Muted,
  [Blocks.Paragraph.slug]: Typography.Paragraph,
};

export const Block: FC<{
  text: string;
  id?: string;
  blockName?: string;
  blockType: keyof typeof blockToComponent;
}> = ({ text, blockType }) => {
  const Component = blockToComponent[blockType];
  return <Component>{text}</Component>;
};
