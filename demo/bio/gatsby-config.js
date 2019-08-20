const pathPrefix = "";
const baseUrl = "/";
/* let serviceWorkerUrl = pathPrefix + baseUrl;
serviceWorkerUrl = serviceWorkerUrl.replace(/\/\/?$/, "/");*/

module.exports = {
  pathPrefix: pathPrefix,
  siteMetadata: {
    appName: "Demo of @sonapraneeth/gatsby-theme-bio",
    title: "Demo of @sonapraneeth/gatsby-theme-bio",
    author: "John Doe",
    siteUrl: "https://demo-sonapraneeth-themes-bio.netlify.com/",
    baseUrl: "/",
    description:
      "This site is a demonstration for using theme " +
      "@sonapraneeth/gatsby-theme-bio",
    social: {
      twitter: "john-doe",
    },
  },
  plugins: [
    {
      resolve: "@sonapraneeth/gatsby-theme-bio",
      options: {
        baseUrl: baseUrl,
        dataPath: "content/data",
        assetsPath: "content/assets",
        homePath: "content/home",
      },
    },
  ],
};
