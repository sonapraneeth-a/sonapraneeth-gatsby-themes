// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
/** @jsx jsx */
import {jsx} from "theme-ui";

import Root from "./root";
import HeadMetadata from "../components/head/meta";
import {SMain} from "../components/theme-ui/index";
import Header from "../components/header";
import Footer from "../components/footer";
import {useMenu} from "../hooks/useMenu";
import Navbar from "../components/menu/navbar";
import {useWindowDimensions} from "../hooks/index";
import ScrollToTop from "../components/scroll-to-top";

/**
 * Base layout for all other layouts
 * @return {JSX} Rendered children for the page
 */
function BaseLayout({title, description, location, children}) {
  console.log(location);
  const menu = useMenu();
  const {width} = useWindowDimensions();
  console.log(width);
  let showNavbar = false;
  if (width >= 1024) {
    showNavbar = true;
  }
  return (
    <Root>
      <HeadMetadata
        title={title}
        description={description}
        location={location}
      />
      <ScrollToTop />
      <Header />
      {showNavbar === true && <Navbar menuItems={menu} />}
      <SMain>{children}</SMain>
      <Footer />
    </Root>
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
