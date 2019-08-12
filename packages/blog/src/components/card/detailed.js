/** @jsx jsx */
import {jsx} from "theme-ui";
// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import {Link} from "gatsby";

import {
  Card,
  CardContent,
  CardFooter,
  Styled,
  SFlex,
  FaReadme,
} from "@sonapraneeth/base";

/**
 *
 * @param {*} children
 * @return {JSX}
 */
function DetailedBlogCard({blog, ...props}) {
  return (
    <Card>
      <CardContent>
        <SFlex>
          <Styled.h2>{blog.title}</Styled.h2>
        </SFlex>
        {blog.excerpt}
      </CardContent>
      <CardFooter>
        <SFlex
          sx={{
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
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
            }}
          >
            <FaReadme
              sx={{
                display: "inline-block",
                verticalAlign: "middle",
              }}
            />
            <span
              sx={{
                verticalAlign: "middle",
                mx: "0.2rem",
              }}
            >
              Continue Reading
            </span>
          </Styled.a>
        </SFlex>
      </CardFooter>
    </Card>
  );
}

DetailedBlogCard.propTypes = {
  blog: PropTypes.any.isRequired,
};

DetailedBlogCard.defaultProps = {};

export default DetailedBlogCard;
