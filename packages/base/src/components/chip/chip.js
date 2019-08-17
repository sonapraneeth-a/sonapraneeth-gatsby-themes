/** @jsx jsx */
import {jsx} from "theme-ui";
// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

import {FaCalendarAlt, FaTag} from "react-icons/fa";

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
        lineHeight: 0.5,
        borderRadius: 0,
        padding: ".1rem",
        bg: "surface",
        border: ".05rem solid",
        borderColor: "#000",
        fontSize: 3,
      }}
    >
      {type !== null && type === "date" && (
        <FaCalendarAlt
          sx={{
            display: "inline-block",
            verticalAlign: "middle",
          }}
        />
      )}
      {type !== null && type === "tag" && (
        <FaTag
          sx={{
            display: "inline-block",
            verticalAlign: "middle",
          }}
        />
      )}
      <span
        sx={{
          verticalAlign: "middle",
          mx: "0.2rem",
        }}
      >
        {children}
      </span>
    </span>
  );
}

Chip.propTypes = {
  children: PropTypes.any.isRequired,
  type: PropTypes.oneOf(["date", "tag"]),
};

Chip.defaultProps = {
  type: "",
};

export default Chip;
