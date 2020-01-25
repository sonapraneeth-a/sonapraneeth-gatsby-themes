import React from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line max-len
import SubCollectionItemsListTemplate from "../components/templates/subcollection-item-list";

/**
 *
 * @param {*} pageContext
 * @param {*} location
 * @return {JSX}
 */
function SubCollectionItemsListTemplateNode(
  {pageContext: {collectionItems, subCollectionName}},
  location,
) {
  return (
    <SubCollectionItemsListTemplate
      subCollectionName={subCollectionName}
      collectionItems={collectionItems}
      location={location}
    />
  );
}

SubCollectionItemsListTemplateNode.propTypes = {
  pageContext: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
};

SubCollectionItemsListTemplateNode.defaultProps = {};

export default SubCollectionItemsListTemplateNode;
