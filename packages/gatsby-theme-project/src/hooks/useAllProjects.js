import {useStaticQuery, graphql} from "gatsby";

// Hook for retrieving site meta data
export const useAllProjects = () => {
  /* Reference: https://www.gatsbyjs.org/docs/use-static-query/ */
  try {
    const projects = useStaticQuery(
      graphql`
        query AllProjectsQuery {
          allProject {
            edges {
              node {
                id
                title
                abstract
                slug
                metadata {
                  startDate
                  completedDate
                }
              }
            }
          }
        }
      `,
    );
    return projects.allProject.edges;
  } catch (error) {
    throw new Error(error);
  }
};
