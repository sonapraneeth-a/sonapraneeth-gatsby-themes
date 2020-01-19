import React from "react";
import PropTypes from "prop-types";
import {MDXRenderer} from "gatsby-plugin-mdx";
import {MDXProvider} from "@mdx-js/react";

import {
  SContainer,
  Styled,
  getFormattedDate,
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
  pre: MDXComponents.pre,
};

/**
 *
 * @param {*} collectionItem
 * @return {JSX}
 */
function CollectionItemTemplate({collectionItem, location}) {
  const toc = collectionItem.tableOfContents;
  const isTOCEmpty = JSON.stringify(toc) === "{}";
  const dispTOC =
    collectionItem.toc && toc !== undefined && toc !== null && !isTOCEmpty;
  const title = "CollectionItem | " + collectionItem.title;
  // eslint-disable-next-line max-len
  const description =
    "This page contains details about the collectionItem: " +
    collectionItem.title;
  const lastModifiedTime = getFormattedDate(collectionItem.lastModifiedTime);
  const publishedDate = getFormattedDate(collectionItem.publishedDate);
  return (
    <BaseLayout
      location={collectionItem.slug}
      title={title}
      description={description}
    >
      {collectionItem.cover !== null && (
        <GatsbyImage
          type={"fluid"}
          src={collectionItem.cover.childImageSharp.fluid}
        />
      )}
      <SContainer>
        <Styled.h1>{collectionItem.title}</Styled.h1>
        <Chip type={"date"}>
          <b>Published: </b>
          {publishedDate}
        </Chip>{" "}
        <Chip type={"date"}>
          <b>Last Modified: </b>
          {lastModifiedTime}
        </Chip>{" "}
        <TagList tags={collectionItem.tags} />
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
                  <MDXRenderer>{collectionItem.body}</MDXRenderer>
                </MDXProvider>
              </GridItem>
            </Grid>
          )}
          {(!collectionItem.toc ||
            toc === undefined ||
            toc === null ||
            isTOCEmpty) && (
            <Grid noCols={1}>
              <GridItem id="body" style={{margin: 0}}>
                <MDXProvider components={components}>
                  <MDXRenderer>{collectionItem.body}</MDXRenderer>
                </MDXProvider>
              </GridItem>
            </Grid>
          )}
        </section>
      </SContainer>
    </BaseLayout>
  );
}

CollectionItemTemplate.propTypes = {
  collectionItem: PropTypes.any.isRequired,
  location: PropTypes.any,
};

CollectionItemTemplate.defaultProps = {};

export default CollectionItemTemplate;
