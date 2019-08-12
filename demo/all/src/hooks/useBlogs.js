import {useStaticQuery, graphql} from "gatsby";

// Hook for retrieving site meta data
export const useBlogs = () => {
  /* Reference: https://www.gatsbyjs.org/docs/use-static-query/ */
  const blogs = useStaticQuery(
    graphql`
      query BlogsQueryShadowed {
        allBlog {
          edges {
            node {
              id
              slug
              title
              published_date
              excerpt
            }
          }
        }
      }
    `
  );
  return blogs.allBlog.edges;
};
