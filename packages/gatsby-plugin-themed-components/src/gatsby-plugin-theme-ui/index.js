/* eslint-disable quotes */
import "typeface-pt-sans";
import "typeface-signika-negative";
import {lineHeights} from "gatsby-design-tokens";

import colors from "./colors";
import styles from "./styles";
import fonts from "./fonts";
import variants from "./variants";
import array from "./array";
import components from "./components";
import options from "./options";

export default {
  // This enables the color modes feature
  // and is used as the name for the top-level colors object
  initialColorMode: "light",
  // use CSS custom properties to help avoid flash of colors on
  // initial page load
  // Refer: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
  useCustomProperties: false,
  // Definitions for various color modes
  colors,
  // Breakpoints supported for the theme
  // Feature Phone  : 20rem;  // 320px
  // Mobile         : 40rem;  // 640px
  // Minitablet     : 48rem;  // 768px
  // Tablet         : 64rem;  //1024px
  // Laptop         : 80rem;  //1280px
  // Desktop        : 86rem;  //1376px
  // FullHD         : 120rem; //1920px
  // UltraHD        : 240rem; //3840px
  breakpoints: [20, 40, 48, 64, 80, 86, 120, 240].map((item) => {
    return `${item}rem`;
  }),
  ...array,
  // Available fonts
  ...fonts,
  // Line heights
  lineHeights: {
    ...lineHeights,
    body: lineHeights.default,
    heading: 1.125,
  },
  ...variants,
  styles,
  ...components,
  ...options,
};
