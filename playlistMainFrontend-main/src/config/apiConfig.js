const removeTrailingSlash = (url) => {
  if (!url) return "";
  return url.replace(/\/+$/, "");
};

export const API_BASE_URL = removeTrailingSlash(
  process.env.REACT_APP_API_BASE_URL || "http://localhost:4000"
);

export const SESSION_API_BASE_URL = removeTrailingSlash(
  process.env.REACT_APP_SESSION_API_BASE_URL || "http://localhost:5001"
);

export const SESSION_API_KEY =
  process.env.REACT_APP_SESSION_API_KEY || "local-dev-key-123";