const pathPrefix = "";
const baseUrl = "/";
/* let serviceWorkerUrl = pathPrefix + baseUrl;
serviceWorkerUrl = serviceWorkerUrl.replace(/\/\/?$/, "/");*/

module.exports = {
  pathPrefix: pathPrefix,
  siteMetadata: {
    appName: "Demo of @sonapraneeth/gatsby-theme-timeline",
    title: "Demo of @sonapraneeth/gatsby-theme-timeline",
    author: "John Doe",
    siteUrl: "https://demo-sonapraneeth-themes-timeline.netlify.com/",
    baseUrl: "/",
    description:
      "This site is a demonstration for using theme " +
      "@sonapraneeth/gatsby-theme-timeline",
    social: {
      twitter: "john-doe",
    },
  },
  plugins: [
    {
      resolve: "@sonapraneeth/gatsby-theme-timeline",
      options: {
        baseUrl: baseUrl,
        contentPath: "content/data",
      },
    },
  ],
};
