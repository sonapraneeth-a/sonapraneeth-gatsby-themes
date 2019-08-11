import React from "react";
import PropTypes from "prop-types";

import {PageLayout} from "@sonapraneeth/base";
import ProjectCard from "../components/project-card";
import {Grid, GridItem} from "@sonapraneeth/base";

/**
 *
 * @param {*} pageContext
 * @param {*} location
 * @return {JSX}
 */
function Projects({pageContext: {projects}}, location) {
  console.log(projects);
  return (
    <PageLayout location={location} title={"Projects"}>
      <Grid noCols={2}>
        {projects.map((project, index) => (
          <GridItem key={`project-${index}`}>
            <ProjectCard project={project.node} />
          </GridItem>
        ))}
      </Grid>
    </PageLayout>
  );
}

Projects.propTypes = {
  pageContext: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
};

Projects.defaultProps = {};

export default Projects;
