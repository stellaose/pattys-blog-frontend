export const buildQueryUrl = (baseUrl: string, params?: Record<string, any>) => {
  if (!params) return baseUrl;

  const searchParams = new URLSearchParams();

  const appendParams = (obj: Record<string, any>, prefix = "") => {
    Object.entries(obj).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;

      const paramKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === "object" && !Array.isArray(value)) {
        appendParams(value, paramKey); // ✅ recursively handle nested keys
      } else {
        searchParams.append(paramKey, String(value));
      }
    });
  };

  appendParams(params);

  const queryString = searchParams.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};

