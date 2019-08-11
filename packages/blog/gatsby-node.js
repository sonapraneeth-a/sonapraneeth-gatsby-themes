const {createFilePath} = require("gatsby-source-filesystem");
const crypto = require("crypto");
const merge = require("deepmerge");
const slugify = require("slug");
slugify.charmap["+"] = "p";

// Default options to be used in theme
const defaultOptions = {
  // Base url for rendering site
  baseUrl: "/", // Default: "/"
  // Data directory
  contentPath: "content/blog", // Default: "content/blog"
};

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
      published_date: Date!
      slug: String!
      body: String!
    }
    type BlogMdx implements Blog & Node {
      id: ID!
      title: String!
      published_date: Date!
      slug: String!
      body: String!
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
    console.log(blogUrl);
    const blogData = {
      title: node.frontmatter.title || "",
      published_date: node.frontmatter.published_date,
      slug: blogUrl,
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
  const query = `
  query AllBlogsQuery {
    allBlog {
      edges {
        node {
          id
          slug
          title
          published_date
        }
      }
    }
  }`;
  const result = await graphql(query);
  const blogs = result.data.allBlog.edges;
  blogs.map((blog) => {
    actions.createPage({
      path: blog.node.slug,
      component: require.resolve("./src/templates/blog.js"),
      context: {
        id: blog.node.id,
      },
    });
  });
  actions.createPage({
    path: options.baseUrl,
    component: require.resolve("./src/templates/blogs.js"),
    context: {
      blogs,
    },
  });
};
