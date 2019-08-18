const merge = require("deepmerge");

module.exports = (themeOptions) => {
  // Default options to be used in theme
  const defaultOptions = {
    // URLs
    baseUrl: {
      home: "/",
      projects: "/projects",
      blog: "/blog",
    },
    paths: {
      data: "content/data",
      assets: "content/assets",
      home: "content/home",
      projects: "content/projects",
      blog: "content/blog",
    },
  };
  // Options created using default and provided options
  const options = merge(defaultOptions, themeOptions);
  return {
    siteMetadata: {
      appName: "@sonapraneeth/profile package",
      title: "@sonapraneeth/profile package",
      author: "John Doe",
      // TODO: Need to change this URL
      siteUrl: "/",
      description:
        "This site is a demonstration for using theme " +
        "@sonapraneeth/profile",
      social: {
        twitter: "john-doe",
      },
    },
    plugins: [
      {
        resolve: "@sonapraneeth/bio",
        options: {
          baseUrl: options.baseUrl,
          dataPath: options.dataPath,
          assetsPath: options.assetsPath,
          homePath: options.homePath,
        },
      },
      {
        resolve: "@sonapraneeth/project",
        options: {
          baseUrl: options.projectsUrl,
          contentPath: options.projectPath,
        },
      },
      {
        resolve: "@sonapraneeth/blog",
        options: {
          baseUrl: options.blogsUrl,
          contentPath: options.blogPath,
        },
      },
    ],
  };
};
