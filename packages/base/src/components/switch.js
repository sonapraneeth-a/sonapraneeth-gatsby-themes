import React from "react";
import ReactSwitch from "react-switch";

/**
 * @param {object} props
 * @return {JSX}
 */
function Switch(props) {
  return <ReactSwitch {...props} />;
}

Switch.defaultProps = {
  checkedIcon: false,
  uncheckedIcon: false,
  height: 28,
  width: 56,
  handleDiameter: 26,
  offColor: "#000",
  onColor: "#000",
};

export default Switch;
