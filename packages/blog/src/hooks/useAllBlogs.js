import {useStaticQuery, graphql} from "gatsby";

// Hook for retrieving site meta data
export const useAllBlogs = () => {
  /* Reference: https://www.gatsbyjs.org/docs/use-static-query/ */
  const blogs = useStaticQuery(
    graphql`
      query AllBlogsQuery {
        allBlog(limit: 10, sort: { fields: publishedDate, order: DESC }) {
          edges {
            node {
              id
              slug
              title
              publishedDate
              excerpt
            }
          }
        }
      }
    `
  );
  return blogs.allBlog.edges;
};
