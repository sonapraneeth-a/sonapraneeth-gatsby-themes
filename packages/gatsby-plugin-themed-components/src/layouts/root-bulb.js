/** @jsx jsx */
import {jsx} from "theme-ui";
// eslint-disable-next-line no-unused-vars
import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import {Global} from "@emotion/core";
import {useColorMode, useThemeUI, Layout} from "theme-ui";

import {layout} from "../../utils/debug";
import BulbSwitch from "../components/bulb";
import Sidebar from "../components/menu/sidebar";
import {useMenu} from "../hooks/useMenu";
import {SidebarContext} from "../context/sidebar";
import BreakpointChip from "../components/chip/breakpoint";
import {globalStyles} from "../utils/styles";

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
  const {type, display, width, unit} = useContext(SidebarContext);
  /* let type = "push";
  if (windowWidth >= 1024) {
    type = "fixed";
  }*/
  let hideSidebar = false;
  if (windowWidth >= 1024) {
    hideSidebar = true;
  }
  const [sidebarDisplay, setSidebarDisplay] = useState(display);
  const toggleSidebarDisplay = () => {
    layout("Toggling sidebar");
    layout(`Sidebar display: ${sidebarDisplay}`);
    setSidebarDisplay(!sidebarDisplay);
  };
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
  const windowWidthInRem = windowWidth / 18;
  let additionalToggleContentCSS = {};
  if (isMenuPresent) {
    additionalToggleContentCSS = {
      ...additionalToggleContentCSS,
      transform: sidebarDisplay === true ? `translateX(${width}${unit})` : "",
      position: type === "push" ? "" : "relative",
      left: type === "push" ? "0rem" : `${width}${unit}`,
      // Note: 0.5vw is to be subtracted to accomodate scrollbar
      /* width:
        type === "push" ?
          ((sidebarDisplay === true) ? `${100-width-0.1}${unit}` : "99.5vw") :
          `${100-width-0.4}${unit}`,*/
      width:
        type === "push" ?
          sidebarDisplay === true ?
            `${windowWidthInRem - width}${unit}` :
            "" :
          `${windowWidthInRem - width}${unit}`,
    };
  }
  console.log("Root");
  console.log(`sidebarDisplay: ${sidebarDisplay}`);
  console.log(`hideSidebar: ${hideSidebar}`);
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
      {hideSidebar === false && isMenuPresent === true && (
        <SidebarContext.Provider
          value={{
            type: type,
            display: sidebarDisplay,
            width: width,
            unit: unit,
          }}
        >
          <Sidebar
            menuItems={menu}
            toggleSidebarDisplay={toggleSidebarDisplay}
          />
        </SidebarContext.Provider>
      )}
      <Layout
        sx={{
          transition: "all 0.3s ease-in-out",
          marginTop: [8, 8, 8, 0],
          ...additionalToggleContentCSS,
        }}
      >
        {children}
      </Layout>
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
