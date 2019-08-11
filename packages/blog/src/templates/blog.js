import React from "react";
import PropTypes from "prop-types";
import {graphql} from "gatsby";
import {MDXRenderer} from "gatsby-plugin-mdx";

import {SMain} from "@sonapraneeth/base";

/**
 *
 * @param {*} data
 * @return {JSX}
 */
function Blog({data}) {
  console.log(data);
  return (
    <>
      <SMain>
        {data.blog.published_date}
        <MDXRenderer>{data.blog.body}</MDXRenderer>
      </SMain>
    </>
  );
}

Blog.propTypes = {
  data: PropTypes.any.isRequired,
};

Blog.defaultProps = {};

export default Blog;

export const query = graphql`
  query BlogQuery($id: String!) {
    blog(id: { eq: $id }) {
      id
      slug
      title
      published_date
      body
    }
  }
`;
