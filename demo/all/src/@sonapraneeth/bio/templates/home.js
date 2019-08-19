import React from "react";
import PropTypes from "prop-types";

import {PageLayout} from "@sonapraneeth/base";

import AboutBanner from "../../../components/about";
import ProjectsBanner from "../../../components/projects";
import BlogBanner from "../../../components/blog";

HomeLayout.propTypes = {
  location: PropTypes.any.isRequired,
};

HomeLayout.defaultProps = {};

/**
 * Home layout - Used in home page
 * @return {JSX} Rendered children for the HomeLayout
 */
function HomeLayout({location}) {
  return (
    <PageLayout title={""} description={""} location={location}>
      <AboutBanner />
      <ProjectsBanner />
      <BlogBanner />
    </PageLayout>
  );
}

export default HomeLayout;
