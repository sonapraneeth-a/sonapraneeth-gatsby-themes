import React from "react";
import PropTypes from "prop-types";

import ProjectsListTemplate from "../components/templates/projects-list";

/**
 *
 * @param {*} pageContext
 * @param {*} location
 * @return {JSX}
 */
function ProjectsListTemplateNode({pageContext: {projects}}, location) {
  return <ProjectsListTemplate projects={projects} location={location} />;
}

ProjectsListTemplateNode.propTypes = {
  pageContext: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
};

ProjectsListTemplateNode.defaultProps = {};

export default ProjectsListTemplateNode;
