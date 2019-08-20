import React from "react";
import PropTypes from "prop-types";

import SimpleProjectCard from "../components/card/simple";
import {Grid, GridItem} from "@sonapraneeth/gatsby-plugin-themed-components";

/**
 *
 * @param {*} data
 * @return {JSX}
 */
function ProjectWidget({projects}) {
  return (
    <Grid noCols={2}>
      {projects.map((project, index) => (
        <GridItem key={`project-simple-${index}`}>
          <SimpleProjectCard project={project.node} />
        </GridItem>
      ))}
    </Grid>
  );
}

ProjectWidget.propTypes = {
  projects: PropTypes.any.isRequired,
};

ProjectWidget.defaultProps = {};

export default ProjectWidget;
