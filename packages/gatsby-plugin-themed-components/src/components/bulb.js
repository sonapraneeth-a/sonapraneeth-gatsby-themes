// eslint-disable-next-line no-unused-vars
import React from "react"
import PropTypes from "prop-types"
/** @jsx jsx */
import { jsx } from "theme-ui"

import BulbIcon from "./bulb-icon"

/**
 *
 * @param {*} toggleTheme
 * @param {*} color
 * @param {*} stroke
 * @return {JSX}
 */
function BulbSwitch({ toggleTheme, color = "#ff0", stroke = "#fcee21" }) {
  return (
    <div
      onClick={toggleTheme}
      sx={{
        px: "0.01rem",
        cursor: "pointer",
      }}
    >
      <BulbIcon color={color} stroke={stroke} />
    </div>
  )
}

export default BulbSwitch

BulbSwitch.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  color: PropTypes.string,
  stroke: PropTypes.string,
}

BulbSwitch.defaultProps = {
  color: "#ff0",
  stroke: "#fcee21",
}
