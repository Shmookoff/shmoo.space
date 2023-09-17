import { default as SiteIdentity } from "./SiteIdentity";
import { default as SiteSettings } from "./SiteSettings";

const globalsConfigs = {
  ...SiteIdentity,
  ...SiteSettings,
};

export default globalsConfigs;
