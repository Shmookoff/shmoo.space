import path from "path";
import { buildConfig } from "payload/config";
import {
  Users,
  Technologies,
  Projects,
  Pages,
  MenuItems,
  SocialNetworks,
  SocialNetworkIcons,
  Media,
} from "./collections";
import { NavigationMenu, SiteIdentity } from "./globals";

export default buildConfig({
  collections: [
    Users,
    Technologies,
    Projects,
    Pages,
    MenuItems,
    SocialNetworks,
    SocialNetworkIcons,
    Media,
  ],
  globals: [NavigationMenu, SiteIdentity],
  typescript: {
    outputFile: path.resolve(__dirname, "./payload-types.ts"),
  },
});
