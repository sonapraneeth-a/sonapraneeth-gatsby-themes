/** @jsx jsx */
import { jsx } from "theme-ui"
// eslint-disable-next-line no-unused-vars
import React from "react"
import PropTypes from "prop-types"
import { Styled } from "theme-ui"

/**
 *
 * @param {*} children
 * @return {JSX}
 */
function H1({ children }) {
  return (
    <Styled.h1
      sx={{
        display: "flex",
        /* "position": "sticky",
        "top": "4rem",*/
        "::after": {
          display: "block",
          border: ".05rem solid #d0d0d0",
          boxShadow: "inset 0 1px 1px rgba(0,0,0,.05)",
          height: ".05rem",
          content: '" "',
          background: "linear-gradient(90deg,#000,grey)",
          position: "relative",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: "auto",
          margin: ".75em 2px 0 3px",
          flexGrow: 1,
          borderRadius: "2px",
        },
      }}
    >
      {children}
    </Styled.h1>
  )
}

H1.propTypes = {
  children: PropTypes.any.isRequired,
}

H1.defaultProps = {}

export default H1
