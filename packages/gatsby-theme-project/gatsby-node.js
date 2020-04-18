const path = require("path");
const fs = require("fs");
const {createFilePath} = require("gatsby-source-filesystem");
const withDefaults = require("./utils/default-options");
const debug = require("./utils/debug").debugNode;

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
  const updatedFieldName = fieldName === undefined ? info.fieldName : fieldName;
  const resolver = type.getFields()[updatedFieldName].resolve;
  const result = await resolver(mdxNode, args, context, {
    updatedFieldName,
  });
  return result;
};

const mdxResolverPassthroughAsync = (fieldName = async (
  source,
  args,
  context,
  info,
  fieldName,
) => {
  const type = info.schema.getType("Mdx");
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent,
  });
  const updatedFieldName = fieldName === undefined ? info.fieldName : fieldName;
  const resolver = type.getFields()[updatedFieldName].resolve;
  const result = await resolver(mdxNode, args, context, {
    updatedFieldName,
  });
  return result;
});

exports.createSchemaCustomization = ({actions, schema}) => {
  actions.createTypes(`
    interface IProject {
      id: ID!
      title: String!
      abstract: String
      slug: String!
      fileAbsolutePath: String
      cover: File @fileByRelativePath
      metadata: ProjectMetadata
      body: String!
    }
    type Project implements IProject & Node {
      id: ID!
      title: String!
      abstract: String
      slug: String!
      fileAbsolutePath: String
      cover: File @fileByRelativePath
      metadata: ProjectMetadata
      body: String!
    }
    type ProjectMetadata {
      status: String!
      isFeatured: Boolean!
      startDate: Date! @dateformat
      completedDate: Date @dateformat
      showTOC: Boolean!
      tableOfContents: JSON
      tags: [String!]!
      timeToRead: Int
      source: String!
      report: String!
      presentation: String!
    }
  `);
  actions.createTypes(
    schema.buildObjectType({
      name: "Project",
      fields: {
        body: {
          type: "String!",
          resolve: mdxResolverPassthrough(),
        },
      },
    }),
  );
  actions.createTypes(
    schema.buildObjectType({
      name: "ProjectMetadata",
      fields: {
        timeToRead: {
          type: "Int",
          resolve: async (source, args, context, info) => {
            let result = await mdxResolverPassthroughAsync(
              source,
              args,
              context,
              info,
            );
            if (result === undefined || result === null || isNaN(result)) {
              result = 0;
            }
            return result;
          },
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

/* exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    ProjectMetadata: {
      timeToRead: {
        type: "Int",
        resolve: async (source, args, context, info) => {
          const time = await mdxResolverPassthrough("timeToRead");
          console.log(`Time: ${time}`);
          return time;
        },
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
  };
  createResolvers(resolvers);
}*/

// Create fields for post slugs and source
// This will change with schema customization with work
exports.onCreateNode = (
  {node, actions, getNode, createNodeId, createContentDigest, reporter},
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
    let projectUrl = `${options.baseUrl}${slug}`;
    projectUrl = projectUrl.replace(/\/\//, "/");
    const frontmatter = JSON.parse(JSON.stringify(node.frontmatter));
    const projectCover = "cover" in frontmatter ? frontmatter.cover : null;
    const projectTags = "tags" in frontmatter ? frontmatter.tags : [];
    debug(`Project cover: ${projectCover}`);
    debug(`Project tags: ${projectTags}`);
    const projectData = {
      title: frontmatter.title || "",
      abstract: frontmatter.abstract || "",
      slug: projectUrl,
      fileAbsolutePath: node.fileAbsolutePath,
      cover: projectCover,
      metadata: {
        parent: node.id,
        status:
          frontmatter.status !== undefined && frontmatter.status !== null ?
            frontmatter.status :
            frontmatter.completedDate !== undefined &&
              frontmatter.completedDate !== null ?
              "Completed" :
              "Ongoing",
        isFeatured: frontmatter.isFeatured || false,
        startDate: new Date(frontmatter.startDate).toISOString(),
        completedDate:
          frontmatter.completedDate !== undefined &&
          frontmatter.completedDate !== null ?
            new Date(frontmatter.completedDate).toISOString() :
            new Date().toISOString(),
        showTOC:
          frontmatter.showTOC !== undefined && frontmatter.showTOC !== null ?
            frontmatter.showTOC :
            true,
        tags: projectTags,
        source: frontmatter.source || "",
        report: frontmatter.report || "",
        presentation: frontmatter.presentation || "",
      },
    };
    debug(JSON.stringify(projectData, null, 2));
    createNode({
      ...projectData,
      // Required fields.
      id: createNodeId(`${node.id} >>> Project`),
      parent: node.id,
      children: [],
      internal: {
        type: "Project",
        contentDigest: createContentDigest(JSON.stringify(projectData)),
        content: JSON.stringify(projectData),
        description: "Projects",
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
    title
    abstract
    slug
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
    metadata {
      status
      isFeatured
      startDate(formatString: "MMM YYYY")
      completedDate(formatString: "MMM YYYY")
      source
      report
      presentation
    }
  `;
  const query = `
  query AllProjectsQuery {
    allProject(
      sort: {fields: metadata___startDate, order: DESC},
    ) {
      edges {
        node {
          ${fields}
        }
      }
    }
  }`;
  let result = null;
  try {
    result = await graphql(query);
  } catch (error) {
    console.error(error);
  }
  const projects = result.data.allProject.edges;
  debug(result);
  debug(JSON.stringify(projects, null, 2));
  debug(`Number of projects: ${projects.length}`);
  debug(`Creating base project page at ${options.baseUrl}`);
  actions.createPage({
    path: options.baseUrl,
    component: require.resolve("./src/templates/projects-list.js"),
    context: {
      projects,
    },
  });
  if (projects.length <= 0) {
    const url =
      "https://github.com/sonapraneeth-a/sonapraneeth-gatsby-themes/tree/master/demo/project/content";
    reporter.warn(`
      There does not seem to be any mdx file present in
      '${options.contentPath}' directory. Hence project
      pages would not be created. Please add some mdx
      files in '${options.contentPath}' directory. You may refer
      to ${url} for reference
    `);
  } else {
    projects.map((project) => {
      debug(`Creating project page for '${project.node.title}'`);
      actions.createPage({
        path: project.node.slug,
        component: require.resolve("./src/templates/project.js"),
        context: {
          id: project.node.id,
        },
      });
    });
  }
};
