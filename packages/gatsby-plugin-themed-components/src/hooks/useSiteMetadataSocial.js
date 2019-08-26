import {useStaticQuery, graphql} from "gatsby";

// Hook for retrieving site meta data
export const useSiteMetadataSocial = () => {
  /* Reference: https://www.gatsbyjs.org/docs/use-static-query/ */
  const siteMeta = useStaticQuery(
    graphql`
      query SiteMetaDataSocial {
        site {
          siteMetadata {
            social {
              twitter
              facebook
              github
              linkedin
            }
          }
        }
      }
    `
  );
  return siteMeta.site.siteMetadata.social;
};
