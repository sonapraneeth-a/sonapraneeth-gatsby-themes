import {useStaticQuery, graphql} from "gatsby";

// Hook for retrieving site meta data
export const useRecentProjects = () => {
  /* Reference: https://www.gatsbyjs.org/docs/use-static-query/ */
  try {
    const projects = useStaticQuery(
      graphql`
        query RecentProjectsQuery {
          allProject(
            limit: 10
            sort: { fields: metadata___startDate, order: DESC }
          ) {
            edges {
              node {
                id
                title
                abstract
                slug
                metadata {
                  startDate
                  completedDate
                  tags
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
