import React from "react";
import PropTypes from "prop-types";
import {graphql} from "gatsby";

import HomeTemplate from "../components/templates/home";

HomeTemplateNode.propTypes = {
  location: PropTypes.any.isRequired,
  data: PropTypes.any.isRequired,
};

HomeTemplate.defaultProps = {};

/**
 * Home layout - Used in home page
 * @return {JSX} Rendered children for the HomeTemplate
 */
function HomeTemplateNode({location, data}) {
  return <HomeTemplate location={location} data={data} />;
}

export const query = graphql`
  query AuthorDetailedInfo($id: String!) {
    author(id: { eq: $id }) {
      name
      description
      cover {
        childImageSharp {
          fluid(maxWidth: 400) {
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
      username {
        email
        facebook
        github
        linkedin
        twitter
      }
    }
    mdx(frontmatter: { type: { eq: "home-page" } }) {
      frontmatter {
        title
        author
        summary
      }
      body
    }
  }
`;

export default HomeTemplateNode;
