/** @jsx jsx */
import {jsx} from "theme-ui";
// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import {Link} from "gatsby";

import {
  Card,
  CardContent,
  Styled,
  CardFooter,
  SFlex,
  FaInfoCircle,
  isNullOrEmpty,
} from "@sonapraneeth/gatsby-plugin-themed-components";

/**
 *
 * @param {*} children
 * @return {JSX}
 */
function Publication({publication, ...props}) {
  console.log(publication);
  return (
    <Card
      sx={{
        my: 2,
      }}
    >
      <CardContent>
        <Styled.h2>{publication.title}</Styled.h2>
        <div
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {publication.authors.map((author, index) => (
            <span
              key={"author" + index}
              sx={{
                paddingRight: 2,
              }}
            >
              {author.name} ({author.institution})
            </span>
          ))}
        </div>
        <div>
          {publication.published}, {new Date(publication.date).getFullYear()}
        </div>
        <Styled.p>{publication.abstract}</Styled.p>
      </CardContent>
      {!isNullOrEmpty(publication.url) && (
        <CardFooter
          sx={{
            padding: "0.1rem !important",
          }}
        >
          <SFlex
            sx={{
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            {/* Reference: https://codepen.io/johnasp/pen/bqadn */}
            <Styled.a
              as={Link}
              to={publication.url}
              sx={{
                "variant": "link.none",
                "bg": "surface",
                ":hover": {
                  bg: "surface",
                  color: "text",
                },
                "padding": 2,
              }}
            >
              <FaInfoCircle
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
                Details
              </span>
            </Styled.a>
          </SFlex>
        </CardFooter>
      )}
    </Card>
  );
}

Publication.propTypes = {
  publication: PropTypes.any.isRequired,
};

Publication.defaultProps = {};

export default Publication;
