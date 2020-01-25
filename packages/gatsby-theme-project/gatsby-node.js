const path = require("path");
const fs = require("fs");
const {createFilePath} = require("gatsby-source-filesystem");
const crypto = require("crypto");
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
      startDate: Date! @dateformat
      completedDate: Date @dateformat
      source: String!
      report: String!
      presentation: String!
      abstract: String!
      toc: Boolean!
      featured: Boolean!
      slug: String!
      fileAbsolutePath: String!
      cover: File
      tags: [String!]!
      body: String!
      tableOfContents: JSON
      timeToRead: Int
    }
    type ProjectMdx implements Project & Node {
      id: ID!
      title: String!
      status: String!
      startDate: Date! @dateformat
      completedDate: Date @dateformat
      source: String!
      report: String!
      presentation: String!
      abstract: String!
      toc: Boolean!
      featured: Boolean!
      slug: String!
      fileAbsolutePath: String!
      cover: File @fileByRelativePath
      tags: [String!]!
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
        timeToRead: {
          type: "Int",
          resolve: mdxResolverPassthrough("timeToRead"),
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
  {node, actions, getNode, createNodeId, reporter},
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
      status:
        frontmatter.status !== undefined && frontmatter.status !== null ?
          frontmatter.status :
          frontmatter.completedDate !== undefined &&
            frontmatter.completedDate !== null ?
            "Completed" :
            "Ongoing",
      startDate: new Date(frontmatter.startDate).toISOString(),
      completedDate:
        frontmatter.completedDate !== undefined &&
        frontmatter.completedDate !== null ?
          new Date(frontmatter.completedDate).toISOString() :
          new Date().toISOString(),
      source: frontmatter.source || "",
      report: frontmatter.report || "",
      presentation: frontmatter.presentation || "",
      abstract: frontmatter.abstract || "",
      toc:
        frontmatter.toc !== undefined && frontmatter.toc !== null ?
          frontmatter.toc :
          true,
      featured: frontmatter.featured || false,
      fileAbsolutePath: node.fileAbsolutePath,
      cover: projectCover,
      tags: projectTags,
      slug: projectUrl,
    };
    debug(JSON.stringify(projectData, null, 2));
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
    slug
    title
    startDate(formatString: "MMM YYYY")
    completedDate(formatString: "MMM YYYY")
    abstract
    source
    report
    presentation
    status
    featured
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
  const query = `
  query AllProjectsQuery {
    allProject(
      sort: {fields: startDate, order: DESC},
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
