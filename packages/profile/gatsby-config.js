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
      appName: "Demo of gatsby-theme-simple-bio",
      title: "Demo of gatsby-theme-simple-bio",
      author: "John Doe",
      siteUrl: "https://gatsby-theme-simple-bio.netlify.com/",
      description:
        "This site is a demonstration for using theme " +
        "gatsby-theme-simple-bio",
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
