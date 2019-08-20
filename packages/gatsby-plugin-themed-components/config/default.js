/* eslint-disable new-cap */
import Debug from "debug";

const debugTheme = Debug("@sonapraneeth/gatsby-plugin-themed-components");

export const layout = debugTheme.extend("layout");
export const component = debugTheme.extend("component");
export const hooks = debugTheme.extend("hooks");
