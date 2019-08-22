const pathPrefix = "";
const baseUrl = "/";
const projectsUrl = "/projects";
const blogUrl = "/blog";
/* let serviceWorkerUrl = pathPrefix + baseUrl;
serviceWorkerUrl = serviceWorkerUrl.replace(/\/\/?$/, "/");*/

module.exports = {
  pathPrefix: pathPrefix,
  siteMetadata: {
    appName: "Demo of @sonapraneeth/gatsby-theme-profile",
    title: "Demo of @sonapraneeth/gatsby-theme-profile",
    author: "John Doe",
    siteUrl: "https://demo-sonapraneeth-themes-profile.netlify.com/",
    baseUrl: "/",
    description:
      "This site is a demonstration for using theme " +
      "@sonapraneeth/gatsby-theme-profile",
    social: {
      twitter: "john-doe",
    },
  },
  plugins: [
    {
      resolve: "@sonapraneeth/gatsby-theme-profile",
      options: {
        author: "John Doe",
        baseUrl: {
          home: baseUrl,
          projects: projectsUrl,
          blog: blogUrl,
        },
        paths: {
          data: "content/data",
          assets: "content/assets",
          home: "content/home",
          projects: "content/projects",
          blog: "content/blog",
        },
      },
    },
  ],
};
