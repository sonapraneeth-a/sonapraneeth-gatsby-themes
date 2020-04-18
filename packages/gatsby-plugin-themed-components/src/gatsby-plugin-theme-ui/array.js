// Reference: https://theme-ui.com/theme-spec/
import {zIndices, shadows} from "gatsby-design-tokens";

spaceRaw: [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3, 3.5, 4, 4.5, 5];

export default {
  space: spaceRaw.map((item) => {
    return `${item}rem`;
  }),
  zIndices: {
    ...zIndices,
    switch: 1000,
  },
  shadows: {
    ...shadows,
  },
  radii: [0],
};
