import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import {useThemeUI} from "theme-ui";

import {useSiteMetadata} from "../../hooks/useSiteMetadata";

HeadMeta.propTypes = {
  lang: PropTypes.string,
  author: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string),
};

HeadMeta.defaultProps = {
  lang: "en",
  author: "John Doe",
  title: "",
  description: "",
  keywords: [
    "gatsby",
    "gatsby-theme",
    "@sonapraneeth/gatsby-theme-bio",
    "gatsby-plugin",
  ],
};

/**
 * This component handles meta related information present in the <head></head>
 *
 * @param  {object} props - Meta information like title, description to be
 *                          passed as props
 * @return {JSX} Containing the meta tags for <head> element
 */
function HeadMeta({lang, title, description, author, keywords}) {
  const siteMeta = useSiteMetadata();
  const context = useThemeUI();
  const {colors} = context.theme;
  const metaInfo = {
    title: title === (undefined || null || "") ? siteMeta.title : title,
    author:
      siteMeta.author === (undefined || null || "") ? author : siteMeta.author,
    description: description,
    keywords: keywords,
  };
  /* Issue: https://github.com/system-ui/theme-ui/issues/177 */
  return (
    <>
      <Helmet
        htmlAttributes={{lang: lang}}
        title={metaInfo.title}
        meta={[
          {name: "author", content: metaInfo.author},
          {name: "description", content: metaInfo.description},
          {name: "keywords", content: metaInfo.keywords},
          {name: "generator", content: "Gatsby site generator"},
          {name: "application-name", content: siteMeta.appName},
          {name: "theme-color", content: colors.primary},
        ]}
      />
    </>
  );
}

export default HeadMeta;
