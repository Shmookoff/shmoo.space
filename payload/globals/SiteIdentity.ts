import { type GlobalConfig, GLOBAL } from "./globals";
import { COLLECTION } from "../collections/collections";
import { RowLabelFunction } from "payload/dist/admin/components/forms/RowLabel/types";
import requestRevalidation from "../revalidate";

const SiteIdentity = {
  [GLOBAL.SITE_IDENTITY]: {
    fields: [
      {
        type: "text",
        name: "title",
        required: true,
      },
      {
        type: "text",
        name: "subtitle",
        required: true,
      },
      {
        type: "array",
        name: "navigationMenuItems",
        admin: {
          components: {
            RowLabel: (({ data, index }) =>
              data?.title || `Item ${index}`) as RowLabelFunction,
          },
        },
        fields: [
          {
            type: "text",
            name: "title",
            required: true,
            unique: true,
          },
          {
            type: "textarea",
            name: "description",
            required: true,
          },
          {
            type: "relationship",
            name: "page",
            relationTo: COLLECTION.PAGES,
            required: true,
          },
        ],
      },
      {
        type: "array",
        name: "socialNetworkItems",
        fields: [
          {
            type: "text",
            name: "title",
            required: true,
            unique: true,
          },
          {
            type: "text",
            name: "url",
            required: true,
          },
          {
            type: "upload",
            name: "icon",
            relationTo: COLLECTION.SOCIAL_NETWORK_ICONS,
            required: true,
            unique: true,
          },
        ],
      },
    ],
    hooks: {
      afterChange: [
        () => {
          requestRevalidation({ tag: GLOBAL.SITE_IDENTITY });
        },
      ],
    },
  },
} satisfies GlobalConfig;

export default SiteIdentity;
