import type { Technology, TechnologyIcon } from "@/payload/payload-types";
import { FC } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Image from "next/image";

const TechnologyTooltipIcon: FC<Technology> = ({ icon, title }) => (
  <Tooltip>
    <TooltipTrigger className="select-none">
      <Image
        src={(icon as TechnologyIcon).url!}
        width={24}
        height={24}
        alt={title}
      />
    </TooltipTrigger>
    <TooltipContent>{title}</TooltipContent>
  </Tooltip>
);

export default TechnologyTooltipIcon;
