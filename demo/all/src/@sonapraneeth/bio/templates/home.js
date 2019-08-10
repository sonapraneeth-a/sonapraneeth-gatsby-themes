import React from "react";
import PropTypes from "prop-types";
import {graphql} from "gatsby";

import {PageLayout} from "@sonapraneeth/base";
import HomeWidget from "@sonapraneeth/bio/src/widget/home";
import ProjectWidget from "@sonapraneeth/projects/src/widget/projects";

import {useProjects} from "../../../hooks/useProjects";

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
  console.log("Shadowed");
  console.log(data);
  const projects = useProjects();
  return (
    <PageLayout title={""} description={""} location={location}>
      <HomeWidget author={data.authorInfo} details={data.mdx} />
      <ProjectWidget projects={projects} />
    </PageLayout>
  );
}

export const query = graphql`
  query AuthorDetailedInfoShadowed {
    authorInfo(id: { eq: "John Doe" }) {
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
