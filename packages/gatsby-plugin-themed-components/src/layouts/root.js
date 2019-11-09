import React from "react";
import PropTypes from "prop-types";

import {useWindowDimensions} from "../hooks/index";
import RootBulb from "./root-bulb";

/**
 * Root component
 * @return {JSX}
 */
function Root({children}) {
  // Reference: https://codesandbox.io/s/34kr2rw285
  const {width, height} = useWindowDimensions();
  return (
    <RootBulb windowWidth={width} windowHeight={height}>
      {children}
    </RootBulb>
  );
}

export default Root;

Root.propTypes = {
  children: PropTypes.any.isRequired,
};

Root.defaultProps = {};
