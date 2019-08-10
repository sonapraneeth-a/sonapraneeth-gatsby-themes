/** @jsx jsx */
import {jsx} from "theme-ui";
// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

/**
 *
 * @param {*} children
 * @return {JSX}
 */
function Card({children, ...props}) {
  return (
    <div {...props} sx={{bg: "tomato"}}>
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.any.isRequired,
};

Card.defaultProps = {};

export default Card;
