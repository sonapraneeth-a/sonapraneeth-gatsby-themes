import merge from "deepmerge";
// eslint-disable-next-line max-len
import defaultComponents from "@sonapraneeth/base/src/gatsby-plugin-theme-ui/components";

import H1 from "../../../components/h1.js";

export default merge(defaultComponents, {
  h1: H1,
});
