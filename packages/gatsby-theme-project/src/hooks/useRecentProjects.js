import {useStaticQuery, graphql} from "gatsby";

// Hook for retrieving site meta data
export const useRecentProjects = () => {
  /* Reference: https://www.gatsbyjs.org/docs/use-static-query/ */
  try {
    const projects = useStaticQuery(
      graphql`
        query RecentProjectsQuery {
          allProject(limit: 10, sort: { fields: startDate, order: DESC }) {
            edges {
              node {
                id
                slug
                title
                startDate
                completedDate
                abstract
                tags
              }
            }
          }
        }
      `
    );
    return projects.allProject.edges;
  } catch (error) {
    throw new Error(error);
  }
};
