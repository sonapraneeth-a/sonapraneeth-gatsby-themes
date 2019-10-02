const withDefaults = require("./utils/default-options");

module.exports = (themeOptions) => {
  // Options created using default and provided options
  const options = withDefaults(themeOptions);
  const {mdx = true} = themeOptions;
  return {
    // Default siteMetadata
    siteMetadata: {
      appName: "@sonapraneeth/gatsby-theme-bio package",
      title: "@sonapraneeth/gatsby-theme-bio package",
      author: "John Doe",
      // TODO: Need to change this URL
      siteUrl: "/",
      baseUrl: "/",
      description:
        "This site is a demonstration for using theme " +
        "@sonapraneeth/gatsby-theme-bio",
      social: {
        facebook: "john-doe",
        twitter: "john-doe",
        email: "john-doe",
        linkedin: "john-doe",
        github: "john-doe",
      },
    },
    plugins: [
      "@sonapraneeth/gatsby-plugin-themed-components",
      mdx && {
        resolve: "gatsby-plugin-mdx",
      },
      {
        resolve: "gatsby-source-filesystem",
        options: {
          name: "data",
          path: options.dataPath,
        },
      },
      {
        resolve: "gatsby-source-filesystem",
        options: {
          name: "assets",
          path: options.assetsPath,
        },
      },
      {
        resolve: "gatsby-source-filesystem",
        options: {
          name: "home",
          path: options.homePath,
        },
      },
      "gatsby-plugin-react-helmet",
      "gatsby-transformer-yaml",
      "gatsby-plugin-sharp",
      "gatsby-transformer-sharp",
    ].filter(Boolean),
  };
};
