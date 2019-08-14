import {useStaticQuery, graphql} from "gatsby";

// Hook for retrieving site meta data
export const useRecentBlogs = () => {
  /* Reference: https://www.gatsbyjs.org/docs/use-static-query/ */
  const blogs = useStaticQuery(
    graphql`
      query RecentBlogsQuery {
        allBlog(limit: 10, sort: { fields: published_date, order: DESC }) {
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
