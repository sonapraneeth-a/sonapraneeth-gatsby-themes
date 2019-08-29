/** @jsx jsx */
import {jsx} from "theme-ui";
// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import {Link} from "gatsby";

import {Styled} from "theme-ui";

/* Reference: https://github.com/gatsbyjs/gatsby/pull/15251/files */

/**
 *
 * @param {*} items
 * @param {*} location
 * @param {*} appendLocation - Appends URL of the web-page to TOC item
 * @return {JSX}
 */
function createItems(items, location, appendLocation) {
  const appendUrl = appendLocation === true ? location.pathname : "";
  return (
    items &&
    items.map((item) => (
      <li key={appendUrl + item.url}>
        <Styled.a
          as={Link}
          to={appendUrl + item.url}
          sx={{
            border: "none",
          }}
        >
          {item.title}
        </Styled.a>
        {item.items && (
          <ul>{createItems(item.items, location, appendLocation)}</ul>
        )}
      </li>
    ))
  );
}

/**
 *
 * @param {*} page
 * @param {*} location
 * @return {JSX}
 */
function TableOfContents({tableOfContents, location, appendLocation}) {
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
        {createItems(tableOfContents.items, location, appendLocation)}
      </ul>
    </nav>
  ) : null;
}

TableOfContents.propTypes = {
  tableOfContents: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
  appendLocation: PropTypes.bool,
};

TableOfContents.defaultProps = {
  appendLocation: true,
};

export default TableOfContents;
