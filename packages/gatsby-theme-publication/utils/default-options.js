// Default options to be used in theme
module.exports = (themeOptions) => {
  // Base url for rendering site
  // Default: "/"
  const baseUrl = themeOptions.baseUrl || "/";
  // Content directory
  // Default: "content/publications"
  const contentPath = themeOptions.contentPath || "content/publications";

  return {
    baseUrl,
    contentPath,
  };
};
