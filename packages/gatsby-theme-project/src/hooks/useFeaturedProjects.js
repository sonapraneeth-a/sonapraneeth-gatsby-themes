import {useStaticQuery, graphql} from "gatsby";

// Hook for retrieving site meta data
export const useFeaturedProjects = () => {
  /* Reference: https://www.gatsbyjs.org/docs/use-static-query/ */
  const projects = useStaticQuery(
    graphql`
      query FeaturedProjectsQuery {
        allProject(
          sort: { fields: startDate, order: DESC }
          filter: { featured: { eq: true } }
        ) {
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
};
