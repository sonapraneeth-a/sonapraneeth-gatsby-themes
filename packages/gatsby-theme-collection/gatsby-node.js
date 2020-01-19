const path = require("path");
const fs = require("fs");
const {createFilePath} = require("gatsby-source-filesystem");
const crypto = require("crypto");
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
      name: String!
      slug: String!
      items: [CollectionItem!]!
      subCollection: [Collection!]!
    }
    type CollectionMdx implements Collection & Node {
      id: ID!
      name: String!
      slug: String!
      items: [CollectionItem!]!
      subCollection: [Collection!]!
    }
    interface CollectionItem @nodeInterface {
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
    type CollectionItemMdx implements CollectionItem & Node {
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
      name: "CollectionItemMdx",
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
  const {createNode, createParentChildLink} = actions;
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
    const url = `${options.baseUrl}/${slug}/`;
    const collectionItemUrl = url.replace(/\/\//g, "/").replace(/\/\//g, "/");
    const frontmatter = JSON.parse(JSON.stringify(node.frontmatter));
    const collectionItemCover =
      "cover" in frontmatter ? frontmatter.cover : null;
    debug(`CollectionItem cover: ${collectionItemCover}`);
    const collectionItemTags = "tags" in frontmatter ? frontmatter.tags : [];
    const collectionItemData = {
      title: frontmatter.title || "",
      publishedDate: frontmatter.publishedDate,
      slug: collectionItemUrl,
      fileAbsolutePath: node.fileAbsolutePath,
      draft: frontmatter.draft || false,
      toc:
        frontmatter.toc !== undefined && frontmatter.toc !== null ?
          frontmatter.toc :
          true,
      sharing: frontmatter.sharing || false,
      cover: collectionItemCover,
      tags: collectionItemTags,
      lastModifiedTime: fileNode.modifiedTime,
    };
    createNode({
      ...collectionItemData,
      // Required fields.
      id: createNodeId(`${node.id} >>> CollectionItemMdx`),
      parent: node.id,
      children: [],
      internal: {
        type: "CollectionItemMdx",
        contentDigest: crypto
          .createHash("md5")
          .update(JSON.stringify(collectionItemData))
          .digest("hex"),
        content: JSON.stringify(collectionItemData),
        description: "Collection Items",
      },
    });
    createParentChildLink({parent: fileNode, child: node});
  }
};

exports.createPages = async ({actions, graphql, reporter}, themeOptions) => {
  // Options created using default and provided options
  options = withDefaults(themeOptions);
  debug(`Options: ${JSON.stringify(options, null, 2)}`);
  const fields = `
    id
    slug
    title
    publishedDate
    excerpt
    fileAbsolutePath
    timeToRead
    lastModifiedTime
    cover {
      childImageSharp {
        fluid(maxWidth: 1280) {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      }
    }
  `;
  const queryProd = `
  query AllCollectionItemsQuery {
    allCollectionItem(
      sort: {fields: publishedDate, order: DESC},
      filter: {draft: {eq: false}}
    ) {
      edges {
        node {
          ${fields}
        }
      }
    }
  }`;
  const queryDev = `
  query AllCollectionItemsQuery {
    allCollectionItem(
      sort: {fields: publishedDate, order: DESC},
    ) {
      edges {
        node {
          ${fields}
        }
      }
    }
  }`;
  let result = null;
  if (process.env.NODE_ENV !== "production") {
    result = await graphql(queryDev);
  } else {
    result = await graphql(queryProd);
  }
  const collectionItems = result.data.allCollectionItem.edges;
  debug(`Number of collectionItems: ${collectionItems.length}`);
  debug(`Creating base collectionItem page at ${options.baseUrl}`);
  /* actions.createPage({
    path: options.baseUrl,
    component: require.resolve("./src/templates/collection-items-list.js"),
    context: {
      collectionItems,
    },
  });*/
  if (collectionItems.length == 0) {
    reporter.panic(`
      There does not seem to be any mdx file present in
      '${options.contentPath}' directory. Hence collectionItem
      pages would not be created. Please add some mdx
      files in '${options.contentPath}' directory`);
  }
  debug(`CollectionItems in ${process.env.NODE_ENV} env`);
  debug(JSON.stringify(collectionItems, null, 2));
  if (collectionItems.length > 0) {
    collectionItems.map((collectionItem) => {
      debug(`Creating collectionItem page for '${collectionItem.node.title}'`);
      actions.createPage({
        path: collectionItem.node.slug,
        component: require.resolve("./src/templates/collection-item.js"),
        context: {
          id: collectionItem.node.id,
        },
      });
    });
  }
};
