/** @jsx jsx */
import {jsx} from "theme-ui";
// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import {Link} from "gatsby";

import {
  PageLayout,
  Styled,
  SFlex,
  SContainer,
  Button,
  FaArrowRight,
} from "@sonapraneeth/gatsby-plugin-themed-components";
import {HomeWidget, useHome} from "@sonapraneeth/gatsby-theme-bio";
import {
  ProjectWidget,
  useFeaturedProjects,
} from "@sonapraneeth/gatsby-theme-project";
import {BlogWidget, useRecentBlogs} from "@sonapraneeth/gatsby-theme-blog";

HomeLayout.propTypes = {
  location: PropTypes.any.isRequired,
};

HomeLayout.defaultProps = {};

/**
 * Home layout - Used in home page
 * @return {JSX} Rendered children for the HomeLayout
 */
function HomeLayout({location}) {
  const home = useHome();
  const projects = useFeaturedProjects();
  const blogs = useRecentBlogs();
  return (
    <PageLayout title={""} description={""} location={location}>
      <div>
        <SContainer>
          <Styled.h1>About</Styled.h1>
          <HomeWidget author={home.authorInfo} details={home.mdx} />
        </SContainer>
      </div>
      <div>
        <SContainer>
          <Styled.h1>Projects</Styled.h1>
          <ProjectWidget projects={projects} />
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
                to={"/projects"}
                sx={{
                  "variant": "link.none",
                  "bg": "primary",
                  "color": "white",
                  ":hover": {
                    bg: "primary",
                    color: "white",
                  },
                  "display": "inline-block",
                  "fontSize": 1,
                }}
              >
                <span
                  sx={{
                    verticalAlign: "middle",
                    mx: "0.5rem",
                  }}
                >
                  View all projects
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
      <div>
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
                to={"/projects"}
                sx={{
                  "variant": "link.none",
                  "bg": "primary",
                  "color": "white",
                  ":hover": {
                    bg: "primary",
                    color: "white",
                  },
                  "display": "inline-block",
                  "fontSize": 1,
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
    </PageLayout>
  );
}

export default HomeLayout;
