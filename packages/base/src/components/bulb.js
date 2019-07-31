// eslint-disable-next-line no-unused-vars
import React from "react";
/** @jsx jsx */
import {jsx} from "theme-ui";

import BulbIcon from "./bulb-icon";

function BulbSwitch({
  toggleTheme,
  color = "#ff0",
  stroke = "#fcee21",
}) {
  return (
    <div
      onClick={toggleTheme}
      sx={{
        px: "0.01rem",
        cursor: "pointer",
      }}
    >
      <BulbIcon
        color={color}
        stroke={stroke}
      />
    </div>
  );
}

export default BulbSwitch;
