import React from "react";
import PropTypes from "prop-types";
import Switch from "../components/switch";
import {Global} from "@emotion/core";
import {useColorMode, css} from "theme-ui";

import sun from "../assets/sun-18.png";
import moon from "../assets/moon-18.png";

const checkedIcon = (
  <img
    alt="Moon indicating dark mode"
    src={moon}
    width="18"
    height="18"
    role="presentation"
    style={{
      pointerEvents: "none",
      margin: "4.5px 4.5px 4.5px 6.5px",
    }}
  />
);

const uncheckedIcon = (
  <img
    alt="Sun indicating light mode"
    src={sun}
    width="18"
    height="18"
    role="presentation"
    style={{
      pointerEvents: "none",
      margin: "5px 5px 5px 5.5px",
    }}
  />
);

function RootSwitch({children}) {
  console.log("Root from base");
  const [colorMode, setColorMode] = useColorMode();
  const isDarkTheme = colorMode === "dark";
  const toggleTheme = (e) => {
    const updatedTheme = (isDarkTheme ? "light" : "dark");
    setColorMode(updatedTheme);
  };
  const switchColor = "rgb(188, 188, 188)";
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
      <Global
        styles={css({
          ".react-switch-bg, .react-switch-handle": {
            borderWidth: "0.5px",
            borderStyle: "solid",
            borderColor: `${switchColor}`,
          },
        })}
      />
      <div
        style ={{
          position: "fixed",
          margin: "19.92px 0",
          right: "1rem",
          zIndex: "100",
        }}
      >
        <Switch
          aria-label="Toggle dark mode"
          aria-checked={isDarkTheme}
          onColor="#000"
          offColor="#f2ee50"
          checkedIcon={checkedIcon}
          uncheckedIcon={uncheckedIcon}
          checked={isDarkTheme}
          onChange={toggleTheme}
        />
      </div>
      {children}
    </div>
  );
}

export default RootSwitch;

RootSwitch.propTypes = {
  children: PropTypes.any.isRequired,
};

RootSwitch.defaultProps = {
};

