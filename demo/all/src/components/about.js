/** @jsx jsx */
import {jsx} from "@sonapraneeth/base";
// eslint-disable-next-line no-unused-vars
import React from "react";

import {Styled, SContainer} from "@sonapraneeth/base";
import {HomeWidget, useHome} from "@sonapraneeth/bio";

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
