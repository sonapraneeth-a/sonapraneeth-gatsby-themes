const path = require("path");
const fs = require("fs");
const {createFilePath} = require("gatsby-source-filesystem");
const crypto = require("crypto");
const withDefaults = require("./utils/default-options");
const debug = require("./utils/debug").debugNode;
const {
  updateCollection,
  updateCollectionNode,
} = require("./utils/collections");
const slugify = require("slug");
slugify.charmap["+"] = "p";

let options;
const mdxItems = [];
const collections = [];

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
      priority: Int!
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
      categories: [String!]!
      tableOfContents: JSON
      lastModifiedTime: Date @dateformat
    }
    type CollectionItemMdx implements CollectionItem & Node {
      id: ID!
      title: String!
      publishedDate: Date! @dateformat
      priority: Int!
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
      categories: [String!]!
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
    const mdxSlugInfo = slug.split("/");
    mdxSlugInfo.shift();
    mdxSlugInfo.pop();
    if (mdxSlugInfo.length <= 1 && mdxSlugInfo.length > 3) return;
    const collectionName = slugify(mdxSlugInfo[0]);
    let subCollectionName = "";
    let itemName = slugify(mdxSlugInfo[1]);
    if (mdxSlugInfo.length == 3) {
      subCollectionName = slugify(mdxSlugInfo[1]);
      itemName = slugify(mdxSlugInfo[2]);
    }
    debug(
      `Collection name: '${collectionName}',
      SubCollection name: '${subCollectionName}'`,
    );
    const url =
      `${options.baseUrl}/${collectionName}` +
      `/${subCollectionName}/${itemName}`;
    const collectionItemUrl = url.replace(/\/\//g, "/").replace(/\/\//g, "/");
    debug(`Item URL: ${collectionItemUrl}`);
    const frontmatter = JSON.parse(JSON.stringify(node.frontmatter));
    const collectionItemCover =
      "cover" in frontmatter ? frontmatter.cover : null;
    debug(`CollectionItem cover: ${collectionItemCover}`);
    const collectionItemTags = "tags" in frontmatter ? frontmatter.tags : [];
    const collectionItemCategories =
      "categories" in frontmatter ? frontmatter.categories : [];
    const collectionItemData = {
      title: frontmatter.title || "",
      priority: frontmatter.priority || 1,
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
      categories: collectionItemCategories,
      lastModifiedTime: fileNode.modifiedTime,
    };
    const mdxItem = {
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
    };
    mdxItems.push(mdxItem);
    updateCollection(
      mdxItem,
      collections,
      options.baseUrl,
      collectionName,
      subCollectionName,
      createNodeId,
    );
    createNode(mdxItem);
    createParentChildLink({parent: fileNode, child: node});
  }
};

exports.createPages = async ({actions, graphql, reporter}, themeOptions) => {
  const {createNode} = actions;
  for (let idx = 0; idx < collections.length; idx++) {
    await createNode(updateCollectionNode(collections[idx]));
  }
  // Options created using default and provided options
  options = withDefaults(themeOptions);
  debug(`Options: ${JSON.stringify(options, null, 2)}`);
  const queryCollection = `
  query AllCollectionsQuery {
    allCollection (
      sort: {fields: subCollection___items___priority, order: DESC}
    ) {
      edges {
        node {
          id
          name
          slug
          items {
            timeToRead
            publishedDate
            title
            excerpt
            slug
            tags
            categories
          }
          subCollection {
            id
            name
            slug
            items {
              timeToRead
              publishedDate
              title
              excerpt
              slug
              tags
              categories
            }
          }
        }
      }
    }
  }
  `;
  let result = null;
  result = await graphql(queryCollection);
  collectionResults = result.data.allCollection.edges;
  if (collectionResults.length == 0) {
    reporter.panic(`
      There does not seem to be any mdx file present in
      '${options.contentPath}' directory. Hence collectionItem
      pages would not be created. Please add some mdx
      files in '${options.contentPath}' directory`);
  }
  if (collectionResults.length > 0) {
    collectionResults.map((collection, collectionIdx) => {
      if (collection.node.subCollection.length > 0) {
        collection.node.subCollection.map((subCollection, subCollectionIdx) => {
          debug(`Creating subCollection page for '${subCollection.name}'`);
          const subCollectionItems = subCollection.items;
          const subCollectionName = subCollection.name;
          actions.createPage({
            path: subCollection.slug,
            component: require.resolve(
              "./src/templates/subcollection-item-list.js",
            ),
            context: {
              subCollectionName: subCollectionName,
              collectionItems: subCollectionItems,
            },
          });
        });
      } else {
        debug(`Creating collection page for '${collection.node.name}'`);
        const collectionItems = collection.node.items;
        const collectionName = collection.node.name;
        actions.createPage({
          path: collection.node.slug,
          component: require.resolve("./src/templates/collection-item-list.js"),
          context: {
            collectionName: collectionName,
            collectionItems: collectionItems,
          },
        });
      }
    });
  }
  // MDX file templating
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
  result = null;
  if (process.env.NODE_ENV !== "production") {
    result = await graphql(queryDev);
  } else {
    result = await graphql(queryProd);
  }
  const collectionItems = result.data.allCollectionItem.edges;
  debug(`Number of collectionItems: ${collectionItems.length}`);
  /* debug(`Creating base collectionItem page at ${options.baseUrl}`);
  actions.createPage({
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
