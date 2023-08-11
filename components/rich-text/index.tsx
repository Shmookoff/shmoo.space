import { cn } from "@/lib/utils";
import { RenderRichText } from "./render-rich-text";
import { FC } from "react";

const RichText: FC<{
  className?: string;
  content:
    | {
        [k: string]: unknown;
      }[]
    | undefined;
}> = ({ className, content }) => {
  if (!content) return null;

  return (
    <div className={cn("", className)}>
      <RenderRichText content={content as any} />
    </div>
  );
};

export { RichText };
