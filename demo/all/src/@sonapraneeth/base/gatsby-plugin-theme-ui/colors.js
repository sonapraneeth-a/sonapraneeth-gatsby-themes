import merge from "deepmerge";
// eslint-disable-next-line max-len
import defaultThemeColors from "@sonapraneeth/base/src/gatsby-plugin-theme-ui/colors";
import {colors} from "@sonapraneeth/base";

export default merge(defaultThemeColors, {
  banner: {
    about: colors.blue["10"],
    blog: colors.blue["10"],
  },
  modes: {
    dark: {
      banner: {
        about: colors.blackFade["70"],
        blog: colors.blackFade["70"],
      },
    },
  },
});
