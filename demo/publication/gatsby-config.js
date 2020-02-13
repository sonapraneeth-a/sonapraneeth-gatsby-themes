const pathPrefix = "";
const baseUrl = "/";
/* let serviceWorkerUrl = pathPrefix + baseUrl;
serviceWorkerUrl = serviceWorkerUrl.replace(/\/\/?$/, "/");*/

module.exports = {
  pathPrefix: pathPrefix,
  siteMetadata: {
    appName: "Demo of @sonapraneeth/gatsby-theme-publication",
    title: "Demo of @sonapraneeth/gatsby-theme-publication",
    author: "John Doe",
    siteUrl: "https://demo-sonapraneeth-themes-publication.netlify.com/",
    baseUrl: "/",
    description:
      "This site is a demonstration for using theme " +
      "@sonapraneeth/gatsby-theme-publication",
    social: {
      twitter: "john-doe",
    },
  },
  plugins: [
    {
      resolve: "@sonapraneeth/gatsby-theme-publication",
      options: {
        baseUrl: baseUrl,
        contentPath: "content/data",
      },
    },
  ],
};
