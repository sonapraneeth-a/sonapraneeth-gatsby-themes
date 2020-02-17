const debug = require("./utils/debug").debugNode;

const initPriority = 1;
let prevPriority;

exports.createSchemaCustomization = ({actions}) => {
  actions.createTypes(`
    interface IOptions {
      id: ID!
      package: String!
      options: JSON!
    }
    type Options implements IOptions & Node {
      id: ID!
      package: String!
      options: JSON!
    }
    type Sublink @nodeInterface {
      title: String!
      url: String!
      priority: Int
      description: String
    }
    interface Menu @nodeInterface {
      id: ID!
      title: String!
      url: String!
      priority: Int!
      description: String
      sublinks: [Sublink!]!
    }
    type MenuItem implements Menu & Node {
      id: ID!
      title: String!
      url: String!
      priority: Int!
      description: String
      sublinks: [Sublink!]!
    }
  `);
};

exports.onCreateNode = ({
  node,
  actions,
  getNode,
  createNodeId,
  createContentDigest,
}) => {
  const {createNode} = actions;
  if (node.internal.type !== "MenuYaml") {
    return;
  }
  // Create source field (according to contentPath)
  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;
  debug(`Type: ${node.internal.type}`);
  debug(`Source: ${source}`);
  debug(`Node: ${JSON.stringify(node)}`);
  const sublinks =
    node.sublinks === undefined || node.sublinks === null ? [] : node.sublinks;
  const priority =
    node.priority === undefined || node.priority === null ?
      prevPriority === undefined || prevPriority === null ?
        initPriority :
        prevPriority + 1 :
      node.priority;
  prevPriority =
    prevPriority === undefined || prevPriority === null ?
      initPriority :
      prevPriority;
  debug(`Priority: ${priority}`);
  debug(`prevPriority: ${prevPriority}`);
  debug(`Sublinks: ${JSON.stringify(sublinks)}`);
  if (node.internal.type === "MenuYaml" && source === "data") {
    const menuItem = {
      title: node.title || "",
      url: node.url || "",
      description: node.description || "",
      priority: priority,
      sublinks: sublinks,
    };
    debug(`MenuItem: ${JSON.stringify(menuItem, null, 2)}`);
    createNode({
      ...menuItem,
      // Required fields.
      id: createNodeId(`${node.id} >>> MenuItem`),
      parent: node.id,
      children: [],
      internal: {
        type: "MenuItem",
        contentDigest: createContentDigest(JSON.stringify(menuItem)),
        content: JSON.stringify(menuItem),
        description: "Menu Item",
      },
    });
  }
};
