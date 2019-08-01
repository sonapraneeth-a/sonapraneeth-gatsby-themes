import {
  fonts,
} from "gatsby-design-tokens"

/* eslint-disable quotes */
export default {
  fonts: {
    // Font used for headings <h1>, <h2>, <h3>, <h4>, <h5>, <h6>
    heading:
      `"Signika Negative",` +  fonts.system,
    // Font used for body
    body:
      `"PT Sans", ` + fonts.system,
    // Font used for code blocks
    monospace: fonts.monospace,
  },
  fontWeights: {
    // Font weight for body. Normal
    body: 400,
    // Font weight for headings. Bold
    heading: 700,
    // Bold font weight
    bold: 700,
  },
  // Font sizes stack
  fontSizes: [
    0.75, 0.875, 1, 1.125, 1.25, 1.5, 1.75, 2, 2.25, 2.625,
    3, 3.375, 3.75, 4.25, 4.75, 5.25, 5.75,
  ].map((item) => { return `${item}rem` }),
};
