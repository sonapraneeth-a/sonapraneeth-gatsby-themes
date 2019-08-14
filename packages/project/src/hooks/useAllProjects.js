import {useStaticQuery, graphql} from "gatsby";

// Hook for retrieving site meta data
export const useAllProjects = () => {
  /* Reference: https://www.gatsbyjs.org/docs/use-static-query/ */
  const projects = useStaticQuery(
    graphql`
      query AllProjectsQuery {
        allProject {
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
