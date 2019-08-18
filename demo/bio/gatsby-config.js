const pathPrefix = "";
const baseUrl = "/";
/* let serviceWorkerUrl = pathPrefix + baseUrl;
serviceWorkerUrl = serviceWorkerUrl.replace(/\/\/?$/, "/");*/

module.exports = {
  pathPrefix: pathPrefix,
  siteMetadata: {
    appName: "Demo of @sonapraneeth/bio",
    title: "Demo of @sonapraneeth/bio",
    author: "John Doe",
    siteUrl: "https://demo-sonapraneeth-themes-bio.netlify.com/",
    description:
      "This site is a demonstration for using theme @sonapraneeth/bio",
    social: {
      twitter: "john-doe",
    },
  },
  plugins: [
    {
      resolve: "@sonapraneeth/bio",
      options: {
        baseUrl: baseUrl,
        dataPath: "content/data",
        assetsPath: "content/assets",
        homePath: "content/home",
      },
    },
  ],
};
