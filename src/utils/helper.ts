export const cleanupObject = (object: object) => {
  return Object.entries(object).reduce((acc, [key, value]) => {
    if (value) return { ...acc, [key]: value };
    return { ...acc };
  }, {});
};

export const urlToSearchParams = (url: string, object: object) =>
  `${url}?${new URLSearchParams(cleanupObject(object)).toString()}`;

export const getInitials = (
  first_name: string | undefined,
  last_name: string | undefined,
) => {
  if (first_name && last_name) {
    return `${first_name.charAt(0)}${last_name.charAt(0)}`;
  }
  return "";
};
