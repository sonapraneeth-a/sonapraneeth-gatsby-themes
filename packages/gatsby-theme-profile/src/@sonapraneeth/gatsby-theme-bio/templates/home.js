import React from "react";
import PropTypes from "prop-types";

import {
  PageLayout,
  useSiteMetadata,
} from "@sonapraneeth/gatsby-plugin-themed-components";

import {AboutBanner} from "@sonapraneeth/gatsby-theme-bio";
import {ProjectsBanner} from "@sonapraneeth/gatsby-theme-project";
import {BlogBanner} from "@sonapraneeth/gatsby-theme-blog";

HomeLayout.propTypes = {
  location: PropTypes.any.isRequired,
};

HomeLayout.defaultProps = {};

/**
 * Home layout - Used in home page
 * @return {JSX} Rendered children for the HomeLayout
 */
function HomeLayout({location}) {
  const siteMeta = useSiteMetadata();
  const meta = {
    title: "Home page of " + siteMeta.author,
    description: "This is home page of " + siteMeta.author,
  };
  return (
    <PageLayout meta={meta} pageTitle={""} location={location}>
      <AboutBanner />
      <ProjectsBanner />
      <BlogBanner />
    </PageLayout>
  );
}

export default HomeLayout;
