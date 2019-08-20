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
function Button({ children, type, ...props }) {
  const style = "button." + type
  return (
    <div
      {...props}
      sx={{
        display: "inline-block",
        fontWeight: "body",
        textAlign: "center",
        verticalAlign: "middle",
        px: ".4rem",
        py: ".25rem",
        fontSize: 3,
        lineHeight: "body",
        fontFamily: "body",
        WebkitAppearance: "none",
        MozAppearance: "none",
        variant: style,
      }}
    >
      {children}
    </div>
  )
}

Button.propTypes = {
  children: PropTypes.any.isRequired,
  type: PropTypes.oneOf(["primary", "secondary"]),
}

Button.defaultProps = {
  type: "",
}

export default Button
