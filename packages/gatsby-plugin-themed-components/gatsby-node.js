exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    interface Options @nodeInterface {
      id: ID!
      options: JSON!
    }
  `)
}
