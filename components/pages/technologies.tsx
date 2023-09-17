import payloadClient from "@/lib/utils/payload-client";
import {
  Page,
  TechnologiesBlock,
  TechnologyIcon,
} from "@/payload/payload-types";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Heading5 } from "../ui/complementary/typography";

const TechnologiesPage: FC<
  Page & { content: TechnologiesBlock[] }
> = async () => {
  const technologies = await payloadClient.collections.technologies
    .find()
    .then((res) => res.docs);
  const siteSettings = await payloadClient.globals.siteSettings.find();
  const parent = siteSettings.pageMapping.technologies.parent as Page;

  return (
    <div className="grid w-full items-stretch gap-8 md:grid-cols-3">
      {technologies.map((technology) => (
        <Link
          key={technology.id}
          href={`${parent.location}/${technology.slug}`}
          className="flex flex-col items-center gap-2 rounded-xl border bg-card p-10 shadow-sm transition-all hover:bg-muted/50 hover:shadow-md"
        >
          <Image
            src={(technology.icon as TechnologyIcon).url!}
            alt=""
            width={64}
            height={64}
          />
          <Heading5>{technology.title}</Heading5>
        </Link>
      ))}
    </div>
  );
};

export default TechnologiesPage;
