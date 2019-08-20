module.exports = themeOptions => {
  return {
    // Default siteMetadata
    siteMetadata: {
      appName: "@sonapraneeth/base package",
      title: "@sonapraneeth/base package",
      author: "John Doe",
      // TODO: Need to change this URL
      siteUrl: "/",
      baseUrl: "/",
      description:
        "This site is a demonstration for using theme " + "@sonapraneeth/base",
      social: {
        facebook: "",
        twitter: "",
        email: "",
        linkedin: "",
        github: "",
      },
    },
    plugins: ["gatsby-plugin-theme-ui"],
  }
}
