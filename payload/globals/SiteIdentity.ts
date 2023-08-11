import { GlobalConfig } from "payload/types";
import { Global } from "./globals";

const SiteIdentity: GlobalConfig = {
  slug: Global.SITE_IDENTITY,
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
  ],
};

export default SiteIdentity;
