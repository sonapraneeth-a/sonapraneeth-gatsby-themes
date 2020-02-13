// Default options to be used in theme
module.exports = (themeOptions) => {
  // Base url for rendering site
  // Default: "/"
  const baseUrl = themeOptions.baseUrl || "/";
  // Content directory
  // Default: "content/timeline"
  const contentPath = themeOptions.contentPath || "content/timeline";

  return {
    baseUrl,
    contentPath,
  };
};
