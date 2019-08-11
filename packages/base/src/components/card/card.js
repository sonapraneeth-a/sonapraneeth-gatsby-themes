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
function Card({ children, ...props }) {
  return (
    <div
      {...props}
      sx={{
        bg: "surface",
        transition: "box-shadow .25s,-webkit-box-shadow .25s",
        borderRadius: 0,
        boxShadow:
          "0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12), " +
          "0 3px 1px -2px rgba(0,0,0,.2)",
        width: "100%",
      }}
    >
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.any.isRequired,
}

Card.defaultProps = {}

export default Card
