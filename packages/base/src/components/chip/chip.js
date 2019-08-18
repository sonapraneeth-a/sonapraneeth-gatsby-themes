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
  let pb = "0.2rem";
  pb = type === "date" ? "0.05rem" : "0.2rem";
  return (
    <span
      {...props}
      sx={{
        lineHeight: 0.5,
        borderRadius: 0,
        paddingTop: ".01rem",
        paddingBottom: pb,
        bg: "chip.bg",
        color: "chip.color",
        border: ".05rem solid",
        borderColor: "chip.bg",
        px: "0.15rem",
        fontSize: 3,
      }}
    >
      {type !== null && type === "date" && (
        <FaCalendarAlt
          sx={{
            variant: "icon",
          }}
        />
      )}
      {type !== null && type === "tag" && (
        <FaTag
          sx={{
            variant: "icon",
          }}
        />
      )}
      <span
        sx={{
          verticalAlign: "middle",
          mx: "0.15rem",
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
