// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
/** @jsx jsx */
import {jsx} from "theme-ui";

import BulbIcon from "./bulb-icon";

/**
 *
 * @param {*} toggleTheme
 * @param {*} color
 * @param {*} stroke
 * @return {JSX}
 */
function BulbSwitch({toggleTheme, color = "#ff0", stroke = "#fcee21"}) {
  // Reference: https://stackoverflow.com/questions/54274473/how-to-fix-static-html-elements-with-event-handlers-require-a-role
  // Reference: https://stackoverflow.com/questions/56441825/how-to-fix-button-interactive-role-must-be-focusable
  // Reference: https://stackoverflow.com/questions/48575674/how-to-add-a-keyboard-listener-to-my-onclick-handler
  /* fixes warnings
  warning  Static HTML elements with event handlers require a role
  jsx-a11y/no-static-element-interactions
  warning  Elements with the 'button' interactive role must be focusable
  jsx-a11y/interactive-supports-focus
  warning  Visible, non-interactive elements with click handlers must have at
  least one keyboard listener  jsx-a11y/click-events-have-key-events
  */
  return (
    <div
      role="button"
      aria-label={"Icon to change theme of the webpage"}
      tabIndex={0}
      onClick={toggleTheme}
      onKeyDown={toggleTheme}
      sx={{
        "px": "0.01rem",
        "cursor": "pointer",
        "@media print": {
          display: "none",
        },
      }}
    >
      <BulbIcon color={color} stroke={stroke} />
    </div>
  );
}

export default BulbSwitch;

BulbSwitch.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  color: PropTypes.string,
  stroke: PropTypes.string,
};

BulbSwitch.defaultProps = {
  color: "#ff0",
  stroke: "#fcee21",
};
