import React from "react";
import PropTypes from "prop-types";
import {Styled} from "theme-ui";

import RootBulb from "./root-bulb";
import HeadMetadata from "../components/head/meta";
import {
  SHeader,
  SContainer,
  SMain,
  SFooter,
} from "../components/theme-ui/index";

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
      <SHeader>
        <SContainer>
          <Styled.h1>This is a Header</Styled.h1>
        </SContainer>
      </SHeader>
      <SMain>{children}</SMain>
      <SFooter>
        <SContainer>
          <p>This is a Footer. Copyright &copy; 2019. Footer</p>
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
