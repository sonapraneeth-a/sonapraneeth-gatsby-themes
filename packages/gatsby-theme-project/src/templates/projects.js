import React from "react";
import PropTypes from "prop-types";

import {
  PageLayout,
  Styled,
} from "@sonapraneeth/gatsby-plugin-themed-components";
import DetailedProjectCard from "../components/card/detailed";
import {
  Grid,
  GridItem,
  SContainer,
} from "@sonapraneeth/gatsby-plugin-themed-components";

/**
 *
 * @param {*} pageContext
 * @param {*} location
 * @return {JSX}
 */
function Projects({pageContext: {featuredProjects}}, location) {
  return (
    <PageLayout location={location} title={""}>
      <SContainer>
        <Styled.h1>{"Projects"}</Styled.h1>
        <Grid noCols={2}>
          {featuredProjects.map((project, index) => (
            <GridItem key={`project-detailed-${index}`}>
              <DetailedProjectCard project={project.node} />
            </GridItem>
          ))}
        </Grid>
      </SContainer>
    </PageLayout>
  );
}

Projects.propTypes = {
  pageContext: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
};

Projects.defaultProps = {};

export default Projects;
