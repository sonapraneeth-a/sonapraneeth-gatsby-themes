import {useStaticQuery, graphql} from "gatsby";

// Hook for retrieving site meta data
export const useRecentProjects = () => {
  /* Reference: https://www.gatsbyjs.org/docs/use-static-query/ */
  const projects = useStaticQuery(
    graphql`
      query RecentProjectsQuery {
        allProject(limit: 10, sort: { fields: completed_date, order: DESC }) {
          edges {
            node {
              id
              slug
              title
              start_date
              completed_date
              abstract
            }
          }
        }
      }
    `
  );
  return projects.allProject.edges;
};
