// Breakpoints for the theme
const breakpoints = [20, 40, 48, 64, 80, 86, 120, 240];

// Used for min-width queries
export const from = (bp) => `@media screen and (min-width: ${bp}rem)`;

// Used for min-width and max-width queries
export const within = (minScreen, maxScreen) =>
  `@media screen and (min-width: ${minScreen}rem) and
  (max-width: ${maxScreen - 0.0001}rem)`;

// Used for max-width queries
export const until = (bp) => `@media screen and (max-width: ${bp}rem)`;

// Mapping between screens and breakpoints
export const screens = {
  mobile: breakpoints[1],
  minitablet: breakpoints[2],
  tablet: breakpoints[3],
  laptop: breakpoints[4],
  desktop: breakpoints[5],
  fullhd: breakpoints[6],
  ultrahd: breakpoints[7],
};

// Media query for mobile breakpoint
export const mobile = `@media screen and (max-width: ${breakpoints[1]}rem)`;

// Media query for minitablet breakpoint
export const minitablet = `@media screen and
(min-width: ${breakpoints[2]}rem) and
(max-width: ${breakpoints[3] - 0.0001}rem)`;

// Media query for tablet breakpoint
export const tablet = `@media screen and
(min-width: ${breakpoints[3]}rem) and
(max-width: ${breakpoints[4] - 0.0001}rem)`;

// Media query for laptop breakpoint
export const laptop = `@media screen and
(min-width: ${breakpoints[4]}rem) and
(max-width: ${breakpoints[5] - 0.0001}rem)`;

// Media query for desktop breakpoint
export const desktop = `@media screen and
(min-width: ${breakpoints[5]}rem) and
(max-width: ${breakpoints[6] - 0.0001}rem)`;

// Media query for fullhd breakpoint
export const fullhd = `@media screen and
(min-width: ${breakpoints[6]}rem) and
(max-width: ${breakpoints[7] - 0.0001}rem)`;
