module.exports = (themeOptions) => {
  return {
    // Default siteMetadata
    siteMetadata: {
      appName: "Base",
      title: "Base",
      author: "John Doe",
      // TODO: Need to change this URL
      siteUrl: "https://www.gatsbyjs.org",
      description:
        "This site is a demonstration for using theme " +
        "gatsby-theme-simple-bio",
      social: {
        facebook: "john-doe",
        twitter: "john-doe",
        email: "john-doe",
        linkedin: "john-doe",
        github: "john-doe",
      },
    },
    plugins: ["gatsby-plugin-theme-ui"],
  };
};
