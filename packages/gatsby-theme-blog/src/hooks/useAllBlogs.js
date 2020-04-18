import {useStaticQuery, graphql} from "gatsby";

// Hook for retrieving site meta data
export const useAllBlogs = () => {
  /* Reference: https://www.gatsbyjs.org/docs/use-static-query/ */
  const blogs = useStaticQuery(
    graphql`
      query AllBlogsQuery {
        allBlog(sort: { fields: metadata___publishedTime, order: DESC }) {
          edges {
            node {
              id
              slug
              title
              excerpt
              metadata {
                publishedTime
              }
            }
          }
        }
      }
    `,
  );
  return blogs.allBlog.edges;
};
