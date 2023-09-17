export const computeLocation = (location?: string[]) => {
  if (!location) return "/";
  else return `/${location.join("/")}`;
};

export const computeLocation1 = (location?: string) => {
  if (!location) return "/";
  else return `/${location}`;
};
