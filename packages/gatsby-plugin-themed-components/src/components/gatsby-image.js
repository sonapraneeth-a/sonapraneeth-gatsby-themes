import React from "react"
import PropTypes from "prop-types"
import Image from "gatsby-image"

GatsbyImage.propTypes = {
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
}

GatsbyImage.defaultProps = {
  alt: "",
  caption: <div></div>,
}

/**
 * Wrapper for Image component from gatsby
 * @param {object} props
 * @return {JSX} <GatsbyImage> component
 */
function GatsbyImage({ src, alt, style, imgStyle, caption }) {
  return (
    <>
      <Image fluid={src} alt={alt} style={style} imgStyle={imgStyle} />
      {caption}
    </>
  )
}

export default GatsbyImage
