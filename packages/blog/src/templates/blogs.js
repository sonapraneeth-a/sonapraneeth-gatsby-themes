import React from "react";
import PropTypes from "prop-types";

/**
 *
 * @param {*} data
 * @return {JSX}
 */
function Blogs({pageContext: {blogs}}) {
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

Blogs.propTypes = {
  pageContext: PropTypes.any.isRequired,
};

Blogs.defaultProps = {};

export default Blogs;
