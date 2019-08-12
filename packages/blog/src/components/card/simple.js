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
function SimpleBlogCard({blog, ...props}) {
  return (
    <Card>
      <CardContent>
        <Styled.a
          as={Link}
          to={blog.slug}
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
          <Styled.h2>{blog.title}</Styled.h2>
        </Styled.a>
        <Styled.p>{blog.excerpt}</Styled.p>
      </CardContent>
    </Card>
  );
}

SimpleBlogCard.propTypes = {
  blog: PropTypes.any.isRequired,
};

SimpleBlogCard.defaultProps = {};

export default SimpleBlogCard;
