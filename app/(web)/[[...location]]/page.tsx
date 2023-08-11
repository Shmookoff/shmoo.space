import getPayloadClient from "@/payload/payloadClient";
import { redirect } from "next/navigation";
import { computeLocation } from "./utils";
import { RichText } from "@/components/rich-text";
import { Media } from "@/payload/payload-types";
import Image from "next/image";
import { Block } from "@/components/block";

const HomePage = async ({ params }: { params: { location?: string[] } }) => {
  const payload = await getPayloadClient();

  const location = computeLocation(params.location);

  const pages = await payload.find({
    collection: "pages",
    where: { location: { equals: location } },
  });

  const page = pages.docs.at(0);

  if (!page) {
    redirect("/");
  }

  return (
    <div className="flex flex-col gap-8">
      {page.content.map((block) => (
        <>
          <div className="flex gap-8">
            <Image
              className="h-28 w-28"
              width={112}
              height={112}
              src={(block.generalInfo.avatar as Media).url!}
              alt={(block.generalInfo.avatar as Media).alt}
            />
            <div className="min-w-[28rem] max-w-md">
              {block.generalInfo.content.map((content, i) => (
                <Block key={i} {...content} />
              ))}
            </div>
          </div>
          <div className="max-w-md">
            <RichText content={block.content} />
          </div>
        </>
      ))}
    </div>
  );
};

export default HomePage;
