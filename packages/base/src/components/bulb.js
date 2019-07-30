// eslint-disable-next-line no-unused-vars
import React from "react";
/** @jsx jsx */
import {jsx} from "@emotion/core";

import BulbIcon from "./bulb-icon";

function BulbSwitch({
  toggleTheme,
  color = "#ff0",
  stroke = "#fcee21",
}) {
  return ( 
    <div
      onClick={toggleTheme}
    >
      <BulbIcon
        color={color}
        stroke={stroke}
      />
    </div>
  );
}

export default BulbSwitch;
