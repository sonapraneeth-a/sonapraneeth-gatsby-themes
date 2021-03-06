const path = require("path");
const fs = require("fs");
const withDefaults = require("./utils/default-options");
const debug = require("./utils/debug").debugNode;

let options;

// 1. Make sure the necessary directories exist
exports.onPreBootstrap = ({store, reporter}, themeOptions) => {
  const {program} = store.getState();
  // Options created using default and provided options
  options = withDefaults(themeOptions);
  reporter.info(`Options: ${JSON.stringify(options, null, 2)}`);
  const directories = [path.join(program.directory, options.contentPath)];
  directories.map((directoryPath) => {
    reporter.info(`Looking for ${directoryPath} directory`);
    if (!fs.existsSync(directoryPath)) {
      reporter.info(`Creating the ${directoryPath} directory`);
      // Reference: https://stackoverflow.com/questions/31645738/how-to-create-full-path-with-nodes-fs-mkdirsync
      fs.mkdirSync(directoryPath, {recursive: true});
    }
  });
};

const yamlResolverPassthrough = (fieldName) => async (
  source,
  args,
  context,
  info,
) => {
  const yamlNode = context.nodeModel.getNodeById({
    id: source.parent,
  });
  const result = yamlNode[fieldName];
  return result;
};

exports.createSchemaCustomization = ({actions, schema}) => {
  actions.createTypes(`
    interface IPublication {
      id: ID!
      title: String!
      description: String
      published: String!
      authors: [Author!]!
      url: String
      doi: String!
      date: Date @dateformat
      abstract: String
      body: String
    }
    type Publication implements IPublication & Node {
      id: ID!
      title: String!
      description: String
      published: String!
      authors: [Author!]!
      url: String
      doi: String!
      date: Date @dateformat
      abstract: String
      body: String
    }
    type Author {
      name: String!
      email: String!
      institution: String!
    }
  `);
  actions.createTypes(
    schema.buildObjectType({
      name: "Publication",
      fields: {
        abstract: {
          type: "String",
          resolve: yamlResolverPassthrough("abstract"),
        },
      },
    }),
  );
};

exports.sourceNodes = ({actions}, themeOptions) => {
  options = withDefaults(themeOptions);
  debug("Schema customization");
};

exports.onCreateNode = (
  {node, actions, getNode, createNodeId, createContentDigest, reporter},
  themeOptions,
) => {
  options = withDefaults(themeOptions);
  const {createNode, createParentChildLink} = actions;
  if (node.internal.type !== "PublicationYaml") {
    return;
  }
  // Create source field (according to contentPath)
  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;
  if (node.internal.type === "PublicationYaml" && source === "publication") {
    const publication = {
      title: node.title,
      description: node.description || "",
      published: node.published,
      authors: node.authors,
      url: node.url || "",
      doi: node.doi,
      // abstract: node.abstract,
      date: new Date(node.date).toISOString(),
    };
    debug(publication);
    createNode({
      ...publication,
      // Required fields.
      id: createNodeId(`${node.id} >>> Publication`),
      parent: node.id,
      children: [],
      internal: {
        type: "Publication",
        contentDigest: createContentDigest(JSON.stringify(publication)),
        content: JSON.stringify(publication),
        description: "Publication",
      },
    });
    createParentChildLink({parent: fileNode, child: node});
  }
};

exports.createPages = async ({actions, graphql, reporter}, themeOptions) => {
  options = withDefaults(themeOptions);
  const query = `
  query MainPublication {
    allPublication {
      edges {
        node {
          id
          title
          description
          published
          authors {
            name
            email
            institution
          }
          url
          doi
          date
          abstract
        }
      }
    }
  }`;
  const result = await graphql(query);
  const publications = result.data.allPublication.edges;
  debug(publications);
  if (
    publications === null ||
    (publications !== null && publications.length === 0)
  ) {
    reporter.panic(
      "Unable to retrieve data for publications. " +
        "Please provide atleast one publication in " +
        `data files (Path: ${options.contentPath})`,
    );
  }
  reporter.info(`Creating page at ${options.baseUrl}`);
  actions.createPage({
    path: options.baseUrl,
    component: require.resolve("./src/templates/publication-list.js"),
    context: {
      publications,
    },
  });
};
