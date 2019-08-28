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
function Blog({data, location}) {
  const toc = data.blog.tableOfContents;
  const isTOCEmpty = JSON.stringify(toc) === "{}";
  const dispTOC =
    data.blog.toc && toc !== undefined && toc !== null && !isTOCEmpty;
  const title = "Blog | " + data.blog.title;
  const description =
    "This page contains details about the blog: " + data.blog.title;
  return (
    <BaseLayout
      location={data.blog.slug}
      title={title}
      description={description}
    >
      {data.blog.cover !== null && (
        <GatsbyImage src={data.blog.cover.childImageSharp.fluid} />
      )}
      <SContainer>
        <Styled.h1>{data.blog.title}</Styled.h1>
        <Chip type={"date"}>
          <b>Published: </b>
          {data.blog.publishedDate}
        </Chip>{" "}
        <Chip type={"date"}>
          <b>Last Modified: </b>
          {data.blog.lastModifiedTime}
        </Chip>{" "}
        <TagList tags={data.blog.tags} />
        <hr />
        <section>
          {dispTOC && (
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
                  <MDXRenderer>{data.blog.body}</MDXRenderer>
                </MDXProvider>
              </GridItem>
            </Grid>
          )}
          {(!data.blog.toc ||
            toc === undefined ||
            toc === null ||
            isTOCEmpty) && (
            <Grid noCols={1}>
              <GridItem id="body" style={{margin: 0}}>
                <MDXProvider components={components}>
                  <MDXRenderer>{data.blog.body}</MDXRenderer>
                </MDXProvider>
              </GridItem>
            </Grid>
          )}
        </section>
      </SContainer>
    </BaseLayout>
  );
}

Blog.propTypes = {
  data: PropTypes.any.isRequired,
  location: PropTypes.any,
};

Blog.defaultProps = {};

export default Blog;

export const query = graphql`
  query BlogQuery($id: String!) {
    blog(id: { eq: $id }) {
      id
      slug
      title
      toc
      publishedDate
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
      lastModifiedTime
    }
  }
`;
