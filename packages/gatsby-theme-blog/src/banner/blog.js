/** @jsx jsx */
import {jsx} from "@sonapraneeth/gatsby-plugin-themed-components";
// eslint-disable-next-line no-unused-vars
import React from "react";
import {Link} from "gatsby";

import {
  Styled,
  SFlex,
  SContainer,
  Button,
  FaArrowRight,
} from "@sonapraneeth/gatsby-plugin-themed-components";
import {BlogWidget, useRecentBlogs} from "@sonapraneeth/gatsby-theme-blog";

BlogBanner.propTypes = {};

BlogBanner.defaultProps = {};

/**
 * Home layout - Used in home page
 * @return {JSX} Rendered children for the BlogBanner
 */
function BlogBanner() {
  const blogs = useRecentBlogs();
  return (
    <div
      sx={{
        bg: "banner.about",
        padding: "1rem",
      }}
    >
      <SContainer>
        <Styled.h1>Blog</Styled.h1>
        <BlogWidget blogs={blogs} />
        <SFlex
          sx={{
            justifyContent: "flex-end",
          }}
        >
          <Button
            type={"primary"}
            sx={{
              lineHeight: 1,
            }}
          >
            <Styled.a
              as={Link}
              to={"/blog"}
              sx={{
                "variant": "link.none",
                "bg": "primary",
                "color": "background",
                ":hover": {
                  bg: "primary",
                  color: "background",
                },
                "display": "inline-block",
                "fontSize": 3,
                "fontWeight": "bold",
              }}
            >
              <span
                sx={{
                  verticalAlign: "middle",
                  mx: "0.5rem",
                }}
              >
                Read all blogs
              </span>
              <FaArrowRight
                sx={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  fontSize: 2,
                }}
              />
            </Styled.a>
          </Button>
        </SFlex>
      </SContainer>
    </div>
  );
}

export default BlogBanner;
