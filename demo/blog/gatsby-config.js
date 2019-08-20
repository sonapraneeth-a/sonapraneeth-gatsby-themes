const pathPrefix = "";
const baseUrl = "/";
/* let serviceWorkerUrl = pathPrefix + baseUrl;
serviceWorkerUrl = serviceWorkerUrl.replace(/\/\/?$/, "/");*/

// gatsby-config.js
module.exports = {
  pathPrefix: pathPrefix,
  siteMetadata: {
    appName: "Demo of @sonapraneeth/gatsby-theme-blog",
    title: "Demo of @sonapraneeth/gatsby-theme-blog",
    author: "John Doe",
    siteUrl: "https://demo-sonapraneeth-themes-blog.netlify.com/",
    baseUrl: "/",
    description:
      "This site is a demonstration for using theme " +
      "@sonapraneeth/gatsby-theme-blog",
  },
  plugins: [
    {
      resolve: "@sonapraneeth/gatsby-theme-blog",
      options: {
        baseUrl: baseUrl,
        contentPath: "content",
      },
    },
  ],
};
