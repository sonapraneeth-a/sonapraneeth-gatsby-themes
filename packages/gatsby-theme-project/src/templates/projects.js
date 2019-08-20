import React from "react"
import PropTypes from "prop-types"

import { PageLayout, Styled } from "@sonapraneeth/base"
import DetailedProjectCard from "../components/card/detailed"
import { Grid, GridItem, SContainer } from "@sonapraneeth/base"

/**
 *
 * @param {*} pageContext
 * @param {*} location
 * @return {JSX}
 */
function Projects({ pageContext: { projects } }, location) {
  return (
    <PageLayout location={location} title={""}>
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
  )
}

Projects.propTypes = {
  pageContext: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
}

Projects.defaultProps = {}

export default Projects
