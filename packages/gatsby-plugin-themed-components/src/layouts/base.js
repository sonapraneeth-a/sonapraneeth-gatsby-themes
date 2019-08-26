// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
/** @jsx jsx */
import {jsx} from "theme-ui";

import RootBulb from "./root-bulb";
import HeadMetadata from "../components/head/meta";
import {SMain} from "../components/theme-ui/index";
import Header from "../components/header";
import Footer from "../components/footer";

/**
 * Base layout for all other layouts
 * @return {JSX} Rendered children for the page
 */
function BaseLayout({title, description, location, children}) {
  return (
    <RootBulb>
      <HeadMetadata
        title={title}
        description={description}
        location={location}
      />
      <Header />
      <SMain>{children}</SMain>
      <Footer />
    </RootBulb>
  );
}

export default BaseLayout;

BaseLayout.propTypes = {
  children: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  location: PropTypes.any.isRequired,
};

BaseLayout.defaultProps = {
  description: "",
};
