const pathPrefix = "";
const baseUrl = "/";
const projectsUrl = "/projects";
const blogUrl = "/blog";
/* let serviceWorkerUrl = pathPrefix + baseUrl;
serviceWorkerUrl = serviceWorkerUrl.replace(/\/\/?$/, "/");*/

module.exports = {
  pathPrefix: pathPrefix,
  siteMetadata: {
    appName: "Demo of gatsby-theme-simple-bio",
    title: "Demo of gatsby-theme-simple-bio",
    author: "John Doe",
    siteUrl: "https://gatsby-theme-simple-bio.netlify.com/",
    description:
      "This site is a demonstration for using theme " +
      "gatsby-theme-simple-bio",
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
