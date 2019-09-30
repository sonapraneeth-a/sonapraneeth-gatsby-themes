import React from "react";
import PropTypes from "prop-types";

import BlogsListTemplate from "../components/templates/blogs-list";

/**
 *
 * @param {*} pageContext
 * @param {*} location
 * @return {JSX}
 */
function BlogsListTemplateNode({pageContext: {blogs}}, location) {
  return <BlogsListTemplate blogs={blogs} location={location} />;
}

BlogsListTemplateNode.propTypes = {
  pageContext: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
};

BlogsListTemplateNode.defaultProps = {};

export default BlogsListTemplateNode;
