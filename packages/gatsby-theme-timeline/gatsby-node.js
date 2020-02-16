const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
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

exports.createSchemaCustomization = ({actions, schema}) => {
  actions.createTypes(`
    interface ITimeline {
      id: ID!
      institution: String!
      positions: [Position!]!
    }
    type Timeline implements ITimeline & Node {
      id: ID!
      institution: String!
      positions: [Position!]!
    }
    type Position {
      title: String!
      startDuration: Date @dateformat
      endDuration: Date @dateformat
      place: String!
      details: [String!]
    }
  `);
};

exports.sourceNodes = ({actions}, themeOptions) => {
  options = withDefaults(themeOptions);
  debug("Schema customization");
};

exports.onCreateNode = (
  {node, actions, getNode, createNodeId, reporter},
  themeOptions,
) => {
  options = withDefaults(themeOptions);
  const {createNode} = actions;
  if (node.internal.type !== "TimelineYaml") {
    return;
  }
  // Create source field (according to contentPath)
  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;
  if (node.internal.type === "TimelineYaml" && source === "timeline") {
    const timeline = {
      institution: node.institution,
      positions: node.positions || [],
    };
    debug(timeline);
    createNode({
      ...timeline,
      // Required fields.
      id: createNodeId(`${node.id} >>> Timeline`),
      parent: node.id,
      children: [],
      internal: {
        type: "Timeline",
        contentDigest: crypto
          .createHash("md5")
          .update(JSON.stringify(timeline))
          .digest("hex"),
        content: JSON.stringify(timeline),
        description: "Timeline",
      },
    });
  }
};

exports.createPages = async ({actions, graphql, reporter}, themeOptions) => {
  options = withDefaults(themeOptions);
  const query = `
  query MainTimeline {
    allTimeline {
      edges {
        node {
          id
          institution
          positions {
            details
            endDuration
            place
            startDuration
            title
          }
        }
      }
    }
  }`;
  const result = await graphql(query);
  const timelines = result.data.allTimeline.edges;
  debug(timelines);
  if (timelines === null || (timelines !== null && timelines.length === 0)) {
    reporter.panic(
      "Unable to retrieve data for timeline. " +
        "Please provide atleast one timeline info in " +
        `data files (Path: ${options.contentPath})`,
    );
  }
  reporter.info(`Creating page at ${options.baseUrl}`);
  actions.createPage({
    path: options.baseUrl,
    component: require.resolve("./src/templates/timeline-list.js"),
    context: {
      timelines,
    },
  });
};
