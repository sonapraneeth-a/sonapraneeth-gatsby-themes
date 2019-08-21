// Default options to be used in theme
module.exports = (themeOptions) => {
  // Base url for rendering site
  // Default: "/"
  const baseUrl = themeOptions.baseUrl || "/";
  // empty as this value must be provided by theme user
  // Default: ""
  const author = themeOptions.author || "";
  // Data directory
  // Default: "content/data"
  const dataPath = themeOptions.dataPath || "content/data";
  // Directory path for images
  // Default: "content/assets"
  const assetsPath = themeOptions.assetsPath || "content/assets";
  // Directory path for MDX home page content
  // Default: "content/home"
  const homePath = themeOptions.homePath || "content/home";
  // Configure MDX. true would defaults of the theme
  // Default: true
  const mdx = themeOptions.mdx || true;

  return {
    baseUrl,
    author,
    dataPath,
    assetsPath,
    homePath,
    mdx,
  };
};
