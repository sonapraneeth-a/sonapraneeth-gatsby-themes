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
function CardFooter({children, ...props}) {
  return (
    <div
      {...props}
      sx={{
        p: 4,
        width: "100%",
        borderTop: "0.1rem solid",
        borderColor: "muted",
        bottom: 0,
      }}
    >
      {children}
    </div>
  );
}

CardFooter.propTypes = {
  children: PropTypes.any.isRequired,
};

CardFooter.defaultProps = {};

export default CardFooter;
