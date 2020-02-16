import React from "react";
import PropTypes from "prop-types";

import PublicationsListTemplate from "../components/templates/publication-list";

/**
 *
 * @param {*} pageContext
 * @param {*} location
 * @return {JSX}
 */
function PublicationsListTemplateNode(
  {pageContext: {publications}},
  location,
) {
  return (
    <PublicationsListTemplate publications={publications} location={location} />
  );
}

PublicationsListTemplateNode.propTypes = {
  pageContext: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
};

PublicationsListTemplateNode.defaultProps = {};

export default PublicationsListTemplateNode;
