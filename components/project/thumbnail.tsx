import { cn } from "@/lib";
import type { Project, ProjectLeadImage } from "@/payload/payload-types";
import Image from "next/image";
import type { FC } from "react";
import { Large } from "../ui/complementary/typography";

const ProjectThumbnail: FC<{ className?: string } & Project> = ({
  gallery,
  title,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex aspect-video items-center justify-center overflow-hidden rounded-lg border",
        className,
      )}
    >
      {gallery ? (
        <Image
          src={(gallery[0].image as ProjectLeadImage).url!}
          alt=""
          width={1440}
          height={810}
        />
      ) : (
        <Large className="overflow-hidden whitespace-nowrap">{title}</Large>
      )}
    </div>
  );
};

export default ProjectThumbnail;
