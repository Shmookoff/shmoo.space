import { default as Users } from "./Users";
import { default as Technologies, TechnologyIcons } from "./Technologies";
import { default as Projects, ProjectLeadImages } from "./Projects";
import { default as Pages } from "./Pages";
import { default as SocialNetworkIcons } from "./SocialNetworkIcons";
import { default as Media } from "./Media";

const collectionsConfigs = {
  ...Users,
  ...Technologies,
  ...TechnologyIcons,
  ...Projects,
  ...ProjectLeadImages,
  ...Pages,
  ...SocialNetworkIcons,
  ...Media,
} as const;

export default collectionsConfigs;
