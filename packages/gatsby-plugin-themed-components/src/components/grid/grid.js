// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
/** @jsx jsx */
import {jsx} from "theme-ui";

Grid.propTypes = {
  children: PropTypes.any.isRequired,
  noCols: PropTypes.number.isRequired,
  nSizes: PropTypes.arrayOf(PropTypes.number),
  style: PropTypes.any,
};

Grid.defaultProps = {
  style: {},
};

/**
 * @param {object} props
 * @return {JSX}
 */
function Grid({children, noCols, nSizes, style}) {
  let templateColumns = "";
  for (let index = 0; index < noCols; index++) {
    if (nSizes !== undefined && nSizes !== null && index < nSizes.length) {
      templateColumns += `${nSizes[index]}fr `;
    } else {
      templateColumns += "1fr ";
    }
  }
  return (
    <div
      sx={{
        display: "grid",
        gridGap: "0.7rem",
        padding: "0.5rem 0",
        gridTemplateColumns: ["100%", "100%", "100%", templateColumns],
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* <GridWrapper templateColumns={"repeat(auto-fit,minmax(320px,1fr))"}>*/

export default Grid;
