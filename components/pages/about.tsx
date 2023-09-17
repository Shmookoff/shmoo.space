import { AboutBlock, Media, Page } from "@/payload/payload-types";
import Image from "next/image";
import { FC } from "react";
import { blockToComponent } from "../block";
import { RichText } from "../rich-text";

const AboutPage: FC<Page & { content: AboutBlock[] }> = ({ content }) => {
  const generalInfo = content[0].generalInfo;
  const richTextContent = content[0].content;
  return (
    <div className="mx-auto flex w-fit flex-col gap-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        <Image
          className="h-28 w-28 object-cover"
          width={512}
          height={512}
          src={(generalInfo.avatar as Media).url!}
          alt={(generalInfo.avatar as Media).alt}
        />
        <div className=" max-w-md">
          {generalInfo.content.map((content, i) => {
            const Block = blockToComponent[content.blockType];
            return <Block key={i}>{content.text}</Block>;
          })}
        </div>
      </div>
      <div className="max-w-md">
        <RichText content={richTextContent} />
      </div>
    </div>
  );
};

export default AboutPage;
