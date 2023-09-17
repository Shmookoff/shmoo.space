"use client";

import Image from "next/image";
import type { Project, ProjectLeadImage } from "@/payload/payload-types";
import Slider from "../slider";
import { FC } from "react";
import Autoplay from "embla-carousel-autoplay";

const ProjectGallerySlider: FC<{
  gallery: NonNullable<Project["gallery"]>;
  className?: string;
}> = ({ gallery, className }) => {
  return (
    <Slider
      options={{ loop: true }}
      className={className}
      plugins={[Autoplay({ stopOnMouseEnter: true })]}
    >
      {gallery.map((image) => (
        <Image
          key={image.id}
          src={(image.image as ProjectLeadImage).url!}
          alt=""
          width={1440}
          height={810}
        />
      ))}
    </Slider>
  );
};

export default ProjectGallerySlider;
