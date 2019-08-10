import React from "react";
import PropTypes from "prop-types";
import {graphql} from "gatsby";

import {PageLayout} from "@sonapraneeth/base";
import HomeWidget from "../widget/home";

HomeLayout.propTypes = {
  location: PropTypes.any.isRequired,
  data: PropTypes.any.isRequired,
};

HomeLayout.defaultProps = {};

/**
 * Home layout - Used in home page
 * @return {JSX} Rendered children for the HomeLayout
 */
function HomeLayout({location, data}) {
  return (
    <PageLayout title={""} description={""} location={location}>
      <HomeWidget author={data.authorInfo} details={data.mdx} />
    </PageLayout>
  );
}

export const query = graphql`
  query AuthorDetailedInfo($id: String!) {
    authorInfo(id: { eq: $id }) {
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

export default HomeLayout;
