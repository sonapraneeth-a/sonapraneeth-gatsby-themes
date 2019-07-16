import React from "react";
import PropTypes from "prop-types";

function Root({children}) {
  console.log("Root from common");
  return (
    <div
      style={{
        margin: "0 auto",
        position: "relative",
        width: "90%",
      }}
    >
      {children}
    </div>
  );
}

export default Root;

Root.propTypes = {
  children: PropTypes.any.isRequired,
};

Root.defaultProps = {
};

