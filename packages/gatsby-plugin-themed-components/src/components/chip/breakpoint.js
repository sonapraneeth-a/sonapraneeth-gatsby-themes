/** @jsx jsx */
import {jsx} from "theme-ui";
// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import {Chip} from "./index";
import {screensInfo, breakpoints} from "../breakpoints";

/**
 *
 * @param {*} children
 * @return {JSX}
 */
function BreakpointChip({width, height, ...props}) {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }
  const text = `${width} x ${height}`;
  const widthInRem = width / 16;
  let screenIndex = 0;
  for (let index = 0; index < breakpoints.length - 1; index++) {
    if (
      breakpoints[index] <= widthInRem &&
      widthInRem <= breakpoints[index + 1]
    ) {
      screenIndex = index;
      break;
    }
  }
  const screen = screensInfo[screenIndex];
  console.log(screen);
  return (
    <Chip
      type="default"
      key={"screen" + screenIndex}
      sx={{
        "display": "block",
        "position": "fixed",
        "left": "1rem",
        "bottom": "1rem",
        "textAlign": "center",
        "@media print": {
          display: "none",
        },
      }}
    >
      <b>
        {screen[0][0].toUpperCase() + screen[0].slice(1)}
        {" >= " + screen[1]}
      </b>
      <br />
      <b>{text}</b>
    </Chip>
  );
  /* return screensInfo.map((screen, index) => {
    // Reference: https://stackoverflow.com/questions/1295584/most-efficient-way-to-create-a-zero-filled-javascript-array
    const breakpointDisplay = Array.from(
      Array(screensInfo.length),
      () => "none",
    );
    breakpointDisplay[index] = "block";
    return (
      <Chip
        type="default"
        key={"screen" + index}
        sx={{
          display: breakpointDisplay,
          position: "fixed",
          left: "1rem",
          bottom: "1rem",
          textAlign: "center",
        }}
      >
        <b>
          {screen[0][0].toUpperCase() + screen[0].slice(1)}
          {" >= " + screen[1]}
        </b>
        <br />
        <b>{text}</b>
      </Chip>
    );
  });*/
}

BreakpointChip.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

BreakpointChip.defaultProps = {};

export default BreakpointChip;
