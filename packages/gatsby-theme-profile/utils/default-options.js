// Default options to be used in theme
module.exports = (themeOptions) => {
  const author = themeOptions.author || "";
  const baseUrl = {
    home: themeOptions.baseUrl.home || "/",
    projects: themeOptions.baseUrl.projects || "/projects",
    blog: themeOptions.baseUrl.blog || "/blog",
  };
  const paths = {
    data: themeOptions.paths.data || "content/data",
    assets: themeOptions.paths.assets || "content/assets",
    home: themeOptions.paths.home || "content/home",
    projects: themeOptions.paths.projects || "content/projects",
    blog: themeOptions.paths.blog || "content/blog",
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
