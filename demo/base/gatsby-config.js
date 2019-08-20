module.exports = {
  siteMetadata: {
    appName: "Demo of @sonapraneeth/gatsby-plugin-themed-components",
    title: "Demo of @sonapraneeth/gatsby-plugin-themed-components",
    author: "John Doe",
    siteUrl: "https://demo-sonapraneeth-themes-base.netlify.com/",
    baseUrl: "/",
    description:
      "This site is a demonstration for using theme " +
      "@sonapraneeth/gatsby-plugin-themed-components",
  },
  plugins: [
    "@sonapraneeth/gatsby-plugin-themed-components",
    {
      resolve: "gatsby-theme-style-guide",
      options: {
        // sets path for generated page
        basePath: "/design-system",
      },
    },
  ],
};
