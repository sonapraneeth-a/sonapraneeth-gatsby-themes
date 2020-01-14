/** @jsx jsx */
import {jsx} from "theme-ui";
// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

/**
 *
 * @param {*} number
 * @return {JSX}
 */
function LineNo({number, ...props}) {
  return (
    <span
      sx={{
        display: "inline-block",
        width: "2rem",
        userSelect: "none",
        opacity: 0.3,
        px: 2,
        borderRight: "0.1rem solid white",
        marginRight: 2,
      }}
    >
      {number}
    </span>
  );
}

LineNo.propTypes = {
  number: PropTypes.number.isRequired,
};

LineNo.defaultProps = {};

export default LineNo;
