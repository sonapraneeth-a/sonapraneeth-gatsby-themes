const pathPrefix = "";
const baseUrl = "/";
/* let serviceWorkerUrl = pathPrefix + baseUrl;
serviceWorkerUrl = serviceWorkerUrl.replace(/\/\/?$/, "/");*/

// gatsby-config.js
module.exports = {
  pathPrefix: pathPrefix,
  siteMetadata: {
    appName: "Demo of @sonapraneeth/gatsby-theme-collection",
    title: "Demo of @sonapraneeth/gatsby-theme-collection",
    author: "John Doe",
    siteUrl: "https://demo-sonapraneeth-themes-collection.netlify.com/",
    baseUrl: "/",
    description:
      "This site is a demonstration for using theme " +
      "@sonapraneeth/gatsby-theme-collection",
  },
  plugins: [
    {
      resolve: "@sonapraneeth/gatsby-theme-collection",
      options: {
        baseUrl: baseUrl,
        contentPath: "content",
      },
    },
  ],
};
