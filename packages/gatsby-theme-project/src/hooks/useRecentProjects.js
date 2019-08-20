import { useStaticQuery, graphql } from "gatsby"

// Hook for retrieving site meta data
export const useRecentProjects = () => {
  /* Reference: https://www.gatsbyjs.org/docs/use-static-query/ */
  const projects = useStaticQuery(
    graphql`
      query RecentProjectsQuery {
        allProject(limit: 10, sort: { fields: completedDate, order: DESC }) {
          edges {
            node {
              id
              slug
              title
              startDate
              completedDate
              abstract
            }
          }
        }
      }
    `
  )
  return projects.allProject.edges
}
