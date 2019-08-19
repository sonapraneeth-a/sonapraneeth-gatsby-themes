const pathPrefix = "";
const baseUrl = "/";
/* let serviceWorkerUrl = pathPrefix + baseUrl;
serviceWorkerUrl = serviceWorkerUrl.replace(/\/\/?$/, "/");*/

// gatsby-config.js
module.exports = {
  pathPrefix: pathPrefix,
  siteMetadata: {
    appName: "Demo of @sonapraneeth/blog",
    title: "Demo of @sonapraneeth/blog",
    author: "John Doe",
    siteUrl: "https://demo-sonapraneeth-themes-blog.netlify.com/",
    baseUrl: "/",
    description:
      "This site is a demonstration for using theme @sonapraneeth/blog",
  },
  plugins: [
    {
      resolve: "@sonapraneeth/blog",
      options: {
        baseUrl: baseUrl,
        contentPath: "content",
      },
    },
    "gatsby-plugin-mdx",
  ],
};
