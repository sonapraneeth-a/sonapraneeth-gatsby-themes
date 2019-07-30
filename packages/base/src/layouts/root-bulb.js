import React from "react";
import PropTypes from "prop-types";
import {Global} from "@emotion/core";
import {css} from "theme-ui";
import {useColorMode, useThemeUI} from "theme-ui";

import BulbSwitch from "../components/bulb";

function RootBulb({children}) {
  console.log("RootBulb from base");
  const [colorMode, setColorMode] = useColorMode();
  const isDarkTheme = colorMode === "dark";
  const toggleTheme = (e) => {
    const updatedTheme = (isDarkTheme ? "light" : "dark");
    setColorMode(updatedTheme);
  };
  const context = useThemeUI();
  const {colors} = context.theme;
  return (
    <div
      style={{
        margin: "0 auto",
        position: "relative",
        width: "90%",
      }}
    >
      <Global
        styles={css({
          "*": {
            boxSizing: "border-box",
            lineHeight: "body",
            fontSize: "18px",
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
        })}
      />
      <div
        style ={{
          position: "fixed",
          top: "0",
          right: "2rem",
          zIndex: "100",
        }}
      >
        <BulbSwitch
          toggleTheme={toggleTheme}
          color={colors.bulb.color} 
        />
      </div>
      {children}
    </div>
  );
}

export default RootBulb;

RootBulb.propTypes = {
  children: PropTypes.any.isRequired,
};

RootBulb.defaultProps = {
};
