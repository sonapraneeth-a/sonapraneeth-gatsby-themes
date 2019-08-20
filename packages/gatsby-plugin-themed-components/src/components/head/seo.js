import React from "react"
import Helmet from "react-helmet"
import PropTypes from "prop-types"

SEO.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  alternateName: PropTypes.string,
}

SEO.defaultProps = {
  alternateName: "",
}

/**
 * This component handles meta related information present in the <head></head>
 *
 * @param  {object} props - Meta information like title, url to be
 *                          passed as props
 * @return {JSX} Containing the meta tags for <head> element
 */
function SEO(props) {
  const schemaOrgJSONLD = {
    "@context": "http://schema.org",
    "@type": "Website",
    url: props.url,
    name: props.title,
    alternateName: props.alternateName,
  }
  return (
    <>
      {/* Reference: https://developers.google.com/search/docs/guides/intro-structured-data */}
      {/* Schema.org tags */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>
      </Helmet>
    </>
  )
}

export default SEO
