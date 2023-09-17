"use client";

import useEmblaCarousel, {
  type EmblaOptionsType,
  type EmblaPluginType,
} from "embla-carousel-react";
import type { FC, ReactNode } from "react";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib";

const Slider: FC<{
  children: ReactNode;
  className?: string;
  options?: EmblaOptionsType;
  plugins?: EmblaPluginType[];
}> = ({ children, className, options, plugins }) => {
  const [sliderRef, slider] = useEmblaCarousel(options, plugins);

  return (
    <div ref={sliderRef} className={cn("overflow-hidden", className)}>
      <div className="flex">
        {React.Children.map(children, (child) => (
          <div className="min-w-0 flex-[0_0_100%]">{child}</div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
