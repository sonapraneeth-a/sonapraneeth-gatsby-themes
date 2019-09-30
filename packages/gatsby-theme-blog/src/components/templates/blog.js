import React from "react";
import PropTypes from "prop-types";
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
 * @param {*} blog
 * @return {JSX}
 */
function BlogTemplate({blog, location}) {
  const toc = blog.tableOfContents;
  const isTOCEmpty = JSON.stringify(toc) === "{}";
  const dispTOC = blog.toc && toc !== undefined && toc !== null && !isTOCEmpty;
  const title = "Blog | " + blog.title;
  // eslint-disable-next-line max-len
  const description = "This page contains details about the blog: " + blog.title;
  return (
    <BaseLayout location={blog.slug} title={title} description={description}>
      {blog.cover !== null && (
        <GatsbyImage type={"fluid"} src={blog.cover.childImageSharp.fluid} />
      )}
      <SContainer>
        <Styled.h1>{blog.title}</Styled.h1>
        <Chip type={"date"}>
          <b>Published: </b>
          {blog.publishedDate}
        </Chip>{" "}
        <Chip type={"date"}>
          <b>Last Modified: </b>
          {blog.lastModifiedTime}
        </Chip>{" "}
        <TagList tags={blog.tags} />
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
                  <MDXRenderer>{blog.body}</MDXRenderer>
                </MDXProvider>
              </GridItem>
            </Grid>
          )}
          {(!blog.toc || toc === undefined || toc === null || isTOCEmpty) && (
            <Grid noCols={1}>
              <GridItem id="body" style={{margin: 0}}>
                <MDXProvider components={components}>
                  <MDXRenderer>{blog.body}</MDXRenderer>
                </MDXProvider>
              </GridItem>
            </Grid>
          )}
        </section>
      </SContainer>
    </BaseLayout>
  );
}

BlogTemplate.propTypes = {
  blog: PropTypes.any.isRequired,
  location: PropTypes.any,
};

BlogTemplate.defaultProps = {};

export default BlogTemplate;
