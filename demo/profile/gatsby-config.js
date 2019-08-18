const pathPrefix = "";
const baseUrl = "/";
const projectsUrl = "/projects";
const blogUrl = "/blog";
/* let serviceWorkerUrl = pathPrefix + baseUrl;
serviceWorkerUrl = serviceWorkerUrl.replace(/\/\/?$/, "/");*/

module.exports = {
  pathPrefix: pathPrefix,
  siteMetadata: {
    appName: "Demo of @sonapraneeth/profile",
    title: "Demo of @sonapraneeth/profile",
    author: "John Doe",
    siteUrl: "https://demo-sonapraneeth-themes-profile.netlify.com/",
    description:
      "This site is a demonstration for using theme @sonapraneeth/profile",
    social: {
      twitter: "john-doe",
    },
  },
  plugins: [
    {
      resolve: "@sonapraneeth/profile",
      options: {
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
