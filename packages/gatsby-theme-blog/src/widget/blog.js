import React from "react"
import PropTypes from "prop-types"

import SimpleBlogCard from "../components/card/simple"
import { Grid, GridItem } from "@sonapraneeth/base"

/**
 *
 * @param {*} data
 * @return {JSX}
 */
function BlogWidget({ blogs }) {
  return (
    <Grid noCols={2}>
      {blogs.map((blog, index) => (
        <GridItem key={`blog-simple-${index}`}>
          <SimpleBlogCard blog={blog.node} />
        </GridItem>
      ))}
    </Grid>
  )
}

BlogWidget.propTypes = {
  blogs: PropTypes.any.isRequired,
}

BlogWidget.defaultProps = {}

export default BlogWidget
