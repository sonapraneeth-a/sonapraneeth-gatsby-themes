/** @jsx jsx */
import {jsx} from "theme-ui";
// eslint-disable-next-line no-unused-vars
import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import {Global} from "@emotion/core";
import {useColorMode, useThemeUI} from "theme-ui";

import {SLayout} from "../components/theme-ui/index";
import {layout} from "../../utils/debug";
import BulbSwitch from "../components/bulb";
import {useMenu} from "../hooks/useMenu";
import BreakpointChip from "../components/chip/breakpoint";
import {globalStyles} from "../utils/styles";
import UpToDownCurtain from "../components/menu/up-to-down-curtain";

/**
 * @param {*} children
 * @return {JSX}
 */
function RootBulb({children, windowWidth, windowHeight}) {
  if (typeof window !== "undefined") {
    // If environment is development, attach debug package
    if (process.env.NODE_ENV === "development") {
      // To enable debugging information in browser
      localStorage.setItem(
        "debug",
        "@sonapraneeth/gatsby-plugin-themed-components:*",
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
  const theme = context.theme;
  const menu = useMenu();
  // eslint-disable-next-line max-len
  const isMenuPresent = menu !== undefined && menu !== null && menu.length !== 0;
  return (
    <>
      <Global styles={globalStyles(theme)} />
      <div
        style={{
          position: "fixed",
          top: "0",
          right: "2rem",
          zIndex: "100",
        }}
      >
        <BulbSwitch toggleTheme={toggleTheme} color={theme.colors.bulb.color} />
      </div>
      {isMenuPresent === true && <UpToDownCurtain menuItems={menu} />}
      <SLayout
        sx={{
          // marginTop: [8, 8, 8, 0],
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </SLayout>
      <BreakpointChip width={windowWidth} height={windowHeight} />
    </>
  );
}

export default RootBulb;

RootBulb.propTypes = {
  children: PropTypes.any.isRequired,
  windowWidth: PropTypes.number.isRequired,
  windowHeight: PropTypes.number.isRequired,
};

RootBulb.defaultProps = {};
