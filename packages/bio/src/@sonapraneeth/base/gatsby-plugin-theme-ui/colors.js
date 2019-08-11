import merge from "deepmerge";
// eslint-disable-next-line max-len
import defaultThemeColors from "@sonapraneeth/base/src/gatsby-plugin-theme-ui/colors";

export default merge(defaultThemeColors, {
  icons: {
    // Github
    github: "#4077bf",
    // LinkedIn
    linkedin: "#0074b3",
    // Twitter
    twitter: "#1ca0f2",
  },
  modes: {
    // The below configuration is for "dark" mode
    dark: {
      icons: {
        github: "white",
        linkedin: "white",
        twitter: "white",
      },
    },
  },
});
