import type { Project } from "@/payload/payload-types";
import type { FC } from "react";
import { Large } from "../ui/complementary/typography";
import ProjectGallerySlider from "./gallery-slider";
import { cn } from "@/lib";

const ProjectGallery: FC<{ className?: string } & Project> = ({
  gallery,
  title,
  className,
}) => {
  const galleryClassName = cn(
    "aspect-video overflow-hidden rounded-xl border whitespace-nowrap",
    className,
  );
  return gallery ? (
    <ProjectGallerySlider className={galleryClassName} gallery={gallery} />
  ) : (
    <Large className={galleryClassName}>{title}</Large>
  );
};

export default ProjectGallery;
