import React from "react";
import PropTypes from "prop-types";
import {MDXRenderer} from "gatsby-plugin-mdx";

DescriptionBio.propTypes = {
  description: PropTypes.any.isRequired,
};

DescriptionBio.defaultProps = {};

/**
 * This component renders description of the person
 * from the mdx file present in the home content
 * (See options: paths.home) folder
 * @return {JSX}
 */
function DescriptionBio({description}) {
  return <MDXRenderer>{description}</MDXRenderer>;
}

export default DescriptionBio;
