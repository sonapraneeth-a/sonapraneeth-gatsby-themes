// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import {Link} from "gatsby";
import {Styled} from "theme-ui";
/** @jsx jsx */
import {jsx} from "theme-ui";

import RootBulb from "./root-bulb";
import HeadMetadata from "../components/head/meta";
import {SHeader, SContainer, SMain} from "../components/theme-ui/index";
import {useSiteMetadata} from "../hooks/useSiteMetadata";
import Footer from "../components/footer";

/**
 * Base layout for all other layouts
 * @return {JSX} Rendered children for the page
 */
function BaseLayout({title, description, location, children}) {
  const siteMeta = useSiteMetadata();
  return (
    <RootBulb>
      <HeadMetadata
        title={title}
        description={description}
        location={location}
      />
      <SHeader>
        <SContainer>
          <Styled.h1>
            <Styled.a
              as={Link}
              to={siteMeta.baseUrl}
              sx={{
                textDecoration: "none",
                borderBottom: "none",
              }}
            >
              {siteMeta.title}
            </Styled.a>
          </Styled.h1>
        </SContainer>
      </SHeader>
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
