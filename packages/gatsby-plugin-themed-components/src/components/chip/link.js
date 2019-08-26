/** @jsx jsx */
import {jsx} from "theme-ui";
// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import {Styled} from "theme-ui";

import {FaTag, FaFolderOpen} from "react-icons/fa";

/**
 *
 * @param {*} children
 * @return {JSX}
 */
function LinkChip({children, type, ...props}) {
  return (
    <Styled.a
      sx={{
        "variant": "link.none",
        "bg": "primary",
        "color": "white",
        ":hover": {
          bg: "primary",
          color: "white",
        },
      }}
    >
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
        {type !== null && type === "tag" && (
          <FaTag
            sx={{
              display: "inline-block",
              verticalAlign: "middle",
            }}
          />
        )}
        {type !== null && type === "category" && (
          <FaFolderOpen
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
    </Styled.a>
  );
}

LinkChip.propTypes = {
  children: PropTypes.any.isRequired,
  type: PropTypes.oneOf(["tag", "category"]),
};

LinkChip.defaultProps = {
  type: "",
};

export default LinkChip;
