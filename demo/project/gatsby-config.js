const pathPrefix = "";
const baseUrl = "/";
/* let serviceWorkerUrl = pathPrefix + baseUrl;
serviceWorkerUrl = serviceWorkerUrl.replace(/\/\/?$/, "/");*/

// gatsby-config.js
module.exports = {
  pathPrefix: pathPrefix,
  siteMetadata: {
    appName: "Demo of @sonapraneeth/gatsby-theme-project",
    title: "Demo of @sonapraneeth/gatsby-theme-project",
    author: "John Doe",
    siteUrl: "https://demo-sonapraneeth-themes-project.netlify.com/",
    baseUrl: "/",
    description:
      "This site is a demonstration for using theme " +
      "@sonapraneeth/gatsby-theme-project",
  },
  plugins: [
    {
      resolve: "@sonapraneeth/gatsby-theme-project",
      options: {
        baseUrl: baseUrl,
        contentPath: "content",
      },
    },
  ],
};
