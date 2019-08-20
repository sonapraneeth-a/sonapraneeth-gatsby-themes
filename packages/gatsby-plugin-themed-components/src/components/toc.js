/** @jsx jsx */
import { jsx } from "theme-ui"
// eslint-disable-next-line no-unused-vars
import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { Styled } from "theme-ui"

/* Reference: https://github.com/gatsbyjs/gatsby/pull/15251/files */

/**
 *
 * @param {*} items
 * @param {*} location
 * @return {JSX}
 */
function createItems(items, location) {
  return (
    items &&
    items.map(item => (
      <li key={location.pathname + item.url}>
        <Styled.a
          as={Link}
          to={location.pathname + item.url}
          sx={{
            border: "none",
          }}
        >
          {item.title}
        </Styled.a>
        {item.items && <ul>{createItems(item.items, location)}</ul>}
      </li>
    ))
  )
}

/**
 *
 * @param {*} page
 * @param {*} location
 * @return {JSX}
 */
function TableOfContents({ tableOfContents, location }) {
  return tableOfContents.items ? (
    <nav>
      <Styled.h3
        sx={{
          textTransform: "uppercase",
          marginTop: 0,
        }}
      >
        In this page
      </Styled.h3>
      <ul
        sx={{
          listStyle: "none",
          m: 0,
          p: 0,
        }}
      >
        {createItems(tableOfContents.items, location)}
      </ul>
    </nav>
  ) : null
}

TableOfContents.propTypes = {
  tableOfContents: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
}

TableOfContents.defaultProps = {}

export default TableOfContents
