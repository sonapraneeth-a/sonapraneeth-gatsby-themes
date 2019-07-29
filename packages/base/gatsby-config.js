module.exports = (themeOptions) => {
  console.log(`Environment: ${process.env.NODE_ENV}`);
  return {
    plugins: [
      /* {
        resolve: "gatsby-source-filesystem",
        options: {
          name: "assets",
          path: `${__dirname}/assets`,
        },
      },
      "gatsby-plugin-emotion", */
      "gatsby-plugin-theme-ui",
    ],
  };
};
