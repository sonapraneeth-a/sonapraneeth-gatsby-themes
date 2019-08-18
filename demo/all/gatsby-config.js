const pathPrefix = "";
const baseUrl = "/";
const projectsUrl = "/projects";
const blogsUrl = "/blog";
/* let serviceWorkerUrl = pathPrefix + baseUrl;
serviceWorkerUrl = serviceWorkerUrl.replace(/\/\/?$/, "/");*/

module.exports = {
  pathPrefix: pathPrefix,
  siteMetadata: {
    appName: "Demo of packages (bio, project, blog)",
    title: "Demo of packages (bio, project, blog)",
    author: "John Doe",
    siteUrl: "https://demo-sonapraneeth-themes-all.netlify.com/",
    baseUrl: "/",
    description:
      "This site is a demonstration for using themes " +
      "@sonapraneeth/bio, @sonapraneeth/projects, @sonapraneeth/blog",
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
    {
      resolve: "@sonapraneeth/project",
      options: {
        baseUrl: projectsUrl,
        contentPath: "content/projects",
      },
    },
    {
      resolve: "@sonapraneeth/blog",
      options: {
        baseUrl: blogsUrl,
        contentPath: "content/blog",
      },
    },
  ],
};
