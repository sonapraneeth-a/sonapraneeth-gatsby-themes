// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import {useThemeUI} from "theme-ui";

import {GatsbyImage} from "@sonapraneeth/gatsby-plugin-themed-components";

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
  const context = useThemeUI();
  const theme = context.theme;
  const borderRadius = theme.rounded === false ? "0%" : "50%";
  return (
    <>
      <GatsbyImage
        type={"fluid"}
        src={image.fluid}
        style={{
          borderRadius: borderRadius,
        }}
        imgStyle={{
          borderRadius: `${borderRadius} !important`,
        }}
        caption={caption}
      />
    </>
  );
}

export default FigureBio;
