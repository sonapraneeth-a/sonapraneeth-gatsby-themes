import {useStaticQuery, graphql} from "gatsby";

// Hook for retrieving site meta data
export const useProjects = () => {
  /* Reference: https://www.gatsbyjs.org/docs/use-static-query/ */
  const projects = useStaticQuery(
    graphql`
      query ProjectsQueryShadowed {
        allProject {
          edges {
            node {
              id
              slug
              title
              start_date
              completed_date
            }
          }
        }
      }
    `
  );
  return projects.allProject.edges;
};
