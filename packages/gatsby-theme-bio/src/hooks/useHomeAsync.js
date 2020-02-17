import {graphql} from "gatsby";

// eslint-disable-next-line max-len
import {useSiteMetadata} from "@sonapraneeth/gatsby-plugin-themed-components/src/hooks/useSiteMetadata";

// Hook for retrieving site meta data
export const useHomeAsync = async () => {
  const siteMeta = useSiteMetadata();
  const query = `
  query MainAuthorShadowed {
    author(name: {eq: "${siteMeta.author}"}) {
      id
    }
  }`;
  const result = await graphql(query);
  return result;
};
