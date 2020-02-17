import React from "react";
import PropTypes from "prop-types";

import {PageLayout} from "@sonapraneeth/gatsby-plugin-themed-components";
import HomeWidget from "../../widget/home";

HomeTemplate.propTypes = {
  location: PropTypes.any.isRequired,
  data: PropTypes.any.isRequired,
};

HomeTemplate.defaultProps = {};

/**
 * Home layout - Used in home page
 * @return {JSX} Rendered children for the HomeTemplate
 */
function HomeTemplate({location, data}) {
  const title = "Home page of " + data.author.name;
  const description =
    "This is the home page of " +
    data.author.name +
    ". " +
    "You can find more information about the author in this page";
  const meta = {
    title: title,
    description: description,
  };
  return (
    <PageLayout meta={meta} location={location}>
      <HomeWidget author={data.author} details={data.mdx} />
    </PageLayout>
  );
}

export default HomeTemplate;
