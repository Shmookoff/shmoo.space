import type { FC } from "react";
import { ProjectThumbnail } from "../project";
import Link from "next/link";
import { Page, ProjectsBlock, Technology } from "@/payload/payload-types";
import { Heading4, Lead } from "../ui/complementary/typography";
import { TechnologyTooltipIcon } from "../technology";
import payloadClient from "@/lib/utils/payload-client";

const ProjectsPage: FC<Page & { content: ProjectsBlock[] }> = async () => {
  const projects = await payloadClient.collections.projects.find();
  const siteSettings = await payloadClient.globals.siteSettings.find();

  return (
    <div className="flex flex-col gap-12">
      {projects.docs.map((project) => {
        const href = `${
          (siteSettings.pageMapping.projects.parent as Page).location
        }/${project.slug}`;
        return (
          <div
            key={project.id}
            className="grid-rows-[repeat(6, auto)] group relative grid  grid-cols-12 items-center gap-y-4 lg:grid-rows-1"
          >
            <div className="relative col-span-full row-start-1 row-end-3 block py-[9px] transition-all group-odd:pr-[32px] group-even:pl-[32px] group-hover:p-0 md:group-odd:col-start-1 md:group-odd:col-end-8 md:group-even:col-start-5 md:group-even:col-end-13 lg:row-start-1 lg:row-end-1">
              <Link href={href}>
                <ProjectThumbnail
                  className="shadow-sm transition-all group-hover:shadow-md"
                  {...project}
                />
              </Link>
            </div>
            <div className="relative col-span-full row-start-2 row-end-7 block px-2 lg:row-start-1 lg:row-end-1 lg:px-0 lg:group-odd:col-start-5 lg:group-odd:col-end-13 lg:group-even:col-start-1 lg:group-even:col-end-8">
              <div className="flex flex-col gap-2 rounded-lg border bg-accent/20 p-5 shadow-sm backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 hover:bg-accent/40 lg:shadow-md">
                <div>
                  <Link href={href}>
                    <Heading4 className="w-fit text-4xl font-bold hover:bg-gradient hover:bg-clip-text hover:text-transparent">
                      {project.title}
                    </Heading4>
                  </Link>
                  <Lead>{project.excerpt}</Lead>
                </div>
                <div className="flex gap-2">
                  {(project.technologies as Technology[]).map((technology) => (
                    <Link
                      key={technology.id}
                      href={`${
                        (siteSettings.pageMapping.technologies.parent as Page)
                          .location
                      }/${technology.slug}`}
                    >
                      <TechnologyTooltipIcon {...technology} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectsPage;
