import React from "react";
import PropTypes from "prop-types";
import {graphql} from "gatsby";
import {MDXRenderer} from "gatsby-plugin-mdx";

import {SContainer, Styled} from "@sonapraneeth/base";
import {
  Grid,
  GridItem,
  BaseLayout,
  Chip,
  TableOfContents,
  from,
  screens,
} from "@sonapraneeth/base";

/**
 *
 * @param {*} data
 * @return {JSX}
 */
function Project({data, location}) {
  console.log(data);
  return (
    <BaseLayout location={data.project.slug} title={""}>
      <SContainer>
        <Styled.h1>{data.project.title}</Styled.h1>
        <Chip type={"date"}>{data.project.completed_date}</Chip>
        <hr />
        <section>
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
              <MDXRenderer>{data.project.body}</MDXRenderer>
            </GridItem>
          </Grid>
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
      start_date
      completed_date
      slug
      body
    }
    mdx(fileAbsolutePath: { eq: $fileAbsolutePath }) {
      tableOfContents(maxDepth: 10)
    }
  }
`;
