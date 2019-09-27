/** @jsx jsx */
import {jsx} from "theme-ui";
// eslint-disable-next-line no-unused-vars
import React from "react";
import {useThemeUI} from "theme-ui";
import PropTypes from "prop-types";

/**
 *
 * @param {*} children
 * @return {JSX}
 */
function Button({children, type, ...props}) {
  const style = "button." + type;
  const context = useThemeUI();
  const theme = context.theme;
  const borderRadius = theme.rounded === false ? "0%" : "0.25rem";
  return (
    <button
      {...props}
      sx={{
        display: "inline-block",
        fontWeight: "body",
        textAlign: "center",
        verticalAlign: "middle",
        userSelect: "none",
        border: "1px solid transparent",
        padding: ".375rem .75rem",
        fontSize: "1rem",
        borderRadius: borderRadius,
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
