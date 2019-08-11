// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import {Styled} from "theme-ui";
/** @jsx jsx */
import {jsx} from "theme-ui";

import RootBulb from "./root-bulb";
import HeadMetadata from "../components/head/meta";
import {
  SHeader,
  SContainer,
  SMain,
  SFooter,
} from "../components/theme-ui/index";
import {useSiteMetadata} from "../hooks/useSiteMetadata";
import {FaHeart} from "react-icons/fa";

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
          <Styled.h1>{siteMeta.author}</Styled.h1>
        </SContainer>
      </SHeader>
      <SMain>{children}</SMain>
      <SFooter>
        <SContainer
          sx={{
            textAlign: "center",
          }}
        >
          <p>
            Copyright &copy; {siteMeta.author} {new Date().getFullYear()}. Made
            in
            <FaHeart
              sx={{
                color: "red",
                mx: "0.2rem",
              }}
            />
            with GatsbyJS.
          </p>
        </SContainer>
      </SFooter>
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
