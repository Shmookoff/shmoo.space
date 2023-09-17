import type { Page, Technology, TechnologyIcon } from "@/payload/payload-types";
import Image from "next/image";
import { redirect } from "next/navigation";
import type { FC } from "react";
import CMSLink from "../cms-link";
import { ProjectGallery } from "../project";
import { RichText } from "../rich-text";
import { Heading1, Heading2, Lead } from "../ui/complementary/typography";
import { FolderGit2, Home, ExternalLink } from "lucide-react";
import ItemLayout from "../layout/item";
import payloadClient from "@/lib/utils/payload-client";

const SingleProjectPage: FC<{ slug: string }> = async ({ slug }) => {
  const project = await payloadClient.collections.projects
    .find({ where: { slug: { equals: slug } } }, { byField: "slug" })
    .then((res) => res.docs[0]);
  const siteSettings = await payloadClient.globals.siteSettings.find();

  const parentPage = siteSettings.pageMapping.projects.parent as Page;
  if (!project) redirect(parentPage.location);

  return (
    <ItemLayout
      parentPage={parentPage}
      title={<Heading1>{project.title}</Heading1>}
    >
      <div className="container grid gap-12 py-12 lg:grid-cols-[1fr_min-content] lg:grid-rows-[min-content_1fr]">
        <div className="flex flex-col items-center gap-4">
          <ProjectGallery
            className="w-full border-2 bg-background shadow-md transition-all hover:shadow-lg"
            {...project}
          />
          <Lead>{project.excerpt}</Lead>
        </div>
        <div className="h-fit lg:sticky lg:top-32 lg:col-start-2 lg:row-span-2">
          <div className="flex flex-col gap-12">
            {project.links && (
              <div className="flex flex-col gap-6">
                <Heading2 className="w-fit">Links</Heading2>
                <div className="flex flex-col gap-2.5">
                  {project.links.map((link) => (
                    <CMSLink
                      key={link.id}
                      linkType="custom"
                      url={link.value}
                      newTab
                    >
                      <div className="flex gap-2">
                        {link.type === "git" ? (
                          <FolderGit2 size={24} />
                        ) : link.type === "homepage" ? (
                          <Home />
                        ) : (
                          <ExternalLink />
                        )}
                        {link.value.replace(/^https?:\/\//, "")}
                      </div>
                    </CMSLink>
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-col gap-6">
              <Heading2 className="w-fit">Technologies</Heading2>
              <div className="flex flex-col gap-2.5">
                {(project.technologies as Technology[]).map((technology) => (
                  <div key={technology.id} className="flex items-center gap-2">
                    <Image
                      src={(technology.icon as TechnologyIcon).url!}
                      alt=""
                      width={24}
                      height={24}
                    />
                    <CMSLink
                      linkType="internal"
                      doc={{ value: technology, relationTo: "technologies" }}
                    >
                      {technology.title}
                    </CMSLink>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-6 justify-self-center lg:row-start-2 lg:max-w-2xl">
          <Heading2 className="w-fit">Description</Heading2>
          <RichText content={project.description} />
        </div>
      </div>
    </ItemLayout>
  );
};

export default SingleProjectPage;
