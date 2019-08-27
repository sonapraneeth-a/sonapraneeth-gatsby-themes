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
  return (
    <BaseLayout location={data.project.slug} title={""}>
      {data.project.cover !== null && (
        <GatsbyImage src={data.project.cover.childImageSharp.fluid} />
      )}
      <SContainer>
        <Styled.h1>{data.project.title}</Styled.h1>
        <Chip type={"date"}>{data.project.completedDate}</Chip>{" "}
        <TagList tags={data.project.tags} />
        <hr />
        <section>
          {data.project.show_toc &&
            toc !== null &&
            toc !== undefined &&
            !isTOCEmpty && (
            <Grid noCols={2} nSizes={[1, 2.5]}>
              <GridItem
                id="toc"
                style={{
                  margin: 0,
                  [from(screens.mobile)]: {
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
          {(toc === undefined || toc === null || isTOCEmpty) && (
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
      show_toc
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
    }
  }
`;
