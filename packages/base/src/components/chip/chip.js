/** @jsx jsx */
import {jsx} from "theme-ui";
// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

/**
 *
 * @param {*} children
 * @return {JSX}
 */
function Chip({children, type, ...props}) {
  return (
    <span
      {...props}
      sx={{
        borderRadius: 0,
        margin: ".2rem",
        bg: "secondary",
        border: ".05rem solid",
        borderColor: "#000",
      }}
    >
      <span
        sx={{
          px: ".1rem",
          py: ".2rem",
          display: "inline-block",
          fontSize: ".9rem",
        }}
      >
        {children}
      </span>
    </span>
  );
}

Chip.propTypes = {
  children: PropTypes.any.isRequired,
  type: PropTypes.string,
};

Chip.defaultProps = {
  type: "",
};

export default Chip;
