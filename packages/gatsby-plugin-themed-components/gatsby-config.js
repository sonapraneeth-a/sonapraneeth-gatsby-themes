module.exports = (themeOptions) => {
  return {
    // Default siteMetadata
    siteMetadata: {
      appName: "@sonapraneeth/gatsby-plugin-themed-components package",
      title: "@sonapraneeth/gatsby-plugin-themed-components package",
      author: "John Doe",
      // TODO: Need to change this URL
      siteUrl: "/",
      baseUrl: "/",
      description:
        "This site is a demonstration for using theme " +
        "@sonapraneeth/gatsby-plugin-themed-components",
      social: {
        facebook: "",
        twitter: "",
        email: "",
        linkedin: "",
        github: "",
      },
    },
    plugins: ["gatsby-plugin-theme-ui"],
  };
};
