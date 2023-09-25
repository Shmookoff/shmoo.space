import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heading3 } from "@/components/ui/complementary/typography";
import { computeLocation1 } from "@/lib/utils/compute-location";
import payloadClient from "@/lib/utils/payload-client";
import { Page, SocialNetworkIcon } from "@/payload/payload-types";
import { getPayloadClientBuildTime } from "@/payload/payloadClient";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export const generateStaticParams = async () => {
  const payload = await getPayloadClientBuildTime();
  if (!payload) return [{ location: "" }];

  const pages = await payload.find({ collection: "pages" });
  return pages.docs
    .filter((page) => page.location !== "/")
    .map(({ location }) => ({ location: location.slice(1) }));
};

const ParentLayout: FC<{
  children: React.ReactNode;
  params: { location?: string };
}> = async ({ children, params }) => {
  const siteIdentity = await payloadClient.globals.siteIdentity.find();

  const location = computeLocation1(params.location);

  return (
    <div className="container grid min-h-screen grid-cols-1 grid-rows-[min-content_auto] lg:grid-cols-4 lg:grid-rows-1 lg:gap-x-12">
      <nav className="flex max-h-screen flex-col gap-2 py-4 lg:sticky lg:top-0 lg:gap-8 lg:py-12">
        <div className="flex flex-row flex-wrap items-end gap-x-2 lg:flex-col lg:items-start">
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
            {siteIdentity.title}
          </h1>
          <h2 className="text-lg font-medium tracking-tight">
            {siteIdentity.subtitle}
          </h2>
        </div>
        <div className="group flex grow flex-wrap gap-x-2 lg:max-h-96 lg:flex-col lg:flex-nowrap">
          {siteIdentity.navigationMenuItems?.map((menuItem) => {
            const page = menuItem.page as Page;
            const isCurrent = location === page.location;

            return (
              <>
                <Link
                  className="lg:hidden"
                  href={page.location}
                  key={menuItem.id}
                >
                  <Heading3
                    className={
                      isCurrent
                        ? "bg-gradient bg-clip-text text-transparent "
                        : ""
                    }
                  >
                    {menuItem.title}
                  </Heading3>
                </Link>
                <Link
                  className={
                    "group/item peer hidden pb-4 transition-all last:pb-0 lg:block " +
                    (isCurrent
                      ? "grow animate-active-navigation-menu-item-enter hover:!grow group-hover:grow-0"
                      : "hover:grow")
                  }
                  href={page.location}
                  key={menuItem.id}
                >
                  <Card
                    className={
                      "h-full transition-all " +
                      (isCurrent
                        ? "bg-gradient"
                        : "border-transparent shadow-none group-hover/item:border-border group-hover/item:shadow-sm")
                    }
                  >
                    <CardHeader>
                      <CardTitle
                        className={
                          isCurrent ? "text-gradient-foreground" : undefined
                        }
                      >
                        {menuItem.title}
                      </CardTitle>
                      <CardDescription
                        className={
                          isCurrent
                            ? "text-muted"
                            : "overflow-hidden text-ellipsis whitespace-nowrap group-hover/item:whitespace-normal"
                        }
                      >
                        {menuItem.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </>
            );
          })}
        </div>
        <div className="flex grow items-end gap-5">
          {siteIdentity.socialNetworkItems?.map((socialNetwork) => (
            <Link key={socialNetwork.id} href={socialNetwork.url}>
              <Image
                src={(socialNetwork.icon as SocialNetworkIcon).url!}
                alt={socialNetwork.title}
                width={24}
                height={24}
                className="brightness-0 transition-all hover:brightness-100"
              />
            </Link>
          ))}
        </div>
      </nav>
      <main className="col-span-3  py-4 lg:py-12">{children}</main>
    </div>
  );
};

export default ParentLayout;
