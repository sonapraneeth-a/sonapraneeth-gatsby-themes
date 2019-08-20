import React from "react"
import PropTypes from "prop-types"
import { Styled } from "theme-ui"

import BaseLayout from "./base"

/**
 * Page layout for pages
 * @return {JSX} Rendered children for the page
 */
function PageLayout({ title, description, location, children }) {
  return (
    <BaseLayout title={title} description={description} location={location}>
      {title !== null && title !== "" && (
        <Styled.h1>
          <span>{title}</span>
        </Styled.h1>
      )}
      <section>{children}</section>
    </BaseLayout>
  )
}

export default PageLayout

PageLayout.propTypes = {
  children: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  location: PropTypes.any.isRequired,
}

PageLayout.defaultProps = {
  description: "",
}
