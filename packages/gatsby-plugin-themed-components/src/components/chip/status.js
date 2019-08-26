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
function StatusChip({type, ...props}) {
  const style = "chip." + type.toLowerCase();
  return (
    <span
      {...props}
      sx={{
        fontFamily: "body",
        borderRadius: 0,
        margin: ".2rem",
        border: ".05rem solid",
        variant: style,
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
        {type}
      </span>
    </span>
  );
}

StatusChip.propTypes = {
  type: PropTypes.oneOf(["Completed", "Ongoing"]),
};

StatusChip.defaultProps = {
  type: "Completed",
};

export default StatusChip;
