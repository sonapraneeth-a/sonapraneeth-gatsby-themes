/** @jsx jsx */
import { jsx } from "theme-ui"
// eslint-disable-next-line no-unused-vars
import React from "react"
import PropTypes from "prop-types"

/**
 *
 * @param {*} children
 * @return {JSX}
 */
function CardContent({ children, ...props }) {
  return (
    <div
      {...props}
      sx={{
        p: 4,
      }}
    >
      {children}
    </div>
  )
}

CardContent.propTypes = {
  children: PropTypes.any.isRequired,
}

CardContent.defaultProps = {}

export default CardContent
