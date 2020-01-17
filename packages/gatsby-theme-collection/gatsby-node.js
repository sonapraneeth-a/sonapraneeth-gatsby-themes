const path = require("path");
const fs = require("fs");
const {createFilePath} = require("gatsby-source-filesystem");
const withDefaults = require("./utils/default-options");
const debug = require("./utils/debug").debugNode;
const slugify = require("slug");
slugify.charmap["+"] = "p";

let options;

// 1. Make sure the necessary directories exist
exports.onPreBootstrap = ({store, reporter}, themeOptions) => {
  const {program} = store.getState();
  // Options created using default and provided options
  options = withDefaults(themeOptions);
  debug(`Options: ${JSON.stringify(options, null, 2)}`);
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

const mdxResolverPassthrough = (fieldName) => async (
  source,
  args,
  context,
  info,
) => {
  const type = info.schema.getType("Mdx");
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent,
  });
  const resolver = type.getFields()[fieldName].resolve;
  const result = await resolver(mdxNode, args, context, {
    fieldName,
  });
  return result;
};

exports.createSchemaCustomization = ({actions, schema}) => {
  actions.createTypes(`
    interface Collection @nodeInterface {
      id: ID!
      title: String!
      publishedDate: Date! @dateformat
      slug: String!
      excerpt: String!
      toc: Boolean!
      body: String!
      fileAbsolutePath: String!
      draft: Boolean!
      sharing: Boolean!
      cover: File @fileByRelativePath
      timeToRead: Int
      tags: [String!]!
      tableOfContents: JSON
      lastModifiedTime: Date @dateformat
    }
    type CollectionMdx implements Collection & Node {
      id: ID!
      title: String!
      publishedDate: Date! @dateformat
      slug: String!
      excerpt: String!
      toc: Boolean!
      body: String!
      fileAbsolutePath: String!
      draft: Boolean!
      sharing: Boolean!
      cover: File @fileByRelativePath
      timeToRead: Int
      tags: [String!]!
      lastModifiedTime: Date @dateformat
    }
  `);
  actions.createTypes(
    schema.buildObjectType({
      name: "CollectionMdx",
      fields: {
        body: {
          type: "String!",
          resolve: mdxResolverPassthrough("body"),
        },
        timeToRead: {
          type: "Int",
          resolve: mdxResolverPassthrough("timeToRead"),
        },
        excerpt: {
          type: "String!",
          args: {
            pruneLength: {
              type: "Int",
              defaultValue: 140,
            },
          },
          resolve: mdxResolverPassthrough("excerpt"),
        },
        tableOfContents: {
          type: "JSON",
          args: {
            maxDepth: {
              type: "Int",
              defaultValue: 3,
            },
          },
          resolve: mdxResolverPassthrough("tableOfContents"),
        },
      },
    }),
  );
};

// Create fields for post slugs and source
// This will change with schema customization with work
exports.onCreateNode = (
  {node, actions, getNode, createNodeId},
  themeOptions,
) => {
  // Options created using default and provided options
  options = withDefaults(themeOptions);
  // Make sure it's an MDX node
  if (node.internal.type !== "Mdx") {
    return;
  }

  // Create source field (according to contentPath)
  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;
  if (node.internal.type === "Mdx" && source === options.contentPath) {
    const slug = createFilePath({
      node: fileNode,
      getNode,
      basePath: options.contentPath,
    });
    console.log(slug);
  }
};
