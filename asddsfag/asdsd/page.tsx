import { blockToComponent } from "@/components/block";
import DefaultLayout from "@/components/layout/default";
import ItemLayout from "@/components/layout/item";
import { computeLocation } from "@/lib";
import type { Page } from "@/payload/payload-types";
import getPayloadClient from "@/payload/payloadClient";
import { redirect } from "next/navigation";
import type { FC } from "react";

const HomePage: FC<{ params: { location?: string[] } }> = async ({
  params,
}) => {
  const location = computeLocation(params.location);
  const payload = await getPayloadClient();

  const page = await payload
    .find({
      collection: "pages",
      where: { location: { equals: location } },
    })
    .then((pages) => pages.docs.at(0));

  if (page) {
    const Component = blockToComponent[page.content[0].blockType];
    return (
      <DefaultLayout params={params}>
        <Component {...(page as any)} />
      </DefaultLayout>
    );
  }

  const siteSettings = await payload.findGlobal({ slug: "siteSettings" });

  for (const pageMappingEntry of Object.values(siteSettings.pageMapping)) {
    const slug = location.match(
      new RegExp(
        `\\${(pageMappingEntry.parent as Page).location}\/(?<slug>.+)`,
      ),
    )?.groups?.slug;
    if (slug) {
      const Component =
        blockToComponent[pageMappingEntry.singlePage[0].blockType];
      return <Component slug={slug} />;
    }
  }

  redirect("/");
};

export default HomePage;
