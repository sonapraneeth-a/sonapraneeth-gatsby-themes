/** @jsx jsx */
import {jsx} from "theme-ui";
// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

import {shadows, transition} from "gatsby-design-tokens";

/**
 *
 * @param {*} children
 * @return {JSX}
 */
function Card({children, ...props}) {
  return (
    <div
      {...props}
      sx={{
        "bg": "surface",
        "transition": transition.speed.default,
        "transitionProperty": "box-shadow,-webkit-box-shadow",
        "borderRadius": 0,
        "boxShadow": shadows.raised,
        "width": "100%",
        ":hover": {
          boxShadow: shadows.overlay,
        },
      }}
    >
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.any.isRequired,
};

Card.defaultProps = {};

export default Card;
