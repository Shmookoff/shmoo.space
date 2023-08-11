export const computeLocation = (location?: string[]) => {
  if (!location) return "/";
  else return `/${location.join("/")}`;
};
