/** @jsx jsx */
import {jsx} from "@sonapraneeth/gatsby-plugin-themed-components";
// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import {graphql} from "gatsby";

import ProjectTemplate from "../components/templates/project";

/**
 *
 * @param {*} data
 * @return {JSX}
 */
function ProjectTemplateNode({data, location}) {
  return <ProjectTemplate data={data} location={location} />;
}

ProjectTemplateNode.propTypes = {
  data: PropTypes.any.isRequired,
  location: PropTypes.any,
};

ProjectTemplateNode.defaultProps = {};

export default ProjectTemplateNode;

export const query = graphql`
  query ProjectQuery($id: String!) {
    project(id: { eq: $id }) {
      title
      slug
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
      metadata {
        status
        startDate
        completedDate
        showTOC
        tableOfContents
        tags
        timeToRead
      }
      body
    }
  }
`;
