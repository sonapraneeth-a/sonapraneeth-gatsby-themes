const crypto = require("crypto");
const merge = require("deepmerge");

// Default options to be used in theme
const defaultOptions = {
  // Should the theme have rounded components
  rounded: false, // Default: false
};

let options;

exports.createSchemaCustomization = ({actions}) => {
  actions.createTypes(`
    interface Options @nodeInterface {
      id: ID!
      options: JSON!
    }
    type BaseOptions implements Options & Node {
      id: ID!
      options: JSON!
    }
  `);
};

exports.sourceNodes = ({actions: {createNode}}, themeOptions) => {
  options = merge(defaultOptions, themeOptions);
  createNode({
    options,
    id: "@sonapraneeth/base",
    parent: null,
    children: [],
    internal: {
      type: "BaseOptions",
      contentDigest: crypto
        .createHash("md5")
        .update(JSON.stringify(options))
        .digest("hex"),
      content: JSON.stringify(options),
      description: "Base Options",
    },
  });
};
