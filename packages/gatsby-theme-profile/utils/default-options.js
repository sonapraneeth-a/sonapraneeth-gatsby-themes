// Default options to be used in theme
module.exports = (themeOptions) => {
  const author = themeOptions.author || "";
  const baseUrl = {
    home: themeOptions.baseUrl.home || "/",
    projects: themeOptions.baseUrl.home || "/projects",
    blog: themeOptions.baseUrl.home || "/blog",
  };
  const paths = {
    data: themeOptions.paths.data || "content/data",
    assets: themeOptions.paths.data || "content/assets",
    home: themeOptions.paths.data || "content/home",
    projects: themeOptions.paths.data || "content/projects",
    blog: themeOptions.paths.data || "content/blog",
  };
  // Configure MDX. true would defaults of the theme
  // Default: true
  const mdx = themeOptions.mdx || true;

  return {
    author,
    baseUrl,
    paths,
    mdx,
  };
};
