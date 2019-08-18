import React from "react";
import PropTypes from "prop-types";
import {graphql} from "gatsby";
import {MDXRenderer} from "gatsby-plugin-mdx";
import {MDXProvider} from "@mdx-js/react";

import {SContainer, Styled} from "@sonapraneeth/base";
import {
  Grid,
  GridItem,
  BaseLayout,
  Chip,
  TableOfContents,
  MDXComponents,
  TagList,
  from,
  screens,
} from "@sonapraneeth/base";

const components = {
  h1: MDXComponents.h1,
};

/**
 *
 * @param {*} data
 * @return {JSX}
 */
function Project({data, location}) {
  const toc = data.mdx.tableOfContents;
  const isTOCEmpty = JSON.stringify(toc) === "{}";
  return (
    <BaseLayout location={data.project.slug} title={""}>
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
                css={{
                  margin: 0,
                  [from(screens.mobile)]: {
                    position: "sticky",
                    top: "10vh",
                    placeSelf: "self-start stretch",
                  },
                }}
              >
                <TableOfContents
                  tableOfContents={data.mdx.tableOfContents}
                  location={location}
                />
              </GridItem>
              <GridItem id="body" css={{margin: 0}}>
                <MDXProvider components={components}>
                  <MDXRenderer>{data.project.body}</MDXRenderer>
                </MDXProvider>
              </GridItem>
            </Grid>
          )}
          {(toc === undefined || toc === null || isTOCEmpty) && (
            <Grid noCols={1}>
              <GridItem id="body" css={{margin: 0}}>
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
  query ProjectQuery($id: String!, $fileAbsolutePath: String!) {
    project(id: { eq: $id }) {
      title
      status
      startDate
      completedDate
      slug
      show_toc
      tags
      body
    }
    mdx(fileAbsolutePath: { eq: $fileAbsolutePath }) {
      tableOfContents(maxDepth: 10)
    }
  }
`;
