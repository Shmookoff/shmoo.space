import { blockToComponent } from "@/components/block";
import { generateCollectionCacheTag } from "@/lib";
import { computeLocation1 } from "@/lib/utils/compute-location";
import payloadClient from "@/lib/utils/payload-client";
import { redirect } from "next/navigation";
import type { FC } from "react";

const LocationPage: FC<{ params: { location?: string } }> = async ({
  params,
}) => {
  const location = computeLocation1(params.location);
  const page = await payloadClient.collections.pages
    .find(
      { where: { location: { equals: location } } },
      {
        byField: "location",
        additionalTags: [generateCollectionCacheTag("pages")],
      },
    )
    .then((res) => res.docs[0]);

  if (page) {
    const Component = blockToComponent[page.content[0].blockType];
    return <Component {...(page as any)} />;
  }

  redirect("/");
};

export default LocationPage;
