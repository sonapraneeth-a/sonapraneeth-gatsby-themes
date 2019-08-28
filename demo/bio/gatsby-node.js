exports.createSchemaCustomization = ({actions}) => {
  // Reference: https://github.com/gatsbyjs/gatsby/pull/16928
  // TODO: Move it to theme once done
  actions.createTypes(`
    type Frontmatter {
      type: String!
      title: String
      author: String
      summary: String
    }
    type Mdx implements Node {
      frontmatter: Frontmatter
    }
  `);
};
