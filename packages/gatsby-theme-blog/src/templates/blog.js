import React from "react";
import PropTypes from "prop-types";
import {graphql} from "gatsby";

import BlogTemplate from "../components/templates/blog";

/**
 *
 * @param {*} blog
 * @return {JSX}
 */
function BlogTemplateNode({data, location}) {
  return <BlogTemplate blog={data.blog} location={location} />;
}

BlogTemplateNode.propTypes = {
  data: PropTypes.any.isRequired,
  location: PropTypes.any,
};

BlogTemplateNode.defaultProps = {};

export default BlogTemplateNode;

export const query = graphql`
  query BlogQuery($id: String!) {
    blog(id: { eq: $id }) {
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
