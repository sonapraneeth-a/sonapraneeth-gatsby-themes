import {useStaticQuery, graphql} from "gatsby";

// Hook for retrieving site meta data
export const useFeaturedProjects = () => {
  /* Reference: https://www.gatsbyjs.org/docs/use-static-query/ */
  try {
    const projects = useStaticQuery(
      graphql`
        query FeaturedProjectsQuery {
          allProject(
            sort: { fields: metadata___startDate, order: DESC }
            filter: { metadata: { isFeatured: { eq: true } } }
            limit: 10
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
