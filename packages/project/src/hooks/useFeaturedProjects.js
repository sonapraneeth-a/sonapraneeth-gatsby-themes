import {useStaticQuery, graphql} from "gatsby";

// Hook for retrieving site meta data
export const useFeaturedProjects = () => {
  /* Reference: https://www.gatsbyjs.org/docs/use-static-query/ */
  const projects = useStaticQuery(
    graphql`
      query FeaturedProjectsQuery {
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