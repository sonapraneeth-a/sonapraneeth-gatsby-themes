const pathPrefix = "";
const baseUrl = "/";
/* let serviceWorkerUrl = pathPrefix + baseUrl;
serviceWorkerUrl = serviceWorkerUrl.replace(/\/\/?$/, "/");*/

// gatsby-config.js
module.exports = {
  pathPrefix: pathPrefix,
  siteMetadata: {
    appName: "Demo of @sonapraneeth/project",
    title: "Demo of @sonapraneeth/project",
    author: "John Doe",
    siteUrl: "https://demo-sonapraneeth-themes-project.netlify.com/",
    description:
      "This site is a demonstration for using theme @sonapraneeth/project",
  },
  plugins: [
    {
      resolve: "@sonapraneeth/project",
      options: {
        baseUrl: baseUrl,
        contentPath: "content",
      },
    },
  ],
};
