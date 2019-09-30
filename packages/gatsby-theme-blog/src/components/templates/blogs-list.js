import React from "react";
import PropTypes from "prop-types";

import {
  PageLayout,
  Styled,
} from "@sonapraneeth/gatsby-plugin-themed-components";
import DetailedBlogCardWithCover from "../components/card/detailed-cover";
import {
  Grid,
  GridItem,
  SContainer,
  useSiteMetadata,
} from "@sonapraneeth/gatsby-plugin-themed-components";

/**
 *
 * @param {*} pageContext
 * @param {*} location
 * @return {JSX}
 */
function BlogsListTemplate({blogs, location}) {
  const siteMeta = useSiteMetadata();
  const title = "Blogs penned by " + siteMeta.author;
  const description =
    "This is the blogs page of " +
    siteMeta.author +
    ". " +
    "You can find summarized information about all blogs in this page";
  const meta = {
    title: title,
    description: description,
  };
  return (
    <PageLayout location={location} meta={meta}>
      <SContainer>
        <Styled.h1>{"Blog"}</Styled.h1>
        <Grid noCols={1}>
          {blogs.map((blog, index) => (
            <GridItem key={`blog-detailed-${index}`}>
              <DetailedBlogCardWithCover blog={blog.node} />
            </GridItem>
          ))}
        </Grid>
      </SContainer>
    </PageLayout>
  );
}

BlogsListTemplate.propTypes = {
  blogs: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
};

BlogsListTemplate.defaultProps = {};

export default BlogsListTemplate;
