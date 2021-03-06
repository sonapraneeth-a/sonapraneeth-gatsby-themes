/** @jsx jsx */
import {jsx} from "theme-ui";
// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import {useThemeUI} from "theme-ui";

import {FaCalendarAlt, FaTag, FaClock, FaFolderOpen} from "react-icons/fa";

/**
 *
 * @param {*} children
 * @return {JSX}
 */
function Chip({children, type, ...props}) {
  const context = useThemeUI();
  const theme = context.theme;
  const borderRadius = theme.rounded === false ? "0rem" : "0.2rem";
  // Reference: https://stackoverflow.com/questions/7300760/prevent-line-break-of-span-element
  return (
    <span
      {...props}
      sx={{
        lineHeight: 0.5,
        borderRadius: borderRadius,
        paddingTop: ".01rem",
        paddingBottom: "0.2rem",
        bg: "chip.bg",
        color: "chip.color",
        border: ".05rem solid",
        borderColor: "chip.bg",
        px: "0.15rem",
        fontSize: 3,
        whiteSpace: "nowrap",
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
      {type !== null && type === "category" && (
        <FaFolderOpen
          sx={{
            variant: "icon",
          }}
        />
      )}
      {type !== null && type === "time" && (
        <FaClock
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
  type: PropTypes.oneOf(["date", "tag", "category", "time", "default"]),
};

Chip.defaultProps = {
  type: "default",
};

export default Chip;
