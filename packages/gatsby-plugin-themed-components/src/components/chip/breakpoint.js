/** @jsx jsx */
import {jsx} from "theme-ui";
// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import {Chip} from "./index";
import {screensInfo} from "../breakpoints";

/**
 *
 * @param {*} children
 * @return {JSX}
 */
function BreakpointChip({text, ...props}) {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }
  return screensInfo.map((screen, index) => {
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
  });
}

BreakpointChip.propTypes = {
  text: PropTypes.string,
};

BreakpointChip.defaultProps = {};

export default BreakpointChip;
