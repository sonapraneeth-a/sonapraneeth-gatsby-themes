/** @jsx jsx */
import {jsx} from "@sonapraneeth/gatsby-plugin-themed-components";
// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import {graphql} from "gatsby";
import {MDXRenderer} from "gatsby-plugin-mdx";
import {MDXProvider} from "@mdx-js/react";

import {
  SContainer,
  Styled,
} from "@sonapraneeth/gatsby-plugin-themed-components";
import {
  GatsbyImage,
  Grid,
  GridItem,
  BaseLayout,
  Chip,
  TableOfContents,
  MDXComponents,
  TagList,
  from,
  screens,
} from "@sonapraneeth/gatsby-plugin-themed-components";

const components = {
  h1: MDXComponents.h1,
};

/**
 *
 * @param {*} data
 * @return {JSX}
 */
function Project({data, location}) {
  const toc = data.project.tableOfContents;
  const isTOCEmpty = JSON.stringify(toc) === "{}";
  const title = "Project | " + data.project.title;
  const description =
    "This page contains details about the project: " + data.project.title;
  // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
  const options = {
    year: "numeric",
    month: "short",
  };
  /* const options02 = {
    // weekday: "long",
    year: "numeric",
    month: "short",
    day: "2-digit",
    // timeZoneName: "short",
    // hour: "2-digit",
    // minute: "2-digit",
  };*/
  const startDate = new Date(data.project.startDate).toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });
  const startLocaleDate = new Date(startDate).toLocaleDateString(
    "en-US",
    options
  );
  /* const completedLocaleDate02 = new Date(completedDate)
    .toLocaleDateString("en-US", options02);*/
  const completedDate = new Date(data.project.completedDate).toLocaleString(
    "en-US",
    {timeZone: "Asia/Kolkata"}
  );
  let completedLocaleDate = new Date(completedDate).toLocaleDateString(
    "en-US",
    options
  );
  completedLocaleDate =
    data.project.status === "Ongoing" ? "Present" : completedLocaleDate;
  const timeToRead =
    data.project.timeToRead === null ? "~1" : data.project.timeToRead;
  return (
    <BaseLayout
      location={data.project.slug}
      title={title}
      description={description}
    >
      {data.project.cover !== null && (
        <GatsbyImage
          type={"fluid"}
          src={data.project.cover.childImageSharp.fluid}
        />
      )}
      <SContainer
        sx={{
          width: ["95%", "95%", "90%", "90%", "90%", "85%", "80%"],
        }}
      >
        <Styled.h1>{data.project.title}</Styled.h1>
        <Chip type={"date"}>
          <b>Duration: </b>
          {startLocaleDate} - {completedLocaleDate}
        </Chip>{" "}
        <TagList tags={data.project.tags} />{" "}
        <Chip type={"time"}>{timeToRead} min. read</Chip> <hr />
        <section>
          {data.project.toc &&
            toc !== undefined &&
            toc !== null &&
            !isTOCEmpty && (
            <Grid noCols={2} nSizes={[1, 3]}>
              <GridItem
                id="toc"
                style={{
                  margin: 0,
                  [from(screens.minitablet)]: {
                    position: "sticky",
                    top: "10vh",
                    placeSelf: "self-start stretch",
                  },
                }}
              >
                <TableOfContents tableOfContents={toc} location={location} />
              </GridItem>
              <GridItem id="body" style={{margin: 0}}>
                <MDXProvider components={components}>
                  <MDXRenderer>{data.project.body}</MDXRenderer>
                </MDXProvider>
              </GridItem>
            </Grid>
          )}
          {(!data.project.toc ||
            toc === undefined ||
            toc === null ||
            isTOCEmpty) && (
            <Grid noCols={1}>
              <GridItem id="body" style={{margin: 0}}>
                <MDXProvider components={components}>
                  <MDXRenderer>{data.project.body}</MDXRenderer>
                </MDXProvider>
              </GridItem>
            </Grid>
          )}
        </section>
      </SContainer>
    </BaseLayout>
  );
}

Project.propTypes = {
  data: PropTypes.any.isRequired,
  location: PropTypes.any,
};

Project.defaultProps = {};

export default Project;

export const query = graphql`
  query ProjectQuery($id: String!) {
    project(id: { eq: $id }) {
      title
      status
      startDate
      completedDate
      slug
      toc
      tags
      body
      cover {
        childImageSharp {
          fluid(maxWidth: 1280) {
            base64
            aspectRatio
            src
            srcSet
            srcWebp
            srcSetWebp
            sizes
          }
        }
      }
      tableOfContents
      timeToRead
    }
  }
`;
