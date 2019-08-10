// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

import {GatsbyImage} from "@sonapraneeth/base";

FigureBio.propTypes = {
  // Profile image of the person
  image: PropTypes.any.isRequired,
  caption: PropTypes.any,
};

FigureBio.defaultProps = {
  caption: <div></div>,
};

/**
 * @param {object} props
 * @return {JSX}
 */
function FigureBio({image, caption}) {
  return (
    <>
      <GatsbyImage
        src={image.fluid}
        style={{
          borderRadius: "0%",
        }}
        imgStyle={{
          borderRadius: "0% !important",
        }}
        caption={caption}
      />
    </>
  );
}

export default FigureBio;
