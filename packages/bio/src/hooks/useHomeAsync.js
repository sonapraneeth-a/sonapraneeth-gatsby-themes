import {graphql} from "gatsby";

import {useSiteMetadata} from "@sonapraneeth/base/src/hooks/useSiteMetadata";

// Hook for retrieving site meta data
export const useHomeAsync = async () => {
  const siteMeta = useSiteMetadata();
  const query = `
  query MainAuthorShadowed {
    authorInfo(name: {eq: "${siteMeta.author}"}) {
      id
    }
  }`;
  const result = await graphql(query);
  return result;
};
