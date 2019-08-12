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
  StatusChip,
  Styled,
  SFlex,
  FaInfoCircle,
  FaCode,
  FaFileAlt,
  FaFilePowerpoint,
} from "@sonapraneeth/base";

/**
 *
 * @param {*} children
 * @return {JSX}
 */
function DetailedProjectCard({project, ...props}) {
  return (
    <Card>
      <CardContent>
        <SFlex>
          <div
            sx={{
              width: "66.66%",
            }}
          >
            <Styled.h2>{project.title}</Styled.h2>
          </div>
          <div
            sx={{
              width: "33.33%",
            }}
          >
            <Styled.h4
              sx={{
                textAlign: "right",
              }}
            >
              <StatusChip type={project.status} />
            </Styled.h4>
          </div>
        </SFlex>
        {project.abstract}
      </CardContent>
      <CardFooter>
        <SFlex
          sx={{
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          {/* Reference: https://codepen.io/johnasp/pen/bqadn */}
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
          {project.source !== null && project.source !== "" && (
            <Styled.a
              href={project.source}
              sx={{
                "variant": "link.none",
                "bg": "surface",
                ":hover": {
                  bg: "surface",
                  color: "text",
                },
              }}
            >
              <FaCode
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
                Source
              </span>
            </Styled.a>
          )}
          {project.report !== null && project.report !== "" && (
            <Styled.a
              href={project.report}
              sx={{
                "variant": "link.none",
                "bg": "surface",
                ":hover": {
                  bg: "surface",
                  color: "text",
                },
              }}
            >
              <FaFileAlt
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
                Report
              </span>
            </Styled.a>
          )}
          {project.presentation !== null && project.presentation !== "" && (
            <Styled.a
              href={project.presentation}
              sx={{
                "variant": "link.none",
                "bg": "surface",
                ":hover": {
                  bg: "surface",
                  color: "text",
                },
              }}
            >
              <FaFilePowerpoint
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
                Presentation
              </span>
            </Styled.a>
          )}
        </SFlex>
      </CardFooter>
    </Card>
  );
}

DetailedProjectCard.propTypes = {
  project: PropTypes.any.isRequired,
};

DetailedProjectCard.defaultProps = {};

export default DetailedProjectCard;
