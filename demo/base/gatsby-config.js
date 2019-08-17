module.exports = {
  siteMetadata: {
    appName: "Demo of @sonapraneeth/base",
    title: "Demo of @sonapraneeth/base",
    author: "John Doe",
    siteUrl: "https://gatsby-dev-themes-base.netlify.com/",
    description:
      "This site is a demonstration for using theme " + "@sonapraneeth/base",
  },
  plugins: [
    "@sonapraneeth/base",
    {
      resolve: "gatsby-theme-style-guide",
      options: {
        // sets path for generated page
        basePath: "/design-system",
      },
    },
  ],
};
