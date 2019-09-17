import React from "react";
import PropTypes from "prop-types";
import Image from "gatsby-image";

GatsbyImage.propTypes = {
  // Type of image: fixed/fluid,
  type: PropTypes.oneOf(["fixed", "fluid"]).isRequired,
  // Image source
  src: PropTypes.object.isRequired,
  // Optional: Alt string for the image
  alt: PropTypes.string,
  // Optional: Caption for the image
  caption: PropTypes.any,
  // Optional: Styling for the image wrapper
  style: PropTypes.any,
  // Optional: Styling for the img element
  imgStyle: PropTypes.any,
};

GatsbyImage.defaultProps = {
  alt: "",
  caption: <div></div>,
};

/**
 * Wrapper for Image component from gatsby
 * @param {object} props
 * @return {JSX} <GatsbyImage> component
 */
function GatsbyImage({type, src, alt, style, imgStyle, caption}) {
  return (
    <>
      {type === "fluid" && (
        <>
          <Image fluid={src} alt={alt} style={style} imgStyle={imgStyle} />
          {caption}
        </>
      )}
      {type === "fixed" && (
        <>
          <Image fixed={src} alt={alt} style={style} imgStyle={imgStyle} />
          {caption}
        </>
      )}
    </>
  );
}

export default GatsbyImage;
