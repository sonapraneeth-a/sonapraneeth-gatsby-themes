/** @jsx jsx */
import {jsx} from "theme-ui";
// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import {Link} from "gatsby";

import {Card, CardContent, Styled} from "@sonapraneeth/base";

/**
 *
 * @param {*} children
 * @return {JSX}
 */
function SimpleProjectCard({project, ...props}) {
  console.log(project);
  return (
    <Card>
      <CardContent>
        <Styled.a
          as={Link}
          to={project.slug}
          sx={{
            "variant": "link.none",
            "bg": "surface",
            ":hover": {
              bg: "surface",
              color: "text",
            },
            "display": "inline-block",
            "width": "100%",
          }}
        >
          <Styled.h2>{project.title}</Styled.h2>
        </Styled.a>
        <Styled.p>{project.abstract}</Styled.p>
      </CardContent>
    </Card>
  );
}

SimpleProjectCard.propTypes = {
  project: PropTypes.any.isRequired,
};

SimpleProjectCard.defaultProps = {};

export default SimpleProjectCard;
