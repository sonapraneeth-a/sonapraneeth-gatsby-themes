import React from "react";
import PropTypes from "prop-types";
import {Global} from "@emotion/core";
import {css} from "theme-ui";
import {useColorMode, useThemeUI, Layout} from "theme-ui";

import {layout} from "../../config/default";
import BulbSwitch from "../components/bulb";

function RootBulb({children}) {
  layout("RootBulb from base");
  const [colorMode, setColorMode] = useColorMode();
  const modes = [
    "light",
    "dark",
  ];
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
      <Layout>
        {children}
      </Layout>
    </>
  );
}

export default RootBulb;

RootBulb.propTypes = {
  children: PropTypes.any.isRequired,
};

RootBulb.defaultProps = {
};
