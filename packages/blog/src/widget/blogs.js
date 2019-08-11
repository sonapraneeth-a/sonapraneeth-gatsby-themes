import React from "react";
import PropTypes from "prop-types";

/**
 *
 * @param {*} data
 * @return {JSX}
 */
function BlogWidget({blogs}) {
  console.log(blogs);
  return (
    <>
      <div>
        {blogs.map((blog, index) => (
          <div key={`blog-${index}`}>
            <p>{index}</p>
            <p>{blog.node.title}</p>
          </div>
        ))}
      </div>
    </>
  );
}

BlogWidget.propTypes = {
  blogs: PropTypes.any.isRequired,
};

BlogWidget.defaultProps = {};

export default BlogWidget;
