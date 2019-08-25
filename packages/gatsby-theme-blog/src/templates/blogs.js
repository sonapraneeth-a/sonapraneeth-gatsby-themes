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
} from "@sonapraneeth/gatsby-plugin-themed-components";

/**
 *
 * @param {*} pageContext
 * @param {*} location
 * @return {JSX}
 */
function Blogs({pageContext: {blogs}}, location) {
  return (
    <PageLayout location={location} title={""}>
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

Blogs.propTypes = {
  pageContext: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
};

Blogs.defaultProps = {};

export default Blogs;
