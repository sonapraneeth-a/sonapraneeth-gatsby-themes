import React from "react";
import PropTypes from "prop-types";
import {Global} from "@emotion/core";
import {css} from "theme-ui";
import {useColorMode, useThemeUI, Layout} from "theme-ui";

import {layout} from "../../utils/default";
import BulbSwitch from "../components/bulb";

/**
 * @param {*} children
 * @return {JSX}
 */
function RootBulb({children}) {
  if (typeof window !== "undefined") {
    // If environment is development, attach debug package
    if (process.env.NODE_ENV === "development") {
      // To enable debugging information in browser
      localStorage.setItem(
        "debug",
        "@sonapraneeth/gatsby-plugin-themed-components:*"
      );
    }
  }
  layout("RootBulb from base");
  const [colorMode, setColorMode] = useColorMode();
  const modes = ["light", "dark"];
  // Reference: https://theme-ui.com/recipes/color-mode-switcher
  const toggleTheme = (e) => {
    const index = modes.indexOf(colorMode);
    const next = modes[(index + 1) % modes.length];
    setColorMode(next);
  };
  const context = useThemeUI();
  layout(`Theme: ${JSON.stringify(context.theme, null, 2)}`);
  const {colors} = context.theme;
  return (
    <>
      <Global
        styles={css({
          "*": {
            boxSizing: "border-box",
            lineHeight: "body",
          },
          "body": {
            margin: 0,
            fontFamily: "body",
            boxSizing: "border-box",
            lineHeight: "body",
          },
          "html": {
            fontSize: "18px",
          },
          "pre": {
            fontFamily: "monospace",
          },
          "code": {
            fontFamily: "monospace",
          },
          "::-webkit-scrollbar-track": {
            WebkitBoxShadow: `inset 0 0 6px ${colors.background}`,
            bg: "background",
          },
          "::-webkit-scrollbar": {
            width: "6px",
            bg: "#F5F5F5",
          },
          "::-webkit-scrollbar-thumb": {
            bg: "text",
          },
          ".id-link": {
            "color": `${colors.text} !important`,
            "bg": `${colors.background} !important`,
            "textDecoration": "none !important",
            "borderBottom": "none !important",
            "marginRight": "0.5rem",
            ":hover": {
              color: `${colors.text} !important`,
              bg: `${colors.background} !important`,
              textDecoration: "none !important",
              borderBottom: "none !important",
            },
          },
        })}
      />
      <div
        style={{
          position: "fixed",
          top: "0",
          right: "2rem",
          zIndex: "100",
        }}
      >
        <BulbSwitch toggleTheme={toggleTheme} color={colors.bulb.color} />
      </div>
      <Layout>{children}</Layout>
    </>
  );
}

export default RootBulb;

RootBulb.propTypes = {
  children: PropTypes.any.isRequired,
};

RootBulb.defaultProps = {};
