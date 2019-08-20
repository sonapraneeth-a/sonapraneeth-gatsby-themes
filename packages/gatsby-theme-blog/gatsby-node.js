const {createFilePath} = require("gatsby-source-filesystem");
const crypto = require("crypto");
const merge = require("deepmerge");
const slugify = require("slug");
slugify.charmap["+"] = "p";
const debug = require("debug")("@sonapraneeth/gatsby-theme-blog:node");

// Default options to be used in theme
const defaultOptions = {
  // Base url for rendering site
  baseUrl: "/", // Default: "/"
  // Data directory
  contentPath: "content/blog", // Default: "content/blog"
  // Configure MDX. true would defaults of the theme
  mdx: true, // Default: true
};

let options;

const mdxResolverPassthrough = (fieldName) => async (
  source,
  args,
  context,
  info
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
    interface Blog @nodeInterface {
      id: ID!
      title: String!
      publishedDate: Date!
      slug: String!
      excerpt: String!
      body: String!
      fileAbsolutePath: String!
      draft: Boolean!
      sharing: Boolean!
      timeToRead: Int
      tags: [String!]!
    }
    type BlogMdx implements Blog & Node {
      id: ID!
      title: String!
      publishedDate: Date!
      slug: String!
      excerpt: String!
      body: String!
      fileAbsolutePath: String!
      draft: Boolean!
      sharing: Boolean!
      timeToRead: Int
      tags: [String!]!
    }
  `);
  actions.createTypes(
    schema.buildObjectType({
      name: "BlogMdx",
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
      },
    })
  );
};

// Create fields for post slugs and source
// This will change with schema customization with work
exports.onCreateNode = (
  {node, actions, getNode, createNodeId},
  themeOptions
) => {
  options = merge(defaultOptions, themeOptions);
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
    let blogUrl = slug;
    const [, year, month, date, title] = blogUrl.match(
      /^\/([\d]{4})-([\d]{2})-([\d]{2})-{1}(.+)\/$/
    );
    blogUrl = `${options.baseUrl}/${year}/${month}/${date}/${slugify(title)}/`;
    blogUrl = blogUrl.replace(/\/\//, "/");
    const blogTags = "tags" in node.frontmatter ? node.frontmatter.tags : [];
    const blogData = {
      title: node.frontmatter.title || "",
      publishedDate: node.frontmatter.publishedDate,
      slug: blogUrl,
      fileAbsolutePath: node.fileAbsolutePath,
      draft: node.frontmatter.draft || false,
      sharing: node.frontmatter.sharing || false,
      tags: blogTags,
    };
    createNode({
      ...blogData,
      // Required fields.
      id: createNodeId(`${node.id} >>> BlogMdx`),
      parent: node.id,
      children: [],
      internal: {
        type: "BlogMdx",
        contentDigest: crypto
          .createHash("md5")
          .update(JSON.stringify(blogData))
          .digest("hex"),
        content: JSON.stringify(blogData),
        description: "Blog Posts",
      },
    });
    createParentChildLink({parent: fileNode, child: node});
  }
};

exports.createPages = async ({actions, graphql}, themeOptions) => {
  options = merge(defaultOptions, themeOptions);
  debug(`Options: ${JSON.stringify(options, null, 2)}`);
  const queryProd = `
  query AllBlogsQuery {
    allBlog(filter: {draft: {eq: false}}) {
      edges {
        node {
          id
          slug
          title
          publishedDate
          excerpt
          fileAbsolutePath
          timeToRead
        }
      }
    }
  }`;
  const queryDev = `
  query AllBlogsQuery {
    allBlog {
      edges {
        node {
          id
          slug
          title
          publishedDate
          excerpt
          fileAbsolutePath
          timeToRead
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
  const blogs = result.data.allBlog.edges;
  debug(`Blogs in ${process.env.NODE_ENV} env`);
  debug(JSON.stringify(blogs, null, 2));
  blogs.map((blog) => {
    actions.createPage({
      path: blog.node.slug,
      component: require.resolve("./src/templates/blog.js"),
      context: {
        id: blog.node.id,
        fileAbsolutePath: blog.node.fileAbsolutePath,
      },
    });
  });
  debug(`Creating base blog page at ${options.baseUrl}`);
  actions.createPage({
    path: options.baseUrl,
    component: require.resolve("./src/templates/blogs.js"),
    context: {
      blogs,
    },
  });
};
