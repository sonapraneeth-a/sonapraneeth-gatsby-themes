/** @jsx jsx */
import {jsx} from "@sonapraneeth/base";
// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import {Styled} from "@sonapraneeth/base";

/**
 *
 * @param {*} children
 * @return {JSX}
 */
function H1({children}) {
  return (
    <Styled.h1
      sx={{
        "::before": {
          content: " ",
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
  );
}

H1.propTypes = {
  children: PropTypes.any.isRequired,
};

H1.defaultProps = {};

export default H1;
