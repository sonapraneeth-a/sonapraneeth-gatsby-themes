/** @jsx jsx */
import {jsx} from "@sonapraneeth/gatsby-plugin-themed-components";
// eslint-disable-next-line no-unused-vars
import React from "react";

import {
  Styled,
  SContainer,
} from "@sonapraneeth/gatsby-plugin-themed-components";
import {HomeWidget, useHome} from "@sonapraneeth/gatsby-theme-bio";

AboutBanner.propTypes = {};

AboutBanner.defaultProps = {};

/**
 * Home layout - Used in home page
 * @return {JSX} Rendered children for the AboutBanner
 */
function AboutBanner() {
  const home = useHome();
  return (
    <div
      sx={{
        bg: "banner.about",
        padding: "1rem",
      }}
    >
      <SContainer>
        <Styled.h1>About</Styled.h1>
        <HomeWidget author={home.authorInfo} details={home.mdx} />
      </SContainer>
    </div>
  );
}

export default AboutBanner;
