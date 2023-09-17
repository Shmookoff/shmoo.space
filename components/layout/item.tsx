import type { FC, ReactNode } from "react";
import CMSLink from "../cms-link";
import { Heading1, Muted } from "../ui/complementary/typography";
import { ArrowLeft } from "lucide-react";
import type { Page } from "@/payload/payload-types";

const ItemLayout: FC<{
  children: ReactNode;
  parentPage: Page;
  title: ReactNode;
}> = async ({ children, parentPage, title }) => {
  return (
    <div className="flex min-h-screen flex-col ">
      <div className="container pt-5">
        <CMSLink
          linkType="internal"
          doc={{ relationTo: "pages", value: parentPage }}
        >
          <Muted className="flex items-center gap-1">
            <ArrowLeft size={16} />
            {parentPage.title}
          </Muted>
        </CMSLink>
      </div>
      <div className="sticky top-0 z-10 bg-background/80 shadow-sm backdrop-blur-xl backdrop-saturate-150">
        <div className="container py-5">{title}</div>
      </div>
      <div className="grow bg-muted">{children}</div>
    </div>
  );
};

export default ItemLayout;
