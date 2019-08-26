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
function Button({children, type, ...props}) {
  const style = "button." + type;
  return (
    <button
      {...props}
      sx={{
        display: "inline-block",
        fontWeight: "body",
        textAlign: "center",
        verticalAlign: "middle",
        userselect: "none",
        border: "1px solid transparent",
        padding: ".375rem .75rem",
        fontSize: "1rem",
        borderRadius: ".25rem",
        cursor: "pointer",
        WebkitAppearance: "button",
        overflow: "visible",
        margin: 0,
        textDecoration: "none !important",
        transition:
          "color .15s ease-in-out, background-color .15s " +
          "ease-in-out,border-color .15s " +
          "ease-in-out,box-shadow .15s ease-in-out",
        variant: style,
        lineHeight: "1.5 !important",
        fontFamily: "body",
      }}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.any.isRequired,
  type: PropTypes.oneOf(["primary", "secondary"]),
};

Button.defaultProps = {
  type: "",
};

export default Button;
