// eslint-disable-next-line no-unused-vars
import React from "react";
/** @jsx jsx */
import {jsx} from "@emotion/core";

function BulbIcon({
  color = "#ff0",
  stroke = "#fcee21",
}) {
  return ( 
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="29.24" 
      height="41.58" 
      viewBox="0 0 29.24 41.58"
    >
    <path 
      d="M28.74,27A14.12,14.12,0,0,1,.5,27c0-7.75,7.08-10.56,7.06-14.12s14.14-3.53,14.12,0S28.76,19.26,28.74,27Z" 
      style={{
        fill: color, 
        stroke: stroke, 
        strokeMiterlimit: 10,
      }}
    />
    <rect 
      x="7.34" y="8.85" width="14.56" height="3.31" rx="1.65" transform="translate(29.24 21) rotate(180)"
      style={{
        fill: "#ccc",
        stroke: "gray",
        strokeMiterlimit: 10,
        strokeWidth: "0.5px",
      }}
    />
    <rect 
      x="7.31" y="5.54" width="14.56" height="3.31" rx="1.65" transform="translate(29.19 14.38) rotate(-180)" 
      style={{
        fill: "#ccc",
        stroke: "gray",
        strokeMiterlimit: 10,
        strokeWidth: "0.5px",
      }}
    />
    <rect 
      x="7.34" y="2.23" width="14.56" height="3.31" rx="1.65" transform="translate(29.24 7.77) rotate(180)"
      style={{
        fill: "#ccc",
        stroke: "gray",
        strokeMiterlimit: 10,
        strokeWidth: "0.5px",
      }}
    />
    <path 
      d="M9.64.5h9.77c.28,0,.52.16.52.37v1c0,.2-.24.37-.52.37H9.64c-.29,0-.52-.17-.52-.37v-1C9.12.66,9.35.5,9.64.5Z" 
      style={{
        fill: "#666",
        stroke: "gray",
        strokeMiterlimit: 10,
        strokeWidth: "0.5px",
      }}
    />
    </svg>
  );
}

export default BulbIcon;
