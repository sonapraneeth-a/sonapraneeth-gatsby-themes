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
  useSiteMetadata,
} from "@sonapraneeth/gatsby-plugin-themed-components";

/**
 *
 * @param {*} pageContext
 * @param {*} location
 * @return {JSX}
 */
function Projects({pageContext: {projects}}, location) {
  const siteMeta = useSiteMetadata();
  const title = "Projects done by " + siteMeta.author;
  const description =
    "This is the projects page of " +
    siteMeta.author +
    ". " +
    "You can find summarized information about all projects in this page";
  const meta = {
    title: title,
    description: description,
  };
  return (
    <PageLayout location={location} meta={meta}>
      <SContainer>
        <Styled.h1>{"Projects"}</Styled.h1>
        <Grid noCols={2}>
          {projects.map((project, index) => (
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
