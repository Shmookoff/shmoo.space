import { cn } from "@/lib";
import type { Project as ProjectT, Technology } from "@/payload/payload-types";
import type { FC } from "react";
import { TechnologyTooltipIcon } from "../technology";
import { Heading5, Muted } from "../ui/complementary/typography";
import ProjectThumbnail from "./thumbnail";

const Project: FC<{ className?: string } & ProjectT> = async ({
  className,
  ...project
}) => {
  const technologies = project.technologies as Technology[];
  return (
    <div
      key={project.id}
      className={cn(
        "group flex gap-5 rounded-lg border-transparent transition-all duration-300 hover:border hover:border-border hover:p-5",
        className,
      )}
    >
      <ProjectThumbnail
        {...project}
        className="mt-1 w-3/12 transition-all duration-300 group-hover:w-5/12"
      />
      <div className="flex w-full flex-col gap-2.5 transition-all">
        <div>
          <Heading5 className="group-hover:bg-gradient group-hover:bg-clip-text group-hover:text-transparent">
            {project.title}
          </Heading5>
          <Muted className="max-w-md">{project.excerpt}</Muted>
        </div>
        <div className="flex gap-2.5">
          {technologies.map((technology) => (
            <TechnologyTooltipIcon key={technology.id} {...technology} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
export { default as ProjectGallery } from "./gallery";
export { default as ProjectGallerySlider } from "./gallery-slider";
export { default as ProjectThumbnail } from "./thumbnail";
