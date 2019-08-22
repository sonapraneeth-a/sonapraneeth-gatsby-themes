const crypto = require("crypto");
const withDefaults = require("./utils/default-options");
const debug = require("./utils/debug").debugNode;

let options;

exports.createSchemaCustomization = ({actions}) => {
  actions.createTypes(`
    type BioOptions implements Options & Node {
      id: ID!
      options: JSON!
    }
    interface Author @nodeInterface {
      id: ID!
      name: String!
      description: String!
      cover: File!
      username: Username!
    }
    type Username @nodeInterface {
      linkedin: String!
      facebook: String!
      twitter: String!
      github: String!
      email: String!
    }
    type AuthorInfo implements Author & Node {
      id: ID!
      name: String!
      description: String!
      cover: File! @fileByRelativePath
      username: Username!
    }
  `);
};

exports.sourceNodes = ({actions}, themeOptions) => {
  options = withDefaults(themeOptions);
  debug("Schema customization");
  const {createNode} = actions;
  createNode({
    options,
    id: "@sonapraneeth/gatsby-theme-bio",
    parent: null,
    children: [],
    internal: {
      type: "BioOptions",
      contentDigest: crypto
        .createHash("md5")
        .update(JSON.stringify(options))
        .digest("hex"),
      content: JSON.stringify(options),
      description: "Bio Options",
    },
  });
};

exports.onCreateNode = (
  {node, actions, getNode, createNodeId, reporter},
  themeOptions
) => {
  options = withDefaults(themeOptions);
  if (options.author === null || options.author === "") {
    reporter.panic(
      "Author option is empty. Please provide a valid author " +
        "name in package options"
    );
  }
  const {createNode} = actions;
  if (node.internal.type !== "AuthorYaml") {
    return;
  }
  // Create source field (according to contentPath)
  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;
  if (node.internal.type === "AuthorYaml" && source === "author") {
    const author = {
      name: node.name || "",
      description: node.description || "",
      cover: node.cover || "",
      username: {
        linkedin: node.username.linkedin || "",
        facebook: node.username.facebook || "",
        twitter: node.username.twitter || "",
        github: node.username.github || "",
        email: node.username.email || "",
      },
    };
    createNode({
      ...author,
      // Required fields.
      id: createNodeId(`${node.id} >>> AuthorInfo`),
      parent: node.id,
      children: [],
      internal: {
        type: "AuthorInfo",
        contentDigest: crypto
          .createHash("md5")
          .update(JSON.stringify(author))
          .digest("hex"),
        content: JSON.stringify(author),
        description: "Author Info",
      },
    });
  }
};

exports.createPages = async ({actions, graphql, reporter}, themeOptions) => {
  options = withDefaults(themeOptions);
  const query = `
  query MainAuthor {
    authorInfo(name: {eq: "${options.author}"}) {
      id
    }
  }`;
  const result = await graphql(query);
  if (result.data !== null && result.data.authorInfo === null) {
    reporter.panic(
      `Unable to retrieve data for author (${options.author}). ` +
        "Please provide name which has been used in " +
        `data files (Path: ${options.dataPath})`
    );
  }
  reporter.info(`Creating page at ${options.baseUrl}`);
  actions.createPage({
    path: options.baseUrl,
    component: require.resolve("./src/templates/home.js"),
    context: {
      id: result.data.authorInfo.id,
    },
  });
};
