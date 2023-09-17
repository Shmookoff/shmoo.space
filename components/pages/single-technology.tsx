import payloadClient from "@/lib/utils/payload-client";
import { Page, TechnologyIcon } from "@/payload/payload-types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { FC } from "react";
import ItemLayout from "../layout/item";
import { ProjectThumbnail } from "../project";
import {
  Heading1,
  Heading2,
  Heading5,
  Muted,
} from "../ui/complementary/typography";

const SingleTechnologyPage: FC<{ slug: string }> = async ({ slug }) => {
  const technology = await payloadClient.collections.technologies
    .find({ where: { slug: { equals: slug } } }, { byField: "slug" })
    .then((res) => res.docs[0]);
  const siteSettings = await payloadClient.globals.siteSettings.find();

  const parentPage = siteSettings.pageMapping.technologies.parent as Page;

  if (!technology) redirect("/");

  const linkedProjects = await payloadClient.collections.projects
    .find(
      { where: { technologies: { equals: technology.id } } },
      { byField: "technologies" },
    )
    .then((res) => res.docs);

  return (
    <ItemLayout
      parentPage={parentPage}
      title={
        <div className="flex gap-4">
          <Image
            src={(technology.icon as TechnologyIcon).url!}
            alt=""
            width={48}
            height={48}
          />
          <Heading1>{technology.title}</Heading1>
        </div>
      }
    >
      <div className="container flex justify-center gap-12">
        <div className="flex max-w-4xl flex-col gap-8 py-12">
          <Heading2 className="w-fit">Projects using this technology</Heading2>
          <div className="grid gap-4 lg:grid-cols-3 ">
            {linkedProjects.map((project) => (
              <Link
                key={project.id}
                href={`${
                  (siteSettings.pageMapping.projects.parent as Page).location
                }/${project.slug}`}
              >
                <div className="flex flex-col gap-2 rounded-lg border bg-background px-3.5 py-4 shadow-sm transition-all hover:shadow-md">
                  <ProjectThumbnail {...project} />
                  <div>
                    <Heading5>{project.title}</Heading5>
                    <Muted>{project.excerpt}</Muted>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </ItemLayout>
  );
};

export default SingleTechnologyPage;
