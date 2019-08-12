/** @jsx jsx */
import {jsx} from "theme-ui";
// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

import {FaCalendarAlt} from "react-icons/fa";

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
        padding: ".2rem",
        bg: "surface",
        border: ".05rem solid",
        borderColor: "#000",
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
  type: PropTypes.oneOf(["date"]),
};

Chip.defaultProps = {
  type: "",
};

export default Chip;
