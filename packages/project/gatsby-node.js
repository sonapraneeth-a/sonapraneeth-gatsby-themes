const {createFilePath} = require("gatsby-source-filesystem");
const crypto = require("crypto");
const merge = require("deepmerge");

// Default options to be used in theme
const defaultOptions = {
  // Base url for rendering site
  baseUrl: "/", // Default: "/"
  // Data directory
  contentPath: "content/projects", // Default: "content/projects"
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
    interface Project @nodeInterface {
      id: ID!
      title: String!
      status: String!
      startDate: Date!
      completedDate: Date!
      source: String!
      report: String!
      presentation: String!
      abstract: String!
      show_toc: Boolean!
      featured: Boolean!
      slug: String!
      fileAbsolutePath: String!
      body: String!
    }
    type ProjectMdx implements Project & Node {
      id: ID!
      title: String!
      status: String!
      startDate: Date!
      completedDate: Date!
      source: String!
      report: String!
      presentation: String!
      abstract: String!
      show_toc: Boolean!
      featured: Boolean!
      slug: String!
      fileAbsolutePath: String!
      body: String!
    }
  `);
  actions.createTypes(
    schema.buildObjectType({
      name: "ProjectMdx",
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
    let projectUrl = `${options.baseUrl}${slug}`;
    projectUrl = projectUrl.replace(/\/\//, "/");
    const projectData = {
      title: node.frontmatter.title || "",
      status: node.frontmatter.status || "Completed",
      startDate: node.frontmatter.startDate,
      completedDate: node.frontmatter.completedDate,
      source: node.frontmatter.source || "",
      report: node.frontmatter.report || "",
      presentation: node.frontmatter.presentation || "",
      abstract: node.frontmatter.abstract || "",
      show_toc: node.frontmatter.show_toc || true,
      featured: node.frontmatter.featured || false,
      fileAbsolutePath: node.fileAbsolutePath,
      slug: projectUrl,
    };
    createNode({
      ...projectData,
      // Required fields.
      id: createNodeId(`${node.id} >>> ProjectMdx`),
      parent: node.id,
      children: [],
      internal: {
        type: "ProjectMdx",
        contentDigest: crypto
          .createHash("md5")
          .update(JSON.stringify(projectData))
          .digest("hex"),
        content: JSON.stringify(projectData),
        description: "Blog Posts",
      },
    });
    createParentChildLink({parent: fileNode, child: node});
  }
};

exports.createPages = async ({actions, graphql}, themeOptions) => {
  options = merge(defaultOptions, themeOptions);
  const query = `
  query AllProjectsQuery {
    allProject {
      edges {
        node {
          id
          slug
          title
          startDate
          completedDate
          abstract
          source
          report
          presentation
          status
          show_toc
          featured
          fileAbsolutePath
        }
      }
    }
  }`;
  const result = await graphql(query);
  const projects = result.data.allProject.edges;
  projects.map((project) => {
    actions.createPage({
      path: project.node.slug,
      component: require.resolve("./src/templates/project.js"),
      context: {
        id: project.node.id,
        fileAbsolutePath: project.node.fileAbsolutePath,
      },
    });
  });
  actions.createPage({
    path: options.baseUrl,
    component: require.resolve("./src/templates/projects.js"),
    context: {
      projects,
    },
  });
};
