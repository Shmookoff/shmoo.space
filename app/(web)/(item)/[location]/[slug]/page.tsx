import { blockToComponent } from "@/components/block";
import payloadClient from "@/lib/utils/payload-client";
import type { Page } from "@/payload/payload-types";
import { getPayloadClientBuildTime } from "@/payload/payloadClient";
import { redirect } from "next/navigation";
import type { FC } from "react";

export const generateStaticParams = async () => {
  const payload = await getPayloadClientBuildTime();
  if (!payload) return [];

  const siteSettings = await payload.findGlobal({ slug: "siteSettings" });

  const projectsLocation = (
    siteSettings.pageMapping.projects.parent as Page
  ).location.slice(1);
  const projects = await payload.find({ collection: "projects" });

  const technologiesLocation = (
    siteSettings.pageMapping.technologies.parent as Page
  ).location.slice(1);
  const technologies = await payload.find({ collection: "technologies" });

  return [
    ...projects.docs.map((project) => ({
      location: projectsLocation,
      slug: project.slug,
    })),
    ...technologies.docs.map((technology) => ({
      location: technologiesLocation,
      slug: technology.slug,
    })),
  ];
};

const ItemPage: FC<{ params: { location: string; slug: string } }> = async ({
  params,
}) => {
  const siteSettings = await payloadClient.globals.siteSettings.find();

  for (const pageMappingEntry of Object.values(siteSettings.pageMapping)) {
    if (`/${params.location}` === (pageMappingEntry.parent as Page).location) {
      const Component =
        blockToComponent[pageMappingEntry.singlePage[0].blockType];
      return <Component slug={params.slug} />;
    }
  }

  redirect("/");
};

export default ItemPage;
