const withDefaults = require("./utils/default-options");

module.exports = (themeOptions) => {
  // Options created using default and provided options
  const options = withDefaults(themeOptions);
  return {
    // Default siteMetadata
    siteMetadata: {
      appName: "@sonapraneeth/gatsby-theme-publication package",
      title: "@sonapraneeth/gatsby-theme-publication package",
      author: "John Doe",
      // TODO: Need to change this URL
      siteUrl: "/",
      baseUrl: "/",
      description:
        "This site is a demonstration for using theme " +
        "@sonapraneeth/gatsby-theme-publication",
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
      {
        resolve: "gatsby-source-filesystem",
        options: {
          name: "publication",
          path: options.contentPath,
        },
      },
      "gatsby-transformer-yaml",
      "gatsby-plugin-react-helmet",
    ],
  };
};
