import React from "react";
import PropTypes from "prop-types";
import {Link} from "gatsby";

import {Styled} from "@sonapraneeth/base";
import {Card, CardContent, CardFooter, StatusChip} from "@sonapraneeth/base";
import {PageLayout} from "@sonapraneeth/base";

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
      <div>
        {projects.map((project, index) => (
          <Card key={`project-${index}`}>
            <CardContent>
              <Styled.h2>{project.node.title}</Styled.h2>
              <StatusChip type={project.node.status} />
            </CardContent>
            <CardFooter>
              <Link to={project.node.slug}>Details</Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
}

Projects.propTypes = {
  pageContext: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
};

Projects.defaultProps = {};

export default Projects;
