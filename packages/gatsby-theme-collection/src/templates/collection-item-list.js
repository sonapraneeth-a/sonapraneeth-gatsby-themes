import React from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line max-len
import CollectionItemsListTemplate from "../components/templates/collection-item-list";

/**
 *
 * @param {*} pageContext
 * @param {*} location
 * @return {JSX}
 */
function CollectionItemsListTemplateNode(
  {pageContext: {collectionItems, collectionName}},
  location,
) {
  return (
    <CollectionItemsListTemplate
      collectionName={collectionName}
      collectionItems={collectionItems}
      location={location}
    />
  );
}

CollectionItemsListTemplateNode.propTypes = {
  pageContext: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
};

CollectionItemsListTemplateNode.defaultProps = {};

export default CollectionItemsListTemplateNode;
