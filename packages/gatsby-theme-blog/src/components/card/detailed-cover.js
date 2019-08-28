/** @jsx jsx */
import {jsx} from "@sonapraneeth/gatsby-plugin-themed-components";
// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import {Link} from "gatsby";

import {
  useThemeUI,
  GatsbyImage,
  Grid,
  GridItem,
  Card,
  CardContent,
  CardFooter,
  Styled,
  SFlex,
  FaReadme,
  FaClock,
  Chip,
} from "@sonapraneeth/gatsby-plugin-themed-components";

/**
 *
 * @param {*} children
 * @return {JSX}
 */
function DetailedBlogCardWithCover({blog, ...props}) {
  const timeToRead = blog.timeToRead === null ? "< 1" : blog.timeToRead;
  const context = useThemeUI();
  const theme = context.theme;
  const borderRadius = theme.rounded === false ? "0%" : "2%";
  // const width = blog.cover !== null ? "75%" : "100%";
  const numColumns = blog.cover !== null ? 2 : 1;
  const sizes = blog.cover !== null ? [7, 13] : [1];
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Grid
        noCols={numColumns}
        nSizes={sizes}
        style={{
          width: "100%",
          gridGap: "0 !important",
          padding: "0 !important",
        }}
      >
        {blog.cover != null && (
          <GridItem
            id="blogCover"
            style={{
              margin: 0,
            }}
          >
            <GatsbyImage
              src={blog.cover.childImageSharp.fluid}
              style={{
                borderTopLeftRadius: borderRadius,
                borderBottomLeftRadius: borderRadius,
                height: "100%",
              }}
              imgStyle={{
                objectFit: "unset",
              }}
            />
          </GridItem>
        )}
        <GridItem
          id="blogDetail"
          style={{
            margin: 0,
          }}
        >
          <CardContent>
            <SFlex
              sx={{
                flexDirection: "column",
              }}
            >
              <Styled.h2>{blog.title}</Styled.h2>
              <SFlex
                sx={{
                  flexDirection: "row",
                }}
              >
                <Chip type={"date"}>
                  <b>Published:</b> {blog.publishedDate}
                </Chip>
              </SFlex>
              <p>{blog.excerpt}</p>
            </SFlex>
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
                  Continue Reading ...
                </span>
              </Styled.a>
              <p
                sx={{
                  m: 0,
                }}
              >
                <FaClock
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
                  {timeToRead} min. read
                </span>
              </p>
            </SFlex>
          </CardFooter>
        </GridItem>
      </Grid>
    </Card>
  );
}

DetailedBlogCardWithCover.propTypes = {
  blog: PropTypes.any.isRequired,
};

DetailedBlogCardWithCover.defaultProps = {};

export default DetailedBlogCardWithCover;
