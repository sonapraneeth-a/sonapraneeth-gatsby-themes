import {useStaticQuery, graphql} from "gatsby";

// Hook for retrieving site meta data
export const useMenu = () => {
  /* Reference: https://www.gatsbyjs.org/docs/use-static-query/ */
  try {
    const projects = useStaticQuery(
      graphql`
        query AllMenu {
          allMenu(sort: { order: ASC, fields: priority }) {
            edges {
              node {
                title
                priority
                url
                sublinks {
                  title
                  url
                }
              }
            }
          }
        }
      `,
    );
    return projects.allMenu.edges;
  } catch (error) {
    throw new Error(error);
  }
};
