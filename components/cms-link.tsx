import type { Collections, CollectionsConfigs } from "@/lib";
import { cn, generateCollectionCacheTag } from "@/lib";
import type { Page } from "@/payload/payload-types";
import getPayloadClient from "@/payload/payloadClient";
import { unstable_cache } from "next/cache";
import Link from "next/link";
import type { FC, ReactNode } from "react";

type RichLinkEnabledCollections = {
  [Slug in keyof Collections as CollectionsConfigs[Slug] extends {
    admin: { enableRichTextLink: false };
  }
    ? never
    : Slug]: Collections[Slug];
};

export type CMSLinkOptionsLinkType =
  | {
      linkType: "internal";
      doc: {
        [Slug in keyof RichLinkEnabledCollections]: {
          value: RichLinkEnabledCollections[Slug];
          relationTo: Slug;
        };
      }[keyof RichLinkEnabledCollections];
    }
  | {
      linkType: "custom";
      url: string;
    };

export type CMSLinkOptions = CMSLinkOptionsLinkType & {
  newTab?: boolean;
  children: ReactNode;
  className?: string;
};

const generateHref = async (options: CMSLinkOptionsLinkType) => {
  switch (options.linkType) {
    case "custom":
      return options.url;
    case "internal":
      switch (options.doc.relationTo) {
        case "pages":
          return options.doc.value.location;
        case "projects":
        case "technologies":
          const payload = await getPayloadClient();
          const settings = await payload.findGlobal({ slug: "siteSettings" });
          const slug = await unstable_cache(
            async (slug) => slug,
            [`${options.doc.relationTo}-${options.doc.value.id}-slug`],
            {
              tags: [
                generateCollectionCacheTag(options.doc.relationTo, {
                  field: "slug",
                  value: options.doc.value.slug,
                }),
              ],
            },
          )(options.doc.value.slug);
          return `${
            (settings.pageMapping[options.doc.relationTo].parent as Page)
              .location
          }/${slug}`;
        case "media":
          return options.doc.value.url!;
        default:
          return "";
      }
  }
};

const CMSLink: FC<CMSLinkOptions> = async (options) => {
  const className = cn(
    "font-medium underline underline-offset-4",
    options.className,
  );
  const href = await generateHref(options);
  const newTabProps = options.newTab
    ? { target: "_blank", rel: "noopener" }
    : {};
  if (href.indexOf("/") === 0) {
    return (
      <Link href={href} {...newTabProps} className={className}>
        {options.children}
      </Link>
    );
  }
  return (
    <a href={href} {...newTabProps} className={className}>
      {options.children}
    </a>
  );
};

export default CMSLink;
