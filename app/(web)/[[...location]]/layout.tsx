import getPayloadClient from "@/payload/payloadClient";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Page } from "@/payload/payload-types";
import { computeLocation } from "./utils";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { location?: string[] };
}) {
  const payload = await getPayloadClient();

  const siteIdentity = await payload.findGlobal({ slug: "siteIdentity" });

  const navigationMenu = await payload.findGlobal({ slug: "navigationMenu" });
  const location = computeLocation(params.location);

  return (
    <div className="mx-auto flex min-h-screen max-w-screen-xl gap-16 px-16">
      <nav className="sticky top-0 flex max-h-screen w-1/4 flex-col justify-between gap-8 py-16">
        <div>
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
            {siteIdentity.title}
          </h1>
          <h2 className="text-lg font-medium tracking-tight">
            {siteIdentity.subtitle}
          </h2>
        </div>
        <div className="flex grow flex-col gap-4">
          {navigationMenu.items.map((menuItem) => {
            const page = menuItem.page as Page;

            return (
              <Link
                className={
                  "group peer transition-all " +
                  (location === page.location ? "grow" : "hover:grow")
                }
                href={page.location}
                key={menuItem.id}
              >
                <Card
                  className={
                    "h-full transition-all " +
                    (location === page.location
                      ? ""
                      : "border-transparent shadow-none group-hover:border-border group-hover:shadow-sm")
                  }
                >
                  <CardHeader>
                    <CardTitle>{menuItem.title}</CardTitle>
                    <CardDescription className="overflow-hidden text-ellipsis whitespace-nowrap group-hover:whitespace-normal">
                      {menuItem.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
        <div>v</div>
      </nav>
      <main className="mx-8 grow py-16">{children}</main>
    </div>
  );
}
