import {useStaticQuery, graphql} from "gatsby";

// Hook for retrieving site meta data
export const useSiteMetadata = () => {
  /* Reference: https://www.gatsbyjs.org/docs/use-static-query/ */
  const siteMeta = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            appName
            title
            author
            siteUrl
            baseUrl
            description
          }
        }
      }
    `
  );
  return siteMeta.site.siteMetadata;
};
