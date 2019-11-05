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
import {
  ProjectWidget,
  useFeaturedProjects,
  useRecentProjects,
} from "@sonapraneeth/gatsby-theme-project";

ProjectsBanner.propTypes = {};

ProjectsBanner.defaultProps = {};

/**
 * Home layout - Used in home page
 * @return {JSX} Rendered children for the ProjectsBanner
 */
function ProjectsBanner() {
  const featuredProjects = useFeaturedProjects();
  const recentProjects = useRecentProjects();
  const projects =
    featuredProjects.length > 0 ? featuredProjects : recentProjects;
  return (
    <div
      sx={
        {
          // padding: "1rem",
        }
      }
    >
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
  );
}

export default ProjectsBanner;
