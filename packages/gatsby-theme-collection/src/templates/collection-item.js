import React from "react";
import PropTypes from "prop-types";
import {graphql} from "gatsby";

import CollectionItemTemplate from "../components/templates/collection-item";

/**
 *
 * @param {*} collectionItem
 * @return {JSX}
 */
function CollectionItemTemplateNode({data, location}) {
  return (
    <CollectionItemTemplate
      collectionItem={data.collectionItem}
      location={location}
    />
  );
}

CollectionItemTemplateNode.propTypes = {
  data: PropTypes.any.isRequired,
  location: PropTypes.any,
};

CollectionItemTemplateNode.defaultProps = {};

export default CollectionItemTemplateNode;

export const query = graphql`
  query CollectionItemQuery($id: String!) {
    collectionItem(id: { eq: $id }) {
      id
      slug
      title
      toc
      publishedDate
      tags
      body
      cover {
        childImageSharp {
          fluid(maxWidth: 1280) {
            base64
            aspectRatio
            src
            srcSet
            srcWebp
            srcSetWebp
            sizes
          }
        }
      }
      tableOfContents
      lastModifiedTime
    }
  }
`;
